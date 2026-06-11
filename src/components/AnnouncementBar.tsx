import { useState, type CSSProperties } from 'react';
import { X } from 'lucide-react';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const barStyle: CSSProperties = {
    background: 'linear-gradient(90deg, #0056CC 0%, #007AFF 45%, #3395FF 55%, #0056CC 100%)',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    padding: '0 48px',
    boxSizing: 'border-box' as const,
    overflow: 'hidden',
  };

  // shimmer streak
  const shimmerStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: '40%',
    width: '80px',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
    transform: 'skewX(-20deg)',
    pointerEvents: 'none',
  };

  const textStyle: CSSProperties = {
    color: '#FFFFFF',
    fontSize: '13px',
    fontWeight: 600,
    textAlign: 'center',
    lineHeight: 1,
    letterSpacing: '0.01em',
  };

  const closeButtonStyle: CSSProperties = {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.8)',
    display: 'flex',
    alignItems: 'center',
    padding: '4px',
    borderRadius: '4px',
  };

  return (
    <div style={barStyle}>
      <div style={shimmerStyle} />
      <span style={textStyle}>
        Ladakh Spiti Early Bird – Save up to ₹3,000 🎉
      </span>
      <button
        style={closeButtonStyle}
        onClick={() => setVisible(false)}
        aria-label="Close announcement"
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.8)'; }}
      >
        <X size={15} />
      </button>
    </div>
  );
}
