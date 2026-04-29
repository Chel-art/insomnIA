import { useEffect, useState } from 'react';
import { getDreamHistory } from '@/services/chatApi';

interface DreamSummary {
  id: number;
  sessionId: number;
  symbols: string[];
  emotions: string[];
  themes: string[];
  createdAt: string;
  session?: {
    title: string;
  };
}

export function DreamHistory() {
  const [history, setHistory] = useState<DreamSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDreamHistory()
      .then(setHistory)
      .catch((err) => console.error('Error loading history:', err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div className="p-8 text-center text-accent-purple animate-pulse">Cargando el archivo de tus sueños...</div>;
  }

  if (history.length === 0) {
    return (
      <div className="p-8 text-center opacity-70">
        <p className="font-display text-xl italic text-accent-purple mb-2">Aún no hay registros en la memoria</p>
        <p className="text-sm text-text-secondary">Comparte tus sueños con Morfeo para que pueda analizar sus patrones.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 overflow-y-auto h-full">
      <h2 className="font-display text-2xl font-semibold mb-4 text-gold-shimmer">Memoria Onírica</h2>
      {history.map((summary) => (
        <div key={summary.id} className="glass-card p-5 rounded-xl border border-white/5 bg-black/20">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
            <h3 className="font-display font-medium text-lg">{summary.session?.title || 'Sesión'}</h3>
            <span className="text-xs text-text-secondary opacity-70">
              {new Date(summary.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          <div className="space-y-4">
            {summary.symbols.length > 0 && (
              <div>
                <h4 className="text-xs uppercase tracking-wider text-accent-purple mb-2">Símbolos</h4>
                <div className="flex flex-wrap gap-2">
                  {summary.symbols.map((symbol, i) => (
                    <span key={i} className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-text-secondary">
                      {symbol}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {summary.emotions.length > 0 && (
              <div>
                <h4 className="text-xs uppercase tracking-wider text-gold-shimmer/80 mb-2">Emociones</h4>
                <div className="flex flex-wrap gap-2">
                  {summary.emotions.map((emotion, i) => (
                    <span key={i} className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-text-secondary">
                      {emotion}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {summary.themes.length > 0 && (
              <div>
                <h4 className="text-xs uppercase tracking-wider opacity-60 mb-2">Temas Recurrentes</h4>
                <div className="flex flex-wrap gap-2">
                  {summary.themes.map((theme, i) => (
                    <span key={i} className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-text-secondary">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
