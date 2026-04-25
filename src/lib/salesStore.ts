import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type ApprovedSale = {
  paymentId: string;
  ref: string;
  perfil: string;
  pais: string;
  approvedAt: string;
};

export type PendingPayment = {
  preferenceId: string;
  ref: string;
  perfil: string;
  pais: string;
  createdAt: string;
};

type SalesDb = {
  approvedSales: ApprovedSale[];
  pendingPayments: PendingPayment[];
};

const DATA_DIR = path.join(process.cwd(), ".data");
const SALES_DB_PATH = path.join(DATA_DIR, "sales-db.json");

function normalizeCountry(value: string): string {
  return value.trim().toLowerCase();
}

function defaultDb(): SalesDb {
  return { approvedSales: [], pendingPayments: [] };
}

async function ensureDbFile(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    await readFile(SALES_DB_PATH, "utf8");
  } catch {
    await writeFile(SALES_DB_PATH, JSON.stringify(defaultDb(), null, 2), "utf8");
  }
}

async function readDb(): Promise<SalesDb> {
  await ensureDbFile();
  const raw = await readFile(SALES_DB_PATH, "utf8");

  try {
    const parsed = JSON.parse(raw) as Partial<SalesDb>;

    return {
      approvedSales: Array.isArray(parsed.approvedSales) ? parsed.approvedSales : [],
      pendingPayments: Array.isArray(parsed.pendingPayments) ? parsed.pendingPayments : [],
    };
  } catch {
    return defaultDb();
  }
}

async function writeDb(db: SalesDb): Promise<void> {
  await ensureDbFile();
  await writeFile(SALES_DB_PATH, JSON.stringify(db, null, 2), "utf8");
}

export async function recordApprovedSale(sale: Omit<ApprovedSale, "approvedAt">): Promise<boolean> {
  const db = await readDb();
  const exists = db.approvedSales.some((item) => item.paymentId === sale.paymentId);

  if (exists) {
    return false;
  }

  db.approvedSales.push({
    ...sale,
    pais: normalizeCountry(sale.pais),
    approvedAt: new Date().toISOString(),
  });

  await writeDb(db);
  return true;
}

export async function getApprovedSaleByPaymentId(paymentId: string): Promise<ApprovedSale | null> {
  const db = await readDb();
  return db.approvedSales.find((item) => item.paymentId === paymentId) ?? null;
}

export async function recordPendingPayment(payment: Omit<PendingPayment, "createdAt">): Promise<void> {
  const db = await readDb();
  db.pendingPayments = db.pendingPayments.filter(
    (item) => item.ref !== payment.ref && item.preferenceId !== payment.preferenceId,
  );

  db.pendingPayments.push({
    ...payment,
    perfil: payment.perfil.trim(),
    pais: normalizeCountry(payment.pais),
    createdAt: new Date().toISOString(),
  });

  await writeDb(db);
}

export async function getPendingPaymentByRef(ref: string): Promise<PendingPayment | null> {
  const db = await readDb();
  return db.pendingPayments.find((item) => item.ref === ref) ?? null;
}

export async function removePendingPaymentByRef(ref: string): Promise<void> {
  const db = await readDb();
  const nextPendingPayments = db.pendingPayments.filter((item) => item.ref !== ref);

  if (nextPendingPayments.length === db.pendingPayments.length) {
    return;
  }

  db.pendingPayments = nextPendingPayments;
  await writeDb(db);
}

function toProfileLabel(key: string): string {
  return key
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function toCountryLabel(code: string): string {
  const labels: Record<string, string> = {
    arg: "Argentina",
    mx: "Mexico",
    uru: "Uruguay",
    col: "Colombia",
    chile: "Chile",
    peru: "Peru",
  };

  return labels[code] ?? code.toUpperCase();
}

export async function getAdminSalesStats() {
  const db = await readDb();

  const profileCounts = new Map<string, number>();
  const countryCounts = new Map<string, number>();

  for (const sale of db.approvedSales) {
    profileCounts.set(sale.perfil, (profileCounts.get(sale.perfil) ?? 0) + 1);
    countryCounts.set(sale.pais, (countryCounts.get(sale.pais) ?? 0) + 1);
  }

  const profiles = Array.from(profileCounts.entries())
    .map(([key, count]) => ({ key, label: toProfileLabel(key), count }))
    .sort((a, b) => b.count - a.count);

  const countries = Array.from(countryCounts.entries())
    .map(([key, count]) => ({ key, label: toCountryLabel(key), count }))
    .sort((a, b) => b.count - a.count);

  return {
    totalSold: db.approvedSales.length,
    profiles,
    countries,
    recentSales: db.approvedSales
      .slice()
      .sort((a, b) => b.approvedAt.localeCompare(a.approvedAt))
      .slice(0, 20),
  };
}
