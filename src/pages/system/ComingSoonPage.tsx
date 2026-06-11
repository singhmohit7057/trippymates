import { type CSSProperties, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, Home } from 'lucide-react';

function getTargetDate() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(target.getTime() - Date.now(), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function ComingSoonPage() {
  const [target] = useState<Date>(getTargetDate);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calcTimeLeft(target));
  const [email, setEmail] = useState('');
  const [notified, setNotified] = useState(false);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setEmailError('Email is required'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setEmailError('Enter a valid email'); return; }
    setEmailError('');
    setNotified(true);
  };

  /* ── styles ──────────────────────────────────────────────────────── */
  const page: CSSProperties = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 50%, #003A99 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    padding: '32px 24px',
    textAlign: 'center',
  };

  const inner: CSSProperties = {
    maxWidth: '600px',
    width: '100%',
    color: '#fff',
  };

  const badge: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(6px)',
    borderRadius: '9999px',
    padding: '6px 16px',
    fontSize: '13px',
    fontWeight: 600,
    marginBottom: '24px',
    border: '1px solid rgba(255,255,255,0.25)',
  };

  const bigText: CSSProperties = {
    fontSize: 'clamp(40px, 10vw, 80px)',
    fontWeight: 900,
    letterSpacing: '-2px',
    margin: '0 0 12px',
    lineHeight: 1.1,
  };

  const tagline: CSSProperties = {
    fontSize: '17px',
    opacity: 0.85,
    maxWidth: '420px',
    margin: '0 auto 40px',
    lineHeight: '1.7',
  };

  const timerRow: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '48px',
    flexWrap: 'wrap',
  };

  const timeBox: CSSProperties = {
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(8px)',
    borderRadius: '14px',
    padding: '18px 20px 14px',
    minWidth: '80px',
    border: '1px solid rgba(255,255,255,0.25)',
  };

  const timeNum: CSSProperties = {
    fontSize: '38px',
    fontWeight: 800,
    lineHeight: 1,
    display: 'block',
    marginBottom: '6px',
  };

  const timeLabel: CSSProperties = {
    fontSize: '11px',
    opacity: 0.75,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 600,
  };

  const notifyBox: CSSProperties = {
    background: 'rgba(255,255,255,0.12)',
    backdropFilter: 'blur(8px)',
    borderRadius: '16px',
    padding: '28px 24px',
    marginBottom: '32px',
    border: '1px solid rgba(255,255,255,0.2)',
  };

  const inputRow: CSSProperties = {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  const emailInput: CSSProperties = {
    flex: '1 1 200px',
    padding: '12px 16px',
    borderRadius: '9999px',
    border: emailError ? '1.5px solid #FCA5A5' : '1.5px solid rgba(255,255,255,0.3)',
    background: 'rgba(255,255,255,0.15)',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    backdropFilter: 'blur(4px)',
  };

  const notifyBtn: CSSProperties = {
    padding: '12px 24px',
    background: '#fff',
    color: '#007AFF',
    borderRadius: '9999px',
    border: 'none',
    fontWeight: 700,
    fontSize: '14px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
  };

  const pad2 = (n: number) => String(n).padStart(2, '0');

  const units: { label: string; value: number }[] = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div style={page}>
      <motion.div
        style={inner}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>🚀</div>
          <div style={badge}>
            <Bell size={13} />
            Something exciting is coming
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
        >
          <h1 style={bigText}>Coming Soon</h1>
          <p style={tagline}>
            We're working hard to bring you something amazing. Stay tuned and be the first to know when we launch.
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          style={timerRow}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
        >
          {units.map((u) => (
            <div key={u.label} style={timeBox}>
              <span style={timeNum}>{pad2(u.value)}</span>
              <span style={timeLabel}>{u.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Notify */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4 }}
        >
          {notified ? (
            <div style={notifyBox}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>🎉</div>
              <p style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px' }}>You're on the list!</p>
              <p style={{ fontSize: '14px', opacity: 0.8, margin: 0 }}>
                We'll notify <strong>{email}</strong> when we launch.
              </p>
            </div>
          ) : (
            <div style={notifyBox}>
              <p style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 16px', opacity: 0.92 }}>
                Get notified when we launch
              </p>
              <form onSubmit={handleNotify} noValidate>
                <div style={inputRow}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                    placeholder="Enter your email"
                    style={emailInput}
                  />
                  <button type="submit" style={notifyBtn}>
                    <Bell size={14} />
                    Notify Me
                  </button>
                </div>
                {emailError && (
                  <p style={{ fontSize: '12px', color: '#FCA5A5', marginTop: '8px', marginBottom: 0 }}>
                    {emailError}
                  </p>
                )}
              </form>
            </div>
          )}
        </motion.div>

        {/* Back home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'rgba(255,255,255,0.8)',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            <Home size={15} />
            Go Back Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
