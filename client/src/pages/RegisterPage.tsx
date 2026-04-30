import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { DottedSurface } from '../components/ui/DottedSurface';
import { useAuth } from '../hooks/useAuth';
import type { AxiosError } from 'axios';

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      toast.error('Error de validación', { description: 'Las contraseñas no coinciden.' });
      return;
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      toast.error('Contraseña insegura', { description: 'La contraseña debe tener al menos 8 caracteres.' });
      return;
    }

    setIsLoading(true);

    try {
      await register({ email, password });
      toast.success('Cuenta creada', { description: 'Bienvenido a InsomnIA. Morfeo te espera.' });
      navigate('/app');
    } catch (err) {
      const axiosError = err as AxiosError<{ error: string }>;
      const errorMsg = axiosError.response?.data?.error ?? 'Error al crear la cuenta';
      setError(errorMsg);
      toast.error('No se pudo crear la cuenta', { description: errorMsg });
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
          Comienza a soñar
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
          Morfeo guardará tus sueños
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
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label htmlFor="confirm-password" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              Confirmar contraseña
            </label>
            <input
              id="confirm-password"
              type="password"
              className="input-dream"
              placeholder="Repite tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
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
            {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          ¿Ya tienes cuenta?{' '}
          <Link
            to="/login"
            style={{ color: 'var(--color-accent-purple)', textDecoration: 'none' }}
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
