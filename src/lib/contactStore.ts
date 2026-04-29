import { getRedis } from "@/lib/redisClient";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

const KEY = "contact_messages";

export async function recordContactMessage(input: {
  name: string;
  email: string;
  message: string;
}): Promise<ContactMessage> {
  const entry: ContactMessage = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    message: input.message.trim(),
    createdAt: new Date().toISOString(),
  };

  const redis = await getRedis();
  await redis.lPush(KEY, JSON.stringify(entry));

  return entry;
}

export async function getContactMessagesNewestFirst(): Promise<ContactMessage[]> {
  const redis = await getRedis();
  const raw = await redis.lRange(KEY, 0, -1);

  return raw.map((item) => JSON.parse(item) as ContactMessage);
}
