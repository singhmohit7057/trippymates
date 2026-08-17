import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { mockGallery, type GalleryPhoto, type GalleryCategory } from '../../data/mock';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const CATEGORIES: GalleryCategory[] = ['Himalayan', 'Nature', 'Culture', 'International', 'Valleys'];

const EMPTY: Partial<GalleryPhoto> = {
  src: '', destination: '', category: 'Himalayan', caption: '', height: 260,
};

export default function AdminGallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<GalleryPhoto> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchPhotos = async () => {
    if (!isSupabaseConfigured()) { setPhotos(mockGallery); setLoading(false); return; }
    const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
    setPhotos((data as GalleryPhoto[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchPhotos(); }, []);

  const handleSave = async () => {
    if (!editing || !isSupabaseConfigured()) return;
    setSaving(true);
    const { id, ...rest } = editing as GalleryPhoto;
    if (id) {
      await supabase.from('gallery').update(rest).eq('id', id);
    } else {
      await supabase.from('gallery').insert(rest);
    }
    setSaving(false);
    setEditing(null);
    fetchPhotos();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this photo?')) return;
    if (!isSupabaseConfigured()) return;
    await supabase.from('gallery').delete().eq('id', id);
    fetchPhotos();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Gallery ({photos.length})</h1>
        <button onClick={() => setEditing({ ...EMPTY })} style={btnStyle}><Plus size={16} /> Add Photo</button>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 600 }}>
          <thead>
            <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <th style={th}>Image</th>
              <th style={th}>Destination</th>
              <th style={th}>Category</th>
              <th style={th}>Caption</th>
              <th style={th}>Height</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {photos.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={td}>
                  <img src={p.src} alt={p.caption} style={{ width: 56, height: 40, borderRadius: 6, objectFit: 'cover' }} />
                </td>
                <td style={td}>{p.destination}</td>
                <td style={td}><span style={{ ...badge, background: catColor(p.category) }}>{p.category}</span></td>
                <td style={{ ...td, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.caption}</td>
                <td style={td}>{p.height}px</td>
                <td style={td}>
                  <button onClick={() => setEditing(p)} style={iconBtn}><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(p.id)} style={{ ...iconBtn, color: '#EF4444' }}><Trash2 size={14} /></button>
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
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{editing.id ? 'Edit Photo' : 'New Photo'}</h2>
              <button onClick={() => setEditing(null)} style={iconBtn}><X size={18} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="Image URL" value={editing.src || ''} onChange={v => setEditing({ ...editing, src: v })} />
              <Field label="Destination" value={editing.destination || ''} onChange={v => setEditing({ ...editing, destination: v })} />
              <Select label="Category" value={editing.category || 'Himalayan'} options={CATEGORIES} onChange={v => setEditing({ ...editing, category: v as GalleryCategory })} />
              <Field label="Height (px)" value={String(editing.height || 260)} onChange={v => setEditing({ ...editing, height: Number(v) || 260 })} />
              <div style={{ gridColumn: '1 / -1' }}>
                <Field label="Caption" value={editing.caption || ''} onChange={v => setEditing({ ...editing, caption: v })} />
              </div>
            </div>
            {editing.src && (
              <div style={{ marginTop: 14, borderRadius: 8, overflow: 'hidden', border: '1px solid #E5E7EB' }}>
                <img src={editing.src} alt="Preview" style={{ width: '100%', height: 120, objectFit: 'cover' }} />
              </div>
            )}
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

function catColor(cat: GalleryCategory): string {
  switch (cat) {
    case 'Himalayan': return '#DBEAFE';
    case 'Nature': return '#D1FAE5';
    case 'Culture': return '#FEF3C7';
    case 'International': return '#E0E7FF';
    case 'Valleys': return '#FCE7F3';
  }
}

const btnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#007AFF', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' };
const iconBtn: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 6, color: '#6B7280' };
const th: React.CSSProperties = { textAlign: 'left', padding: '10px 14px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: '#9CA3AF', letterSpacing: '0.5px' };
const td: React.CSSProperties = { padding: '10px 14px', verticalAlign: 'middle' };
const badge: React.CSSProperties = { padding: '3px 10px', borderRadius: 9999, fontSize: 11, fontWeight: 600 };
const overlay: React.CSSProperties = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 16 };
const modal: React.CSSProperties = { background: '#fff', borderRadius: 16, padding: 20, width: '100%', maxWidth: 520, maxHeight: '85vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' };
const labelStyle: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 4 };
const inputStyle: React.CSSProperties = { width: '100%', padding: '9px 12px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 13, outline: 'none', boxSizing: 'border-box' };
