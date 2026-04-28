import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email, passwordHash) {
  return prisma.user.create({
    data: { email, passwordHash },
  });
}

export async function findUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}
