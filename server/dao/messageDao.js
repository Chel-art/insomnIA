import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createMessage(sessionId, role, content) {
  return prisma.message.create({
    data: { sessionId, role, content },
  });
}

export async function getSessionMessages(sessionId) {
  return prisma.message.findMany({
    where: { sessionId },
    orderBy: { createdAt: 'asc' },
  });
}
