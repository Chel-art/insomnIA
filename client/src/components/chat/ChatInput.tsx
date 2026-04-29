import { useState, useRef, type KeyboardEvent } from 'react';

interface ChatInputProps {
  onSubmit: (content: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSubmit(trimmed);
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  return (
    <div
      style={{
        padding: '0.75rem 1.25rem 1.25rem',
        display: 'flex',
        gap: '0.625rem',
        alignItems: 'flex-end',
      }}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Describe tu sueño a Morfeo... (Enter para enviar)"
        disabled={isLoading}
        rows={1}
        style={{
          flex: 1,
          resize: 'none',
          padding: '0.75rem 1rem',
          borderRadius: '1rem',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'var(--color-text-primary)',
          fontSize: '0.9375rem',
          lineHeight: 1.5,
          fontFamily: 'var(--font-body)',
          outline: 'none',
          transition: 'border-color 0.2s',
          minHeight: '44px',
          maxHeight: '160px',
          overflowY: 'auto',
        }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent-purple)')}
        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!value.trim() || isLoading}
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: value.trim() && !isLoading ? 'var(--color-accent-purple)' : 'rgba(255,255,255,0.08)',
          border: 'none',
          cursor: value.trim() && !isLoading ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
          flexShrink: 0,
        }}
        aria-label="Enviar mensaje"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fff' }}>
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </div>
  );
}
