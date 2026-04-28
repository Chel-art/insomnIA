/**
 * App.tsx — Raíz de la aplicación InsomnIA
 *
 * Responsabilidad (Vista):
 * En esta fase muestra la landing page onírica de presentación.
 * En fases posteriores contendrá el router con las rutas protegidas.
 * No contiene lógica de negocio ni acceso a datos.
 */
import { DottedSurface } from '@/components/ui/DottedSurface';

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
        {/* Icono luna */}
        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }} aria-hidden="true">
          🌙
        </div>

        {/* Título con fuente display */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            marginBottom: '0.5rem',
            lineHeight: 1.1,
          }}
        >
          Insom
          <span className="text-gold-shimmer">IA</span>
        </h1>

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
