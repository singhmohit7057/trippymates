import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import type { CustomTripEnquiry } from '../../types';

interface Enquiry extends CustomTripEnquiry {
  status?: string;
}

export default function AdminEnquiries() {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!isSupabaseConfigured()) { setItems([]); setLoading(false); return; }
    const { data } = await supabase.from('custom_trip_enquiries').select('*').order('created_at', { ascending: false });
    setItems((data as Enquiry[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (id: string, status: string) => {
    if (!isSupabaseConfigured()) return;
    await supabase.from('custom_trip_enquiries').update({ status }).eq('id', id);
    fetchData();
  };

  if (loading) return <p>Loading...</p>;

  if (!items.length) return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Custom Trip Enquiries</h1>
      <p style={{ color: '#6B7280' }}>No enquiries yet. They'll appear here when users submit the custom trip form.</p>
    </div>
  );

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Custom Trip Enquiries ({items.length})</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {items.map(e => (
          <div key={e.id} style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: 15, margin: 0 }}>{e.full_name}</p>
                <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>{e.email} · {e.phone}</p>
              </div>
              <select
                value={e.status || 'pending'}
                onChange={ev => updateStatus(e.id!, ev.target.value)}
                style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #E5E7EB', fontSize: 12, fontWeight: 600, color: statusColor(e.status) }}
              >
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="planning">Planning</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10, fontSize: 13 }}>
              <Detail label="Destination" value={e.destination} />
              <Detail label="Dates" value={`${e.start_date || '—'} → ${e.end_date || '—'}`} />
              <Detail label="Travelers" value={String(e.travelers)} />
              <Detail label="Budget" value={e.budget_range || '—'} />
              <Detail label="Trip Type" value={e.trip_type || '—'} />
              <Detail label="Captain" value={e.captain_required} />
              <Detail label="Accommodation" value={e.accommodation_needed ? 'Yes' : 'No'} />
              <Detail label="Transport" value={e.transport_needed ? 'Yes' : 'No'} />
            </div>
            {e.additional_requirements && (
              <p style={{ fontSize: 13, color: '#6B7280', marginTop: 10, lineHeight: 1.5 }}>
                <strong>Notes:</strong> {e.additional_requirements}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ fontSize: 11, color: '#9CA3AF', margin: 0, textTransform: 'uppercase', fontWeight: 600 }}>{label}</p>
      <p style={{ fontSize: 13, color: '#111827', margin: '2px 0 0' }}>{value}</p>
    </div>
  );
}

function statusColor(status?: string) {
  switch (status) {
    case 'contacted': return '#2563EB';
    case 'planning': return '#D97706';
    case 'completed': return '#059669';
    case 'cancelled': return '#DC2626';
    default: return '#6B7280';
  }
}
