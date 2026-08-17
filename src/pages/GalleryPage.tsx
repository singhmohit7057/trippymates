import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import Layout from '../components/Layout';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { mockGallery, type GalleryPhoto, type GalleryCategory } from '../data/mock';

const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

type Category = 'All' | GalleryCategory;

interface Photo extends GalleryPhoto {}

const FILTERS: { key: Category; emoji: string }[] = [
  { key: 'All',           emoji: '🌍' },
  { key: 'Himalayan',     emoji: '🏔️' },
  { key: 'Nature',        emoji: '🌿' },
  { key: 'Culture',       emoji: '🪔' },
  { key: 'International', emoji: '✈️' },
  { key: 'Valleys',       emoji: '🏞️' },
];

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>(mockGallery);
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const [lightbox, setLightbox]         = useState<number | null>(null);
  const [search, setSearch]             = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    supabase.from('gallery').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setPhotos(data as Photo[]); });
  }, []);

  const filtered = photos.filter(p => {
    const matchCat = activeFilter === 'All' || p.category === activeFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || p.destination.toLowerCase().includes(q) || p.caption.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const col1 = filtered.filter((_, i) => i % 3 === 0);
  const col2 = filtered.filter((_, i) => i % 3 === 1);
  const col3 = filtered.filter((_, i) => i % 3 === 2);

  const openLightbox = (photo: Photo) => setLightbox(filtered.indexOf(photo));
  const closeLightbox = () => setLightbox(null);
  const prevPhoto = () => setLightbox(l => l !== null ? (l - 1 + filtered.length) % filtered.length : null);
  const nextPhoto = () => setLightbox(l => l !== null ? (l + 1) % filtered.length : null);

  return (
    <Layout>
      <style>{`
        .gallery-pill { display:inline-flex; align-items:center; gap:6px; padding:8px 18px; border-radius:9999px; font-size:14px; font-weight:600; cursor:pointer; border:1.5px solid #E5E7EB; background:#fff; color:#6B7280; transition:all 0.15s; font-family:${font}; }
        .gallery-pill:hover { border-color:#007AFF; color:#007AFF; }
        .gallery-pill.active { background:#007AFF; color:#fff; border-color:#007AFF; }
        .gallery-tile { cursor:pointer; border-radius:16px; overflow:hidden; position:relative; }
        .gallery-tile img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.4s ease; }
        .gallery-tile:hover img { transform:scale(1.06); }
        .gallery-tile .tile-overlay { position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%); opacity:0; transition:opacity 0.25s; }
        .gallery-tile:hover .tile-overlay { opacity:1; }
        .gallery-tile .tile-caption { position:absolute; bottom:14px; left:14px; right:14px; color:#fff; font-size:13px; font-weight:500; line-height:1.4; opacity:0; transition:opacity 0.25s; }
        .gallery-tile:hover .tile-caption { opacity:1; }
        .gallery-masonry { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; align-items:start; }
        .gallery-col { display:flex; flex-direction:column; gap:16px; }
        @media(max-width:900px){ .gallery-masonry { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:560px){ .gallery-masonry { grid-template-columns:1fr; } }
        .lb-btn { background:rgba(255,255,255,0.12); border:none; border-radius:50%; width:44px; height:44px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#fff; transition:background 0.15s; }
        .lb-btn:hover { background:rgba(255,255,255,0.25); }
        .gallery-search input::placeholder { color:#9CA3AF; }
      `}</style>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #001F5B 0%, #0043C4 55%, #007AFF 100%)', height: 'calc(50vh - 26px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '88px 24px 80px', textAlign: 'center', fontFamily: font }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'7px', background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.22)', borderRadius:'9999px', padding:'6px 16px', fontSize:'13px', fontWeight:600, color:'#fff', marginBottom:'20px', backdropFilter:'blur(6px)' }}>
            📸 Photo Gallery
          </div>
          <h1 style={{ fontSize:'clamp(32px,5.5vw,56px)', fontWeight:900, color:'#fff', margin:'0 0 14px', letterSpacing:'-1.5px', lineHeight:1.1 }}>
            Moments from the Road
          </h1>
          <p style={{ fontSize:'17px', color:'rgba(255,255,255,0.6)', maxWidth:'480px', margin:'0 auto 28px', lineHeight:1.65 }}>
            Real trips. Real captains. Real memories — captured across India and beyond.
          </p>
          <div style={{ display:'inline-flex', gap:'24px', flexWrap:'wrap', justifyContent:'center' }}>
            {[['📸', `${photos.length}+ Photos`], ['📍', '17 Destinations'], ['🧭', '6 Captain Stories']].map(([icon, label]) => (
              <div key={String(label)} style={{ display:'flex', alignItems:'center', gap:'7px', background:'rgba(255,255,255,0.08)', borderRadius:'9999px', padding:'7px 16px', color:'rgba(255,255,255,0.85)', fontSize:'13px', fontWeight:600 }}>
                <span>{icon}</span>{label}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Body */}
      <div style={{ maxWidth:'1240px', margin:'0 auto', padding:'0 24px 56px', fontFamily: font }}>

        {/* Filter + Search row */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'16px', margin:'40px 0 32px', flexWrap:'wrap' }}>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
            {FILTERS.map(f => (
              <button
                key={f.key}
                className={`gallery-pill${activeFilter === f.key ? ' active' : ''}`}
                onClick={() => setActiveFilter(f.key)}
              >
                <span>{f.emoji}</span>{f.key}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="gallery-search" style={{ position:'relative', flexShrink:0 }}>
            <Search size={15} style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', color:'#9CA3AF', pointerEvents:'none' }} />
            <input
              type="text"
              placeholder="Search destinations…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft:'36px', paddingRight:'16px', height:'38px', border:'1.5px solid #E5E7EB', borderRadius:'9999px', fontSize:'14px', color:'#111827', outline:'none', fontFamily:font, background:'#fff', width:'220px', boxSizing:'border-box' }}
            />
          </div>
        </div>

        {/* Count */}
        <p style={{ margin:'0 0 24px', fontSize:'14px', color:'#9CA3AF', fontWeight:500 }}>
          {filtered.length} photo{filtered.length !== 1 ? 's' : ''}{activeFilter !== 'All' ? ` · ${activeFilter}` : ''}
          {search ? ` · "${search}"` : ''}
        </p>

        {/* Masonry grid */}
        {filtered.length > 0 ? (
          <div className="gallery-masonry">
            {[col1, col2, col3].map((col, ci) => (
              <div key={ci} className="gallery-col">
                {col.map((photo, i) => (
                  <motion.div
                    key={photo.id}
                    className="gallery-tile"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    onClick={() => openLightbox(photo)}
                    style={{ height: `${photo.height}px`, boxShadow:'0 4px 12px rgba(0,0,0,0.08)' }}
                  >
                    <img src={photo.src} alt={photo.caption} loading="lazy" />
                    <div className="tile-overlay" />
                    {/* Destination badge */}
                    <div style={{ position:'absolute', top:'12px', left:'12px', background:'rgba(0,0,0,0.5)', backdropFilter:'blur(6px)', borderRadius:'9999px', padding:'4px 10px', fontSize:'12px', fontWeight:700, color:'#fff', display:'flex', alignItems:'center', gap:'5px' }}>
                      <MapPin size={10} />{photo.destination}
                    </div>
                    <p className="tile-caption">{photo.caption}</p>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign:'center', padding:'80px 0', color:'#9CA3AF' }}>
            <div style={{ fontSize:'40px', marginBottom:'12px' }}>🔍</div>
            <p style={{ fontSize:'16px', fontWeight:500 }}>No photos found. Try a different search or filter.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
            style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.92)', zIndex:999, display:'flex', alignItems:'center', justifyContent:'center', padding:'24px' }}
          >
            {/* Close */}
            <button className="lb-btn" onClick={closeLightbox} style={{ position:'absolute', top:'20px', right:'20px' }}>
              <X size={20} />
            </button>

            {/* Prev */}
            <button className="lb-btn" onClick={e => { e.stopPropagation(); prevPhoto(); }} style={{ position:'absolute', left:'20px', top:'50%', transform:'translateY(-50%)' }}>
              <ChevronLeft size={22} />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth:'900px', width:'100%', borderRadius:'16px', overflow:'hidden', boxShadow:'0 32px 80px rgba(0,0,0,0.6)' }}
            >
              <img src={filtered[lightbox].src} alt={filtered[lightbox].caption} style={{ width:'100%', display:'block', maxHeight:'80vh', objectFit:'cover' }} />
              <div style={{ background:'#111827', padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <p style={{ margin:'0 0 3px', color:'#fff', fontSize:'15px', fontWeight:600 }}>{filtered[lightbox].caption}</p>
                  <p style={{ margin:0, color:'#6B7280', fontSize:'13px', display:'flex', alignItems:'center', gap:'5px' }}>
                    <MapPin size={12} />{filtered[lightbox].destination}
                  </p>
                </div>
                <span style={{ fontSize:'12px', color:'#4B5563', fontWeight:600 }}>{lightbox + 1} / {filtered.length}</span>
              </div>
            </motion.div>

            {/* Next */}
            <button className="lb-btn" onClick={e => { e.stopPropagation(); nextPhoto(); }} style={{ position:'absolute', right:'20px', top:'50%', transform:'translateY(-50%)' }}>
              <ChevronRight size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
