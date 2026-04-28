'use client';

/**
 * ThemeProvider.tsx
 *
 * Responsabilidad (Vista — capa de presentación):
 * Envuelve la aplicación con el proveedor de temas de next-themes.
 * Siempre modo oscuro por defecto. No contiene lógica de negocio.
 *
 * Patrón aplicado: Facade sobre next-themes para aislar la dependencia
 * y facilitar su sustitución futura si fuera necesario.
 */
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      forcedTheme="dark"
    >
      {children}
    </NextThemesProvider>
  );
}
