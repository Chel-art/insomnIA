import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import type { Session, Message } from '../types/chat';
import {
  createSession,
  getSessions,
  getSessionMessages,
  sendMessage,
  updateSessionTitle as apiUpdateTitle,
  deleteSession as apiDeleteSession,
} from '../services/chatApi';

export function useChat() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSessions()
      .then((data) => {
        setSessions(data);
        if (data.length > 0) loadSession(data[0]);
      })
      .catch(() => {
        setError('No se pudieron cargar las sesiones');
        toast.error('Error de conexión', { description: 'No pudimos cargar tus sesiones pasadas.' });
      });
  }, []);

  const loadSession = useCallback(async (session: Session) => {
    setActiveSession(session);
    setMessages([]);
    try {
      const msgs = await getSessionMessages(session.id);
      setMessages(msgs);
    } catch {
      toast.error('No se pudieron cargar los mensajes', { description: 'Revisa tu conexión a internet.' });
    }
  }, []);

  const startNewSession = useCallback(async () => {
    try {
      const session = await createSession();
      setSessions((prev) => [session, ...prev]);
      setActiveSession(session);
      setMessages([]);
      toast.success('Nueva sesión creada', { description: 'Morfeo está listo para escucharte.' });
    } catch {
      toast.error('No se pudo crear la sesión', { description: 'El servidor podría estar ocupado.' });
    }
  }, []);

  const renameSession = useCallback(async (sessionId: number, title: string) => {
    try {
      const updated = await apiUpdateTitle(sessionId, title);
      setSessions((prev) => prev.map((s) => (s.id === sessionId ? updated : s)));
      if (activeSession?.id === sessionId) {
        setActiveSession(updated);
      }
      toast.success('Título actualizado');
    } catch {
      toast.error('Error al actualizar el título');
    }
  }, [activeSession]);

  const deleteSession = useCallback(async (sessionId: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta conversación?')) return;
    
    try {
      await apiDeleteSession(sessionId);
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      if (activeSession?.id === sessionId) {
        setActiveSession(null);
        setMessages([]);
      }
      toast.success('Conversación eliminada');
    } catch {
      toast.error('Error al eliminar la conversación');
    }
  }, [activeSession]);

  const submitMessage = useCallback(
    async (content: string) => {
      if (!activeSession || isLoading) return;

      const optimisticUser: Message = {
        id: Date.now(),
        sessionId: activeSession.id,
        role: 'user',
        content,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, optimisticUser]);
      setIsLoading(true);
      setError(null);

      try {
        const { reply, title } = await sendMessage(activeSession.id, content);
        
        if (title) {
          setSessions((prev) => prev.map((s) => s.id === activeSession.id ? { ...s, title } : s));
          setActiveSession((prev) => prev ? { ...prev, title } : null);
        }

        const assistantMsg: Message = {
          id: Date.now() + 1,
          sessionId: activeSession.id,
          role: 'assistant',
          content: reply,
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } catch {
        setMessages((prev) => prev.filter((m) => m.id !== optimisticUser.id));
        setError('Morfeo no pudo responder. Inténtalo de nuevo.');
        toast.error('Fallo en la conexión onírica', { description: 'No pudimos contactar a Morfeo. Por favor, reintenta.' });
      } finally {
        setIsLoading(false);
      }
    },
    [activeSession, isLoading],
  );

  return {
    sessions,
    activeSession,
    messages,
    isLoading,
    error,
    loadSession,
    startNewSession,
    submitMessage,
    renameSession,
    deleteSession,
  };
}
