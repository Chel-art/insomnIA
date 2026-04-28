import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DottedSurface } from '@/components/ui/DottedSurface';
import { useAuth } from '@/hooks/useAuth';
import type { AxiosError } from 'axios';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login({ email, password });
      navigate('/app');
    } catch (err) {
      const axiosError = err as AxiosError<{ error: string }>;
      setError(axiosError.response?.data?.error ?? 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <DottedSurface />

      <div className="glass-card animate-fade-slide-in" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '0.375rem',
            textAlign: 'center',
          }}
        >
          Bienvenido de vuelta
        </h1>
        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: '0.9rem',
            textAlign: 'center',
            marginBottom: '2rem',
            fontStyle: 'italic',
          }}
        >
          Morfeo recuerda tus sueños
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label htmlFor="email" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              className="input-dream"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label htmlFor="password" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="input-dream"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p
              style={{
                color: '#f07070',
                fontSize: '0.875rem',
                textAlign: 'center',
                padding: '0.5rem',
                background: 'rgba(240, 112, 112, 0.08)',
                borderRadius: '0.375rem',
                border: '1px solid rgba(240, 112, 112, 0.2)',
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading}
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            {isLoading ? 'Entrando...' : 'Iniciar sesión'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          ¿Primera vez aquí?{' '}
          <Link
            to="/register"
            style={{ color: 'var(--color-accent-purple)', textDecoration: 'none' }}
          >
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}
