import { createMessage, getSessionMessages } from '../dao/messageDao.js';
import { upsertDreamSummary, getUserDreamSummaries } from '../dao/dreamSummaryDao.js';
import { callMorfeo, extractDreamSummary } from './aiService.js';

export async function processUserMessage(sessionId, userContent, userId) {
  const history = await getSessionMessages(sessionId);

  const pastSummaries = await getUserDreamSummaries(userId);
  const pastContext = pastSummaries
     .filter(s => s.sessionId !== sessionId)
     .map(s => `Sueño del ${new Date(s.createdAt).toLocaleDateString()}:\n- Símbolos: ${s.symbols.join(', ')}\n- Emociones: ${s.emotions.join(', ')}\n- Temas: ${s.themes.join(', ')}`)
     .join('\n\n');

  const conversationHistory = [];
  
  if (pastContext) {
    conversationHistory.push({
      role: 'system',
      content: `Aquí tienes un resumen de los sueños pasados del usuario:\n${pastContext}\nÚsalo para encontrar patrones recurrentes si es relevante, pero céntrate en el sueño actual.`
    });
  }

  history.forEach((msg) => {
    conversationHistory.push({
      role: msg.role,
      content: msg.content,
    });
  });
  conversationHistory.push({ role: 'user', content: userContent });

  const assistantContent = await callMorfeo(conversationHistory);

  await createMessage(sessionId, 'user', userContent);
  await createMessage(sessionId, 'assistant', assistantContent);

  // Generar y actualizar el resumen de forma asíncrona para no bloquear la respuesta
  conversationHistory.push({ role: 'assistant', content: assistantContent });
  extractDreamSummary(conversationHistory)
    .then((summary) => {
      if (summary.symbols || summary.emotions || summary.themes) {
        return upsertDreamSummary(
          sessionId,
          summary.symbols || [],
          summary.emotions || [],
          summary.themes || []
        );
      }
    })
    .catch((err) => console.error('Error al guardar resumen del sueño:', err));

  return assistantContent;
}
