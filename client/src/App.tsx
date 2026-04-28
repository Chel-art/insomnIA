/**
 * App.tsx — Raíz de la aplicación InsomnIA
 *
 * Responsabilidad: punto de entrada de React.
 * Aquí irán el router y los providers globales (ThemeProvider, AuthProvider).
 * No contiene lógica de negocio ni acceso a datos.
 */
function App() {
  return (
    <div className="flex items-center justify-center h-full">
      <p style={{ color: 'var(--color-accent-purple)', fontFamily: 'sans-serif' }}>
        🌙 InsomnIA — Fase 0 completada
      </p>
    </div>
  );
}

export default App;
