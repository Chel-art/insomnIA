import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function upsertDreamSummary(sessionId, symbols, emotions, themes) {
  return prisma.dreamSummary.upsert({
    where: { sessionId },
    update: {
      symbols: JSON.stringify(symbols),
      emotions: JSON.stringify(emotions),
      themes: JSON.stringify(themes),
    },
    create: {
      sessionId,
      symbols: JSON.stringify(symbols),
      emotions: JSON.stringify(emotions),
      themes: JSON.stringify(themes),
    },
  });
}

export async function getDreamSummary(sessionId) {
  const summary = await prisma.dreamSummary.findUnique({
    where: { sessionId },
  });
  
  if (!summary) return null;
  
  return {
    ...summary,
    symbols: JSON.parse(summary.symbols),
    emotions: JSON.parse(summary.emotions),
    themes: JSON.parse(summary.themes),
  };
}

export async function getUserDreamSummaries(userId) {
  const summaries = await prisma.dreamSummary.findMany({
    where: {
      session: {
        userId
      }
    },
    include: {
      session: true
    },
    orderBy: { createdAt: 'desc' }
  });
  
  return summaries.map(s => ({
    ...s,
    symbols: JSON.parse(s.symbols),
    emotions: JSON.parse(s.emotions),
    themes: JSON.parse(s.themes),
  }));
}
