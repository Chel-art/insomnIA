import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { createSession, getUserSessions, getSessionById } from '../dao/sessionDao.js';
import { getSessionMessages } from '../dao/messageDao.js';
import { processUserMessage } from '../services/chatService.js';

const router = Router();

router.use(requireAuth);

router.post('/sessions', async (req, res) => {
  try {
    const session = await createSession(req.userId);
    res.status(201).json(session);
  } catch {
    res.status(500).json({ error: 'Error al crear la sesión' });
  }
});

router.get('/sessions', async (req, res) => {
  try {
    const sessions = await getUserSessions(req.userId);
    res.json(sessions);
  } catch {
    res.status(500).json({ error: 'Error al obtener las sesiones' });
  }
});

router.get('/sessions/:id/messages', async (req, res) => {
  const sessionId = parseInt(req.params.id);

  const session = await getSessionById(sessionId, req.userId);
  if (!session) return res.status(404).json({ error: 'Sesión no encontrada' });

  try {
    const messages = await getSessionMessages(sessionId);
    res.json(messages);
  } catch {
    res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
});

router.post('/chat', async (req, res) => {
  const { sessionId, content } = req.body;

  if (!sessionId || !content?.trim()) {
    return res.status(400).json({ error: 'sessionId y content son requeridos' });
  }

  const session = await getSessionById(parseInt(sessionId), req.userId);
  if (!session) return res.status(404).json({ error: 'Sesión no encontrada' });

  try {
    const reply = await processUserMessage(parseInt(sessionId), content.trim());
    res.json({ reply });
  } catch (err) {
    console.error('Error en /api/chat:', err);
    res.status(500).json({ error: 'Error al procesar el mensaje' });
  }
});

export default router;
