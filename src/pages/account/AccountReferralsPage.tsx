import { type CSSProperties, useState } from 'react';
import { ArrowLeft, Copy, Check, Share2, Gift, Users, TrendingUp, Trophy, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';

const LEADERBOARD = [
  { rank: 1, name: 'Priya Sharma', city: 'Mumbai', referrals: 24, earnings: '₹12,000', avatar: '#007AFF' },
  { rank: 2, name: 'Rohit Verma', city: 'Delhi', referrals: 18, earnings: '₹9,000', avatar: '#F26110' },
  { rank: 3, name: 'Ananya Iyer', city: 'Bangalore', referrals: 15, earnings: '₹7,500', avatar: '#10B981' },
  { rank: 4, name: 'John Doe', city: 'Pune', referrals: 5, earnings: '₹1,000', avatar: '#007AFF', isYou: true },
  { rank: 5, name: 'Meera Patel', city: 'Ahmedabad', referrals: 10, earnings: '₹5,000', avatar: '#F59E0B' },
];

export default function AccountReferralsPage() {
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
    const msg = encodeURIComponent(`Hey! Join me on Trippy Mates. Use my code ${referralCode} to get a discount! ${referralLink}`);
    window.open(`https://wa.me/?text=${msg}`, '_blank');
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

  const card: CSSProperties = {
    background: '#FFFFFF',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '28px',
    marginBottom: '24px',
  };

  const sectionTitle: CSSProperties = {
    fontSize: '18px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 4px',
  };

  const sectionSub: CSSProperties = {
    fontSize: '14px',
    color: '#6B7280',
    margin: '0 0 20px',
  };

  const stepsGrid: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '32px',
  };

  const stepCard = (color: string): CSSProperties => ({
    background: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    padding: '20px',
    textAlign: 'center',
    borderTop: `3px solid ${color}`,
    border: '1px solid #E5E7EB',
    borderTopColor: color,
    borderTopWidth: '3px',
  });

  const codeBox: CSSProperties = {
    background: '#F8FAFC',
    border: '2px dashed #007AFF',
    borderRadius: '12px',
    padding: '18px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    margin: '16px 0',
  };

  const codeText: CSSProperties = {
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: '20px',
    fontWeight: 700,
    color: '#007AFF',
    letterSpacing: '2px',
  };

  const statsGrid: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '14px',
    marginBottom: '32px',
  };

  const tableStyle: CSSProperties = { width: '100%', borderCollapse: 'collapse' };
  const thStyle: CSSProperties = { textAlign: 'left', padding: '10px 14px', fontSize: '11px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #F3F4F6' };
  const tdStyle: CSSProperties = { padding: '12px 14px', fontSize: '14px', color: '#111827', borderBottom: '1px solid #F9FAFB' };
  const rankColors = ['#F59E0B', '#9CA3AF', '#CD7F32', '#6B7280', '#6B7280'];

  const btnPrimary: CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#25D366', color: '#fff', border: 'none', borderRadius: '9999px', padding: '13px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' };
  const btnSecondary: CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#fff', color: '#007AFF', border: '2px solid #007AFF', borderRadius: '9999px', padding: '13px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' };

  return (
    <Layout>
      <div style={hero}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <Link to="/account" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: 500, textDecoration: 'none', marginBottom: '12px' }}>
            <ArrowLeft size={15} />
            Back to Account
          </Link>
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 4px' }}>My Referrals</h1>
          <p style={{ margin: 0, opacity: 0.8, fontSize: '15px' }}>Earn ₹500 for every friend who books a trip</p>
        </div>
      </div>

      <div style={body}>
        {/* How It Works */}
        <div style={stepsGrid}>
          {[
            { icon: <Share2 size={20} color="#007AFF" />, color: '#007AFF', step: '01', title: 'Share Your Link', desc: 'Share your unique referral code with friends' },
            { icon: <Users size={20} color="#10B981" />, color: '#10B981', step: '02', title: 'Friend Books', desc: 'Your friend signs up and completes a booking' },
            { icon: <Gift size={20} color="#F59E0B" />, color: '#F59E0B', step: '03', title: 'Earn ₹500', desc: 'Credits added instantly to your wallet' },
          ].map(s => (
            <div key={s.step} style={stepCard(s.color)}>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#E5E7EB', marginBottom: '6px' }}>{s.step}</div>
              <div style={{ background: s.color + '18', borderRadius: '10px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>{s.icon}</div>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>{s.title}</h3>
              <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Your Stats */}
        <div style={statsGrid}>
          {[
            { label: 'Referrals Sent', value: '5', color: '#007AFF', icon: <Share2 size={20} color="#007AFF" /> },
            { label: 'Successful', value: '2', color: '#10B981', icon: <TrendingUp size={20} color="#10B981" /> },
            { label: 'Earnings', value: '₹1,000', color: '#F59E0B', icon: <Gift size={20} color="#F59E0B" /> },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '20px', textAlign: 'center', border: '1px solid #E5E7EB' }}>
              <div style={{ background: s.color + '15', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>{s.icon}</div>
              <p style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 800, color: s.color }}>{s.value}</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#6B7280', fontWeight: 500 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Referral Code Card */}
        <div style={card}>
          <h2 style={sectionTitle}>Your Referral Code</h2>
          <p style={sectionSub}>Share this code to earn ₹500 per successful referral</p>
          <div style={codeBox}>
            <span style={codeText}>{referralCode}</span>
            <button onClick={handleCopyCode} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: codeCopied ? '#10B981' : '#007AFF', color: '#fff', border: 'none', borderRadius: '9999px', padding: '9px 18px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s' }}>
              {codeCopied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F8FAFC', borderRadius: '10px', padding: '10px 14px', marginBottom: '20px' }}>
            <span style={{ flex: 1, fontSize: '13px', color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{referralLink}</span>
            <ChevronRight size={14} color="#9CA3AF" />
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button style={btnPrimary} onClick={handleWhatsApp}>
              <Share2 size={16} />
              Share via WhatsApp
            </button>
            <button style={linkCopied ? { ...btnSecondary, borderColor: '#10B981', color: '#10B981' } : btnSecondary} onClick={handleCopyLink}>
              {linkCopied ? <><Check size={16} /> Copied!</> : <><Copy size={16} /> Copy Link</>}
            </button>
          </div>
        </div>

        {/* Leaderboard */}
        <div style={card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Trophy size={20} color="#F59E0B" />
            <h2 style={{ ...sectionTitle, margin: 0 }}>Leaderboard</h2>
          </div>
          <p style={sectionSub}>Top referrers this month — <strong style={{ color: '#007AFF' }}>you're #4!</strong></p>
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
                <tr key={row.rank} style={{ background: (row as any).isYou ? '#EBF5FF' : 'transparent' }}>
                  <td style={tdStyle}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '50%', background: i < 3 ? rankColors[i] + '20' : '#F3F4F6', color: i < 3 ? rankColors[i] : '#6B7280', fontSize: '12px', fontWeight: 700 }}>
                      {row.rank}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: row.avatar, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>
                        {row.name.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 600 }}>
                        {row.name}
                        {(row as any).isYou && <span style={{ marginLeft: '6px', fontSize: '11px', background: '#007AFF', color: '#fff', borderRadius: '6px', padding: '1px 6px' }}>You</span>}
                      </span>
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
    </Layout>
  );
}
