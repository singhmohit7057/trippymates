import { type CSSProperties, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Clock, MapPin, ChevronDown, Globe, SlidersHorizontal, Search } from 'lucide-react';
import Layout from '../../components/Layout';
import { mockTrips } from '../../data/mock';
import type { Trip } from '../../types';

const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating';

const CATEGORIES = [
  { label: 'All',        emoji: '🌍' },
  { label: 'Wellness',   emoji: '🧘' },
  { label: 'Cultural',   emoji: '🏛️' },
  { label: 'Luxury',     emoji: '✨' },
  { label: 'Adventure',  emoji: '🏔️' },
  { label: 'Beach',      emoji: '🏖️' },
];

export default function InternationalTripsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy]   = useState<SortOption>('default');
  const [search, setSearch]   = useState('');

  const international = mockTrips.filter(t => t.type === 'international');

  const uniqueDestinations = new Set(international.map(t => t.destination)).size;
  const minPrice = Math.min(...international.map(t => t.price_per_person));
  const avgRating = (international.reduce((s, t) => s + t.rating, 0) / (international.length || 1)).toFixed(1);

  const STATS = [
    { value: `${uniqueDestinations}+`,              label: 'Destinations' },
    { value: `${avgRating}★`,                       label: 'Avg Rating' },
    { value: '10+',                                 label: 'Countries' },
    { value: `$${minPrice.toLocaleString()}`,        label: 'Starting Price' },
  ];

  const filtered = international.filter(t => {
    const matchCat    = activeCategory === 'All' || t.category.toLowerCase() === activeCategory.toLowerCase();
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.destination.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc')  return a.price_per_person - b.price_per_person;
    if (sortBy === 'price-desc') return b.price_per_person - a.price_per_person;
    if (sortBy === 'rating')     return b.rating - a.rating;
    return 0;
  });

  return (
    <Layout>
      <style>{`
        .int-pill { transition: all 0.18s; }
        .int-pill:hover { transform: translateY(-1px); }
        .int-card { transition: transform 0.22s, box-shadow 0.22s; }
        .int-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(0,0,0,0.13) !important; }
        .int-card:hover .int-card-img { transform: scale(1.04); }
        .int-book-btn { transition: background 0.15s, transform 0.15s; }
        .int-book-btn:hover { background: #0056CC !important; transform: translateY(-1px); }
        .int-sort { outline: none; }
        .int-search-inp:focus { border-color: #4DB2FF !important; box-shadow: 0 0 0 3px rgba(96,165,250,0.2) !important; }
        @media (max-width: 640px) {
          .int-toolbar  { flex-direction: column !important; align-items: stretch !important; }
          .int-pills    { overflow-x: auto !important; flex-wrap: nowrap !important; padding-bottom: 4px !important; -webkit-overflow-scrolling: touch; }
        }
        @media (max-width: 480px) {
          .int-pill { padding: 6px 12px !important; font-size: 12px !important; }
        }
      `}</style>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(140deg, #001F5B 0%, #0f1f5c 40%, #003A99 70%, #0056CC 100%)',
        height: '85vh', minHeight: '600px', padding: '0 24px', color: '#fff', fontFamily: font,
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        {/* Decorative circles */}
        <div style={{ position:'absolute', top:'-100px', right:'-100px', width:'480px', height:'480px', borderRadius:'50%', border:'1.5px solid rgba(255,255,255,0.05)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'-40px', right:'-40px', width:'280px', height:'280px', borderRadius:'50%', border:'1.5px solid rgba(255,255,255,0.07)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-80px', left:'-60px', width:'340px', height:'340px', borderRadius:'50%', border:'1.5px solid rgba(255,255,255,0.04)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'30%', left:'5%', width:'6px', height:'6px', borderRadius:'50%', background:'rgba(255,255,255,0.2)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'20%', right:'15%', width:'10px', height:'10px', borderRadius:'50%', background:'rgba(255,255,255,0.12)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'30%', right:'8%', width:'8px', height:'8px', borderRadius:'50%', background:'rgba(255,255,255,0.1)', pointerEvents:'none' }} />

        {/* Centre content */}
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', zIndex:1 }}>
          <div style={{ maxWidth:'900px', width:'100%', textAlign:'center', padding:'40px 0 24px' }}>
            {/* Badge */}
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:'9999px', padding:'7px 18px', fontSize:'13px', fontWeight:600, marginBottom:'24px', backdropFilter:'blur(8px)' }}>
              <Globe size={14} /> International Trips
            </div>

            <h1 style={{ fontSize:'clamp(36px, 6vw, 64px)', fontWeight:900, margin:'0 0 18px', letterSpacing:'-2px', lineHeight:1.05 }}>
              Explore the World<br />
              <span style={{ color:'#80BDFF' }}>with a Captain.</span>
            </h1>

            <p style={{ fontSize:'17px', opacity:0.82, maxWidth:'540px', margin:'0 auto 32px', lineHeight:1.7 }}>
              From Bali sunsets to European cobblestones — discover the world through the eyes of verified local Captains.
            </p>

            {/* Search bar */}
            <div style={{ maxWidth:'500px', margin:'0 auto', position:'relative' }}>
              <Search size={17} style={{ position:'absolute', left:'18px', top:'50%', transform:'translateY(-50%)', color:'rgba(255,255,255,0.5)', pointerEvents:'none' }} />
              <input
                className="int-search-inp"
                type="text"
                placeholder="Search countries or trips…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width:'100%', height:'50px', borderRadius:'14px',
                  border:'1.5px solid rgba(255,255,255,0.2)',
                  background:'rgba(255,255,255,0.1)', backdropFilter:'blur(10px)',
                  color:'#fff', fontSize:'15px', paddingLeft:'48px', paddingRight:'18px',
                  fontFamily:font, outline:'none', boxSizing:'border-box',
                }}
              />
            </div>
          </div>
        </div>

        {/* Stats strip — pinned to bottom */}
        <div style={{ position:'relative', zIndex:1, borderTop:'1px solid rgba(255,255,255,0.1)', display:'flex', justifyContent:'center', flexWrap:'wrap' }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              flex:'1 1 120px', padding:'18px 16px', textAlign:'center',
              borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}>
              <div style={{ fontSize:'clamp(18px,2.5vw,26px)', fontWeight:800, color:'#80BDFF', letterSpacing:'-0.5px' }}>{s.value}</div>
              <div style={{ fontSize:'11px', opacity:0.6, marginTop:'3px', fontWeight:500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FILTER + SORT TOOLBAR ──────────────────────────────────────────── */}
      <div style={{ background:'#fff', borderBottom:'1px solid #E5E7EB', position:'sticky', top:0, zIndex:40, boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 24px' }}>
          <div className="int-toolbar" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px', paddingTop:'14px', paddingBottom:'14px', flexWrap:'wrap' }}>
            {/* Category pills */}
            <div style={{ display:'flex', alignItems:'center', gap:'8px', flexWrap:'wrap' }}>
              {CATEGORIES.map(cat => {
                const active = activeCategory === cat.label;
                return (
                  <button key={cat.label} className="int-pill"
                    onClick={() => setActiveCategory(cat.label)}
                    style={{
                      display:'flex', alignItems:'center', gap:'5px',
                      padding:'8px 16px', borderRadius:'9999px', fontSize:'13px', fontWeight:600,
                      cursor:'pointer', border: active ? 'none' : '1.5px solid #E5E7EB',
                      background: active ? '#007AFF' : '#F9FAFB',
                      color: active ? '#fff' : '#6B7280',
                      boxShadow: active ? '0 4px 12px rgba(37,99,235,0.3)' : 'none',
                    }}>
                    <span style={{ fontSize:'14px' }}>{cat.emoji}</span>{cat.label}
                  </button>
                );
              })}
            </div>

            {/* Sort + count */}
            <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
              <span style={{ fontSize:'13px', color:'#9CA3AF', fontWeight:500, whiteSpace:'nowrap' }}>
                {sorted.length} trip{sorted.length !== 1 ? 's' : ''}
              </span>
              <div style={{ display:'flex', alignItems:'center', gap:'6px', background:'#F9FAFB', border:'1.5px solid #E5E7EB', borderRadius:'10px', padding:'7px 12px' }}>
                <SlidersHorizontal size={13} color="#6B7280" />
                <select className="int-sort" value={sortBy} onChange={e => setSortBy(e.target.value as SortOption)}
                  style={{ border:'none', background:'transparent', fontSize:'13px', color:'#374151', cursor:'pointer', fontFamily:font, fontWeight:500 }}>
                  <option value="default">Default</option>
                  <option value="price-asc">Price ↑</option>
                  <option value="price-desc">Price ↓</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TRIP GRID ──────────────────────────────────────────────────────── */}
      <div style={{ background:'#F8FAFC', padding:'40px 24px 80px', fontFamily:font }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          {sorted.length > 0 ? (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(330px, 1fr))', gap:'28px' }}>
              {sorted.map((trip, i) => <TripCard key={trip.id} trip={trip} index={i} />)}
            </div>
          ) : (
            <div style={{ textAlign:'center', padding:'80px 0', color:'#9CA3AF' }}>
              <div style={{ fontSize:'56px', marginBottom:'16px' }}>🌍</div>
              <p style={{ fontSize:'17px', fontWeight:600, color:'#374151', margin:'0 0 8px' }}>No trips found</p>
              <p style={{ fontSize:'14px', margin:0 }}>Try a different category or clear your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── WHY TRAVEL WITH US ─────────────────────────────────────────────── */}
      <WhyUs />

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <FAQ />

      {/* ── TRAVEL GUIDELINES ─────────────────────────────────────────────── */}
      <TravelGuidelines />
    </Layout>
  );
}

/* ── WHY US ─────────────────────────────────────────────────────────────── */
const WHY = [
  { emoji:'🧭', title:'Verified Local Captains',   desc:'Every international trip is led by a vetted local expert who knows the culture, hidden gems, and how to keep you safe abroad.' },
  { emoji:'🛂', title:'Visa & Doc Assistance',      desc:"We guide you through visa requirements, document checklists, and travel insurance so you're never caught off-guard." },
  { emoji:'✈️', title:'End-to-End Managed',         desc:'Flights, hotels, transfers, activities — everything is coordinated so you can focus entirely on the experience.' },
  { emoji:'💸', title:'Transparent Pricing',        desc:'No hidden fees. What you see is what you pay — with flexible payment plans available for international bookings.' },
];

function WhyUs() {
  return (
    <section style={{ background:'#fff', padding:'80px 24px', fontFamily:font }}>
      <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'52px' }}>
          <div style={{ display:'inline-block', background:'#EBF5FF', color:'#0056CC', borderRadius:'9999px', padding:'5px 16px', fontSize:'12px', fontWeight:700, marginBottom:'14px', textTransform:'uppercase', letterSpacing:'0.08em' }}>
            Why Trippy Mates?
          </div>
          <h2 style={{ fontSize:'clamp(22px,4vw,38px)', fontWeight:800, color:'#111827', margin:'0 0 12px', letterSpacing:'-0.5px' }}>
            Your world, explored right
          </h2>
          <p style={{ fontSize:'15px', color:'#6B7280', maxWidth:'480px', margin:'0 auto', lineHeight:1.7 }}>
            We're not just a travel agency — we're your global crew, built for curious explorers.
          </p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(230px, 1fr))', gap:'22px' }}>
          {WHY.map((w, i) => (
            <div key={i} style={{
              background:'linear-gradient(145deg, #EBF5FF, #CCE4FF)',
              borderRadius:'20px', padding:'28px 24px',
              border:'1.5px solid #99CEFF', display:'flex', flexDirection:'column', gap:'12px',
            }}>
              <div style={{ fontSize:'32px' }}>{w.emoji}</div>
              <h3 style={{ fontSize:'15px', fontWeight:700, color:'#111827', margin:0 }}>{w.title}</h3>
              <p style={{ fontSize:'13px', color:'#6B7280', lineHeight:1.7, margin:0 }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ─────────────────────────────────────────────────────────────────── */
const FAQS = [
  { q: 'What is included in an international trip package?', a: 'Packages typically include accommodation, inter-city transfers, a verified local Captain, select meals, and curated experiences. Check each listing for the exact inclusions.' },
  { q: 'Do I need a visa for international trips?', a: 'Visa requirements vary by destination and nationality. We provide a full visa checklist for every destination and can recommend visa assistance services — though the application itself is your responsibility.' },
  { q: 'Is travel insurance mandatory?', a: 'We strongly recommend purchasing comprehensive travel insurance before departure. Some destinations may require proof of insurance. We can guide you to trusted providers.' },
  { q: 'Can I customise an international itinerary?', a: 'Yes! Contact us via WhatsApp or the Custom Trip page. Our trip specialists will build a tailored international itinerary around your dates, budget, and interests.' },
  { q: 'What currency should I carry?', a: 'We recommend carrying a small amount of local currency for each destination. We also suggest a travel-friendly forex card. Your Captain will advise on local spending norms.' },
  { q: 'Are international trips suitable for solo travellers?', a: "Absolutely. Our group international trips are great for solo travellers — you'll explore with a like-minded group and your Captain ensures you're safe and never alone." },
  { q: 'What is the cancellation policy for international trips?', a: 'Cancellations 30+ days before departure: full refund. 15–29 days: 50% refund. Under 15 days: no refund. International bookings may also be affected by airline and hotel policies.' },
  { q: 'Are flights included in international packages?', a: 'Most packages are land-only (post-arrival). Some packages include round-trip flights — this is clearly indicated on the listing. We can assist with flight bookings separately.' },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section style={{ background:'#F8FAFC', padding:'80px 24px', fontFamily:font }}>
      <div style={{ maxWidth:'760px', margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'48px' }}>
          <div style={{ display:'inline-block', background:'#EBF5FF', color:'#0056CC', borderRadius:'9999px', padding:'5px 16px', fontSize:'12px', fontWeight:700, marginBottom:'14px', textTransform:'uppercase', letterSpacing:'0.08em' }}>
            FAQ
          </div>
          <h2 style={{ fontSize:'clamp(22px,4vw,36px)', fontWeight:800, color:'#111827', margin:'0 0 12px', letterSpacing:'-0.4px' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize:'15px', color:'#6B7280', margin:0, lineHeight:1.7 }}>
            Everything you need to know before booking your international trip.
          </p>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{
                background:'#fff', borderRadius:'14px',
                border:`1.5px solid ${isOpen ? '#007AFF' : '#E5E7EB'}`,
                overflow:'hidden', transition:'border-color 0.2s',
                boxShadow: isOpen ? '0 4px 20px rgba(37,99,235,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
              }}>
                <button onClick={() => setOpen(isOpen ? null : i)}
                  style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px', padding:'18px 22px', background:'none', border:'none', cursor:'pointer', textAlign:'left', fontFamily:font }}>
                  <span style={{ fontSize:'15px', fontWeight:600, color:'#111827', lineHeight:1.4 }}>{item.q}</span>
                  <div style={{ flexShrink:0, width:'28px', height:'28px', borderRadius:'50%', background: isOpen ? '#007AFF' : '#F3F4F6', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s' }}>
                    <ChevronDown size={15} color={isOpen ? '#fff' : '#6B7280'} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition:'transform 0.25s' }} />
                  </div>
                </button>
                {isOpen && (
                  <div style={{ padding:'0 22px 18px', fontSize:'14px', color:'#6B7280', lineHeight:1.75, borderTop:'1px solid #F3F4F6' }}>
                    <div style={{ paddingTop:'14px' }}>{item.a}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── TRAVEL GUIDELINES ───────────────────────────────────────────────────── */
const GUIDELINES = [
  { emoji:'🛂', title:'Passport & Visa',         desc:'Ensure your passport has at least 6 months validity. Check visa requirements for your destination well in advance — apply early.' },
  { emoji:'💉', title:'Vaccinations',             desc:'Some countries require proof of vaccinations (e.g. Yellow Fever). Consult your doctor at least 4–6 weeks before departure.' },
  { emoji:'🏥', title:'Travel Insurance',         desc:'Mandatory for most destinations. Ensure coverage includes medical emergencies, trip cancellation, and emergency evacuation.' },
  { emoji:'💱', title:'Currency & Forex',         desc:'Carry a forex card and some local cash. Inform your bank of your travel dates to avoid card blocks abroad.' },
  { emoji:'📱', title:'Connectivity',             desc:'Purchase a local SIM or international roaming plan. Download offline maps and save emergency contact numbers before you fly.' },
  { emoji:'🌿', title:'Responsible Tourism',      desc:"Respect local customs, dress codes, and wildlife. Follow your Captain's guidance on cultural sensitivities at each destination." },
  { emoji:'🔒', title:'Safety & Security',        desc:'Keep digital and physical copies of your passport. Share your itinerary with family. Stay aware of local travel advisories.' },
  { emoji:'✈️', title:'Customs & Declarations',   desc:'Declare all items as required. Be aware of what you can and cannot carry across borders — penalties can be severe.' },
];

function TravelGuidelines() {
  return (
    <section style={{ background:'#fff', padding:'80px 24px 96px', fontFamily:font }}>
      <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'52px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'7px', background:'#CCE4FF', color:'#0056CC', borderRadius:'9999px', padding:'5px 16px', fontSize:'12px', fontWeight:700, marginBottom:'14px', textTransform:'uppercase', letterSpacing:'0.08em' }}>
            <Globe size={13} /> International Travel Guidelines
          </div>
          <h2 style={{ fontSize:'clamp(22px,4vw,36px)', fontWeight:800, color:'#111827', margin:'0 0 12px', letterSpacing:'-0.4px' }}>
            Travel Smart Around the World
          </h2>
          <p style={{ fontSize:'15px', color:'#6B7280', maxWidth:'500px', margin:'0 auto', lineHeight:1.7 }}>
            Keep these guidelines in mind for a safe, hassle-free international journey.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(235px, 1fr))', gap:'20px' }}>
          {GUIDELINES.map((g, i) => (
            <div key={i} style={{
              background:'#F8FAFC', borderRadius:'18px', padding:'26px 22px',
              border:'1.5px solid #E5E7EB', display:'flex', flexDirection:'column', gap:'10px',
            }}>
              <div style={{ width:'48px', height:'48px', borderRadius:'13px', background:'#EBF5FF', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px' }}>
                {g.emoji}
              </div>
              <h3 style={{ fontSize:'15px', fontWeight:700, color:'#111827', margin:0 }}>{g.title}</h3>
              <p style={{ fontSize:'13px', color:'#6B7280', lineHeight:1.7, margin:0 }}>{g.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop:'40px', background:'linear-gradient(135deg, #EBF5FF, #CCE4FF)', borderRadius:'18px', padding:'24px 32px', display:'flex', alignItems:'center', gap:'16px', border:'1.5px solid #99CEFF' }}>
          <div style={{ width:'48px', height:'48px', borderRadius:'13px', background:'#007AFF', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:'22px' }}>
            💡
          </div>
          <p style={{ margin:0, fontSize:'14px', color:'#1e3a8a', lineHeight:1.75 }}>
            <strong>Your Captain has you covered.</strong> Every Trippy Mates international trip is led by a verified local Captain who knows the terrain, cultural norms, and emergency contacts — so you can explore the world with complete confidence.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── TRIP CARD ───────────────────────────────────────────────────────────── */
const categoryColorMap: Record<string, string> = {
  wellness:  '#4FBEFF',
  cultural:  '#F26110',
  luxury:    '#9552E0',
  beach:     '#F59E0B',
  nature:    '#10B981',
  adventure: '#007AFF',
};

function TripCard({ trip, index: _index }: { trip: Trip; index: number }) {
  const spotsLeft = trip.max_travelers - trip.current_travelers;
  const pct = Math.round((trip.current_travelers / trip.max_travelers) * 100);
  const isHot = pct >= 75;
  const catColor = categoryColorMap[trip.category] ?? '#007AFF';

  return (
    <div className="int-card"
      style={{ background:'#fff', borderRadius:'20px', overflow:'hidden', display:'flex', flexDirection:'column', boxShadow:'0 4px 16px rgba(0,0,0,0.07)', border:'1.5px solid #F0F2F5' }}
    >
      {/* Image */}
      <div style={{ height:'220px', overflow:'hidden', position:'relative', flexShrink:0 }}>
        <div className="int-card-img" style={{
          width:'100%', height:'100%',
          backgroundImage:`url(${trip.image_url})`,
          backgroundSize:'cover', backgroundPosition:'center',
          transition:'transform 0.4s ease',
        }} />
        {/* Gradient overlay */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)', pointerEvents:'none' }} />

        {/* Top badges */}
        <div style={{ position:'absolute', top:'12px', left:'12px', display:'flex', gap:'6px' }}>
          <span style={{ background:'rgba(0,0,0,0.55)', backdropFilter:'blur(6px)', color:'#fff', borderRadius:'9999px', padding:'4px 10px', fontSize:'11px', fontWeight:700, display:'flex', alignItems:'center', gap:'4px' }}>
            <Clock size={10} />{trip.duration_days}D
          </span>
          <span style={{ background: catColor, color:'#fff', borderRadius:'9999px', padding:'4px 10px', fontSize:'11px', fontWeight:700 }}>
            {trip.category.charAt(0).toUpperCase() + trip.category.slice(1)}
          </span>
          {isHot && (
            <span style={{ background:'#EF4444', color:'#fff', borderRadius:'9999px', padding:'4px 10px', fontSize:'11px', fontWeight:700 }}>
              🔥 Hot
            </span>
          )}
        </div>

        {/* Top-right: destination */}
        <div style={{ position:'absolute', top:'12px', right:'12px', background:'rgba(255,255,255,0.92)', backdropFilter:'blur(6px)', borderRadius:'9999px', padding:'4px 10px', fontSize:'11px', fontWeight:700, color:'#111827', display:'flex', alignItems:'center', gap:'4px' }}>
          <MapPin size={10} color="#007AFF" style={{ flexShrink:0 }} />{trip.destination}
        </div>

        {/* Bottom: price overlay */}
        <div style={{ position:'absolute', bottom:'12px', left:'12px' }}>
          <span style={{ fontSize:'22px', fontWeight:800, color:'#fff', letterSpacing:'-0.5px', textShadow:'0 2px 8px rgba(0,0,0,0.4)' }}>
            ${trip.price_per_person.toLocaleString()}
          </span>
          <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.8)', marginLeft:'4px' }}>/person</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding:'20px', flex:1, display:'flex', flexDirection:'column', gap:'10px' }}>
        <h3 style={{ fontSize:'17px', fontWeight:700, color:'#111827', margin:0, lineHeight:1.3 }}>{trip.title}</h3>

        <p style={{ fontSize:'13px', color:'#6B7280', lineHeight:1.55, margin:0, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' } as CSSProperties}>
          {trip.description}
        </p>

        {/* Rating + pax */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:'13px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'4px', fontWeight:600 }}>
            <Star size={13} fill="#FBBF24" color="#FBBF24" />
            <span style={{ color:'#111827' }}>{trip.rating}</span>
            <span style={{ fontWeight:400, color:'#9CA3AF' }}>({trip.review_count} reviews)</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'4px', color:'#6B7280', fontWeight:500 }}>
            <Users size={13} />{trip.current_travelers}/{trip.max_travelers} joined
          </div>
        </div>

        {/* Capacity bar */}
        <div>
          <div style={{ height:'5px', background:'#F3F4F6', borderRadius:'9999px', overflow:'hidden' }}>
            <div style={{ height:'100%', width:`${pct}%`, background: pct >= 80 ? '#EF4444' : '#007AFF', borderRadius:'9999px', transition:'width 0.3s' }} />
          </div>
          <p style={{ fontSize:'11px', color: pct >= 80 ? '#EF4444' : '#9CA3AF', margin:'4px 0 0', fontWeight:500 }}>
            {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left
          </p>
        </div>

        <Link to={`/trips/${trip.slug}`} className="int-book-btn"
          style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', background:'#007AFF', color:'#fff', borderRadius:'12px', padding:'13px', fontWeight:700, fontSize:'14px', textDecoration:'none', marginTop:'auto' }}>
          View Trip →
        </Link>
      </div>
    </div>
  );
}
