import { type CSSProperties, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star, Users, Clock, MapPin, Briefcase, Search,
  ArrowRight, Compass, Shield, Award, Zap, ChevronDown,
  SlidersHorizontal,
} from 'lucide-react';
import Layout from '../components/Layout';
import { mockTrips } from '../data/mock';
import type { Trip } from '../types';

const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const TABS = [
  { key: 'all',            label: 'All Trips',    emoji: '🗺️' },
  { key: 'domestic',      label: 'Domestic',      emoji: '🇮🇳' },
  { key: 'international', label: 'International', emoji: '✈️' },
] as const;

type TabKey = 'all' | 'domestic' | 'international';

const SORT_OPTIONS = [
  { value: 'popular',    label: 'Most Popular' },
  { value: 'price_asc',  label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'rating',     label: 'Top Rated' },
  { value: 'duration',   label: 'Shortest First' },
];

const CATEGORIES = [
  { label: 'All',       emoji: '🗺️' },
  { label: 'Adventure', emoji: '🧗' },
  { label: 'Nature',    emoji: '🌿' },
  { label: 'Beach',     emoji: '🏖️' },
  { label: 'Cultural',  emoji: '🏛️' },
  { label: 'Trekking',  emoji: '🥾' },
  { label: 'Spiritual', emoji: '🕌' },
  { label: 'Wellness',  emoji: '🧘' },
];

const WHY_US = [
  { icon: <Compass size={24} />, title: 'Local Captains',      desc: 'Every trip is led by a verified local expert who knows the destination like home.',      grad: 'linear-gradient(135deg,#F3E8FF,#EBF5FF)' },
  { icon: <Shield  size={24} />, title: 'Fully Insured',       desc: 'All bookings include travel insurance and round-the-clock emergency support.',           grad: 'linear-gradient(135deg,#ECFDF5,#D1FAE5)' },
  { icon: <Award   size={24} />, title: 'Curated Itineraries', desc: 'Handcrafted trips that go beyond tourist checklists — real experiences await.',          grad: 'linear-gradient(135deg,#FEF3C7,#FDE68A)' },
  { icon: <Zap     size={24} />, title: 'Instant Booking',     desc: 'Hassle-free booking with real-time seat availability and instant confirmation.',          grad: 'linear-gradient(135deg,#EBF5FF,#CCE4FF)' },
];

const TRIP_TYPE_CARDS = [
  {
    key: 'domestic',
    title: 'Domestic Trips', subtitle: 'Explore India',
    desc: "From the peaks of Ladakh to the backwaters of Kerala — India's hidden gems, led by Captains who call them home.",
    emoji: '🏔️', to: '/trips/domestic',
    gradient: 'linear-gradient(135deg,#022c22 0%,#047857 100%)', accent: '#34D399',
    badge: 'Available Now', badgeBg: '#D1FAE5', badgeColor: '#065F46',
  },
  {
    key: 'international',
    title: 'International Trips', subtitle: 'See the World',
    desc: 'South-East Asia, Europe & beyond — immersive international journeys curated by people who live there.',
    emoji: '✈️', to: '/trips/international',
    gradient: 'linear-gradient(135deg,#001F5B 0%,#0056CC 100%)', accent: '#80BDFF',
    badge: 'Available Now', badgeBg: '#CCE4FF', badgeColor: '#0056CC',
  },
  {
    key: 'corporate',
    title: 'Corporate Trips', subtitle: 'Team Travel',
    desc: 'Bespoke off-site retreats and team-bonding escapes. Built for teams, remembered forever.',
    emoji: '💼', to: '/trips/corporate',
    gradient: 'linear-gradient(135deg,#0a1628 0%,#1e3a5f 100%)', accent: '#FCD34D',
    badge: 'Launching Q4 2026', badgeBg: '#FEF3C7', badgeColor: '#92400E',
  },
];

function sortTrips(trips: Trip[], sort: string): Trip[] {
  const arr = [...trips];
  if (sort === 'price_asc')  return arr.sort((a, b) => a.price_per_person - b.price_per_person);
  if (sort === 'price_desc') return arr.sort((a, b) => b.price_per_person - a.price_per_person);
  if (sort === 'rating')     return arr.sort((a, b) => b.rating - a.rating);
  if (sort === 'duration')   return arr.sort((a, b) => a.duration_days - b.duration_days);
  return arr.sort((a, b) => b.review_count - a.review_count);
}

export default function TripsPage() {
  const [activeTab, setActiveTab]     = useState<TabKey>('all');
  const [activeCategory, setCategory] = useState('All');
  const [sort, setSort]               = useState('popular');
  const [search, setSearch]           = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  const allTrips   = mockTrips;
  const uniqueDest = new Set(allTrips.map(t => t.destination)).size;
  const minPrice   = Math.min(...allTrips.map(t => t.price_per_person));
  const avgRating  = (allTrips.reduce((s, t) => s + t.rating, 0) / (allTrips.length || 1)).toFixed(1);
  const domCount   = allTrips.filter(t => t.type === 'domestic').length;
  const intlCount  = allTrips.filter(t => t.type === 'international').length;

  const STATS = [
    { value: `${uniqueDest}+`, label: 'Destinations' },
    { value: `${avgRating}★`, label: 'Avg Rating' },
    { value: '2k+',            label: 'Happy Travellers' },
    { value: `₹${minPrice.toLocaleString('en-IN')}`, label: 'Starting From' },
  ];

  let filtered: Trip[] = activeTab === 'all'
    ? allTrips
    : allTrips.filter(t => t.type === activeTab);

  if (activeCategory !== 'All') {
    filtered = filtered.filter(t => t.category.toLowerCase() === activeCategory.toLowerCase());
  }
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.destination.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  }
  filtered = sortTrips(filtered, sort);

  const scrollToList = () => listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <Layout>
      <style>{`
        .trips-pill {
          padding: 8px 18px; border-radius: 9999px; font-size: 13px; font-weight: 600;
          cursor: pointer; border: 1.5px solid #E5E7EB; background: #fff; color: #6B7280;
          transition: all 0.18s; display: inline-flex; align-items: center; gap: 6px;
          white-space: nowrap; font-family: ${font};
        }
        .trips-pill:hover { border-color:#007AFF; color:#007AFF; }
        .trips-pill.active-all           { background:#007AFF; color:#fff; border-color:#007AFF; }
        .trips-pill.active-domestic      { background:#10B981; color:#fff; border-color:#10B981; }
        .trips-pill.active-international { background:#007AFF; color:#fff; border-color:#007AFF; }

        .cat-pill {
          padding: 7px 16px; border-radius: 9999px; font-size: 13px; font-weight: 500;
          cursor: pointer; border: 1.5px solid #E5E7EB; background: #fff; color: #6B7280;
          transition: all 0.18s; white-space: nowrap; font-family: ${font};
        }
        .cat-pill:hover { border-color:#007AFF; color:#007AFF; }
        .cat-pill.cat-active { background:#007AFF; color:#fff; border-color:#007AFF; }

        .trips-card {
          background: #fff; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.07);
          overflow: hidden; display: flex; flex-direction: column;
          transition: transform 0.25s, box-shadow 0.25s; cursor: pointer;
        }
        .trips-card:hover { transform: translateY(-6px); box-shadow: 0 12px 32px rgba(0,0,0,0.13); }
        .trips-card:hover .trips-card-img { transform: scale(1.05); }
        .trips-card-img {
          width: 100%; height: 100%; object-fit: cover; object-position: center;
          display: block; transition: transform 0.45s ease;
        }
        .trips-book-btn {
          display: block; text-align: center; background: #007AFF; color: #fff;
          border-radius: 9999px; padding: 12px; font-weight: 700; font-size: 14px;
          text-decoration: none; transition: background 0.15s; margin-top: auto;
          font-family: ${font};
        }
        .trips-book-btn:hover { background: #0056CC; }

        .type-card {
          border-radius: 20px; overflow: hidden; cursor: pointer;
          transition: transform 0.25s, box-shadow 0.25s; text-decoration: none; display: block;
        }
        .type-card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(0,0,0,0.25); }
        .type-card:hover .type-arrow { transform: translateX(5px); }
        .type-arrow { transition: transform 0.2s; display: inline-block; }

        .trips-search-inp {
          width: 100%; padding: 12px 12px 12px 44px;
          border: 1.5px solid rgba(255,255,255,0.3); border-radius: 12px;
          font-size: 14px; outline: none; font-family: ${font};
          background: rgba(255,255,255,0.1); color: #fff;
          transition: border-color 0.18s, background 0.18s;
          box-sizing: border-box; backdrop-filter: blur(8px);
        }
        .trips-search-inp::placeholder { color: rgba(255,255,255,0.55); }
        .trips-search-inp:focus { border-color: #80BDFF; background: rgba(255,255,255,0.15); }

        .sort-sel {
          padding: 10px 36px 10px 32px; border: 1.5px solid #E5E7EB; border-radius: 10px;
          font-size: 13px; font-family: ${font}; color: #374151; background: #fff;
          outline: none; cursor: pointer; appearance: none; min-width: 170px;
          transition: border-color 0.18s;
        }
        .sort-sel:focus { border-color: #007AFF; }

        .why-card {
          border-radius: 16px; padding: 28px 24px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .why-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }

        @media(max-width:900px){
          .type-cards-row { grid-template-columns: 1fr 1fr !important; }
          .why-grid       { grid-template-columns: 1fr 1fr !important; }
        }
        @media(max-width:768px){
          .trips-grid  { grid-template-columns: 1fr 1fr !important; }
          .toolbar-row { flex-direction: column !important; align-items: stretch !important; }
          .toolbar-row .sort-wrap { flex-shrink: 0 !important; width: 100% !important; }
          .toolbar-row .sort-sel  { width: 100% !important; min-width: 0 !important; }
        }
        @media(max-width:600px){
          .type-cards-row { grid-template-columns: 1fr !important; }
          .pills-row { gap: 6px !important; }
          .trips-pill { padding: 6px 12px !important; font-size: 12px !important; }
        }
        @media(max-width:540px){
          .trips-grid { grid-template-columns: 1fr !important; }
          .why-grid   { grid-template-columns: 1fr !important; }
        }
        @media(max-width:480px){
          .cat-pills-row { gap: 5px !important; }
          .cat-pill { padding: 5px 10px !important; font-size: 11px !important; }
        }
      `}</style>

      {/* HERO */}
      <div style={{
        background: 'linear-gradient(135deg,#001F5B 0%,#001F5B 40%,#0056CC 80%,#003A99 100%)',
        height: '85vh', minHeight: '600px', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', position: 'relative', overflow: 'hidden',
        fontFamily: font, color: '#fff',
      }}>
        <div style={{ position:'absolute', width:400, height:400, borderRadius:'50%', background:'rgba(167,139,250,0.12)', top:-100, right:-80, pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:300, height:300, borderRadius:'50%', background:'rgba(139,92,246,0.1)', bottom:80, left:-60, pointerEvents:'none' }} />

        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 24px', position:'relative', zIndex:1 }}>
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }} style={{ textAlign:'center', maxWidth:700, width:'100%' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:9999, padding:'6px 18px', fontSize:13, fontWeight:600, color:'#80BDFF', marginBottom:20, backdropFilter:'blur(8px)' }}>
              <span style={{ width:7, height:7, borderRadius:'50%', background:'#4DB2FF', display:'inline-block' }} />
              {domCount + intlCount} Trips &middot; {uniqueDest}+ Destinations
            </div>

            <h1 style={{ fontSize:'clamp(30px,5.5vw,58px)', fontWeight:800, margin:'0 0 16px', lineHeight:'1.15', letterSpacing:'-1px' }}>
              Travel Differently.<br />
              <span style={{ color:'#80BDFF' }}>Travel with a Captain.</span>
            </h1>

            <p style={{ fontSize:'clamp(15px,2vw,18px)', opacity:0.82, lineHeight:'1.65', margin:'0 auto 32px', maxWidth:520 }}>
              Handcrafted trips led by local experts. Every journey is designed to go beyond the checklist.
            </p>

            <div style={{ position:'relative', maxWidth:500, margin:'0 auto 28px' }}>
              <Search size={17} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'rgba(255,255,255,0.6)', pointerEvents:'none', zIndex:1 }} />
              <input className="trips-search-inp" placeholder="Search destinations, experiences…" value={search} onChange={e => setSearch(e.target.value)} onFocus={scrollToList} />
            </div>

            <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
              <button onClick={scrollToList} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'13px 28px', background:'#007AFF', color:'#fff', borderRadius:9999, fontWeight:700, fontSize:15, border:'none', cursor:'pointer', fontFamily:font }}>
                Browse All Trips <ArrowRight size={16} />
              </button>
              <Link to="/custom-trip" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'13px 28px', background:'rgba(255,255,255,0.1)', backdropFilter:'blur(8px)', color:'#fff', borderRadius:9999, fontWeight:600, fontSize:15, textDecoration:'none', border:'1px solid rgba(255,255,255,0.25)' }}>
                Plan Custom Trip
              </Link>
            </div>
          </motion.div>
        </div>

        {/* stats strip */}
        <div style={{ background:'rgba(0,0,0,0.3)', backdropFilter:'blur(10px)', borderTop:'1px solid rgba(255,255,255,0.1)', padding:'18px 24px', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, textAlign:'center', zIndex:1 }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div style={{ fontSize:'clamp(18px,2.5vw,24px)', fontWeight:800, color:'#80BDFF' }}>{s.value}</div>
              <div style={{ fontSize:12, opacity:0.7, marginTop:2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TRIP TYPE CARDS */}
      <div style={{ background:'#F9FAFB', padding:'72px 24px', fontFamily:font }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ display:'inline-block', background:'#EBF5FF', color:'#0056CC', padding:'4px 14px', borderRadius:9999, fontSize:12, fontWeight:700, letterSpacing:'0.5px', textTransform:'uppercase', marginBottom:12 }}>EXPLORE BY TYPE</div>
            <h2 style={{ fontSize:'clamp(22px,3.5vw,36px)', fontWeight:800, color:'#111827', margin:'0 0 12px', letterSpacing:'-0.5px' }}>Choose Your Adventure</h2>
            <p style={{ fontSize:16, color:'#6B7280', maxWidth:520, margin:'0 auto', lineHeight:'1.6' }}>Whether you want to explore India, cross borders, or bond with your team — we have a trip for you.</p>
          </motion.div>

          <div className="type-cards-row" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, alignItems:'stretch' }}>
            {TRIP_TYPE_CARDS.map((tc, i) => (
              <motion.div key={tc.key} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.1 }} style={{ display:'flex', flexDirection:'column' }}>
                <Link to={tc.to} className="type-card" style={{ flex:1 }}>
                  <div style={{ background:tc.gradient, padding:'40px 32px', height:'100%', boxSizing:'border-box', display:'flex', flexDirection:'column', justifyContent:'space-between', position:'relative', overflow:'hidden' }}>
                    <div style={{ display:'inline-flex', alignSelf:'flex-start', background:tc.badgeBg, color:tc.badgeColor, padding:'4px 12px', borderRadius:9999, fontSize:11, fontWeight:700, letterSpacing:'0.3px' }}>{tc.badge}</div>
                    <div style={{ position:'absolute', right:24, top:20, fontSize:64, opacity:0.12, lineHeight:1, pointerEvents:'none' }}>{tc.emoji}</div>
                    <div style={{ marginTop:20 }}>
                      <div style={{ fontSize:38, marginBottom:12 }}>{tc.emoji}</div>
                      <div style={{ fontSize:12, color:tc.accent, fontWeight:600, letterSpacing:'0.8px', textTransform:'uppercase', marginBottom:6 }}>{tc.subtitle}</div>
                      <h3 style={{ fontSize:22, fontWeight:800, color:'#fff', margin:'0 0 10px', letterSpacing:'-0.3px' }}>{tc.title}</h3>
                      <p style={{ fontSize:14, color:'rgba(255,255,255,0.72)', lineHeight:'1.6', margin:0 }}>{tc.desc}</p>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:6, color:tc.accent, fontWeight:700, fontSize:14, marginTop:24 }}>
                      Explore trips <span className="type-arrow"><ArrowRight size={16} /></span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ALL TRIPS */}
      <div ref={listRef} style={{ background:'#fff', padding:'72px 24px 80px', fontFamily:font }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} style={{ marginBottom:32 }}>
            <div style={{ display:'inline-block', background:'#EBF5FF', color:'#0056CC', padding:'4px 14px', borderRadius:9999, fontSize:12, fontWeight:700, letterSpacing:'0.5px', textTransform:'uppercase', marginBottom:12 }}>ALL TRIPS</div>
            <h2 style={{ fontSize:'clamp(22px,3.5vw,36px)', fontWeight:800, color:'#111827', margin:'0 0 6px', letterSpacing:'-0.5px' }}>Find Your Perfect Trip</h2>
            <p style={{ fontSize:15, color:'#6B7280', margin:0 }}>{filtered.length} trip{filtered.length !== 1 ? 's' : ''} available</p>
          </motion.div>

          {/* sticky toolbar */}
          <div style={{ position:'sticky', top:0, zIndex:10, background:'#fff', borderBottom:'1px solid #F3F4F6', paddingBottom:14, marginBottom:28, paddingTop:12 }}>
            <div style={{ display:'flex', gap:8, overflowX:'auto', flexWrap:'nowrap', marginBottom:12, paddingBottom:2 }}>
              {TABS.map(tab => (
                <button key={tab.key} className={`trips-pill${activeTab === tab.key ? ` active-${tab.key}` : ''}`} onClick={() => setActiveTab(tab.key as TabKey)}>
                  <span>{tab.emoji}</span>{tab.label}
                </button>
              ))}
              <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'8px 18px', borderRadius:9999, fontSize:13, fontWeight:600, border:'1.5px solid #E5E7EB', background:'#F9FAFB', color:'#9CA3AF', cursor:'default', fontFamily:font }}>
                <Briefcase size={14} /> Corporate
                <span style={{ background:'#FEF3C7', color:'#D97706', borderRadius:9999, fontSize:10, fontWeight:700, padding:'2px 7px' }}>Soon</span>
              </div>
            </div>

            <div className="toolbar-row" style={{ display:'flex', alignItems:'center', gap:12, justifyContent:'space-between' }}>
              <div style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:2, flex:1 }}>
                {CATEGORIES.map(c => (
                  <button key={c.label} className={`cat-pill${activeCategory === c.label ? ' cat-active' : ''}`} onClick={() => setCategory(c.label)}>
                    {c.emoji} {c.label}
                  </button>
                ))}
              </div>
              <div className="sort-wrap" style={{ position:'relative', flexShrink:0 }}>
                <SlidersHorizontal size={14} style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'#9CA3AF', pointerEvents:'none' }} />
                <ChevronDown size={13} style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', color:'#9CA3AF', pointerEvents:'none' }} />
                <select className="sort-sel" value={sort} onChange={e => setSort(e.target.value)}>
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="trips-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
              {filtered.map((trip, i) => <TripCard key={trip.id} trip={trip} delay={i * 0.05} />)}
            </div>
          ) : (
            <div style={{ textAlign:'center', padding:'80px 0', color:'#9CA3AF' }}>
              <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
              <p style={{ fontSize:18, fontWeight:600, color:'#374151', margin:'0 0 8px' }}>No trips found</p>
              <p style={{ fontSize:14, margin:0 }}>Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>

      {/* WHY TRIPPY MATES */}
      <div style={{ background:'#F9FAFB', padding:'72px 24px', fontFamily:font }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ display:'inline-block', background:'#EBF5FF', color:'#0056CC', padding:'4px 14px', borderRadius:9999, fontSize:12, fontWeight:700, letterSpacing:'0.5px', textTransform:'uppercase', marginBottom:12 }}>WHY TRIPPY MATES</div>
            <h2 style={{ fontSize:'clamp(22px,3.5vw,36px)', fontWeight:800, color:'#111827', margin:'0 0 12px', letterSpacing:'-0.5px' }}>Travel the Right Way</h2>
            <p style={{ fontSize:16, color:'#6B7280', maxWidth:500, margin:'0 auto', lineHeight:'1.6' }}>We go beyond bookings — every trip is an experience crafted with care, expertise, and heart.</p>
          </motion.div>
          <div className="why-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {WHY_US.map((w, i) => (
              <motion.div key={w.title} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.1 }}>
                <div className="why-card" style={{ background:w.grad, boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ width:48, height:48, borderRadius:12, background:'rgba(255,255,255,0.7)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16, color:'#0056CC' }}>{w.icon}</div>
                  <h3 style={{ fontSize:16, fontWeight:700, color:'#111827', margin:'0 0 8px' }}>{w.title}</h3>
                  <p style={{ fontSize:13, color:'#4B5563', lineHeight:'1.6', margin:0 }}>{w.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CUSTOM TRIP CTA */}
      <div style={{ background:'linear-gradient(135deg,#001F5B,#001F5B)', padding:'56px 24px', fontFamily:font, textAlign:'center', color:'#fff' }}>
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}>
          <div style={{ fontSize:40, marginBottom:16 }}>🗺️</div>
          <h2 style={{ fontSize:'clamp(20px,3.5vw,34px)', fontWeight:800, margin:'0 0 12px', letterSpacing:'-0.5px' }}>{"Can't Find What You're Looking For?"}</h2>
          <p style={{ fontSize:16, opacity:0.8, maxWidth:500, margin:'0 auto 28px', lineHeight:'1.6' }}>Tell us your dream destination and we will build a completely custom trip just for you.</p>
          <Link to="/custom-trip" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#007AFF', color:'#fff', padding:'14px 32px', borderRadius:9999, fontWeight:700, fontSize:16, textDecoration:'none' }}>
            Plan a Custom Trip <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
}

/* TripCard */
function TripCard({ trip, delay }: { trip: Trip; delay: number }) {
  const spotsLeft = trip.max_travelers - trip.current_travelers;
  const pct       = Math.round((trip.current_travelers / trip.max_travelers) * 100);
  const isHot     = pct >= 75;

  const catColorMap: Record<string, string> = {
    wellness:  '#4FBEFF', cultural:  '#F26110', luxury:    '#9552E0',
    beach:     '#F59E0B', nature:    '#10B981', adventure: '#F97316',
    trekking:  '#8B5CF6', spiritual: '#EC4899',
  };
  const catColor = catColorMap[trip.category] ?? '#6B7280';

  return (
    <motion.div className="trips-card" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.4, delay }}>
      <div style={{ height:200, position:'relative', overflow:'hidden', background:'#E5E7EB', flexShrink:0 }}>
        <img src={trip.image_url} alt={trip.title} className="trips-card-img" />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.55) 0%,transparent 55%)', pointerEvents:'none' }} />

        {/* price */}
        <div style={{ position:'absolute', bottom:12, left:12, background:'rgba(0,0,0,0.65)', backdropFilter:'blur(4px)', borderRadius:9999, padding:'4px 10px', color:'#fff', fontSize:13, fontWeight:800 }}>
          {'₹'}{trip.price_per_person.toLocaleString('en-IN')}<span style={{ fontWeight:400, fontSize:11, opacity:0.8 }}>/person</span>
        </div>

        {/* destination */}
        <div style={{ position:'absolute', top:10, right:10, background:'rgba(255,255,255,0.92)', borderRadius:9999, padding:'3px 10px', fontSize:11, fontWeight:700, color:'#111827', display:'flex', alignItems:'center', gap:4 }}>
          <MapPin size={10} color="#007AFF" />{trip.destination.split(',')[0]}
        </div>

        {isHot && (
          <div style={{ position:'absolute', top:10, left:10, background:'#EF4444', color:'#fff', borderRadius:9999, padding:'3px 9px', fontSize:10, fontWeight:700 }}>🔥 Hot</div>
        )}

        <div style={{ position:'absolute', bottom:12, right:12, background:catColor + 'CC', color:'#fff', borderRadius:9999, padding:'3px 9px', fontSize:10, fontWeight:700 }}>
          {trip.category.charAt(0).toUpperCase() + trip.category.slice(1)}
        </div>
      </div>

      <div style={{ padding:'16px 16px 18px', flex:1, display:'flex', flexDirection:'column', gap:9 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <Clock size={12} color="#9CA3AF" />
          <span style={{ fontSize:12, color:'#9CA3AF', fontWeight:500 }}>{trip.duration_days} days</span>
          <span style={{ marginLeft:'auto', display:'inline-flex', alignItems:'center', gap:4, fontSize:11, color:'#007AFF', fontWeight:600, background:'#EBF5FF', padding:'2px 8px', borderRadius:9999 }}>
            {trip.type === 'domestic' ? '🇮🇳' : '✈️'} {trip.type.charAt(0).toUpperCase() + trip.type.slice(1)}
          </span>
        </div>

        <h3 style={{ fontSize:16, fontWeight:700, color:'#111827', margin:0, lineHeight:'1.3' }}>{trip.title}</h3>

        <p style={{ fontSize:12, color:'#6B7280', lineHeight:'1.5', margin:0, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' } as CSSProperties}>
          {trip.description}
        </p>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:12, color:'#6B7280' }}>
          <div style={{ display:'flex', alignItems:'center', gap:4, fontWeight:600, color:'#111827' }}>
            <Star size={12} fill="#FBBF24" color="#FBBF24" />
            {trip.rating}
            <span style={{ fontWeight:400, color:'#9CA3AF' }}>({trip.review_count})</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:4 }}>
            <Users size={12} />{trip.current_travelers}/{trip.max_travelers}
          </div>
        </div>

        <div>
          <div style={{ height:3, background:'#F3F4F6', borderRadius:9999, overflow:'hidden' }}>
            <div style={{ height:'100%', width:`${pct}%`, background:pct>=80?'#EF4444':'#007AFF', borderRadius:9999 }} />
          </div>
          <p style={{ fontSize:11, color:pct>=80?'#EF4444':'#9CA3AF', margin:'3px 0 0', fontWeight:500 }}>
            {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left
          </p>
        </div>

        <Link to={`/trips/${trip.slug}`} className="trips-book-btn">Book Now</Link>
      </div>
    </motion.div>
  );
}
