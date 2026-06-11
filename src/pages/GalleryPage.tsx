import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import Layout from '../components/Layout';

const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

type Category = 'All' | 'Himalayan' | 'Nature' | 'Culture' | 'International' | 'Valleys';

interface Photo {
  id: string;
  src: string;
  destination: string;
  category: Category;
  caption: string;
  height: number;
}

const photos: Photo[] = [
  // Himalayan
  { id: 'p1',  src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', destination: 'Leh Ladakh',       category: 'Himalayan',    caption: 'Magnetic Hill — Where gravity plays tricks', height: 280 },
  { id: 'p2',  src: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=800&q=80', destination: 'Spiti Valley',      category: 'Himalayan',    caption: 'Key Monastery perched at 4,166m', height: 240 },
  { id: 'p3',  src: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80', destination: 'Kedarnath',        category: 'Himalayan',    caption: 'The divine abode wrapped in clouds', height: 320 },
  { id: 'p4',  src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80', destination: 'Chopta Tungnath',  category: 'Himalayan',    caption: 'Highest Shiva temple in the world', height: 260 },
  { id: 'p5',  src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80', destination: 'Munsiyari',        category: 'Himalayan',    caption: 'Little Kashmir — Snow peaks at every turn', height: 200 },
  { id: 'p6',  src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80', destination: 'Harsil Valley',    category: 'Himalayan',    caption: 'Bhagirathi River at golden hour', height: 300 },

  // Nature
  { id: 'p7',  src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80', destination: 'Meghalaya',        category: 'Nature',       caption: 'Living Root Bridges deep in rain forests', height: 260 },
  { id: 'p8',  src: 'https://images.unsplash.com/photo-1612528443702-f6741f70a049?auto=format&fit=crop&w=800&q=80', destination: 'Munnar',           category: 'Nature',       caption: "Endless tea estates at Kerala's roof", height: 220 },
  { id: 'p9',  src: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80', destination: 'Meghalaya',        category: 'Nature',       caption: 'Nohkalikai Falls — India\'s tallest plunge', height: 340 },
  { id: 'p10', src: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?auto=format&fit=crop&w=800&q=80', destination: 'Jibhi & Tirthan', category: 'Nature',       caption: 'Tirthan River trail through pine forest', height: 240 },
  { id: 'p11', src: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80', destination: 'Harsil Valley',    category: 'Nature',       caption: 'Apple orchards under snow-capped giants', height: 280 },

  // Culture
  { id: 'p12', src: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80', destination: 'McLeodganj',       category: 'Culture',      caption: 'Tibetan prayer flags over Dharamshala', height: 260 },
  { id: 'p13', src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=800&q=80', destination: 'Madmaheshwar',     category: 'Culture',      caption: 'Ancient Shiva temple in the Panch Kedar circuit', height: 220 },
  { id: 'p14', src: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80', destination: 'Leh Ladakh',       category: 'Culture',      caption: 'Hemis Festival — Monks perform sacred Cham dance', height: 300 },
  { id: 'p15', src: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80', destination: 'McLeodganj',       category: 'Culture',      caption: 'Sunrise from Triund — the trek worth every step', height: 240 },

  // International
  { id: 'p16', src: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80', destination: 'Thailand',         category: 'International', caption: 'Wat Arun glowing at dusk on the Chao Phraya', height: 280 },
  { id: 'p17', src: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80', destination: 'Vietnam',          category: 'International', caption: 'Halong Bay — Limestone karsts rise from emerald water', height: 240 },
  { id: 'p18', src: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=800&q=80', destination: 'Nepal',            category: 'International', caption: 'Boudhanath Stupa — Spiritual heart of Kathmandu', height: 320 },
  { id: 'p19', src: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=800&q=80', destination: 'Bhutan',           category: 'International', caption: 'Tiger\'s Nest Monastery — Clinging to a cliff at 3,120m', height: 260 },

  // Valleys
  { id: 'p20', src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80', destination: 'Kasol',            category: 'Valleys',      caption: 'Parvati Valley — Where rivers meet the mountains', height: 220 },
  { id: 'p21', src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80', destination: 'Jibhi & Tirthan', category: 'Valleys',      caption: 'Hidden valley life — Serolsar Lake trail', height: 300 },
  { id: 'p22', src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80', destination: 'Munsiyari',        category: 'Valleys',      caption: 'Johar Valley — the gateway to Milam Glacier', height: 260 },
  { id: 'p23', src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', destination: 'Goa',              category: 'Valleys',      caption: 'Agonda Beach — The quiet side of Goa', height: 240 },
  { id: 'p24', src: 'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=800&q=80', destination: 'Spiti Valley',     category: 'Valleys',      caption: 'Pin Valley meadows under an infinite sky', height: 280 },
];

const FILTERS: { key: Category; emoji: string }[] = [
  { key: 'All',           emoji: '🌍' },
  { key: 'Himalayan',     emoji: '🏔️' },
  { key: 'Nature',        emoji: '🌿' },
  { key: 'Culture',       emoji: '🪔' },
  { key: 'International', emoji: '✈️' },
  { key: 'Valleys',       emoji: '🏞️' },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const [lightbox, setLightbox]         = useState<number | null>(null);
  const [search, setSearch]             = useState('');

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
      <section style={{ background: 'linear-gradient(135deg, #0B1120 0%, #1a2340 100%)', padding: '80px 24px 64px', textAlign: 'center', fontFamily: font }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span style={{ display:'inline-block', background:'rgba(0,122,255,0.2)', border:'1px solid rgba(0,122,255,0.4)', color:'#60A5FA', fontSize:'11px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', borderRadius:'9999px', padding:'4px 14px', marginBottom:'18px' }}>
            Photo Gallery
          </span>
          <h1 style={{ fontSize:'clamp(32px,5vw,52px)', fontWeight:900, color:'#fff', margin:'0 0 14px', letterSpacing:'-1px', lineHeight:1.1 }}>
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
      <div style={{ maxWidth:'1240px', margin:'0 auto', padding:'0 24px 80px', fontFamily: font }}>

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
