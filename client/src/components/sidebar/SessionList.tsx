import type { Session } from '../../types/chat';

interface SessionListProps {
  sessions: Session[];
  activeSession: Session | null;
  onSelect: (session: Session) => void;
  onNew: () => void;
  userEmail: string | undefined;
  onLogout: () => void;
  onShowHistory: () => void;
  onRename: (sessionId: number, title: string) => void;
  onDelete: (sessionId: number) => void;
}

export function SessionList({
  sessions,
  activeSession,
  onSelect,
  onNew,
  userEmail,
  onLogout,
  onShowHistory,
  onRename,
  onDelete,
}: SessionListProps) {
  const handleRename = (e: React.MouseEvent, session: Session) => {
    e.stopPropagation();
    const newTitle = prompt('Nuevo título para la sesión:', session.title);
    if (newTitle && newTitle.trim() && newTitle !== session.title) {
      onRename(session.id, newTitle.trim());
    }
  };

  const handleDelete = (e: React.MouseEvent, sessionId: number) => {
    e.stopPropagation();
    onDelete(sessionId);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1.25rem', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            color: 'var(--color-accent-purple)',
            fontStyle: 'italic',
          }}
        >
          Morfeo
        </p>
        <button
          type="button"
          onClick={onNew}
          title="Nueva sesión"
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'rgba(124,106,247,0.2)',
            border: '1px solid rgba(124,106,247,0.4)',
            color: 'var(--color-accent-purple)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1rem',
            lineHeight: 1,
          }}
        >
          +
        </button>
      </div>

      <button 
        type="button" 
        onClick={onShowHistory}
        className="w-full text-left py-2 px-3 rounded-[0.625rem] border border-white/10 text-[0.8125rem] text-gold-shimmer/90 hover:bg-white/5 transition-colors"
      >
        ✨ Memoria Onírica
      </button>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
        {sessions.length === 0 && (
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
            Sin sesiones aún
          </p>
        )}
        {sessions.map((session) => {
          const isActive = activeSession?.id === session.id;
          return (
            <div
              key={session.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.25rem 0',
              }}
            >
              <button
                type="button"
                onClick={() => onSelect(session)}
                style={{
                  textAlign: 'left',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.625rem',
                  background: isActive ? 'rgba(124,106,247,0.2)' : 'transparent',
                  border: isActive ? '1px solid rgba(124,106,247,0.35)' : '1px solid transparent',
                  color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                  flex: 1,
                  transition: 'all 0.15s',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {session.title}
              </button>
              {isActive && (
                <div style={{ display: 'flex', gap: '0.125rem' }}>
                  <button
                    type="button"
                    onClick={(e) => handleRename(e, session)}
                    title="Renombrar"
                    style={{
                      padding: '0.4rem',
                      background: 'transparent',
                      border: 'none',
                      color: 'rgba(255,255,255,0.3)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent-purple)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(e, session.id)}
                    title="Eliminar sesión"
                    style={{
                      padding: '0.4rem',
                      background: 'transparent',
                      border: 'none',
                      color: 'rgba(255,255,255,0.3)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#f87171')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {userEmail}
        </p>
        <button className="btn-ghost" type="button" onClick={onLogout} style={{ fontSize: '0.8125rem' }}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
