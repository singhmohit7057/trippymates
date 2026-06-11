import { type CSSProperties, type ReactElement, useState } from 'react';
import { Calendar, Users, CheckCircle, AlertCircle, XCircle, Clock, X } from 'lucide-react';
import Layout from '../../components/Layout';

type BookingStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';
type Tab = 'all' | 'upcoming' | 'completed' | 'cancelled';

interface Booking {
  id: string;
  tripName: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  price: number;
  status: BookingStatus;
  accentColor: string;
}

const BOOKINGS: Booking[] = [
  { id: 'BK-001', tripName: 'Bali Spirit & Serenity', destination: 'Bali, Indonesia', startDate: 'Aug 10, 2025', endDate: 'Aug 17, 2025', travelers: 2, price: 1798, status: 'confirmed', accentColor: '#4FBEFF' },
  { id: 'BK-002', tripName: 'Goa Beach Carnival', destination: 'Goa, India', startDate: 'Aug 22, 2025', endDate: 'Aug 26, 2025', travelers: 3, price: 897, status: 'pending', accentColor: '#F59E0B' },
  { id: 'BK-003', tripName: 'Kashmir Valley Magic', destination: 'Srinagar & Pahalgam, India', startDate: 'Jul 18, 2025', endDate: 'Jul 24, 2025', travelers: 2, price: 898, status: 'completed', accentColor: '#10B981' },
  { id: 'BK-004', tripName: 'Thailand Highlights', destination: 'Bangkok & Chiang Mai', startDate: 'Mar 5, 2025', endDate: 'Mar 13, 2025', travelers: 1, price: 749, status: 'completed', accentColor: '#F26110' },
  { id: 'BK-005', tripName: 'Dubai Luxury Escape', destination: 'Dubai, UAE', startDate: 'Jan 15, 2025', endDate: 'Jan 20, 2025', travelers: 2, price: 2998, status: 'cancelled', accentColor: '#9552E0' },
];

const TABS: { id: Tab; label: string }[] = [
  { id: 'all', label: 'All Bookings' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
];

const statusMap: Record<BookingStatus, { label: string; bg: string; color: string; icon: ReactElement }> = {
  confirmed: { label: 'Confirmed', bg: '#DCFCE7', color: '#15803D', icon: <CheckCircle size={13} /> },
  pending: { label: 'Pending', bg: '#FEF9C3', color: '#A16207', icon: <AlertCircle size={13} /> },
  completed: { label: 'Completed', bg: '#F3F4F6', color: '#374151', icon: <CheckCircle size={13} /> },
  cancelled: { label: 'Cancelled', bg: '#FEE2E2', color: '#B91C1C', icon: <XCircle size={13} /> },
};

function CancelDialog({ bookingId, onConfirm, onCancel }: { bookingId: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
    }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', maxWidth: '400px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#111827' }}>Cancel Booking?</h3>
          <button onClick={onCancel} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <X size={20} color="#6B7280" />
          </button>
        </div>
        <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#6B7280', lineHeight: 1.5 }}>
          Are you sure you want to cancel booking <strong style={{ color: '#111827' }}>{bookingId}</strong>?
        </p>
        <p style={{ margin: '0 0 24px', fontSize: '13px', color: '#EF4444' }}>
          Cancellation fees may apply. Please review our cancellation policy for refund eligibility.
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={onCancel} style={{ flex: 1, padding: '11px', borderRadius: '9999px', border: '1.5px solid #E5E7EB', background: '#fff', color: '#374151', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px' }}>
            Keep Booking
          </button>
          <button onClick={onConfirm} style={{ flex: 1, padding: '11px', borderRadius: '9999px', border: 'none', background: '#EF4444', color: '#fff', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px' }}>
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [cancelTarget, setCancelTarget] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>(BOOKINGS);

  const filtered = bookings.filter(b => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return b.status === 'confirmed' || b.status === 'pending';
    if (activeTab === 'completed') return b.status === 'completed';
    if (activeTab === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  const handleCancelConfirm = () => {
    if (cancelTarget) {
      setBookings(prev => prev.map(b => b.id === cancelTarget ? { ...b, status: 'cancelled' as BookingStatus } : b));
      setCancelTarget(null);
    }
  };

  const hero: CSSProperties = {
    background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 100%)',
    padding: '40px 24px 32px',
    color: '#fff',
  };

  const body: CSSProperties = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 24px 80px',
  };

  const tabsRow: CSSProperties = {
    display: 'flex',
    gap: '4px',
    margin: '32px 0 24px',
    background: '#F3F4F6',
    borderRadius: '12px',
    padding: '4px',
  };

  const tabBtn = (active: boolean): CSSProperties => ({
    flex: 1,
    padding: '10px 16px',
    borderRadius: '9px',
    border: 'none',
    background: active ? '#fff' : 'transparent',
    color: active ? '#111827' : '#6B7280',
    fontWeight: active ? 700 : 500,
    fontSize: '14px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    boxShadow: active ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
    transition: 'all 0.15s',
  });

  const card: CSSProperties = {
    background: '#FFFFFF',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    overflow: 'hidden',
    marginBottom: '16px',
    border: '1px solid #E5E7EB',
    display: 'flex',
  };

  return (
    <Layout>
      {cancelTarget && (
        <CancelDialog
          bookingId={cancelTarget}
          onConfirm={handleCancelConfirm}
          onCancel={() => setCancelTarget(null)}
        />
      )}

      <div style={hero}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 6px' }}>My Bookings</h1>
          <p style={{ margin: 0, opacity: 0.8, fontSize: '15px' }}>{bookings.length} total bookings</p>
        </div>
      </div>

      <div style={body}>
        {/* Tabs */}
        <div style={tabsRow}>
          {TABS.map(t => (
            <button key={t.id} style={tabBtn(activeTab === t.id)} onClick={() => setActiveTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Booking Cards */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 0', color: '#9CA3AF' }}>
            <Calendar size={48} color="#E5E7EB" style={{ display: 'block', margin: '0 auto 16px' }} />
            <p style={{ fontSize: '16px', fontWeight: 500 }}>No bookings in this category</p>
            <p style={{ fontSize: '14px' }}>Your {activeTab} trips will appear here</p>
          </div>
        ) : (
          filtered.map(b => {
            const st = statusMap[b.status];
            const isUpcoming = b.status === 'confirmed' || b.status === 'pending';
            return (
              <div key={b.id} style={card}>
                {/* Color bar */}
                <div style={{ width: '6px', background: b.accentColor, flexShrink: 0 }} />
                <div style={{ flex: 1, padding: '20px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#111827' }}>{b.tripName}</h3>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600, background: st.bg, color: st.color }}>
                          {st.icon}{st.label}
                        </span>
                      </div>
                      <p style={{ margin: '0 0 10px', fontSize: '14px', color: '#6B7280' }}>{b.destination}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#374151' }}>
                          <Clock size={13} color="#9CA3AF" />
                          {b.startDate} – {b.endDate}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#374151' }}>
                          <Users size={13} color="#9CA3AF" />
                          {b.travelers} traveler{b.travelers !== 1 ? 's' : ''}
                        </span>
                        <span style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>
                          Ref: <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{b.id}</span>
                        </span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 800, color: '#007AFF' }}>
                        ₹{b.price.toLocaleString('en-IN')}
                      </p>
                      {isUpcoming && (
                        <button
                          onClick={() => setCancelTarget(b.id)}
                          style={{
                            padding: '8px 18px', borderRadius: '9999px',
                            border: '1.5px solid #FCA5A5', background: '#FEF2F2',
                            color: '#DC2626', fontWeight: 600, cursor: 'pointer',
                            fontFamily: 'inherit', fontSize: '13px',
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Layout>
  );
}
