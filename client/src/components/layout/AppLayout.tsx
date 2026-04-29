/**
 * AppLayout.tsx
 *
 * Responsabilidad (Vista — capa de presentación):
 * Shell de la aplicación autenticada. Organiza la estructura visual principal:
 * fondo animado, sidebar lateral y área de contenido central.
 * No contiene lógica de negocio ni acceso a datos.
 */
import { useState, type ReactNode } from 'react';
import { DottedSurface } from '@/components/ui/DottedSurface';

interface AppLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function AppLayout({ sidebar, children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative flex flex-col md:flex-row h-full overflow-hidden">
      {/* Fondo animado Three.js — siempre detrás */}
      <DottedSurface />

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-3 border-b border-white/10 bg-black/40 backdrop-blur-md z-20 shrink-0">
        <span className="font-display text-xl text-accent-purple italic flex items-center gap-2">
          🌙 InsomnIA
        </span>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-gold-shimmer/90 focus:outline-none bg-white/5 rounded-md border border-white/10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar lateral */}
      <aside
        className={`glass-card fixed md:relative inset-y-0 left-0 z-40 m-3 flex w-[280px] shrink-0 flex-col rounded-2xl transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-[120%] md:translate-x-0'
        }`}
        aria-label="Historial de sesiones"
      >
        <div className="md:hidden absolute top-4 right-4 z-50">
           <button onClick={() => setIsSidebarOpen(false)} className="text-white/50 hover:text-white p-1">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
             </svg>
           </button>
        </div>

        <div className="h-full flex flex-col" onClick={(e) => {
          // Cierra el sidebar en móvil al hacer click en un botón
          if ((e.target as HTMLElement).closest('button')) {
            setIsSidebarOpen(false);
          }
        }}>
          {sidebar}
        </div>
      </aside>

      {/* Área principal de contenido */}
      <main className="flex flex-1 flex-col overflow-hidden p-3 md:pl-0">
        {children}
      </main>
    </div>
  );
}
