import React, { type CSSProperties, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!email) { setError('Email is required'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Enter a valid email address'); return; }
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSent(true);
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

  const heading: CSSProperties = {
    fontSize: '24px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 8px',
    textAlign: 'center',
  };

  const subtitle: CSSProperties = {
    fontSize: '14px',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: '28px',
    lineHeight: '1.6',
  };

  const labelStyle: CSSProperties = {
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
    marginBottom: '6px',
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
    border: `1.5px solid ${error ? '#EF4444' : '#E5E7EB'}`,
    borderRadius: '10px',
    fontSize: '14px',
    color: '#111827',
    outline: 'none',
    background: '#fff',
    boxSizing: 'border-box',
  };

  const errorText: CSSProperties = { fontSize: '12px', color: '#EF4444', marginBottom: '16px' };

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
    marginTop: '4px',
    marginBottom: '24px',
  };

  const backLink: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontSize: '13px',
    color: '#6B7280',
    textDecoration: 'none',
    fontWeight: 500,
  };

  const successCircle: CSSProperties = {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: '#EBF5FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
  };

  return (
    <div style={page}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={card}
      >
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <img src="/logo.png" alt="Trippy Mates" style={{ height: '52px', width: 'auto', display: 'block', objectFit: 'contain', margin: '0 auto 16px' }} />
              <h2 style={heading}>Forgot password?</h2>
              <p style={subtitle}>
                Enter your email and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <label style={labelStyle} htmlFor="email">Email address</label>
                <div style={inputRow}>
                  <span style={inputIcon}><Mail size={16} /></span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder="you@example.com"
                    style={inputBase}
                  />
                </div>
                {error && <p style={errorText}>{error}</p>}

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
                      Sending…
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </form>

              <Link to="/login" style={backLink}>
                <ArrowLeft size={14} />
                Back to Sign In
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={successCircle}>
                <CheckCircle size={32} color="#007AFF" />
              </div>
              <h2 style={heading}>Check your inbox</h2>
              <p style={subtitle}>
                We sent a password reset link to <strong>{email}</strong>. It may take a minute to arrive.
              </p>
              <Link
                to="/login"
                style={{
                  display: 'inline-block',
                  padding: '11px 28px',
                  background: '#007AFF',
                  color: '#fff',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '14px',
                  textDecoration: 'none',
                  marginBottom: '20px',
                }}
              >
                Back to Sign In
              </Link>
              <p style={{ fontSize: '13px', color: '#9CA3AF' }}>
                Didn't receive it?{' '}
                <button
                  type="button"
                  onClick={() => { setSent(false); setEmail(''); }}
                  style={{ background: 'none', border: 'none', color: '#007AFF', cursor: 'pointer', fontWeight: 600, fontSize: '13px', padding: 0 }}
                >
                  Try again
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
