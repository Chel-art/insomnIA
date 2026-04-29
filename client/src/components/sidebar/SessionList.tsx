import type { Session } from '../../types/chat';

interface SessionListProps {
  sessions: Session[];
  activeSession: Session | null;
  onSelect: (session: Session) => void;
  onNew: () => void;
  userEmail: string | undefined;
  onLogout: () => void;
  onShowHistory: () => void;
}

export function SessionList({
  sessions,
  activeSession,
  onSelect,
  onNew,
  userEmail,
  onLogout,
  onShowHistory,
}: SessionListProps) {
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
            <button
              key={session.id}
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
                width: '100%',
                transition: 'all 0.15s',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {session.title}
            </button>
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
