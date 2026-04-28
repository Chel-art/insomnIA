import axios from 'axios';
import type { AuthResponse, LoginCredentials, RegisterCredentials } from '@/types/auth';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export async function registerUser(credentials: RegisterCredentials): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/register', credentials);
  return data;
}

export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/login', credentials);
  return data;
}
