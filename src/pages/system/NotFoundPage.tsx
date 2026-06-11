import type { CSSProperties } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const page: CSSProperties = {
    minHeight: '100vh',
    background: '#F8FAFC',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    padding: '24px',
    textAlign: 'center',
  };

  const inner: CSSProperties = {
    maxWidth: '480px',
    width: '100%',
  };

  const code: CSSProperties = {
    fontSize: '120px',
    fontWeight: 800,
    color: '#007AFF',
    lineHeight: 1,
    margin: '0 0 8px',
    letterSpacing: '-4px',
  };

  const heading: CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 12px',
  };

  const sub: CSSProperties = {
    fontSize: '16px',
    color: '#6B7280',
    margin: '0 0 36px',
    lineHeight: '1.6',
  };

  const emoji: CSSProperties = {
    fontSize: '80px',
    lineHeight: 1,
    margin: '0 0 28px',
    display: 'block',
  };

  const btnRow: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  };

  const btnPrimary: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 28px',
    background: '#007AFF',
    color: '#fff',
    borderRadius: '9999px',
    fontWeight: 700,
    fontSize: '14px',
    textDecoration: 'none',
  };

  const btnSecondary: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '11px 24px',
    background: '#fff',
    color: '#374151',
    borderRadius: '9999px',
    fontWeight: 600,
    fontSize: '14px',
    border: '1.5px solid #E5E7EB',
    cursor: 'pointer',
    fontFamily: 'inherit',
  };

  return (
    <div style={page}>
      <motion.div
        style={inner}
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.span
          style={emoji}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200 }}
        >
          🗺️
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <p style={code}>404</p>
          <h2 style={heading}>Page Not Found</h2>
          <p style={sub}>The page you're looking for doesn't exist or has been moved. Let's get you back on track.</p>
        </motion.div>

        <motion.div
          style={btnRow}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Link to="/" style={btnPrimary}>
            <Home size={16} />
            Go Home
          </Link>
          <button style={btnSecondary} onClick={() => navigate(-1)}>
            <ArrowLeft size={16} />
            Go Back
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
