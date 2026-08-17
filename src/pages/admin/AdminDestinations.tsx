import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { mockDestinations } from '../../data/mock';
import type { Destination } from '../../types';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const EMPTY: Partial<Destination> = {
  name: '', slug: '', image_url: '', type: 'domestic',
};

export default function AdminDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Destination> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchDestinations = async () => {
    if (!isSupabaseConfigured()) { setDestinations(mockDestinations); setLoading(false); return; }
    const { data } = await supabase.from('destinations').select('*').order('created_at', { ascending: false });
    setDestinations((data as Destination[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchDestinations(); }, []);

  const handleSave = async () => {
    if (!editing || !isSupabaseConfigured()) return;
    setSaving(true);
    const { id, created_at, ...rest } = editing as Destination;
    if (id) {
      await supabase.from('destinations').update(rest).eq('id', id);
    } else {
      await supabase.from('destinations').insert(rest);
    }
    setSaving(false);
    setEditing(null);
    fetchDestinations();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this destination?')) return;
    if (!isSupabaseConfigured()) return;
    await supabase.from('destinations').delete().eq('id', id);
    fetchDestinations();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Destinations ({destinations.length})</h1>
        <button onClick={() => setEditing({ ...EMPTY })} style={btnStyle}><Plus size={16} /> Add Destination</button>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 500 }}>
          <thead>
            <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <th style={th}>Image</th>
              <th style={th}>Name</th>
              <th style={th}>Slug</th>
              <th style={th}>Type</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map(d => (
              <tr key={d.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={td}>
                  <img src={d.image_url} alt={d.name} style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }} />
                </td>
                <td style={td}>{d.name}</td>
                <td style={td}><code style={{ fontSize: 12, color: '#6B7280' }}>{d.slug}</code></td>
                <td style={td}><span style={{ ...badge, background: d.type === 'domestic' ? '#DBEAFE' : '#D1FAE5' }}>{d.type}</span></td>
                <td style={td}>
                  <button onClick={() => setEditing(d)} style={iconBtn}><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(d.id)} style={{ ...iconBtn, color: '#EF4444' }}><Trash2 size={14} /></button>
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
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{editing.id ? 'Edit Destination' : 'New Destination'}</h2>
              <button onClick={() => setEditing(null)} style={iconBtn}><X size={18} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="Name" value={editing.name || ''} onChange={v => setEditing({ ...editing, name: v })} />
              <Field label="Slug" value={editing.slug || ''} onChange={v => setEditing({ ...editing, slug: v })} />
              <Field label="Image URL" value={editing.image_url || ''} onChange={v => setEditing({ ...editing, image_url: v })} />
              <Select label="Type" value={editing.type || 'domestic'} options={['domestic', 'international']} onChange={v => setEditing({ ...editing, type: v as Destination['type'] })} />
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

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} style={inputStyle} />
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

const btnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#007AFF', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' };
const iconBtn: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 6, color: '#6B7280' };
const th: React.CSSProperties = { textAlign: 'left', padding: '10px 14px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: '#9CA3AF', letterSpacing: '0.5px' };
const td: React.CSSProperties = { padding: '10px 14px', verticalAlign: 'middle' };
const badge: React.CSSProperties = { padding: '3px 10px', borderRadius: 9999, fontSize: 11, fontWeight: 600, textTransform: 'capitalize' };
const overlay: React.CSSProperties = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 16 };
const modal: React.CSSProperties = { background: '#fff', borderRadius: 16, padding: 20, width: '100%', maxWidth: 520, maxHeight: '85vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' };
const labelStyle: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 4 };
const inputStyle: React.CSSProperties = { width: '100%', padding: '9px 12px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 13, outline: 'none', boxSizing: 'border-box' };
