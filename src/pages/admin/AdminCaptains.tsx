import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { mockCaptains } from '../../data/mock';
import type { Captain } from '../../types';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const EMPTY: Partial<Captain> = {
  name: '', photo_url: '', country: 'India', city: '', languages: [], expertise: [],
  rating: 0, review_count: 0, hourly_rate: 0, availability: 'available', bio: '',
  verified: false, category: 'adventure',
};

export default function AdminCaptains() {
  const [captains, setCaptains] = useState<Captain[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Captain> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetch = async () => {
    if (!isSupabaseConfigured()) { setCaptains(mockCaptains); setLoading(false); return; }
    const { data } = await supabase.from('captains').select('*').order('created_at', { ascending: false });
    setCaptains((data as Captain[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const handleSave = async () => {
    if (!editing || !isSupabaseConfigured()) return;
    setSaving(true);
    const { id, created_at, ...rest } = editing as Captain;
    if (id) await supabase.from('captains').update(rest).eq('id', id);
    else await supabase.from('captains').insert(rest);
    setSaving(false); setEditing(null); fetch();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this captain?')) return;
    if (!isSupabaseConfigured()) return;
    await supabase.from('captains').delete().eq('id', id);
    fetch();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Captains ({captains.length})</h1>
        <button onClick={() => setEditing({ ...EMPTY })} style={btnStyle}><Plus size={16} /> Add Captain</button>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 600 }}>
          <thead>
            <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <th style={th}>Name</th>
              <th style={th}>City</th>
              <th style={th}>Category</th>
              <th style={th}>Hourly Rate</th>
              <th style={th}>Rating</th>
              <th style={th}>Verified</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {captains.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={td}>{c.name}</td>
                <td style={td}>{c.city}</td>
                <td style={td}>{c.category}</td>
                <td style={td}>₹{c.hourly_rate}</td>
                <td style={td}>{c.rating}★</td>
                <td style={td}>{c.verified ? '✅' : '—'}</td>
                <td style={td}>
                  <button onClick={() => setEditing(c)} style={iconBtn}><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(c.id)} style={{ ...iconBtn, color: '#EF4444' }}><Trash2 size={14} /></button>
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
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{editing.id ? 'Edit Captain' : 'New Captain'}</h2>
              <button onClick={() => setEditing(null)} style={iconBtn}><X size={18} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, maxHeight: '60vh', overflowY: 'auto' }}>
              <Field label="Name" value={editing.name || ''} onChange={v => setEditing({ ...editing, name: v })} />
              <Field label="City" value={editing.city || ''} onChange={v => setEditing({ ...editing, city: v })} />
              <Field label="Country" value={editing.country || ''} onChange={v => setEditing({ ...editing, country: v })} />
              <Field label="Photo URL" value={editing.photo_url || ''} onChange={v => setEditing({ ...editing, photo_url: v })} />
              <Field label="Hourly Rate (₹)" value={String(editing.hourly_rate || 0)} onChange={v => setEditing({ ...editing, hourly_rate: Number(v) })} type="number" />
              <Field label="Rating" value={String(editing.rating || 0)} onChange={v => setEditing({ ...editing, rating: Number(v) })} type="number" />
              <Field label="Review Count" value={String(editing.review_count || 0)} onChange={v => setEditing({ ...editing, review_count: Number(v) })} type="number" />
              <Select label="Category" value={editing.category || 'adventure'} options={['adventure','luxury','cultural','food','budget','nature','trekking']} onChange={v => setEditing({ ...editing, category: v as Captain['category'] })} />
              <Select label="Availability" value={editing.availability || 'available'} options={['available','busy','offline']} onChange={v => setEditing({ ...editing, availability: v as Captain['availability'] })} />
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Bio</label>
                <textarea value={editing.bio || ''} onChange={e => setEditing({ ...editing, bio: e.target.value })} style={{ ...inputStyle, height: 80, resize: 'vertical' }} />
              </div>
              <div>
                <label style={labelStyle}>Languages (comma-separated)</label>
                <input value={(editing.languages || []).join(', ')} onChange={e => setEditing({ ...editing, languages: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Expertise (comma-separated)</label>
                <input value={(editing.expertise || []).join(', ')} onChange={e => setEditing({ ...editing, expertise: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} style={inputStyle} />
              </div>
              <div>
                <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" checked={editing.verified || false} onChange={e => setEditing({ ...editing, verified: e.target.checked })} />
                  Verified
                </label>
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
  return (<div><label style={labelStyle}>{label}</label><input type={type} value={value} onChange={e => onChange(e.target.value)} style={inputStyle} /></div>);
}
function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (<div><label style={labelStyle}>{label}</label><select value={value} onChange={e => onChange(e.target.value)} style={inputStyle}>{options.map(o => <option key={o} value={o}>{o}</option>)}</select></div>);
}

const btnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 6, background: '#007AFF', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' };
const iconBtn: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', padding: 4 };
const th: React.CSSProperties = { textAlign: 'left', padding: '10px 14px', fontWeight: 600, color: '#6B7280', fontSize: 12, textTransform: 'uppercase' };
const td: React.CSSProperties = { padding: '10px 14px', color: '#111827' };
const overlay: React.CSSProperties = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 16 };
const modal: React.CSSProperties = { background: '#fff', borderRadius: 16, padding: 20, width: '100%', maxWidth: 640, maxHeight: '85vh', overflow: 'auto' };
const labelStyle: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 4 };
const inputStyle: React.CSSProperties = { width: '100%', padding: '8px 12px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 13, outline: 'none', boxSizing: 'border-box' };
