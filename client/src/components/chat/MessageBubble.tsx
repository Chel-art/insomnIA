import type { Message } from '../../types/chat';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '1rem',
      }}
    >
      {!isUser && (
        <div
          style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            background: 'var(--color-accent-purple)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            color: '#fff',
            flexShrink: 0,
            marginRight: '0.625rem',
            marginTop: '0.25rem',
            fontFamily: 'var(--font-display)',
          }}
        >
          M
        </div>
      )}
      <div
        style={{
          maxWidth: '72%',
          padding: '0.75rem 1rem',
          borderRadius: isUser ? '1.25rem 1.25rem 0.25rem 1.25rem' : '1.25rem 1.25rem 1.25rem 0.25rem',
          background: isUser
            ? 'var(--color-accent-purple)'
            : 'rgba(255,255,255,0.05)',
          border: isUser ? 'none' : '1px solid rgba(255,255,255,0.08)',
          color: isUser ? '#fff' : 'var(--color-text-primary)',
          fontSize: '0.9375rem',
          lineHeight: 1.65,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {message.content}
      </div>
    </div>
  );
}
