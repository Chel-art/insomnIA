export interface Session {
  id: number;
  title: string;
  createdAt: string;
}

export interface Message {
  id: number;
  sessionId: number;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}
