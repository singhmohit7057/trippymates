import React, { type CSSProperties, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fullName.trim()) e.fullName = 'Full name is required';
    if (!email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 8) e.password = 'Password must be at least 8 characters';
    if (!confirmPassword) e.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match';
    if (!agreeTerms) e.terms = 'You must agree to the Terms & Conditions';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    navigate('/login');
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

  const fieldWrapper: CSSProperties = { marginBottom: '16px' };

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

  const checkRow: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    marginBottom: '20px',
    marginTop: '4px',
  };

  const checkBox: CSSProperties = {
    width: '17px',
    height: '17px',
    marginTop: '2px',
    cursor: 'pointer',
    flexShrink: 0,
    accentColor: '#007AFF',
  };

  const checkLabel: CSSProperties = {
    fontSize: '13px',
    color: '#374151',
    lineHeight: '1.5',
  };

  const linkInline: CSSProperties = { color: '#007AFF', fontWeight: 600, textDecoration: 'none' };

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
    marginBottom: '20px',
  };

  const bottomText: CSSProperties = { textAlign: 'center', fontSize: '13px', color: '#6B7280' };
  const linkBlue: CSSProperties = { color: '#007AFF', textDecoration: 'none', fontWeight: 600 };

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

        <h2 style={heading}>Create account</h2>
        <p style={subtitle}>Start your journey with Trippy Mates</p>

        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div style={fieldWrapper}>
            <label style={label} htmlFor="fullName">Full Name</label>
            <div style={inputRow}>
              <span style={inputIcon}><User size={16} /></span>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                style={errors.fullName ? inputErr : inputBase}
              />
            </div>
            {errors.fullName && <p style={errorText}>{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div style={fieldWrapper}>
            <label style={label} htmlFor="email">Email</label>
            <div style={inputRow}>
              <span style={inputIcon}><Mail size={16} /></span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={errors.email ? inputErr : inputBase}
              />
            </div>
            {errors.email && <p style={errorText}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div style={fieldWrapper}>
            <label style={label} htmlFor="password">Password</label>
            <div style={inputRow}>
              <span style={inputIcon}><Lock size={16} /></span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                style={{ ...(errors.password ? inputErr : inputBase), paddingRight: '42px' }}
              />
              <button type="button" style={eyeBtn} onClick={() => setShowPassword((v) => !v)}>
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {errors.password && <p style={errorText}>{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div style={fieldWrapper}>
            <label style={label} htmlFor="confirmPassword">Confirm Password</label>
            <div style={inputRow}>
              <span style={inputIcon}><Lock size={16} /></span>
              <input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                style={{ ...(errors.confirmPassword ? inputErr : inputBase), paddingRight: '42px' }}
              />
              <button type="button" style={eyeBtn} onClick={() => setShowConfirm((v) => !v)}>
                {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {errors.confirmPassword && <p style={errorText}>{errors.confirmPassword}</p>}
          </div>

          {/* Terms */}
          <div style={checkRow}>
            <input
              id="terms"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              style={checkBox}
            />
            <label htmlFor="terms" style={checkLabel}>
              I agree to the{' '}
              <Link to="/terms-and-conditions" style={linkInline}>Terms & Conditions</Link>
              {' '}and{' '}
              <Link to="/privacy-policy" style={linkInline}>Privacy Policy</Link>
            </label>
          </div>
          {errors.terms && <p style={{ ...errorText, marginTop: '-14px', marginBottom: '14px' }}>{errors.terms}</p>}

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
                Creating account…
              </>
            ) : (
              'Create Account'
            )}
          </button>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </form>

        <p style={bottomText}>
          Already have an account?{' '}
          <Link to="/login" style={linkBlue}>Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
