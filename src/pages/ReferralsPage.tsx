import { type CSSProperties, useState } from 'react';
import { Copy, Check, Share2, Gift, Users, TrendingUp, Trophy, ChevronRight } from 'lucide-react';
import Layout from '../components/Layout';

const LEADERBOARD = [
  { rank: 1, name: 'Priya Sharma', city: 'Mumbai', referrals: 24, earnings: '₹12,000', avatar: '#007AFF' },
  { rank: 2, name: 'Rohit Verma', city: 'Delhi', referrals: 18, earnings: '₹9,000', avatar: '#F26110' },
  { rank: 3, name: 'Ananya Iyer', city: 'Bangalore', referrals: 15, earnings: '₹7,500', avatar: '#10B981' },
  { rank: 4, name: 'Karthik Nair', city: 'Chennai', referrals: 12, earnings: '₹6,000', avatar: '#9552E0' },
  { rank: 5, name: 'Meera Patel', city: 'Ahmedabad', referrals: 10, earnings: '₹5,000', avatar: '#F59E0B' },
];

export default function ReferralsPage() {
  const [codeCopied, setCodeCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const referralCode = 'TRIPPY-USER123';
  const referralLink = 'https://trippymates.com/ref/user123';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode).catch(() => {});
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink).catch(() => {});
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Hey! Join me on Trippy Mates and discover amazing trips with local captains. Use my referral code ${referralCode} to get a discount! ${referralLink}`);
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  const hero: CSSProperties = {
    background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 50%, #FF6B35 100%)',
    padding: '80px 24px 64px',
    textAlign: 'center',
    color: '#fff',
  };

  const heroTitle: CSSProperties = {
    fontSize: 'clamp(32px, 5vw, 52px)',
    fontWeight: 800,
    margin: '0 0 14px',
    letterSpacing: '-0.5px',
  };

  const heroSub: CSSProperties = {
    fontSize: '18px',
    opacity: 0.88,
    maxWidth: '540px',
    margin: '0 auto 28px',
    lineHeight: 1.6,
  };

  const heroBadge: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255,255,255,0.18)',
    borderRadius: '9999px',
    padding: '10px 24px',
    fontSize: '15px',
    fontWeight: 700,
    color: '#fff',
  };

  const body: CSSProperties = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 24px 80px',
  };

  const sectionTitle: CSSProperties = {
    fontSize: '24px',
    fontWeight: 800,
    color: '#111827',
    margin: '0 0 6px',
  };

  const sectionSub: CSSProperties = {
    fontSize: '15px',
    color: '#6B7280',
    margin: '0 0 28px',
  };

  const card: CSSProperties = {
    background: '#FFFFFF',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '28px 28px',
  };

  // Steps
  const stepsGrid: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    margin: '48px 0',
  };

  const stepCard = (color: string): CSSProperties => ({
    background: '#FFFFFF',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '28px 24px',
    textAlign: 'center',
    borderTop: `4px solid ${color}`,
  });

  const stepIconWrap = (color: string): CSSProperties => ({
    width: '56px',
    height: '56px',
    background: color + '18',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  });

  // Referral code card
  const codeBox: CSSProperties = {
    background: '#F8FAFC',
    border: '2px dashed #007AFF',
    borderRadius: '12px',
    padding: '20px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    margin: '20px 0',
  };

  const codeText: CSSProperties = {
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: '22px',
    fontWeight: 700,
    color: '#007AFF',
    letterSpacing: '2px',
  };

  // Stats
  const statsGrid: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    margin: '48px 0 0',
  };

  const statCard = (_color: string): CSSProperties => ({
    background: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '24px 20px',
    textAlign: 'center',
  });

  const statNum = (color: string): CSSProperties => ({
    fontSize: '36px',
    fontWeight: 800,
    color: color,
    margin: '8px 0 4px',
    display: 'block',
  });

  const btnPrimary: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    background: '#25D366',
    color: '#fff',
    border: 'none',
    borderRadius: '9999px',
    padding: '14px 28px',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
  };

  const btnSecondary: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    background: '#fff',
    color: '#007AFF',
    border: '2px solid #007AFF',
    borderRadius: '9999px',
    padding: '14px 28px',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
  };

  const tableStyle: CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyle: CSSProperties = {
    textAlign: 'left',
    padding: '10px 14px',
    fontSize: '12px',
    fontWeight: 700,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '1px solid #F3F4F6',
  };

  const tdStyle: CSSProperties = {
    padding: '14px',
    fontSize: '14px',
    color: '#111827',
    borderBottom: '1px solid #F9FAFB',
  };

  const rankColors = ['#F59E0B', '#9CA3AF', '#CD7F32', '#6B7280', '#6B7280'];

  return (
    <Layout>
      {/* Hero */}
      <section style={hero}>
        <h1 style={heroTitle}>Earn While You Travel</h1>
        <p style={heroSub}>
          Share Trippy Mates with friends. Earn ₹500 for every successful booking they make.
        </p>
        <div style={heroBadge}>
          <Gift size={18} />
          ₹500 per referral · No limits · Instant credit
        </div>
      </section>

      <div style={body}>
        {/* How It Works */}
        <div style={{ margin: '48px 0 0' }}>
          <h2 style={{ ...sectionTitle, textAlign: 'center' }}>How It Works</h2>
          <p style={{ ...sectionSub, textAlign: 'center' }}>Three simple steps to earning travel credits</p>
          <div style={stepsGrid}>
            {[
              { icon: <Share2 size={24} color="#007AFF" />, color: '#007AFF', step: '01', title: 'Share Your Link', desc: 'Get your unique referral link and share it with friends, family, or on social media.' },
              { icon: <Users size={24} color="#10B981" />, color: '#10B981', step: '02', title: 'Friend Books a Trip', desc: 'When your friend signs up and completes their first booking, the referral is confirmed.' },
              { icon: <Gift size={24} color="#F59E0B" />, color: '#F59E0B', step: '03', title: 'You Earn ₹500', desc: 'Referral credits are instantly added to your wallet. Use them on any future booking.' },
            ].map(s => (
              <div key={s.step} style={stepCard(s.color)}>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#E5E7EB', marginBottom: '8px' }}>{s.step}</div>
                <div style={stepIconWrap(s.color)}>{s.icon}</div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Referral Card */}
        <div style={{ margin: '48px 0 0' }}>
          <div style={card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{ background: '#EBF5FF', borderRadius: '10px', padding: '8px' }}>
                <Gift size={20} color="#007AFF" />
              </div>
              <div>
                <h2 style={{ ...sectionTitle, margin: 0 }}>Your Referral Code</h2>
                <p style={{ margin: '2px 0 0', fontSize: '14px', color: '#6B7280' }}>Share this code or your personal link</p>
              </div>
            </div>

            <div style={codeBox}>
              <span style={codeText}>{referralCode}</span>
              <button
                onClick={handleCopyCode}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: codeCopied ? '#10B981' : '#007AFF',
                  color: '#fff', border: 'none', borderRadius: '9999px',
                  padding: '10px 20px', fontSize: '14px', fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s',
                }}
              >
                {codeCopied ? <><Check size={15} /> Copied!</> : <><Copy size={15} /> Copy Code</>}
              </button>
            </div>

            <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#9CA3AF' }}>Or share your personal link:</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFC', borderRadius: '10px', padding: '12px 16px' }}>
              <span style={{ flex: 1, fontSize: '14px', color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{referralLink}</span>
              <ChevronRight size={16} color="#9CA3AF" />
            </div>

            {/* Share buttons */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
              <button style={btnPrimary} onClick={handleWhatsApp}>
                <Share2 size={17} />
                Share via WhatsApp
              </button>
              <button
                style={linkCopied ? { ...btnSecondary, borderColor: '#10B981', color: '#10B981' } : btnSecondary}
                onClick={handleCopyLink}
              >
                {linkCopied ? <><Check size={17} /> Copied!</> : <><Copy size={17} /> Copy Link</>}
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ margin: '48px 0 0' }}>
          <h2 style={sectionTitle}>Your Referral Stats</h2>
          <p style={sectionSub}>Track your earnings and referral performance</p>
          <div style={statsGrid}>
            {[
              { label: 'Referrals Sent', value: '5', color: '#007AFF', icon: <Share2 size={22} color="#007AFF" /> },
              { label: 'Successful Bookings', value: '2', color: '#10B981', icon: <TrendingUp size={22} color="#10B981" /> },
              { label: 'Total Earnings', value: '₹1,000', color: '#F59E0B', icon: <Gift size={22} color="#F59E0B" /> },
            ].map(s => (
              <div key={s.label} style={statCard(s.color)}>
                <div style={{ background: s.color + '15', borderRadius: '12px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                  {s.icon}
                </div>
                <span style={statNum(s.color)}>{s.value}</span>
                <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div style={{ margin: '48px 0 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <Trophy size={24} color="#F59E0B" />
            <div>
              <h2 style={{ ...sectionTitle, margin: 0 }}>Referral Leaderboard</h2>
              <p style={{ margin: '2px 0 0', fontSize: '14px', color: '#6B7280' }}>Top referrers this month</p>
            </div>
          </div>
          <div style={card}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Rank</th>
                  <th style={thStyle}>Traveler</th>
                  <th style={thStyle}>City</th>
                  <th style={thStyle}>Referrals</th>
                  <th style={thStyle}>Earnings</th>
                </tr>
              </thead>
              <tbody>
                {LEADERBOARD.map((row, i) => (
                  <tr key={row.rank}>
                    <td style={tdStyle}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: '28px', height: '28px', borderRadius: '50%',
                        background: i < 3 ? rankColors[i] + '20' : '#F3F4F6',
                        color: i < 3 ? rankColors[i] : '#6B7280',
                        fontSize: '13px', fontWeight: 700,
                      }}>
                        {row.rank}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '34px', height: '34px', borderRadius: '50%',
                          background: row.avatar, color: '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '13px', fontWeight: 700, flexShrink: 0,
                        }}>
                          {row.name.charAt(0)}
                        </div>
                        <span style={{ fontWeight: 600 }}>{row.name}</span>
                      </div>
                    </td>
                    <td style={{ ...tdStyle, color: '#6B7280' }}>{row.city}</td>
                    <td style={tdStyle}><span style={{ fontWeight: 700, color: '#007AFF' }}>{row.referrals}</span></td>
                    <td style={tdStyle}><span style={{ fontWeight: 700, color: '#10B981' }}>{row.earnings}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
