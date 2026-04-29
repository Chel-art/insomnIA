import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SessionList } from '@/components/sidebar/SessionList';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { ChatInput } from '@/components/chat/ChatInput';
import { DreamHistory } from '@/components/history/DreamHistory';
import { useAuth } from '@/hooks/useAuth';
import { useChat } from '@/hooks/useChat';

export function AppPage() {
  const { user, logout } = useAuth();
  const {
    sessions,
    activeSession,
    messages,
    isLoading,
    error,
    loadSession,
    startNewSession,
    submitMessage,
  } = useChat();

  const [view, setView] = useState<'chat' | 'history'>('chat');

  const handleSelectSession = (session: any) => {
    loadSession(session);
    setView('chat');
  };

  const handleNewSession = () => {
    startNewSession();
    setView('chat');
  };

  return (
    <AppLayout
      sidebar={
        <SessionList
          sessions={sessions}
          activeSession={activeSession}
          onSelect={handleSelectSession}
          onNew={handleNewSession}
          userEmail={user?.email}
          onLogout={logout}
          onShowHistory={() => setView('history')}
        />
      }
    >
      <div
        className="glass-card"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '1rem',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {error && (
          <div
            style={{
              padding: '0.5rem 1.25rem',
              background: 'rgba(220,50,50,0.15)',
              borderBottom: '1px solid rgba(220,50,50,0.2)',
              fontSize: '0.8125rem',
              color: '#f87171',
            }}
          >
            {error}
          </div>
        )}

        {view === 'history' ? (
          <DreamHistory />
        ) : !activeSession ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '1rem',
              opacity: 0.5,
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                color: 'var(--color-accent-purple)',
                fontStyle: 'italic',
              }}
            >
              Inicia una sesión
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              Pulsa + en el sidebar para comenzar
            </p>
          </div>
        ) : (
          <>
            <ChatWindow messages={messages} isLoading={isLoading} />
            <ChatInput onSubmit={submitMessage} isLoading={isLoading} />
          </>
        )}
      </div>
    </AppLayout>
  );
}
