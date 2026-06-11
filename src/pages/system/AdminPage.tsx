import { type CSSProperties, type ReactElement, useState } from 'react';
import {
  LayoutDashboard, Map, Compass, Calendar, Users, MessageSquare, Tag,
  TrendingUp, Plus, CheckCircle, AlertCircle, XCircle, ChevronRight,
} from 'lucide-react';
import Layout from '../../components/Layout';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  { id: 'trips', label: 'Trips', icon: <Map size={16} /> },
  { id: 'captains', label: 'Captains', icon: <Compass size={16} /> },
  { id: 'bookings', label: 'Bookings', icon: <Calendar size={16} /> },
  { id: 'users', label: 'Users', icon: <Users size={16} /> },
  { id: 'communities', label: 'Communities', icon: <MessageSquare size={16} /> },
  { id: 'coupons', label: 'Coupons', icon: <Tag size={16} /> },
];

const STATS = [
  { label: 'Total Users', value: '12,438', change: '+18%', color: '#007AFF', icon: <Users size={22} color="#007AFF" /> },
  { label: 'Total Bookings', value: '3,891', change: '+12%', color: '#10B981', icon: <Calendar size={22} color="#10B981" /> },
  { label: 'Active Captains', value: '247', change: '+5%', color: '#F59E0B', icon: <Compass size={22} color="#F59E0B" /> },
  { label: 'Total Revenue', value: '₹48.2L', change: '+24%', color: '#9552E0', icon: <TrendingUp size={22} color="#9552E0" /> },
];

const RECENT_BOOKINGS = [
  { id: 'BK-1201', user: 'Sneha Kapoor', trip: 'Bali Spirit & Serenity', date: 'Aug 10, 2025', amount: '₹1,798', status: 'confirmed' },
  { id: 'BK-1200', user: 'Rohan Mehta', trip: 'Thailand Highlights', date: 'Sep 5, 2025', amount: '₹749', status: 'confirmed' },
  { id: 'BK-1199', user: 'Ananya Iyer', trip: 'Dubai Luxury Escape', date: 'Oct 15, 2025', amount: '₹2,998', status: 'pending' },
  { id: 'BK-1198', user: 'Vikram Nair', trip: 'Goa Beach Carnival', date: 'Aug 22, 2025', amount: '₹897', status: 'confirmed' },
  { id: 'BK-1197', user: 'Priyanka Dewan', trip: 'Kashmir Valley Magic', date: 'Jul 18, 2025', amount: '₹898', status: 'cancelled' },
];

type BookingStatus = 'confirmed' | 'pending' | 'cancelled';

const statusConfig: Record<BookingStatus, { label: string; bg: string; color: string; icon: ReactElement }> = {
  confirmed: { label: 'Confirmed', bg: '#DCFCE7', color: '#15803D', icon: <CheckCircle size={12} /> },
  pending: { label: 'Pending', bg: '#FEF9C3', color: '#A16207', icon: <AlertCircle size={12} /> },
  cancelled: { label: 'Cancelled', bg: '#FEE2E2', color: '#B91C1C', icon: <XCircle size={12} /> },
};

export default function AdminPage() {
  const [activeNav, setActiveNav] = useState('dashboard');

  const pageWrap: CSSProperties = {
    display: 'flex',
    minHeight: '100vh',
    background: '#F8FAFC',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  };

  const sidebar: CSSProperties = {
    width: '240px',
    background: '#111827',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  };

  const sidebarLogo: CSSProperties = {
    padding: '24px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const navItem = (active: boolean): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '11px 20px',
    fontSize: '14px',
    fontWeight: active ? 600 : 500,
    color: active ? '#fff' : 'rgba(255,255,255,0.55)',
    background: active ? '#007AFF' : 'transparent',
    cursor: 'pointer',
    transition: 'all 0.15s',
    borderRadius: '0',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    fontFamily: 'inherit',
  });

  const main: CSSProperties = {
    flex: 1,
    padding: '32px 32px 60px',
    minWidth: 0,
  };

  const topBar: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '28px',
  };

  const statsGrid: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '32px',
  };

  const statCard = (color: string): CSSProperties => ({
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    padding: '20px',
    borderTop: `4px solid ${color}`,
  });

  const tableCard: CSSProperties = {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    overflow: 'hidden',
  };

  const tableHeader: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 20px 16px',
    borderBottom: '1px solid #F3F4F6',
  };

  const thStyle: CSSProperties = {
    textAlign: 'left',
    padding: '10px 14px',
    fontSize: '11px',
    fontWeight: 700,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    background: '#F9FAFB',
    borderBottom: '1px solid #E5E7EB',
  };

  const tdStyle: CSSProperties = {
    padding: '13px 14px',
    fontSize: '13px',
    color: '#111827',
    borderBottom: '1px solid #F9FAFB',
    verticalAlign: 'middle',
  };

  const addBtn: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: '#007AFF',
    color: '#fff',
    border: 'none',
    borderRadius: '9999px',
    padding: '9px 20px',
    fontSize: '13px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
  };

  return (
    <Layout>
      <div style={pageWrap}>
        {/* Sidebar */}
        <aside style={sidebar}>
          <div style={sidebarLogo}>
            <div style={{ width: '32px', height: '32px', background: '#007AFF', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: '16px', fontWeight: 800 }}>T</span>
            </div>
            <div>
              <p style={{ margin: 0, color: '#fff', fontWeight: 700, fontSize: '15px' }}>Trippy Mates</p>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>Admin Panel</p>
            </div>
          </div>
          <nav style={{ padding: '16px 0', flex: 1 }}>
            {NAV_ITEMS.map(item => (
              <button key={item.id} style={navItem(activeNav === item.id)} onClick={() => setActiveNav(item.id)}>
                {item.icon}
                {item.label}
                {activeNav === item.id && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
              </button>
            ))}
          </nav>
          <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>
                AD
              </div>
              <div>
                <p style={{ margin: 0, color: '#fff', fontSize: '13px', fontWeight: 600 }}>Admin User</p>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>admin@trippymates.com</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main style={main}>
          <div style={topBar}>
            <div>
              <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: 800, color: '#111827' }}>Dashboard</h1>
              <p style={{ margin: 0, fontSize: '14px', color: '#6B7280' }}>Welcome back, Admin. Here's what's happening today.</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={addBtn}>
                <Plus size={14} />
                Add Trip
              </button>
              <button style={{ ...addBtn, background: '#10B981' }}>
                <Plus size={14} />
                Add Captain
              </button>
            </div>
          </div>

          {/* Stats */}
          <div style={statsGrid}>
            {STATS.map(s => (
              <div key={s.label} style={statCard(s.color)}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ background: s.color + '15', borderRadius: '10px', padding: '8px' }}>{s.icon}</div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#10B981', background: '#DCFCE7', borderRadius: '9999px', padding: '2px 8px' }}>
                    {s.change}
                  </span>
                </div>
                <p style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 800, color: '#111827' }}>{s.value}</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Recent Bookings Table */}
          <div style={tableCard}>
            <div style={tableHeader}>
              <div>
                <h2 style={{ margin: '0 0 2px', fontSize: '16px', fontWeight: 700, color: '#111827' }}>Recent Bookings</h2>
                <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>Latest 5 booking transactions</p>
              </div>
              <button style={{ ...addBtn, background: '#F3F4F6', color: '#374151' }}>
                View All
                <ChevronRight size={14} />
              </button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Booking ID</th>
                  <th style={thStyle}>User</th>
                  <th style={thStyle}>Trip</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Amount</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_BOOKINGS.map(b => {
                  const st = statusConfig[b.status as BookingStatus];
                  return (
                    <tr key={b.id}>
                      <td style={tdStyle}>
                        <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '12px', color: '#007AFF' }}>{b.id}</span>
                      </td>
                      <td style={tdStyle}><span style={{ fontWeight: 600 }}>{b.user}</span></td>
                      <td style={{ ...tdStyle, color: '#6B7280' }}>{b.trip}</td>
                      <td style={{ ...tdStyle, color: '#6B7280', fontSize: '12px' }}>{b.date}</td>
                      <td style={tdStyle}><span style={{ fontWeight: 700 }}>{b.amount}</span></td>
                      <td style={tdStyle}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600, background: st.bg, color: st.color }}>
                          {st.icon}{st.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </Layout>
  );
}
