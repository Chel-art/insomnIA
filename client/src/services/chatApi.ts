import axios from 'axios';
import type { Session, Message } from '../types/chat';

const api = axios.create({ baseURL: 'http://localhost:3001/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('insomnia_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function createSession(): Promise<Session> {
  const { data } = await api.post<Session>('/sessions');
  return data;
}

export async function getSessions(): Promise<Session[]> {
  const { data } = await api.get<Session[]>('/sessions');
  return data;
}

export async function getDreamHistory(): Promise<any[]> {
  const { data } = await api.get<any[]>('/sessions/history');
  return data;
}

export async function getSessionMessages(sessionId: number): Promise<Message[]> {
  const { data } = await api.get<Message[]>(`/sessions/${sessionId}/messages`);
  return data;
}

export async function sendMessage(sessionId: number, content: string): Promise<{ reply: string; title?: string }> {
  const { data } = await api.post<{ reply: string; title?: string }>('/chat', { sessionId, content });
  return data;
}

export async function updateSessionTitle(sessionId: number, title: string): Promise<Session> {
  const { data } = await api.patch<Session>(`/sessions/${sessionId}`, { title });
  return data;
}
