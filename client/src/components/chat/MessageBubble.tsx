import type { Message } from '../../types/chat';
import ReactMarkdown from 'react-markdown';

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
          maxWidth: '85%',
          padding: '0.75rem 1.25rem',
          borderRadius: isUser ? '1.25rem 1.25rem 0.25rem 1.25rem' : '1.25rem 1.25rem 1.25rem 0.25rem',
          background: isUser
            ? 'var(--color-accent-purple)'
            : 'rgba(255,255,255,0.05)',
          border: isUser ? 'none' : '1px solid rgba(255,255,255,0.08)',
          color: isUser ? '#fff' : 'var(--color-text-primary)',
          fontSize: '0.9375rem',
          lineHeight: 1.65,
          whiteSpace: isUser ? 'pre-wrap' : 'normal',
          wordBreak: 'break-word',
        }}
      >
        {isUser ? (
          message.content
        ) : (
          <ReactMarkdown
            components={{
              h3: ({ node, ...props }) => <h3 style={{ fontSize: '1.1rem', color: 'var(--color-accent-purple)', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: 600, fontFamily: 'var(--font-display)' }} {...props} />,
              p: ({ node, ...props }) => <p style={{ marginBottom: '0.75rem' }} {...props} />,
              ul: ({ node, ...props }) => <ul style={{ paddingLeft: '1.5rem', marginBottom: '0.75rem', listStyleType: 'disc', color: 'rgba(255,255,255,0.8)' }} {...props} />,
              ol: ({ node, ...props }) => <ol style={{ paddingLeft: '1.5rem', marginBottom: '0.75rem', listStyleType: 'decimal', color: 'rgba(255,255,255,0.8)' }} {...props} />,
              li: ({ node, ...props }) => <li style={{ marginBottom: '0.375rem' }} {...props} />,
              strong: ({ node, ...props }) => <strong style={{ color: 'var(--color-gold-shimmer)', fontWeight: 600 }} {...props} />
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}
