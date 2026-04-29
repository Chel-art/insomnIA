import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../dao/userDao.js';

const SALT_ROUNDS = 12;

export async function register(email, password) {
  const existing = await findUserByEmail(email);
  if (existing) {
    throw new Error('EMAIL_IN_USE');
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await createUser(email, passwordHash);

  return buildTokenPayload(user);
}

export async function login(email, password) {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    throw new Error('INVALID_CREDENTIALS');
  }

  return buildTokenPayload(user);
}

function buildTokenPayload(user) {
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );

  return {
    token,
    user: { id: user.id, email: user.email },
  };
}
