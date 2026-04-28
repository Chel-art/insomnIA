import { useNavigate } from 'react-router-dom';
import { DottedSurface } from '@/components/ui/DottedSurface';
import logoSrc from '@/assets/logo.png';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <DottedSurface />

      <div className="glass-card" style={{ maxWidth: '520px', padding: '3rem 2.5rem' }}>
        <img
          src={logoSrc}
          alt="InsomnIA — El mundo de los sueños"
          style={{
            width: '100%',
            maxWidth: '380px',
            height: 'auto',
            marginBottom: '1.75rem',
            display: 'block',
            marginInline: 'auto',
          }}
        />

        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: '1.1rem',
            color: 'var(--color-accent-purple)',
            marginBottom: '1.5rem',
            letterSpacing: '0.05em',
          }}
        >
          Morfeo te escucha
        </p>

        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: '0.9375rem',
            lineHeight: 1.7,
            marginBottom: '2rem',
          }}
        >
          Describe tus sueños. Morfeo los analiza desde la psicología profunda
          y la filosofía existencial, con memoria de todas tus sesiones.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" type="button" onClick={() => navigate('/register')}>
            Comenzar
          </button>
          <button className="btn-ghost" type="button" onClick={() => navigate('/login')}>
            Iniciar sesión
          </button>
        </div>
      </div>

      <p
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          color: 'var(--color-text-secondary)',
          fontSize: '0.8125rem',
          opacity: 0.6,
        }}
      >
        "El sueño es el camino real hacia el inconsciente." — Freud
      </p>
    </div>
  );
}
