import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { mockTestimonials, type Testimonial } from '../../data/mock';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const EMPTY: Partial<Testimonial> = {
  name: '', role: '', text: '', avatarColor: '#007AFF', avatarInitial: '', rating: 5, destination: '',
};

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    if (!isSupabaseConfigured()) { setItems(mockTestimonials); setLoading(false); return; }
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    setItems((data as Testimonial[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    if (!editing || !isSupabaseConfigured()) return;
    setSaving(true);
    const payload = {
      name: editing.name, role: editing.role, text: editing.text,
      avatar_color: editing.avatarColor, avatar_initial: editing.avatarInitial,
      rating: editing.rating, destination: editing.destination,
    };
    if (editing.id) await supabase.from('testimonials').update(payload).eq('id', editing.id);
    else await supabase.from('testimonials').insert(payload);
    setSaving(false); setEditing(null); fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    if (!isSupabaseConfigured()) return;
    await supabase.from('testimonials').delete().eq('id', id);
    fetchData();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Testimonials ({items.length})</h1>
        <button onClick={() => setEditing({ ...EMPTY })} style={btnStyle}><Plus size={16} /> Add</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {items.map(t => (
          <div key={t.id} style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, margin: 0 }}>{t.name}</p>
                <p style={{ fontSize: 12, color: '#6B7280', margin: '2px 0 0' }}>{t.role}</p>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <button onClick={() => setEditing(t)} style={iconBtn}><Pencil size={14} /></button>
                <button onClick={() => handleDelete(t.id)} style={{ ...iconBtn, color: '#EF4444' }}><Trash2 size={14} /></button>
              </div>
            </div>
            <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.5, margin: '0 0 8px' }}>"{t.text}"</p>
            <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0 }}>{t.destination} · {'★'.repeat(t.rating)}</p>
          </div>
        ))}
      </div>

      {editing && (
        <div style={overlay}>
          <div style={modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{editing.id ? 'Edit' : 'New'} Testimonial</h2>
              <button onClick={() => setEditing(null)} style={iconBtn}><X size={18} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="Name" value={editing.name || ''} onChange={v => setEditing({ ...editing, name: v })} />
              <Field label="Role" value={editing.role || ''} onChange={v => setEditing({ ...editing, role: v })} />
              <Field label="Destination" value={editing.destination || ''} onChange={v => setEditing({ ...editing, destination: v })} />
              <Field label="Rating (1-5)" value={String(editing.rating || 5)} onChange={v => setEditing({ ...editing, rating: Number(v) })} type="number" />
              <Field label="Avatar Initial" value={editing.avatarInitial || ''} onChange={v => setEditing({ ...editing, avatarInitial: v })} />
              <Field label="Avatar Color" value={editing.avatarColor || '#007AFF'} onChange={v => setEditing({ ...editing, avatarColor: v })} type="color" />
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Review Text</label>
                <textarea value={editing.text || ''} onChange={e => setEditing({ ...editing, text: e.target.value })} style={{ ...inputStyle, height: 100, resize: 'vertical' }} />
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

const btnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 6, background: '#007AFF', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' };
const iconBtn: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', padding: 4 };
const overlay: React.CSSProperties = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 16 };
const modal: React.CSSProperties = { background: '#fff', borderRadius: 16, padding: 20, width: '100%', maxWidth: 540, maxHeight: '85vh', overflow: 'auto' };
const labelStyle: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 4 };
const inputStyle: React.CSSProperties = { width: '100%', padding: '8px 12px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 13, outline: 'none', boxSizing: 'border-box' };
