import { useState, useRef, useCallback, type KeyboardEvent } from 'react';
import { useVoiceDictation } from '../../hooks/useVoiceDictation';

interface ChatInputProps {
  onSubmit: (content: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleVoiceResult = useCallback((text: string) => {
    setValue((prev) => {
      const spacer = prev && !prev.endsWith(' ') ? ' ' : '';
      return prev + spacer + text;
    });
  }, []);

  const { isListening, isSupported, toggleListening } = useVoiceDictation({
    onResult: handleVoiceResult,
  });

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
        placeholder={isListening ? "Escuchando..." : "Describe tu sueño a Morfeo... (Enter para enviar)"}
        disabled={isLoading}
        rows={1}
        style={{
          flex: 1,
          resize: 'none',
          padding: '0.75rem 1rem',
          borderRadius: '1rem',
          background: 'rgba(255,255,255,0.05)',
          border: isListening ? '1px solid var(--color-accent-purple)' : '1px solid rgba(255,255,255,0.12)',
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
        onFocus={(e) => (!isListening && (e.target.style.borderColor = 'var(--color-accent-purple)'))}
        onBlur={(e) => (!isListening && (e.target.style.borderColor = 'rgba(255,255,255,0.12)'))}
      />

      {isSupported && (
        <button
          type="button"
          onClick={toggleListening}
          disabled={isLoading}
          title="Dictar por voz"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: isListening ? 'rgba(220, 50, 50, 0.2)' : 'rgba(255,255,255,0.08)',
            border: isListening ? '1px solid rgba(220, 50, 50, 0.5)' : 'none',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
            flexShrink: 0,
            color: isListening ? '#f87171' : 'var(--color-text-secondary)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="22" />
          </svg>
        </button>
      )}

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
