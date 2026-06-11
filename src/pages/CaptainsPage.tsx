import { useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, Star, CheckCircle, Search, Users,
  Compass, ChevronDown, Shield, Award, Zap, SlidersHorizontal,
} from 'lucide-react';
import Layout from '../components/Layout';
import { mockCaptains } from '../data/mock';
import type { Captain } from '../types';

const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const PURPLE      = '#007AFF';
const PURPLE_LIGHT = '#EBF5FF';
const PURPLE_MID  = '#0056CC';

/* ── category palettes ───────────────────────────────────────────────────────── */
const CAT_BG: Record<Captain['category'], string> = {
  adventure: '#FFF7ED',
  luxury:    '#FDF4FF',
  cultural:  '#ECFDF5',
  food:      '#FEF9C3',
  budget:    '#F0F9FF',
  nature:    '#F0FDF4',
  trekking:  '#F5F3FF',
};
const CAT_TEXT: Record<Captain['category'], string> = {
  adventure: '#EA580C',
  luxury:    '#9333EA',
  cultural:  '#059669',
  food:      '#CA8A04',
  budget:    '#0284C7',
  nature:    '#16A34A',
  trekking:  '#007AFF',
};
const CAT_AVATAR: Record<Captain['category'], string> = {
  adventure: 'linear-gradient(135deg,#F97316,#EA580C)',
  luxury:    'linear-gradient(135deg,#C084FC,#9333EA)',
  cultural:  'linear-gradient(135deg,#34D399,#059669)',
  food:      'linear-gradient(135deg,#FCD34D,#CA8A04)',
  budget:    'linear-gradient(135deg,#38BDF8,#0284C7)',
  nature:    'linear-gradient(135deg,#4ADE80,#16A34A)',
  trekking:  'linear-gradient(135deg,#4DB2FF,#007AFF)',
};
const CAT_LABEL: Record<Captain['category'], string> = {
  adventure: 'Adventure',
  luxury:    'Luxury',
  cultural:  'Cultural',
  food:      'Food',
  budget:    'Budget',
  nature:    'Nature',
  trekking:  'Trekking',
};

const CATEGORY_FILTERS = ['All', 'Adventure', 'Luxury', 'Cultural', 'Food', 'Budget', 'Trekking'];

const HOW_STEPS = [
  { num:'01', icon: Search,      title:'Browse Captains',    desc:'Explore verified local captains filtered by destination, language, and expertise.' },
  { num:'02', icon: CheckCircle, title:'Book & Connect',     desc:'Instantly book your captain and chat directly before your trip begins.' },
  { num:'03', icon: Users,       title:'Travel Together',    desc:'Your captain leads the way — local knowledge, your best experience ever.' },
];

const WHY_CAPTAIN = [
  { icon: <Compass size={22} />,  title:'Local Insiders',      desc:'Captains live in the places they guide — you get insider access, not tourist traps.' },
  { icon: <Shield  size={22} />,  title:'Verified & Trusted',  desc:'Every captain passes identity checks, ratings reviews, and safety verification.' },
  { icon: <Award   size={22} />,  title:'Expert Knowledge',    desc:'From street food to summit trails — years of on-ground expertise on tap.' },
  { icon: <Zap     size={22} />,  title:'Instant Booking',     desc:'Real-time availability, instant confirmation, and easy cancellation.' },
];

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

/* ── CaptainCard ─────────────────────────────────────────────────────────────── */
function CaptainCard({ captain, delay }: { captain: Captain; delay: number }) {
  const avatarGrad = CAT_AVATAR[captain.category] ?? 'linear-gradient(135deg,#007AFF,#0056CC)';
  const catBg      = CAT_BG[captain.category]     ?? '#F5F3FF';
  const catText    = CAT_TEXT[captain.category]    ?? PURPLE;
  const catLabel   = CAT_LABEL[captain.category]  ?? captain.category;

  return (
    <motion.div
      className="cap-card"
      initial={{ opacity:0, y:20 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.4, delay }}
      style={{ background:'#fff', borderRadius:18, border:'1.5px solid #F0F2F5', overflow:'hidden', display:'flex', flexDirection:'column', boxShadow:'0 2px 10px rgba(0,0,0,0.06)' }}
    >
      {/* top band */}
      <div style={{ height:100, background:`linear-gradient(135deg,#001F5B,#001F5B)`, position:'relative', flexShrink:0 }}>
        {/* faint pattern */}
        <div style={{ position:'absolute', right:-20, top:-20, width:120, height:120, borderRadius:'50%', background:'rgba(196,181,253,0.1)', pointerEvents:'none' }} />

        {/* verified badge */}
        {captain.verified && (
          <div style={{ position:'absolute', top:10, right:10, background:'rgba(196,181,253,0.2)', backdropFilter:'blur(4px)', border:'1px solid rgba(196,181,253,0.3)', color:'#80BDFF', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:9999, display:'flex', alignItems:'center', gap:4 }}>
            <CheckCircle size={10} /> Verified
          </div>
        )}

        {/* category badge */}
        <div style={{ position:'absolute', top:10, left:10, background:catBg, color:catText, fontSize:10, fontWeight:700, padding:'3px 9px', borderRadius:9999 }}>
          {catLabel}
        </div>

        {/* avatar */}
        <div style={{ position:'absolute', bottom:-32, left:'50%', transform:'translateX(-50%)', width:64, height:64, borderRadius:'50%', background:avatarGrad, display:'flex', alignItems:'center', justifyContent:'center', border:'3px solid #fff', boxShadow:'0 4px 12px rgba(0,0,0,0.18)', fontSize:20, fontWeight:800, color:'#fff', zIndex:2 }}>
          {getInitials(captain.name)}
        </div>
      </div>

      {/* body */}
      <div style={{ padding:'40px 18px 18px', display:'flex', flexDirection:'column', gap:10, flex:1 }}>

        {/* name + city */}
        <div style={{ textAlign:'center' }}>
          <h3 style={{ fontSize:17, fontWeight:800, color:'#111827', margin:'0 0 4px', letterSpacing:'-0.2px' }}>{captain.name}</h3>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:4, fontSize:12, color:'#6B7280' }}>
            <MapPin size={11} color={PURPLE} />{captain.city}, {captain.country}
          </div>
        </div>

        {/* rating row */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, fontSize:13 }}>
          <Star size={13} fill="#FBBF24" color="#FBBF24" />
          <span style={{ fontWeight:700, color:'#111827' }}>{captain.rating}</span>
          <span style={{ color:'#9CA3AF' }}>· {captain.review_count} reviews</span>
        </div>

        {/* languages */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:5, justifyContent:'center' }}>
          {captain.languages.slice(0,3).map(l => (
            <span key={l} style={{ background:PURPLE_LIGHT, color:PURPLE_MID, fontSize:11, fontWeight:600, padding:'3px 9px', borderRadius:9999 }}>{l}</span>
          ))}
          {captain.languages.length > 3 && (
            <span style={{ background:'#F3F4F6', color:'#6B7280', fontSize:11, fontWeight:600, padding:'3px 9px', borderRadius:9999 }}>+{captain.languages.length - 3}</span>
          )}
        </div>

        {/* expertise chips */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:5, justifyContent:'center' }}>
          {captain.expertise.slice(0,3).map(e => (
            <span key={e} style={{ background:catBg, color:catText, fontSize:11, fontWeight:500, padding:'3px 9px', borderRadius:7 }}>{e}</span>
          ))}
        </div>

        {/* bio snippet */}
        <p style={{ fontSize:12, color:'#6B7280', lineHeight:'1.55', margin:0, textAlign:'center', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' } as CSSProperties}>
          {captain.bio}
        </p>

        {/* divider */}
        <div style={{ borderTop:'1px solid #F3F4F6', margin:'2px 0' }} />

        {/* availability + rate */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:13 }}>
          <div style={{ display:'flex', alignItems:'center', gap:5, color: captain.availability === 'available' ? '#10B981' : '#9CA3AF', fontWeight:600 }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background: captain.availability === 'available' ? '#10B981' : '#9CA3AF', display:'inline-block' }} />
            {captain.availability === 'available' ? 'Available' : 'Busy'}
          </div>
          <span style={{ fontSize:13, fontWeight:700, color:'#111827' }}>₹{(captain.hourly_rate * 80).toLocaleString('en-IN')}/hr</span>
        </div>

        {/* CTA */}
        <a className="cap-book-btn" style={{ display:'block', textAlign:'center', background:PURPLE, color:'#fff', borderRadius:9999, padding:'11px', fontWeight:700, fontSize:14, textDecoration:'none', fontFamily:font, marginTop:'auto' }}>
          Book Captain
        </a>
      </div>
    </motion.div>
  );
}

/* ── page ───────────────────────────────────────────────────────────────────── */
export default function CaptainsPage() {
  const [location, setLocation]   = useState('');
  const [language, setLanguage]   = useState('All');
  const [rating, setRating]       = useState('All Ratings');
  const [category, setCategory]   = useState('All');

  const allCaptains = mockCaptains;
  const totalCaptains = allCaptains.length;
  const avgRating = (allCaptains.reduce((s, c) => s + c.rating, 0) / (allCaptains.length || 1)).toFixed(1);
  const uniqueLocations = new Set(allCaptains.map(c => c.country)).size;

  const STATS = [
    { value:`${totalCaptains}+`, label:'Expert Captains' },
    { value:`${avgRating}★`,     label:'Avg Rating' },
    { value:`${uniqueLocations}+`, label:'Countries' },
    { value:'98%',               label:'Satisfaction Rate' },
  ];

  const filtered = allCaptains.filter(c => {
    const locMatch   = !location || c.city.toLowerCase().includes(location.toLowerCase()) || c.country.toLowerCase().includes(location.toLowerCase());
    const langMatch  = language === 'All' || c.languages.some(l => l.toLowerCase() === language.toLowerCase());
    const rateMatch  = rating === 'All Ratings' || (rating === '4.5+' && c.rating >= 4.5) || (rating === '4.0+' && c.rating >= 4.0) || (rating === '3.5+' && c.rating >= 3.5);
    const catMatch   = category === 'All' || c.category === category.toLowerCase();
    return locMatch && langMatch && rateMatch && catMatch;
  });

  return (
    <Layout>
      <style>{`
        .cap-card { transition: transform 0.25s, box-shadow 0.25s; }
        .cap-card:hover { transform: translateY(-6px); box-shadow: 0 14px 36px rgba(0,0,0,0.12) !important; }
        .cap-book-btn { transition: background 0.15s; }
        .cap-book-btn:hover { background: ${PURPLE_MID} !important; }
        .cap-filter-inp { transition: border-color 0.18s; }
        .cap-filter-inp:focus { outline: none; border-color: ${PURPLE} !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.1); }
        .cap-cat-pill { padding: 7px 16px; border-radius: 9999px; font-size: 13px; font-weight: 500; cursor: pointer; border: 1.5px solid #E5E7EB; background: #fff; color: #6B7280; transition: all 0.18s; white-space: nowrap; font-family: ${font}; }
        .cap-cat-pill:hover { border-color: ${PURPLE}; color: ${PURPLE}; }
        .cap-cat-pill.cap-active { background: ${PURPLE}; color: #fff; border-color: ${PURPLE}; }
        .cap-how-card { transition: transform 0.2s, box-shadow 0.2s; }
        .cap-how-card:hover { transform: translateY(-5px); box-shadow: 0 14px 36px rgba(0,0,0,0.1) !important; }
        .cap-why-card { transition: transform 0.2s, box-shadow 0.2s; }
        .cap-why-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.08) !important; }
        @media(max-width:900px){
          .cap-grid     { grid-template-columns: 1fr 1fr !important; }
          .cap-how-grid { grid-template-columns: 1fr 1fr !important; }
          .cap-why-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media(max-width:700px){
          .cap-toolbar-inner { flex-direction: column !important; align-items: stretch !important; }
          .cap-pills-scroll  { overflow-x: auto !important; flex-wrap: nowrap !important; padding-bottom: 4px !important; }
        }
        @media(max-width:580px){
          .cap-grid { grid-template-columns: 1fr !important; }
          .cap-filter-row { flex-wrap: wrap !important; }
          .cap-filter-loc  { flex: 1 1 100% !important; min-width: 0 !important; }
          .cap-filter-lang { flex: 1 1 calc(50% - 5px) !important; min-width: 0 !important; }
          .cap-filter-rate { flex: 1 1 calc(50% - 5px) !important; min-width: 0 !important; }
          .cap-filter-count { flex: 1 1 100% !important; }
        }
        @media(max-width:480px){
          .cap-how-grid { grid-template-columns: 1fr !important; }
          .cap-why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg,#001F5B 0%,#001F5B 40%,#0056CC 80%,#003A99 100%)',
        height:'85vh', minHeight:'600px', display:'flex', flexDirection:'column',
        justifyContent:'space-between', position:'relative', overflow:'hidden',
        fontFamily:font, color:'#fff',
      }}>
        <div style={{ position:'absolute', width:420, height:420, borderRadius:'50%', background:'rgba(167,139,250,0.1)', top:-120, right:-80, pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:280, height:280, borderRadius:'50%', background:'rgba(139,92,246,0.08)', bottom:60, left:-60, pointerEvents:'none' }} />

        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 24px', position:'relative', zIndex:1 }}>
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }} style={{ textAlign:'center', maxWidth:680, width:'100%' }}>

            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:9999, padding:'6px 18px', fontSize:13, fontWeight:600, color:'#80BDFF', marginBottom:20, backdropFilter:'blur(8px)' }}>
              <span style={{ width:7, height:7, borderRadius:'50%', background:'#4DB2FF', display:'inline-block' }} />
              {totalCaptains} Verified Local Captains
            </div>

            <h1 style={{ fontSize:'clamp(30px,5.5vw,58px)', fontWeight:900, margin:'0 0 16px', lineHeight:'1.12', letterSpacing:'-1.5px' }}>
              Meet Your Local<br /><span style={{ color:'#80BDFF' }}>Captain.</span>
            </h1>

            <p style={{ fontSize:'clamp(15px,2vw,18px)', opacity:0.82, maxWidth:520, margin:'0 auto 32px', lineHeight:'1.7' }}>
              Every great trip deserves a local expert. Browse verified Captains who know their destinations inside-out and will make your journey truly unforgettable.
            </p>

            {/* quick search */}
            <div style={{ display:'flex', gap:10, maxWidth:520, margin:'0 auto', background:'rgba(255,255,255,0.1)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:14, padding:'10px 14px', alignItems:'center' }}>
              <Search size={16} style={{ color:'rgba(255,255,255,0.6)', flexShrink:0 }} />
              <input
                className="cap-filter-inp"
                type="text"
                placeholder="Search by city or country…"
                value={location}
                onChange={e => setLocation(e.target.value)}
                style={{ flex:1, background:'transparent', border:'none', outline:'none', fontSize:14, color:'#fff', fontFamily:font }}
              />
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

      {/* ── FILTER TOOLBAR ────────────────────────────────────────────────────── */}
      <div style={{ background:'#fff', borderBottom:'1px solid #F3F4F6', position:'sticky', top:80, zIndex:20, fontFamily:font, boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'12px 24px' }}>

          {/* category pills */}
          <div style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:10, marginBottom:10 }}>
            {CATEGORY_FILTERS.map(cat => (
              <button key={cat} className={`cap-cat-pill${category === cat ? ' cap-active' : ''}`} onClick={() => setCategory(cat)}>
                {cat}
              </button>
            ))}
          </div>

          {/* filter inputs */}
          <div className="cap-filter-row" style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
            <div className="cap-filter-loc" style={{ position:'relative', flex:'1 1 160px', minWidth:140 }}>
              <Search size={14} style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'#9CA3AF', pointerEvents:'none' }} />
              <input
                className="cap-filter-inp"
                type="text"
                placeholder="City or country"
                value={location}
                onChange={e => setLocation(e.target.value)}
                style={{ width:'100%', padding:'9px 12px 9px 32px', border:'1.5px solid #E5E7EB', borderRadius:9, fontSize:14, color:'#111827', fontFamily:font, background:'#fff', boxSizing:'border-box' }}
              />
            </div>

            {/* language */}
            <div className="cap-filter-lang" style={{ position:'relative', flex:'1 1 150px', minWidth:130 }}>
              <select className="cap-filter-inp"
                value={language} onChange={e => setLanguage(e.target.value)}
                style={{ width:'100%', padding:'9px 32px 9px 12px', border:'1.5px solid #E5E7EB', borderRadius:9, fontSize:14, color:'#111827', fontFamily:font, background:'#fff', appearance:'none', WebkitAppearance:'none', cursor:'pointer', boxSizing:'border-box' }}>
                {['All','English','Hindi','Spanish','French','Mandarin','Arabic'].map(l => (
                  <option key={l} value={l}>{l === 'All' ? 'All Languages' : l}</option>
                ))}
              </select>
              <ChevronDown size={13} style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', color:'#9CA3AF', pointerEvents:'none' }} />
            </div>

            {/* rating */}
            <div className="cap-filter-rate" style={{ position:'relative', flex:'1 1 140px', minWidth:130 }}>
              <select className="cap-filter-inp"
                value={rating} onChange={e => setRating(e.target.value)}
                style={{ width:'100%', padding:'9px 32px 9px 12px', border:'1.5px solid #E5E7EB', borderRadius:9, fontSize:14, color:'#111827', fontFamily:font, background:'#fff', appearance:'none', WebkitAppearance:'none', cursor:'pointer', boxSizing:'border-box' }}>
                {['All Ratings','4.5+','4.0+','3.5+'].map(r => <option key={r}>{r}</option>)}
              </select>
              <ChevronDown size={13} style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', color:'#9CA3AF', pointerEvents:'none' }} />
            </div>

            {/* sort icon */}
            <div className="cap-filter-count" style={{ display:'flex', alignItems:'center', gap:6, padding:'9px 14px', border:'1.5px solid #E5E7EB', borderRadius:9, fontSize:13, color:'#6B7280', background:'#F9FAFB', flexShrink:0 }}>
              <SlidersHorizontal size={14} /> {filtered.length} captain{filtered.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* ── CAPTAINS GRID ─────────────────────────────────────────────────────── */}
      <div style={{ background:'#F9FAFB', padding:'48px 24px 72px', fontFamily:font }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>

          {filtered.length === 0 ? (
            <div style={{ textAlign:'center', padding:'80px 0', color:'#9CA3AF' }}>
              <div style={{ fontSize:48, marginBottom:16 }}><Compass size={48} color="#E5E7EB" /></div>
              <p style={{ fontSize:18, fontWeight:600, color:'#374151', margin:'0 0 8px' }}>No captains found</p>
              <p style={{ fontSize:14, margin:0 }}>Try adjusting your filters or search.</p>
            </div>
          ) : (
            <div className="cap-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:22 }}>
              {filtered.map((captain, i) => (
                <CaptainCard key={captain.id} captain={captain} delay={i * 0.06} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────────── */}
      <div style={{ background:'#fff', padding:'72px 24px', fontFamily:font }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ display:'inline-block', background:PURPLE_LIGHT, color:PURPLE_MID, padding:'4px 14px', borderRadius:9999, fontSize:12, fontWeight:700, letterSpacing:'0.5px', textTransform:'uppercase', marginBottom:12 }}>HOW IT WORKS</div>
            <h2 style={{ fontSize:'clamp(22px,3.5vw,36px)', fontWeight:800, color:'#111827', margin:'0 0 10px', letterSpacing:'-0.5px' }}>Book a Captain in 3 steps</h2>
            <p style={{ fontSize:15, color:'#6B7280', margin:0 }}>Simple, fast, and built around your trip.</p>
          </motion.div>

          <div className="cap-how-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:22 }}>
            {HOW_STEPS.map((s, i) => (
              <motion.div key={s.num} className="cap-how-card"
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.1 }}
                style={{ background:'#FAFBFC', border:'1.5px solid #E5E7EB', borderRadius:20, padding:'30px 24px', textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', position:'relative', overflow:'hidden' }}
              >
                <div style={{ position:'absolute', top:16, right:16, fontSize:36, fontWeight:900, color:'#F0F2F5', lineHeight:1, pointerEvents:'none' }}>{s.num}</div>
                <div style={{ width:48, height:48, borderRadius:13, background:`linear-gradient(135deg,${PURPLE},${PURPLE_MID})`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', boxShadow:`0 6px 16px rgba(124,58,237,0.3)` }}>
                  <s.icon size={22} color="#fff" />
                </div>
                <h3 style={{ fontSize:16, fontWeight:700, color:'#111827', margin:'0 0 8px' }}>{s.title}</h3>
                <p style={{ fontSize:13, color:'#6B7280', lineHeight:'1.6', margin:0 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHY BOOK A CAPTAIN ────────────────────────────────────────────────── */}
      <div style={{ background:'#F9FAFB', padding:'72px 24px', fontFamily:font }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ display:'inline-block', background:PURPLE_LIGHT, color:PURPLE_MID, padding:'4px 14px', borderRadius:9999, fontSize:12, fontWeight:700, letterSpacing:'0.5px', textTransform:'uppercase', marginBottom:12 }}>WHY A CAPTAIN</div>
            <h2 style={{ fontSize:'clamp(22px,3.5vw,36px)', fontWeight:800, color:'#111827', margin:'0 0 10px', letterSpacing:'-0.5px' }}>Travel smarter with a local</h2>
            <p style={{ fontSize:15, color:'#6B7280', maxWidth:480, margin:'0 auto' }}>A good Captain transforms a trip from ordinary to extraordinary.</p>
          </motion.div>

          <div className="cap-why-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:18 }}>
            {WHY_CAPTAIN.map((w, i) => (
              <motion.div key={w.title} className="cap-why-card"
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.1 }}
                style={{ background:'#fff', border:'1.5px solid #F0F2F5', borderRadius:16, padding:'24px 20px', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <div style={{ width:44, height:44, borderRadius:12, background:PURPLE_LIGHT, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14, color:PURPLE }}>
                  {w.icon}
                </div>
                <h3 style={{ fontSize:15, fontWeight:700, color:'#111827', margin:'0 0 8px' }}>{w.title}</h3>
                <p style={{ fontSize:13, color:'#6B7280', lineHeight:'1.6', margin:0 }}>{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────────────── */}
      <div style={{ background:'linear-gradient(135deg,#001F5B,#001F5B)', padding:'56px 24px', fontFamily:font, textAlign:'center', color:'#fff' }}>
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}>
          <div style={{ fontSize:40, marginBottom:16 }}>🧭</div>
          <h2 style={{ fontSize:'clamp(20px,3.5vw,34px)', fontWeight:800, margin:'0 0 12px', letterSpacing:'-0.5px' }}>{"Can't find the right Captain?"}</h2>
          <p style={{ fontSize:16, opacity:0.8, maxWidth:480, margin:'0 auto 28px', lineHeight:'1.6' }}>Tell us your destination and we will personally match you with the perfect local Captain for your trip.</p>
          <a href="/custom-trip" style={{ display:'inline-flex', alignItems:'center', gap:8, background:PURPLE, color:'#fff', padding:'14px 32px', borderRadius:9999, fontWeight:700, fontSize:16, textDecoration:'none' }}>
            Plan a Custom Trip →
          </a>
        </motion.div>
      </div>
    </Layout>
  );
}
