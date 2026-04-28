import { AppLayout } from '@/components/layout/AppLayout';
import { useAuth } from '@/hooks/useAuth';

function SidebarPlaceholder() {
  const { user, logout } = useAuth();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '1.25rem',
        gap: '1rem',
      }}
    >
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
      <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginTop: 'auto' }}>
        {user?.email}
      </p>
      <button className="btn-ghost" type="button" onClick={logout} style={{ fontSize: '0.875rem' }}>
        Cerrar sesión
      </button>
    </div>
  );
}

function ChatPlaceholder() {
  return (
    <div
      className="glass-card"
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '1rem',
        height: '100%',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.25rem',
          color: 'var(--color-text-secondary)',
          fontStyle: 'italic',
        }}
      >
        El chat con Morfeo llegará en la siguiente fase...
      </p>
    </div>
  );
}

export function AppPage() {
  return (
    <AppLayout sidebar={<SidebarPlaceholder />}>
      <ChatPlaceholder />
    </AppLayout>
  );
}
