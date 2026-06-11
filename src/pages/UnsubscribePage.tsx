import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

type Step = 'form' | 'confirm' | 'done';

export default function UnsubscribePage() {
  const [email, setEmail]     = useState('');
  const [reason, setReason]   = useState('');
  const [step, setStep]       = useState<Step>('form');
  const [error, setError]     = useState('');

  const REASONS = [
    'I receive too many emails',
    'The content is not relevant to me',
    'I never signed up for this',
    'I booked a trip and no longer need updates',
    'Other',
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setStep('confirm');
  }

  function handleConfirm() {
    // In production: call API here
    setStep('done');
  }

  return (
    <Layout>
      <style>{`
        .unsub-input:focus {
          border-color: #007AFF !important;
          box-shadow: 0 0 0 3px rgba(0,122,255,0.12) !important;
          outline: none;
        }
        .unsub-radio:checked { accent-color: #007AFF; }
        .unsub-btn-ghost:hover { background: #F1F5F9 !important; }
      `}</style>

      {/* ── Hero banner ─────────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #001F5B 0%, #0056CC 60%, #003A99 100%)',
        padding: '72px 24px 60px', textAlign: 'center', color: '#fff', fontFamily: font,
      }}>
        <div style={{ fontSize: '52px', marginBottom: '16px' }}>📭</div>
        <h1 style={{ fontSize: 'clamp(26px,5vw,42px)', fontWeight: 900, margin: '0 0 12px', letterSpacing: '-1px' }}>
          Unsubscribe from Emails
        </h1>
        <p style={{ fontSize: '16px', opacity: 0.78, maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
          We're sorry to see you go. Enter your email below and we'll remove you from our mailing list right away.
        </p>
      </div>

      {/* ── Main card ───────────────────────────────────────────────────────── */}
      <div style={{ background: '#F8FAFC', padding: '60px 24px 96px', fontFamily: font, minHeight: '50vh' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>

          {/* ── STEP 1: Form ─────────────────────────────────────────────── */}
          {step === 'form' && (
            <div style={{ background: '#fff', borderRadius: '24px', padding: '40px 36px', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: '1.5px solid #E5E7EB' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '0 0 6px', letterSpacing: '-0.3px' }}>
                Remove my email
              </h2>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 28px', lineHeight: 1.6 }}>
                You'll stop receiving all marketing and newsletter emails from Trippy Mates. Booking confirmations and important trip updates will still be sent.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Email */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '7px' }}>
                    Email address <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    className="unsub-input"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(''); }}
                    style={{
                      width: '100%', height: '46px', borderRadius: '11px',
                      border: error ? '1.5px solid #EF4444' : '1.5px solid #D1D5DB',
                      padding: '0 14px', fontSize: '14px', fontFamily: font,
                      color: '#111827', background: '#fff', boxSizing: 'border-box',
                      transition: 'border-color 0.15s, box-shadow 0.15s',
                    }}
                  />
                  {error && (
                    <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#EF4444' }}>{error}</p>
                  )}
                </div>

                {/* Reason */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '10px' }}>
                    Why are you unsubscribing? <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(optional)</span>
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                    {REASONS.map(r => (
                      <label key={r} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px', color: '#374151', padding: '10px 14px', borderRadius: '10px', border: `1.5px solid ${reason === r ? '#007AFF' : '#E5E7EB'}`, background: reason === r ? '#EBF5FF' : '#FAFAFA', transition: 'all 0.15s' }}>
                        <input
                          className="unsub-radio"
                          type="radio"
                          name="reason"
                          value={r}
                          checked={reason === r}
                          onChange={() => setReason(r)}
                          style={{ accentColor: '#007AFF', flexShrink: 0 }}
                        />
                        {r}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" style={{
                  height: '48px', borderRadius: '12px', background: '#007AFF', color: '#fff',
                  border: 'none', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                  fontFamily: font, marginTop: '4px',
                  boxShadow: '0 4px 16px rgba(0,122,255,0.3)',
                  transition: 'opacity 0.15s, transform 0.15s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.9'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
                >
                  Continue →
                </button>
              </form>

              <p style={{ margin: '20px 0 0', fontSize: '13px', color: '#9CA3AF', textAlign: 'center', lineHeight: 1.6 }}>
                Changed your mind?{' '}
                <Link to="/" style={{ color: '#007AFF', textDecoration: 'none', fontWeight: 600 }}>
                  Go back home
                </Link>
              </p>
            </div>
          )}

          {/* ── STEP 2: Confirm ──────────────────────────────────────────── */}
          {step === 'confirm' && (
            <div style={{ background: '#fff', borderRadius: '24px', padding: '40px 36px', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: '1.5px solid #E5E7EB', textAlign: 'center' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '32px' }}>
                ⚠️
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '0 0 10px' }}>
                Are you sure?
              </h2>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 8px', lineHeight: 1.7 }}>
                You're about to unsubscribe
              </p>
              <div style={{ background: '#EBF5FF', borderRadius: '10px', padding: '10px 18px', display: 'inline-block', marginBottom: '28px' }}>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#0056CC' }}>{email}</span>
              </div>
              {reason && (
                <p style={{ fontSize: '13px', color: '#9CA3AF', margin: '0 0 28px' }}>
                  Reason: <em>{reason}</em>
                </p>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button onClick={handleConfirm} style={{
                  height: '48px', borderRadius: '12px', background: '#EF4444', color: '#fff',
                  border: 'none', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                  fontFamily: font, boxShadow: '0 4px 14px rgba(239,68,68,0.3)',
                  transition: 'opacity 0.15s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
                >
                  Yes, unsubscribe me
                </button>
                <button className="unsub-btn-ghost" onClick={() => setStep('form')} style={{
                  height: '46px', borderRadius: '12px', background: 'transparent', color: '#374151',
                  border: '1.5px solid #E5E7EB', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                  fontFamily: font, transition: 'background 0.15s',
                }}>
                  ← Go back
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Done ─────────────────────────────────────────────── */}
          {step === 'done' && (
            <div style={{ background: '#fff', borderRadius: '24px', padding: '48px 36px', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: '1.5px solid #E5E7EB', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #007AFF, #0056CC)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '36px' }}>
                ✓
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', margin: '0 0 12px', letterSpacing: '-0.3px' }}>
                You've been unsubscribed
              </h2>
              <p style={{ fontSize: '14px', color: '#6B7280', maxWidth: '340px', margin: '0 auto 8px', lineHeight: 1.7 }}>
                <strong style={{ color: '#374151' }}>{email}</strong> has been removed from our mailing list. You won't receive any more newsletters from us.
              </p>
              <p style={{ fontSize: '13px', color: '#9CA3AF', margin: '0 auto 32px', lineHeight: 1.6 }}>
                Note: booking confirmations and essential trip updates will still be delivered.
              </p>

              {/* Re-subscribe nudge */}
              <div style={{ background: '#EBF5FF', borderRadius: '14px', padding: '18px 20px', marginBottom: '28px', border: '1.5px solid #CCE4FF' }}>
                <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#0056CC', fontWeight: 600 }}>
                  Changed your mind?
                </p>
                <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>
                  You can re-subscribe anytime from the footer of our website.
                </p>
                <Link to="/" style={{
                  display: 'inline-block', padding: '9px 22px', borderRadius: '9999px',
                  background: '#007AFF', color: '#fff', fontSize: '13px', fontWeight: 700,
                  textDecoration: 'none',
                }}>
                  Back to home
                </Link>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/trips" style={{ fontSize: '13px', color: '#007AFF', textDecoration: 'none', fontWeight: 600 }}>Browse trips →</Link>
                <span style={{ color: '#E5E7EB' }}>|</span>
                <Link to="/contact" style={{ fontSize: '13px', color: '#007AFF', textDecoration: 'none', fontWeight: 600 }}>Contact us →</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
