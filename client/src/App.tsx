/**
 * App.tsx — Raíz de la aplicación InsomnIA
 *
 * Responsabilidad (Vista):
 * En esta fase muestra la landing page onírica de presentación.
 * En fases posteriores contendrá el router con las rutas protegidas.
 * No contiene lógica de negocio ni acceso a datos.
 */
import { DottedSurface } from '@/components/ui/DottedSurface';
import logoSrc from '@/assets/logo.png';

function App() {
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
      {/* Fondo animado Three.js */}
      <DottedSurface />

      {/* Contenido de landing */}
      <div className="glass-card" style={{ maxWidth: '520px', padding: '3rem 2.5rem' }}>
        {/* Logo de marca — sustituye al icono emoji y al título de texto */}
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

        {/* Subtítulo con nombre Morfeo */}
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

        {/* Descripción */}
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

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" type="button" id="cta-comenzar">
            Comenzar
          </button>
          <button className="btn-ghost" type="button" id="cta-iniciar-sesion">
            Iniciar sesión
          </button>
        </div>
      </div>

      {/* Footer onírico */}
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

export default App;
