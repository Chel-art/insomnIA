import { createMessage, getSessionMessages } from '../dao/messageDao.js';
import { callMorfeo } from './aiService.js';

export async function processUserMessage(sessionId, userContent) {
  const history = await getSessionMessages(sessionId);

  const conversationHistory = history.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));
  conversationHistory.push({ role: 'user', content: userContent });

  const assistantContent = await callMorfeo(conversationHistory);

  await createMessage(sessionId, 'user', userContent);
  await createMessage(sessionId, 'assistant', assistantContent);

  return assistantContent;
}
