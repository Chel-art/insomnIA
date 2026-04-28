/**
 * AppLayout.tsx
 *
 * Responsabilidad (Vista — capa de presentación):
 * Shell de la aplicación autenticada. Organiza la estructura visual principal:
 * fondo animado, sidebar lateral y área de contenido central.
 * No contiene lógica de negocio ni acceso a datos.
 */
import type { ReactNode } from 'react';
import { DottedSurface } from '@/components/ui/DottedSurface';

interface AppLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function AppLayout({ sidebar, children }: AppLayoutProps) {
  return (
    <div className="relative flex h-full overflow-hidden">
      {/* Fondo animado Three.js — siempre detrás */}
      <DottedSurface />

      {/* Sidebar lateral */}
      <aside
        className="glass-card m-3 flex w-72 shrink-0 flex-col rounded-2xl"
        aria-label="Historial de sesiones"
      >
        {sidebar}
      </aside>

      {/* Área principal de contenido */}
      <main className="flex flex-1 flex-col overflow-hidden p-3 pl-0">
        {children}
      </main>
    </div>
  );
}
