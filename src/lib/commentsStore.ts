import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type CommentEntry = {
  id: string;
  rating: number;
  message: string;
  createdAt: string;
};

type CommentsDb = {
  comments: CommentEntry[];
};

const DATA_DIR = path.join(process.cwd(), ".data");
const COMMENTS_DB_PATH = path.join(DATA_DIR, "comments.json");

function defaultDb(): CommentsDb {
  return { comments: [] };
}

async function ensureDbFile(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    await readFile(COMMENTS_DB_PATH, "utf8");
  } catch {
    await writeFile(COMMENTS_DB_PATH, JSON.stringify(defaultDb(), null, 2), "utf8");
  }
}

async function readDb(): Promise<CommentsDb> {
  await ensureDbFile();
  const raw = await readFile(COMMENTS_DB_PATH, "utf8");

  try {
    const parsed = JSON.parse(raw) as Partial<CommentsDb>;

    return {
      comments: Array.isArray(parsed.comments) ? parsed.comments : [],
    };
  } catch {
    return defaultDb();
  }
}

async function writeDb(db: CommentsDb): Promise<void> {
  await ensureDbFile();
  await writeFile(COMMENTS_DB_PATH, JSON.stringify(db, null, 2), "utf8");
}

export async function recordComment(input: { rating: number; message: string }): Promise<CommentEntry> {
  const db = await readDb();

  const created: CommentEntry = {
    id: crypto.randomUUID(),
    rating: input.rating,
    message: input.message.trim(),
    createdAt: new Date().toISOString(),
  };

  db.comments.push(created);
  await writeDb(db);

  return created;
}

export async function getCommentsNewestFirst(): Promise<CommentEntry[]> {
  const db = await readDb();

  return db.comments
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}