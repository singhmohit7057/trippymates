import React, { type CSSProperties, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!password) e.password = 'Password is required';
    else if (password.length < 8) e.password = 'Password must be at least 8 characters';
    if (!confirmPassword) e.confirm = 'Please confirm your password';
    else if (password !== confirmPassword) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setDone(true);
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

  const fieldWrapper: CSSProperties = { marginBottom: '16px' };

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
    padding: '11px 42px 11px 38px',
    border: '1.5px solid #E5E7EB',
    borderRadius: '10px',
    fontSize: '14px',
    color: '#111827',
    outline: 'none',
    background: '#fff',
    boxSizing: 'border-box',
  };

  const inputErr: CSSProperties = { ...inputBase, borderColor: '#EF4444' };
  const errorText: CSSProperties = { fontSize: '12px', color: '#EF4444', marginTop: '4px' };

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
    marginTop: '8px',
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
          {!done ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <img src="/logo.png" alt="Trippy Mates" style={{ height: '52px', width: 'auto', display: 'block', objectFit: 'contain', margin: '0 auto 16px' }} />
              <h2 style={heading}>Reset password</h2>
              <p style={subtitle}>Choose a new secure password for your account.</p>

              <form onSubmit={handleSubmit} noValidate>
                <div style={fieldWrapper}>
                  <label style={labelStyle} htmlFor="password">New Password</label>
                  <div style={inputRow}>
                    <span style={inputIcon}><Lock size={16} /></span>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      style={errors.password ? inputErr : inputBase}
                    />
                    <button type="button" style={eyeBtn} onClick={() => setShowPassword((v) => !v)}>
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                  {errors.password && <p style={errorText}>{errors.password}</p>}
                </div>

                <div style={fieldWrapper}>
                  <label style={labelStyle} htmlFor="confirm">Confirm Password</label>
                  <div style={inputRow}>
                    <span style={inputIcon}><Lock size={16} /></span>
                    <input
                      id="confirm"
                      type={showConfirm ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      style={errors.confirm ? inputErr : inputBase}
                    />
                    <button type="button" style={eyeBtn} onClick={() => setShowConfirm((v) => !v)}>
                      {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                  {errors.confirm && <p style={errorText}>{errors.confirm}</p>}
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
                      Resetting…
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </button>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </form>
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
              <h2 style={heading}>Password reset!</h2>
              <p style={subtitle}>
                Your password has been updated successfully. You can now sign in with your new password.
              </p>
              <Link
                to="/login"
                style={{
                  display: 'inline-block',
                  padding: '12px 32px',
                  background: '#007AFF',
                  color: '#fff',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '14px',
                  textDecoration: 'none',
                }}
              >
                Sign In
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
