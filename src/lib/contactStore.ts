import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

type ContactDb = {
  messages: ContactMessage[];
};

const DATA_DIR = path.join(process.cwd(), ".data");
const CONTACT_DB_PATH = path.join(DATA_DIR, "contact-messages.json");

function defaultDb(): ContactDb {
  return { messages: [] };
}

async function ensureDbFile(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    await readFile(CONTACT_DB_PATH, "utf8");
  } catch {
    await writeFile(CONTACT_DB_PATH, JSON.stringify(defaultDb(), null, 2), "utf8");
  }
}

async function readDb(): Promise<ContactDb> {
  await ensureDbFile();
  const raw = await readFile(CONTACT_DB_PATH, "utf8");

  try {
    const parsed = JSON.parse(raw) as Partial<ContactDb>;

    return {
      messages: Array.isArray(parsed.messages) ? parsed.messages : [],
    };
  } catch {
    return defaultDb();
  }
}

async function writeDb(db: ContactDb): Promise<void> {
  await ensureDbFile();
  await writeFile(CONTACT_DB_PATH, JSON.stringify(db, null, 2), "utf8");
}

export async function recordContactMessage(input: {
  name: string;
  email: string;
  message: string;
}): Promise<ContactMessage> {
  const db = await readDb();

  const created: ContactMessage = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    message: input.message.trim(),
    createdAt: new Date().toISOString(),
  };

  db.messages.push(created);
  await writeDb(db);

  return created;
}

export async function getContactMessagesNewestFirst(): Promise<ContactMessage[]> {
  const db = await readDb();

  return db.messages
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
