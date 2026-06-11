import { type CSSProperties, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, Calendar, Compass, Gift, ChevronRight, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Layout from '../../components/Layout';

const NAV_ITEMS = [
  { label: 'My Profile', href: '/account/profile', icon: <User size={16} /> },
  { label: 'Settings', href: '/account/settings', icon: <Settings size={16} /> },
  { label: 'My Bookings', href: '/account/bookings', icon: <Calendar size={16} /> },
  { label: 'My Captains', href: '/account/captains', icon: <Compass size={16} /> },
  { label: 'My Referrals', href: '/account/referrals', icon: <Gift size={16} /> },
];

const RECENT_BOOKINGS = [
  { id: 'BK-001', destination: 'Bali, Indonesia', tripName: 'Bali Spirit & Serenity', date: 'Aug 10–17, 2025', status: 'confirmed', color: '#4FBEFF' },
  { id: 'BK-002', destination: 'Goa, India', tripName: 'Goa Beach Carnival', date: 'Aug 22–26, 2025', status: 'pending', color: '#F59E0B' },
  { id: 'BK-003', destination: 'Kashmir, India', tripName: 'Kashmir Valley Magic', date: 'Jul 18–24, 2025', status: 'confirmed', color: '#10B981' },
];

export default function AccountPage() {
  const [activeNav, setActiveNav] = useState('/account');

  const pageWrap: CSSProperties = {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '40px 24px 80px',
    display: 'flex',
    gap: '32px',
    alignItems: 'flex-start',
  };

  const sidebar: CSSProperties = {
    width: '260px',
    flexShrink: 0,
    position: 'sticky',
    top: '80px',
  };

  const sidebarCard: CSSProperties = {
    background: '#FFFFFF',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    overflow: 'hidden',
  };

  const avatarSection: CSSProperties = {
    background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 100%)',
    padding: '28px 24px 24px',
    textAlign: 'center',
  };

  const avatarCircle: CSSProperties = {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.25)',
    color: '#fff',
    fontSize: '26px',
    fontWeight: 800,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 12px',
    border: '3px solid rgba(255,255,255,0.4)',
  };

  const navSection: CSSProperties = {
    padding: '12px',
  };

  const navItem = (active: boolean): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '11px 14px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: active ? 600 : 500,
    color: active ? '#007AFF' : '#374151',
    background: active ? '#EBF5FF' : 'transparent',
    textDecoration: 'none',
    transition: 'all 0.15s',
    marginBottom: '2px',
    cursor: 'pointer',
  });

  const content: CSSProperties = { flex: 1, minWidth: 0 };

  const statsGrid: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    marginBottom: '32px',
  };

  const statCard = (color: string): CSSProperties => ({
    background: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '22px 20px',
    borderTop: `4px solid ${color}`,
  });

  const tableCard: CSSProperties = {
    background: '#FFFFFF',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    overflow: 'hidden',
  };

  const thStyle: CSSProperties = {
    textAlign: 'left',
    padding: '12px 16px',
    fontSize: '12px',
    fontWeight: 700,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    background: '#F9FAFB',
    borderBottom: '1px solid #E5E7EB',
  };

  const tdStyle: CSSProperties = {
    padding: '14px 16px',
    fontSize: '14px',
    color: '#111827',
    borderBottom: '1px solid #F3F4F6',
    verticalAlign: 'middle',
  };

  const statusBadge = (status: string): CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '4px 10px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: 600,
    background: status === 'confirmed' ? '#DCFCE7' : '#FEF9C3',
    color: status === 'confirmed' ? '#15803D' : '#A16207',
  });

  return (
    <Layout>
      <div style={{ background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 100%)', padding: '40px 24px 32px', color: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 6px' }}>My Account</h1>
          <p style={{ margin: 0, opacity: 0.8, fontSize: '15px' }}>Manage your profile, bookings, and preferences</p>
        </div>
      </div>

      <div style={pageWrap}>
        {/* Sidebar */}
        <aside style={sidebar}>
          <div style={sidebarCard}>
            <div style={avatarSection}>
              <div style={avatarCircle}>JD</div>
              <p style={{ margin: '0 0 4px', color: '#fff', fontWeight: 700, fontSize: '17px' }}>John Doe</p>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)', fontSize: '13px' }}>john.doe@email.com</p>
              <div style={{ marginTop: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '9999px', padding: '4px 14px', display: 'inline-block', fontSize: '12px', fontWeight: 600, color: '#fff' }}>
                Member since Jan 2024
              </div>
            </div>
            <div style={navSection}>
              {NAV_ITEMS.map(item => (
                <Link key={item.href} to={item.href} style={navItem(activeNav === item.href)} onClick={() => setActiveNav(item.href)}>
                  {item.icon}
                  {item.label}
                  <ChevronRight size={14} style={{ marginLeft: 'auto', color: '#9CA3AF' }} />
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div style={content}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '0 0 20px' }}>Overview</h2>

          {/* Stats */}
          <div style={statsGrid}>
            {[
              { label: 'Active Bookings', value: '2', icon: <Calendar size={22} color="#007AFF" />, color: '#007AFF' },
              { label: 'Captains Saved', value: '3', icon: <Compass size={22} color="#10B981" />, color: '#10B981' },
              { label: 'Referral Earnings', value: '₹1,000', icon: <Gift size={22} color="#F59E0B" />, color: '#F59E0B' },
              { label: 'Member Since', value: 'Jan 2024', icon: <TrendingUp size={22} color="#9552E0" />, color: '#9552E0' },
            ].map(s => (
              <div key={s.label} style={statCard(s.color)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ background: s.color + '15', borderRadius: '10px', padding: '8px' }}>{s.icon}</div>
                  <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: 500 }}>{s.label}</span>
                </div>
                <p style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#111827' }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Bookings */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 0 16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: 0 }}>Recent Bookings</h2>
            <Link to="/account/bookings" style={{ fontSize: '14px', color: '#007AFF', fontWeight: 600, textDecoration: 'none' }}>
              View All →
            </Link>
          </div>

          <div style={tableCard}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Destination</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}></th>
                </tr>
              </thead>
              <tbody>
                {RECENT_BOOKINGS.map(b => (
                  <tr key={b.id}>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '8px', height: '40px', borderRadius: '4px', background: b.color, flexShrink: 0 }} />
                        <div>
                          <p style={{ margin: 0, fontWeight: 600, fontSize: '14px' }}>{b.tripName}</p>
                          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#9CA3AF' }}>{b.destination}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ ...tdStyle, color: '#6B7280', fontSize: '13px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Clock size={13} />
                        {b.date}
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <span style={statusBadge(b.status)}>
                        {b.status === 'confirmed' ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                        {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <Link to="/account/bookings" style={{ fontSize: '13px', color: '#007AFF', fontWeight: 600, textDecoration: 'none' }}>
                        View
                      </Link>
                    </td>
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
