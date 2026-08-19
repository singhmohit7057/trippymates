import React, { type CSSProperties, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn, isAdmin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: { email?: string; password?: string } = {};
    if (!email) e.email = 'Email or phone number is required';
    else if (!/\S+@\S+\.\S+/.test(email) && !/^\d{10}$/.test(email)) e.email = 'Enter a valid email or 10-digit phone number';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setErrors({ form: error });
      return;
    }
    navigate(isAdmin ? '/admin' : '/');
  };

  const page: CSSProperties = {
    minHeight: '100vh',
    background: '#F8FAFC',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    padding: '24px',
  };

  const card: CSSProperties = {
    background: '#FFFFFF',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '40px',
    width: '100%',
    maxWidth: '420px',
  };

  const logoRow: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '28px',
    justifyContent: 'center',
  };

  const heading: CSSProperties = {
    fontSize: '24px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 4px',
    textAlign: 'center',
  };

  const subtitle: CSSProperties = {
    fontSize: '14px',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: '28px',
  };

  const fieldWrapper: CSSProperties = {
    marginBottom: '16px',
  };

  const label: CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '6px',
  };

  const inputRow: CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const inputIcon: CSSProperties = {
    position: 'absolute',
    left: '12px',
    color: '#9CA3AF',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
  };

  const inputBase: CSSProperties = {
    width: '100%',
    padding: '11px 12px 11px 38px',
    border: '1.5px solid #E5E7EB',
    borderRadius: '10px',
    fontSize: '14px',
    color: '#111827',
    outline: 'none',
    background: '#fff',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s',
  };

  const inputError: CSSProperties = {
    ...inputBase,
    borderColor: '#EF4444',
  };

  const errorText: CSSProperties = {
    fontSize: '12px',
    color: '#EF4444',
    marginTop: '4px',
  };

  const forgotRow: CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '-4px',
    marginBottom: '20px',
  };

  const forgotLink: CSSProperties = {
    fontSize: '13px',
    color: '#007AFF',
    textDecoration: 'none',
    fontWeight: 500,
  };

  const btnPrimary: CSSProperties = {
    width: '100%',
    padding: '13px',
    background: loading ? '#3395FF' : '#007AFF',
    color: '#fff',
    border: 'none',
    borderRadius: '9999px',
    fontSize: '15px',
    fontWeight: 700,
    cursor: loading ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'background 0.15s',
    marginBottom: '20px',
  };


  const bottomText: CSSProperties = {
    textAlign: 'center',
    fontSize: '13px',
    color: '#6B7280',
  };

  const linkBlue: CSSProperties = {
    color: '#007AFF',
    textDecoration: 'none',
    fontWeight: 600,
  };

  const eyeBtn: CSSProperties = {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#9CA3AF',
    display: 'flex',
    alignItems: 'center',
    padding: '0',
  };

  return (
    <div style={page}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={card}
      >
        <div style={logoRow}>
          <img src="/logo.png" alt="Trippy Mates" style={{ height: '52px', width: 'auto', display: 'block', objectFit: 'contain' }} />
        </div>

        <h2 style={heading}>Welcome back</h2>
        <p style={subtitle}>Sign in to your account</p>

        <form onSubmit={handleSubmit} noValidate>
          {errors.form && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#DC2626' }}>
              {errors.form}
            </div>
          )}
          <div style={fieldWrapper}>
            <label style={label} htmlFor="email">Email or Phone Number</label>
            <div style={inputRow}>
              <span style={inputIcon}><Mail size={16} /></span>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com or 9876543210"
                style={errors.email ? inputError : inputBase}
              />
            </div>
            {errors.email && <p style={errorText}>{errors.email}</p>}
          </div>

          <div style={fieldWrapper}>
            <label style={label} htmlFor="password">Password</label>
            <div style={inputRow}>
              <span style={inputIcon}><Lock size={16} /></span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ ...(errors.password ? inputError : inputBase), paddingRight: '42px' }}
              />
              <button type="button" style={eyeBtn} onClick={() => setShowPassword((v) => !v)}>
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {errors.password && <p style={errorText}>{errors.password}</p>}
          </div>

          <div style={forgotRow}>
            <Link to="/forgot-password" style={forgotLink}>Forgot password?</Link>
          </div>

          <button type="submit" style={btnPrimary} disabled={loading}>
            {loading ? (
              <>
                <span
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.4)',
                    borderTopColor: '#fff',
                    animation: 'spin 0.7s linear infinite',
                    display: 'inline-block',
                  }}
                />
                Signing in…
              </>
            ) : (
              'Sign In'
            )}
          </button>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </form>

        <p style={bottomText}>
          Don't have an account?{' '}
          <Link to="/register" style={linkBlue}>Register</Link>
        </p>
      </motion.div>
    </div>
  );
}
