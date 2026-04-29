import { getRedis } from "@/lib/redisClient";

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

const APPROVED_SALES_KEY = "approved_sales";
const PENDING_PAYMENTS_KEY = "pending_payments";

function normalizeCountry(value: string): string {
  return value.trim().toLowerCase();
}

export async function recordApprovedSale(sale: Omit<ApprovedSale, "approvedAt">): Promise<boolean> {
  const redis = await getRedis();
  const raw = await redis.lRange(APPROVED_SALES_KEY, 0, -1);
  const exists = raw.some((item) => {
    const parsed = JSON.parse(item) as ApprovedSale;
    return parsed.paymentId === sale.paymentId;
  });

  if (exists) {
    return false;
  }

  const entry: ApprovedSale = {
    ...sale,
    pais: normalizeCountry(sale.pais),
    approvedAt: new Date().toISOString(),
  };

  await redis.lPush(APPROVED_SALES_KEY, JSON.stringify(entry));
  return true;
}

export async function getApprovedSaleByPaymentId(paymentId: string): Promise<ApprovedSale | null> {
  const redis = await getRedis();
  const raw = await redis.lRange(APPROVED_SALES_KEY, 0, -1);

  for (const item of raw) {
    const parsed = JSON.parse(item) as ApprovedSale;
    if (parsed.paymentId === paymentId) {
      return parsed;
    }
  }

  return null;
}

export async function recordPendingPayment(payment: Omit<PendingPayment, "createdAt">): Promise<void> {
  const redis = await getRedis();
  const raw = await redis.lRange(PENDING_PAYMENTS_KEY, 0, -1);

  const filtered = raw.filter((item) => {
    const parsed = JSON.parse(item) as PendingPayment;
    return parsed.ref !== payment.ref && parsed.preferenceId !== payment.preferenceId;
  });

  const pipeline = redis.multi();

  pipeline.del(PENDING_PAYMENTS_KEY);

  const entry: PendingPayment = {
    ...payment,
    perfil: payment.perfil.trim(),
    pais: normalizeCountry(payment.pais),
    createdAt: new Date().toISOString(),
  };

  for (const item of filtered) {
    pipeline.rPush(PENDING_PAYMENTS_KEY, item);
  }

  pipeline.rPush(PENDING_PAYMENTS_KEY, JSON.stringify(entry));
  await pipeline.exec();
}

export async function getPendingPaymentByRef(ref: string): Promise<PendingPayment | null> {
  const redis = await getRedis();
  const raw = await redis.lRange(PENDING_PAYMENTS_KEY, 0, -1);

  for (const item of raw) {
    const parsed = JSON.parse(item) as PendingPayment;
    if (parsed.ref === ref) {
      return parsed;
    }
  }

  return null;
}

export async function removePendingPaymentByRef(ref: string): Promise<void> {
  const redis = await getRedis();
  const raw = await redis.lRange(PENDING_PAYMENTS_KEY, 0, -1);

  const filtered = raw.filter((item) => {
    const parsed = JSON.parse(item) as PendingPayment;
    return parsed.ref !== ref;
  });

  if (filtered.length === raw.length) {
    return;
  }

  const pipeline = redis.multi();
  pipeline.del(PENDING_PAYMENTS_KEY);
  for (const item of filtered) {
    pipeline.rPush(PENDING_PAYMENTS_KEY, item);
  }
  await pipeline.exec();
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
  const redis = await getRedis();
  const raw = await redis.lRange(APPROVED_SALES_KEY, 0, -1);
  const approvedSales = raw.map((item) => JSON.parse(item) as ApprovedSale);

  const profileCounts = new Map<string, number>();
  const countryCounts = new Map<string, number>();

  for (const sale of approvedSales) {
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
    totalSold: approvedSales.length,
    profiles,
    countries,
    recentSales: approvedSales
      .slice()
      .sort((a, b) => b.approvedAt.localeCompare(a.approvedAt))
      .slice(0, 20),
  };
}
