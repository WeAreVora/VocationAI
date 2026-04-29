import { getRedis } from "@/lib/redisClient";

export type CommentEntry = {
  id: string;
  rating: number;
  message: string;
  createdAt: string;
};

const KEY = "comments";

export async function recordComment(input: { rating: number; message: string }): Promise<CommentEntry> {
  const entry: CommentEntry = {
    id: crypto.randomUUID(),
    rating: input.rating,
    message: input.message.trim(),
    createdAt: new Date().toISOString(),
  };

  const redis = await getRedis();
  await redis.lPush(KEY, JSON.stringify(entry));

  return entry;
}

export async function getCommentsNewestFirst(): Promise<CommentEntry[]> {
  const redis = await getRedis();
  const raw = await redis.lRange(KEY, 0, -1);

  return raw.map((item) => JSON.parse(item) as CommentEntry);
}
