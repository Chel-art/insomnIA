import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createSession(userId, title = 'Nueva sesión') {
  return prisma.session.create({
    data: { userId, title },
  });
}

export async function getUserSessions(userId) {
  return prisma.session.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getSessionById(sessionId, userId) {
  return prisma.session.findFirst({
    where: { id: sessionId, userId },
  });
}

export async function updateSessionTitle(sessionId, title) {
  return prisma.session.update({
    where: { id: sessionId },
    data: { title },
  });
}

export async function deleteSession(sessionId) {
  return prisma.session.delete({
    where: { id: sessionId },
  });
}
