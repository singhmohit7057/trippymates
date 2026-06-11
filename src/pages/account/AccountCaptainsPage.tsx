import { type CSSProperties, useState } from 'react';
import { ArrowLeft, MapPin, Star, CheckCircle, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { mockCaptains } from '../../data/mock';
import type { Captain } from '../../types';

// Simulate "saved" captains — use first 3 from mock
const SAVED_CAPTAINS = mockCaptains.slice(0, 3);

const CATEGORY_COLORS: Record<Captain['category'], string> = {
  adventure: '#EBF5FF',
  luxury: '#FFF3EB',
  cultural: '#F1E6FF',
  food: '#D3F6E3',
  budget: '#F3F4F6',
  nature: '#F0FDF4',
  trekking: '#F5F3FF',
};

const CATEGORY_AVATAR: Record<Captain['category'], string> = {
  adventure: '#007AFF',
  luxury: '#F26110',
  cultural: '#9552E0',
  food: '#10B981',
  budget: '#6B7280',
  nature: '#16A34A',
  trekking: '#007AFF',
};

function CaptainCompactCard({ captain, onRemove }: { captain: Captain; onRemove: () => void }) {
  const [hovered, setHovered] = useState(false);
  const bandColor = CATEGORY_COLORS[captain.category];
  const avatarBg = CATEGORY_AVATAR[captain.category];

  const card: CSSProperties = {
    background: '#FFFFFF',
    borderRadius: '16px',
    boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.12)' : '0 4px 12px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    border: '1px solid #E5E7EB',
    transition: 'box-shadow 0.2s, transform 0.2s',
    transform: hovered ? 'translateY(-3px)' : 'none',
    display: 'flex',
  };

  const colorBand: CSSProperties = {
    width: '6px',
    background: avatarBg,
    flexShrink: 0,
  };

  const content: CSSProperties = {
    flex: 1,
    padding: '18px 18px 18px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  };

  const avatar: CSSProperties = {
    width: '54px',
    height: '54px',
    borderRadius: '50%',
    background: bandColor,
    border: `3px solid ${avatarBg}33`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 700,
    color: avatarBg,
    flexShrink: 0,
  };

  const removeBtn: CSSProperties = {
    padding: '8px 16px',
    borderRadius: '9999px',
    border: '1.5px solid #FCA5A5',
    background: '#FEF2F2',
    color: '#DC2626',
    fontWeight: 600,
    fontSize: '13px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    flexShrink: 0,
    transition: 'all 0.15s',
  };

  const bookBtn: CSSProperties = {
    padding: '8px 16px',
    borderRadius: '9999px',
    border: 'none',
    background: '#007AFF',
    color: '#fff',
    fontWeight: 600,
    fontSize: '13px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    flexShrink: 0,
  };

  return (
    <div style={card} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={colorBand} />
      <div style={content}>
        <div style={avatar}>{captain.name.charAt(0)}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#111827' }}>{captain.name}</h3>
            {captain.verified && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px', background: '#EBF5FF', color: '#007AFF', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px' }}>
                <CheckCircle size={10} />Verified
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '13px', color: '#6B7280' }}>
              <MapPin size={12} />{captain.city}, {captain.country}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '13px', color: '#111827', fontWeight: 600 }}>
              <Star size={12} fill="#F59E0B" color="#F59E0B" />
              {captain.rating}
              <span style={{ fontWeight: 400, color: '#9CA3AF' }}>({captain.review_count})</span>
            </span>
            <span style={{ fontSize: '13px', color: '#6B7280' }}>
              From ₹{captain.hourly_rate * 80}/hr
            </span>
          </div>
          <div style={{ marginTop: '8px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {captain.expertise.slice(0, 2).map(e => (
              <span key={e} style={{ background: bandColor, color: avatarBg, fontSize: '11px', fontWeight: 500, padding: '2px 8px', borderRadius: '6px' }}>{e}</span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          <button style={bookBtn}>Book Again</button>
          <button style={removeBtn} onClick={onRemove}>Remove</button>
        </div>
      </div>
    </div>
  );
}

export default function AccountCaptainsPage() {
  const [saved, setSaved] = useState(SAVED_CAPTAINS);

  const removeCaptain = (id: string) => {
    setSaved(prev => prev.filter(c => c.id !== id));
  };

  const hero: CSSProperties = {
    background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 100%)',
    padding: '40px 24px 32px',
    color: '#fff',
  };

  const body: CSSProperties = {
    maxWidth: '860px',
    margin: '0 auto',
    padding: '40px 24px 80px',
  };

  return (
    <Layout>
      <div style={hero}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <Link to="/account" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: 500, textDecoration: 'none', marginBottom: '12px' }}>
            <ArrowLeft size={15} />
            Back to Account
          </Link>
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 4px' }}>My Captains</h1>
          <p style={{ margin: 0, opacity: 0.8, fontSize: '15px' }}>Captains you've saved or previously booked</p>
        </div>
      </div>

      <div style={body}>
        {saved.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#9CA3AF' }}>
            <Compass size={56} color="#E5E7EB" style={{ display: 'block', margin: '0 auto 20px' }} />
            <p style={{ fontSize: '18px', fontWeight: 700, color: '#374151', margin: '0 0 8px' }}>No saved captains yet</p>
            <p style={{ fontSize: '15px', margin: '0 0 24px' }}>Browse our verified local captains and save your favorites.</p>
            <Link
              to="/captains"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#007AFF', color: '#fff', textDecoration: 'none',
                borderRadius: '9999px', padding: '13px 28px',
                fontSize: '15px', fontWeight: 700,
              }}
            >
              <Compass size={17} />
              Browse Captains
            </Link>
          </div>
        ) : (
          <>
            <p style={{ margin: '0 0 20px', fontSize: '14px', color: '#6B7280', fontWeight: 500 }}>
              {saved.length} captain{saved.length !== 1 ? 's' : ''} saved
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {saved.map(captain => (
                <CaptainCompactCard
                  key={captain.id}
                  captain={captain}
                  onRemove={() => removeCaptain(captain.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
