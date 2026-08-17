import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { mockTrips, mockDestinations } from '../../data/mock';
import type { Trip, Destination } from '../../types';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const EMPTY: Partial<Trip> = {
  title: '', slug: '', destination: '', state: '', country: 'India', image_url: '',
  duration_days: 1, price_per_person: 0, max_travelers: 20, current_travelers: 0,
  type: 'domestic', category: 'adventure', rating: 0, review_count: 0,
  available_captains: 0, description: '', highlights: [], inclusions: [], gallery_images: [],
};

export default function AdminTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Trip> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchTrips = async () => {
    if (!isSupabaseConfigured()) { setTrips(mockTrips); setLoading(false); return; }
    const { data } = await supabase.from('trips').select('*').order('created_at', { ascending: false });
    setTrips((data as Trip[]) || []);
    setLoading(false);
  };

  const fetchDestinations = async () => {
    if (!isSupabaseConfigured()) { setDestinations(mockDestinations); return; }
    const { data } = await supabase.from('destinations').select('*').order('name');
    setDestinations((data as Destination[]) || []);
  };

  useEffect(() => { fetchTrips(); fetchDestinations(); }, []);

  const handleSave = async () => {
    if (!editing || !isSupabaseConfigured()) return;
    setSaving(true);
    const { id, created_at, ...rest } = editing as Trip;
    if (id) {
      await supabase.from('trips').update(rest).eq('id', id);
    } else {
      await supabase.from('trips').insert(rest);
    }
    setSaving(false);
    setEditing(null);
    fetchTrips();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this trip?')) return;
    if (!isSupabaseConfigured()) return;
    await supabase.from('trips').delete().eq('id', id);
    fetchTrips();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Trips ({trips.length})</h1>
        <button onClick={() => setEditing({ ...EMPTY })} style={btnStyle}><Plus size={16} /> Add Trip</button>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 700 }}>
          <thead>
            <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <th style={th}>Title</th>
              <th style={th}>Type</th>
              <th style={th}>Place</th>
              <th style={th}>Price</th>
              <th style={th}>Destination</th>
              <th style={th}>Duration</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trips.map(t => (
              <tr key={t.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={td}>{t.title}</td>
                <td style={td}><span style={{ ...badge, background: t.type === 'domestic' ? '#DBEAFE' : t.type === 'international' ? '#D1FAE5' : '#FEF3C7' }}>{t.type}</span></td>
                <td style={td}>{t.destination}</td>
                <td style={td}>₹{t.price_per_person?.toLocaleString()}</td>
                <td style={td}>{t.state || '—'}</td>
                <td style={td}>{t.duration_days}D</td>
                <td style={td}>
                  <button onClick={() => setEditing(t)} style={iconBtn}><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(t.id)} style={{ ...iconBtn, color: '#EF4444' }}><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div style={overlay}>
          <div style={modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{editing.id ? 'Edit Trip' : 'New Trip'}</h2>
              <button onClick={() => setEditing(null)} style={iconBtn}><X size={18} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, maxHeight: '60vh', overflowY: 'auto' }}>
              <Field label="Title" value={editing.title || ''} onChange={v => setEditing({ ...editing, title: v })} />
              <Field label="Slug" value={editing.slug || ''} onChange={v => setEditing({ ...editing, slug: v })} />
              <Field label="Place" value={editing.destination || ''} onChange={v => setEditing({ ...editing, destination: v })} />
              <div>
                <label style={labelStyle}>Destination (State)</label>
                <select value={editing.state || ''} onChange={e => setEditing({ ...editing, state: e.target.value })} style={inputStyle}>
                  <option value="">— Select —</option>
                  {destinations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
              </div>
              <Field label="Image URL" value={editing.image_url || ''} onChange={v => setEditing({ ...editing, image_url: v })} />
              <Select label="Type" value={editing.type || 'domestic'} options={['domestic','international','corporate']} onChange={v => setEditing({ ...editing, type: v as Trip['type'] })} />
              <Field label="Category" value={editing.category || ''} onChange={v => setEditing({ ...editing, category: v })} />
              <Field label="Price (₹)" value={String(editing.price_per_person || 0)} onChange={v => setEditing({ ...editing, price_per_person: Number(v) })} type="number" />
              <Field label="Duration (days)" value={String(editing.duration_days || 1)} onChange={v => setEditing({ ...editing, duration_days: Number(v) })} type="number" />
              <Field label="Max Travelers" value={String(editing.max_travelers || 20)} onChange={v => setEditing({ ...editing, max_travelers: Number(v) })} type="number" />
              <Field label="Current Travelers" value={String(editing.current_travelers || 0)} onChange={v => setEditing({ ...editing, current_travelers: Number(v) })} type="number" />
              <Field label="Rating" value={String(editing.rating || 0)} onChange={v => setEditing({ ...editing, rating: Number(v) })} type="number" />
              <Field label="Review Count" value={String(editing.review_count || 0)} onChange={v => setEditing({ ...editing, review_count: Number(v) })} type="number" />
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Description</label>
                <textarea value={editing.description || ''} onChange={e => setEditing({ ...editing, description: e.target.value })} style={{ ...inputStyle, height: 80, resize: 'vertical' }} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Highlights (comma-separated)</label>
                <input value={(editing.highlights || []).join(', ')} onChange={e => setEditing({ ...editing, highlights: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} style={inputStyle} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Inclusions (comma-separated)</label>
                <input value={(editing.inclusions || []).join(', ')} onChange={e => setEditing({ ...editing, inclusions: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} style={inputStyle} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Gallery Images (comma-separated URLs)</label>
                <textarea value={(editing.gallery_images || []).join(', ')} onChange={e => setEditing({ ...editing, gallery_images: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} style={{ ...inputStyle, height: 60, resize: 'vertical' }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
              <button onClick={() => setEditing(null)} style={{ ...btnStyle, background: '#fff', color: '#374151', border: '1px solid #E5E7EB' }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={btnStyle}>{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} style={inputStyle} />
    </div>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} style={inputStyle}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

const btnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 6, background: '#007AFF', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' };
const iconBtn: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', padding: 4 };
const th: React.CSSProperties = { textAlign: 'left', padding: '10px 14px', fontWeight: 600, color: '#6B7280', fontSize: 12, textTransform: 'uppercase' };
const td: React.CSSProperties = { padding: '10px 14px', color: '#111827' };
const badge: React.CSSProperties = { padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, textTransform: 'capitalize' };
const overlay: React.CSSProperties = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 16 };
const modal: React.CSSProperties = { background: '#fff', borderRadius: 16, padding: 20, width: '100%', maxWidth: 640, maxHeight: '85vh', overflow: 'auto' };
const labelStyle: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 4 };
const inputStyle: React.CSSProperties = { width: '100%', padding: '8px 12px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 13, outline: 'none', boxSizing: 'border-box' };
