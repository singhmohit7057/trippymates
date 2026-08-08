import { useState, useRef, useEffect, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Star,
} from 'lucide-react';
import Layout from '../components/Layout';
import { colors } from '../lib/colors';
import {
  mockDestinations,
  mockTestimonials,
} from '../data/mock';

// ─── shared helpers ──────────────────────────────────────────────────────────

const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";



// ─── 1. HERO ─────────────────────────────────────────────────────────────────

function HeroSection() {

  const sectionStyle: CSSProperties = {
    position: 'relative',
    height: 'calc(100vh - 52px)',
    minHeight: '520px',
    background: '#001F5B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    fontFamily: font,
  };

  const videoStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    zIndex: 0,
  };

  const overlayStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(0,15,50,0.72) 0%, rgba(0,31,91,0.60) 40%, rgba(0,86,204,0.45) 100%)',
    zIndex: 1,
    pointerEvents: 'none',
  };

  // ── Centered cinematic layout ──────────────────────────────────────────────

  const contentStyle: CSSProperties = {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '40px 24px 32px',
    gap: '0',
  };

  const h1Style: CSSProperties = {
    fontSize: '58px',
    fontWeight: 900,
    color: '#FFFFFF',
    letterSpacing: '-1.5px',
    lineHeight: 1.05,
    margin: '0 0 4px',
    textShadow: '0 2px 24px rgba(0,0,0,0.35)',
  };

  const accentLineStyle: CSSProperties = {
    fontSize: '58px',
    fontWeight: 900,
    color: '#38BFFF',
    letterSpacing: '-1.5px',
    lineHeight: 1.05,
    margin: '0 0 18px',
    textShadow: '0 0 40px rgba(56,191,255,0.45)',
    display: 'block',
  };

  const subtextStyle: CSSProperties = {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.68)',
    lineHeight: 1.6,
    maxWidth: '560px',
    margin: '0 auto 36px',
    fontWeight: 400,
    letterSpacing: '0.01em',
  };



  return (
    <section className="hero-section" style={sectionStyle}>
      {/* Background video */}
      <video
        className="hero-video"
        style={videoStyle}
        src="/video1.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="hero-overlay" style={overlayStyle} />
      <style>{`
        .hero-search-input::placeholder { color: rgba(255,255,255,0.5); }
        @media (max-width: 960px) {
          .hero-section {
            height: auto !important;
            min-height: unset !important;
            aspect-ratio: 16/9;
          }
          .hero-video {
            object-fit: cover !important;
            object-position: center !important;
          }
        }
        @media (max-width: 768px) {
          .hero-h1      { font-size: 32px !important; letter-spacing: -0.5px !important; }
          .hero-accent  { font-size: 32px !important; letter-spacing: -0.5px !important; }
          .hero-sub     { font-size: 15px !important; }
          .hero-content { padding: 32px 16px 24px !important; }
          .hero-search-wrap { max-width: 100% !important; padding: 5px 5px 5px 16px !important; }
          .hero-search-btn  { padding: 9px 16px !important; font-size: 13px !important; }
        }
        @media(max-width:600px){
          .search-fields-grid { grid-template-columns: 1fr 1fr !important; }
          .search-section { padding: 32px 16px 40px !important; }
          .search-heading { font-size: 24px !important; }
        }
        @media(max-width:420px){
          .search-fields-grid { grid-template-columns: 1fr !important; }
          .search-bottom-row  { flex-direction: column !important; align-items: stretch !important; }
          .search-bottom-row button { width: 100% !important; justify-content: center !important; }
        }
      `}</style>

      <div className="hero-content" style={contentStyle}>

        {/* Main headline */}
        <motion.h1
          className="hero-h1"
          style={h1Style}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          Don't just book a trip.
        </motion.h1>
        <motion.span
          className="hero-accent"
          style={accentLineStyle}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
        >
          Invest in a story.
        </motion.span>

        {/* Subtext */}
        <motion.p
          className="hero-sub"
          style={subtextStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
        >
          Where strangers become friends and moments become memories.
        </motion.p>


      </div>
    </section>
  );
}

// ─── 2. SEARCH BAR ───────────────────────────────────────────────────────────

function SearchBar() {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [travelers, setTravelers] = useState('Travelers');
  const [tripType, setTripType] = useState('');
  const [activeTag, setActiveTag] = useState('');

  const tags = [
    { label: 'Beach', emoji: '🏖️' },
    { label: 'Adventure', emoji: '🎒' },
    { label: 'Food Tours', emoji: '🍜' },
    { label: 'Cultural', emoji: '🎭' },
  ];

  const sectionStyle: CSSProperties = {
    background: '#FFFFFF',
    padding: '48px 24px 56px',
    fontFamily: font,
  };

  const innerStyle: CSSProperties = {
    maxWidth: '860px',
    margin: '0 auto',
  };

  const headingStyle: CSSProperties = {
    fontSize: '32px',
    fontWeight: 800,
    color: '#111827',
    textAlign: 'center',
    letterSpacing: '-0.5px',
    margin: '0 0 6px',
  };

  const subStyle: CSSProperties = {
    fontSize: '15px',
    color: '#6B7280',
    textAlign: 'center',
    margin: '0 0 32px',
  };

  const cardStyle: CSSProperties = {
    background: '#FFFFFF',
    borderRadius: '20px',
    boxShadow: '0 4px 32px rgba(0,0,0,0.09)',
    padding: '28px 28px 20px',
    border: '1px solid #F0F0F0',
  };

  const fieldsRowStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gap: '16px',
    marginBottom: '20px',
    alignItems: 'end',
  };

  const fieldStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  };

  const labelStyle: CSSProperties = {
    fontSize: '10px',
    fontWeight: 700,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  };

  const inputStyle: CSSProperties = {
    height: '48px',
    border: '1.5px solid #E5E7EB',
    borderRadius: '12px',
    padding: '0 14px 0 38px',
    fontSize: '14px',
    color: '#111827',
    outline: 'none',
    fontFamily: font,
    background: '#FAFAFA',
    width: '100%',
    boxSizing: 'border-box' as const,
  };

  const inputPlainStyle: CSSProperties = {
    ...inputStyle,
    padding: '0 14px',
  };

  const selectStyle: CSSProperties = {
    ...inputPlainStyle,
    cursor: 'pointer',
    appearance: 'auto' as const,
  };

  const bottomRowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap' as const,
    gap: '12px',
  };

  const tagsStyle: CSSProperties = {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap' as const,
  };

  const tagBtn = (active: boolean): CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '7px 14px',
    borderRadius: '9999px',
    border: active ? '1.5px solid #007AFF' : '1.5px solid #E5E7EB',
    background: active ? '#EBF5FF' : '#FAFAFA',
    color: active ? '#007AFF' : '#374151',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: font,
    transition: 'all 0.15s',
  });

  const searchBtnStyle: CSSProperties = {
    height: '48px',
    background: '#007AFF',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '9999px',
    padding: '0 28px',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: font,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    whiteSpace: 'nowrap' as const,
    boxShadow: '0 4px 16px rgba(0,122,255,0.35)',
    flexShrink: 0,
  };

  return (
    <motion.div
      className="search-section"
      style={sectionStyle}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div style={innerStyle}>
        {/* Heading */}
        <h2 className="search-heading" style={headingStyle}>Find Your Perfect Trip</h2>
        <p style={subStyle}>Search from 1,200+ captains and 85+ destinations</p>

        <div style={cardStyle}>
          {/* Fields row */}
          <div className="search-fields-grid" style={fieldsRowStyle}>
            {/* WHERE TO */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Where to?</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', pointerEvents: 'none' }}>📍</span>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Search destination..."
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            {/* WHEN */}
            <div style={fieldStyle}>
              <label style={labelStyle}>When?</label>
              <input
                style={inputPlainStyle}
                type="text"
                placeholder="Add dates"
                value={date}
                onFocus={(e) => { e.target.type = 'date'; }}
                onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* WHO */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Who?</label>
              <select
                style={selectStyle}
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
              >
                <option>Travelers</option>
                <option>1 Traveler</option>
                <option>2 Travelers</option>
                <option>3–5 Travelers</option>
                <option>6–10 Travelers</option>
                <option>10+ Travelers</option>
              </select>
            </div>

            {/* TRIP TYPE */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Trip Type</label>
              <select
                style={selectStyle}
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
              >
                <option value="">Any Type</option>
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
                <option value="adventure">Adventure</option>
                <option value="luxury">Luxury</option>
                <option value="cultural">Cultural</option>
              </select>
            </div>
          </div>

          {/* Bottom row: tags + search button */}
          <div className="search-bottom-row" style={bottomRowStyle}>
            <div style={tagsStyle}>
              {tags.map((t) => (
                <button
                  key={t.label}
                  style={tagBtn(activeTag === t.label)}
                  onClick={() => setActiveTag(activeTag === t.label ? '' : t.label)}
                >
                  <span>{t.emoji}</span>
                  {t.label}
                </button>
              ))}
            </div>
            <button style={searchBtnStyle}>
              <Search size={16} />
              Search Trips
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── 4. FEATURED DESTINATIONS ────────────────────────────────────────────────

function FeaturedDestinations() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | 'international' | 'domestic'>('all');

  const filters = [
    { key: 'all',           label: 'All',           emoji: '🌍' },
    { key: 'international', label: 'International',  emoji: '✈️' },
    { key: 'domestic',      label: 'Domestic',       emoji: '🚆' },
  ] as const;

  const filtered = activeFilter === 'all'
    ? mockDestinations
    : mockDestinations.filter((d) => d.type === activeFilter);

  return (
    <section className="dest-section" style={{ padding: '64px 0 80px', background: '#FFFFFF', fontFamily: font }}>
      <style>{`
        .dest-scroll-wrap {
          overflow-x: auto;
          overflow-y: hidden;
          padding: 0 24px 16px 48px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .dest-scroll-wrap::-webkit-scrollbar { display: none; }
        .dest-oval-grid {
          display: grid;
          grid-template-rows: repeat(2, auto);
          grid-auto-flow: column;
          grid-auto-columns: 160px;
          gap: 24px 18px;
          width: max-content;
        }

        .dest-oval-card:hover .dest-oval-img { transform: scale(1.07); }
        .dest-oval-card:hover .dest-oval-name { color: #007AFF; }

        .dest-filter-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 18px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border: 1.5px solid #E5E7EB;
          background: #fff;
          color: #6B7280;
          transition: all 0.15s;
          font-family: ${font};
        }
        .dest-filter-pill:hover { border-color: #007AFF; color: #007AFF; }
        .dest-filter-pill.active { background: #007AFF; color: #fff; border-color: #007AFF; }
        @media(max-width:600px) {
          .dest-oval-grid { grid-auto-columns: 130px; gap: 16px 14px; }
          .dest-scroll-wrap { padding: 0 16px 16px 24px; }
          .dest-heading { font-size: 26px !important; }
          .dest-section { padding: 48px 0 56px !important; }
        }
      `}</style>

      {/* Header */}
      <div style={{ maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto', marginBottom: 28, padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="dest-heading" style={{ fontSize: '36px', fontWeight: 800, color: '#111827', letterSpacing: '-0.5px', margin: '0 0 20px' }}>
            Explore Destinations
          </h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {filters.map((f) => (
              <button
                key={f.key}
                className={`dest-filter-pill${activeFilter === f.key ? ' active' : ''}`}
                onClick={() => setActiveFilter(f.key)}
              >
                <span>{f.emoji}</span>
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Oval grid — full width scroll */}
      <div className="dest-scroll-wrap">
        <div className="dest-oval-grid">
          {filtered.map((dest, i) => (
            <motion.div
              key={dest.id}
              className="dest-oval-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              onClick={() => navigate('/trips')}
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
            >
              {/* Oval image */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '3 / 4',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                  background: `linear-gradient(135deg, ${dest.color}, ${dest.secondaryColor})`,
                  flexShrink: 0,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                }}
              >
                <img
                  className="dest-oval-img"
                  src={dest.image_url}
                  alt={dest.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    transition: 'transform 0.4s ease',
                  }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Name below oval */}
              <span
                className="dest-oval-name"
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#111827',
                  textAlign: 'center',
                  lineHeight: 1.3,
                  transition: 'color 0.15s',
                }}
              >
                {dest.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



// ─── 6b. WHY TRIPPY MATES ────────────────────────────────────────────────────

function WhyTrippyMates() {
  const reasons = [
    {
      emoji: '🛡️',
      title: 'Your safety, our priority.',
      desc: 'Travel solo without a second thought. Verified stays, trusted transport, and experienced guides so every journey feels secure and free.',
    },
    {
      emoji: '🚩',
      title: 'A flag you can trust.',
      desc: "From the moment you book to the moment you return, we've got you covered — no compromises on comfort, safety, or reliability.",
    },
    {
      emoji: '💸',
      title: 'What you see is what you pay.',
      desc: 'No middlemen, no hidden charges. Book directly with us for honest pricing, lower costs, and support that actually responds.',
    },
    {
      emoji: '🎯',
      title: 'Trips built around you.',
      desc: 'We match you with the right group — by age, interest, and energy — so every trip feels like it was made exactly for you.',
    },
  ];

  return (
    <section className="wtm-section" style={{ background: '#F0F7F7', padding: '88px 24px 96px', fontFamily: font, position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .wtm-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        @media (max-width: 960px) {
          .wtm-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .wtm-grid { grid-template-columns: 1fr !important; }
          .wtm-title { font-size: 26px !important; }
          .wtm-section { padding: 56px 16px 64px !important; }
        }
        .wtm-card { transition: transform 0.22s ease, box-shadow 0.22s ease; }
        .wtm-card:hover { transform: translateY(-5px) !important; box-shadow: 0 14px 36px rgba(0,0,0,0.11) !important; }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <span style={{ display: 'inline-block', background: '#007AFF', color: '#fff', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: '9999px', padding: '4px 14px', marginBottom: '16px' }}>
            Why Trippy Mates
          </span>
          <h2
            className="wtm-title"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 900, color: '#111827', letterSpacing: '-0.8px', margin: '0 0 14px', lineHeight: 1.15 }}
          >
            Every reason you need to travel with us.
          </h2>
          <p style={{ fontSize: '16px', color: '#6B7280', maxWidth: '500px', margin: '0 auto', lineHeight: 1.65 }}>
            We don't just plan trips — we make memories you'll talk about for years.
          </p>
        </motion.div>

        <div className="wtm-grid">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              className="wtm-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.42, delay: i * 0.09 }}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '32px 26px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                border: '1px solid #E8F0FE',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
                  {r.emoji}
                </div>
                <div style={{ fontSize: '17px', fontWeight: 700, color: '#111827', lineHeight: 1.3 }}>{r.title}</div>
              </div>
              <div style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.7 }}>{r.desc}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── 9. TESTIMONIALS ─────────────────────────────────────────────────────────

function Testimonials() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const testimonials = [...mockTestimonials, ...mockTestimonials, ...mockTestimonials];
  const cardWidth = 344;
  const setSize = mockTestimonials.length * cardWidth;

  useEffect(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = setSize + 160;
      }
    });
  }, []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollLeft >= setSize * 2) {
      el.scrollLeft -= setSize;
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += setSize;
    }
  };

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
  };

  const sectionStyle: CSSProperties = {
    padding: '80px 24px',
    background: colors.background,
    fontFamily: font,
  };

  const containerStyle: CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const titleStyle: CSSProperties = {
    fontSize: '36px',
    fontWeight: 800,
    color: colors.text,
    letterSpacing: '-0.5px',
    textAlign: 'center',
    marginBottom: '8px',
  };

  const subtitleStyle: CSSProperties = {
    fontSize: '16px',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: '52px',
  };

  const arrowBtn: CSSProperties = {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    border: `1px solid ${colors.border}`,
    background: colors.surface,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '18px',
    color: colors.text,
    flexShrink: 0,
  };

  return (
    <section className="testimonials-section" style={sectionStyle}>
      <style>{`
        .testimonials-scroll::-webkit-scrollbar { display: none; }
        @media (max-width: 768px) {
          .testimonials-scroll { padding-left: 20px !important; padding-right: 20px !important; }
        }
        @media (max-width: 540px) {
          .testimonials-title { font-size: 28px !important; }
          .testimonials-section { padding: 56px 0 !important; }
        }
      `}</style>
      <div style={containerStyle}>
        <motion.h2
          className="testimonials-title"
          style={titleStyle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          What Travelers Say
        </motion.h2>
        <motion.p
          style={subtitleStyle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Real stories from real travelers who explored the world with Trippy Mates.
        </motion.p>
      </div>

        <div style={{ position: 'relative' }}>
          <button style={{ ...arrowBtn, position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }} onClick={() => scroll('left')} aria-label="Scroll left">&#8249;</button>

          <div
            className="testimonials-scroll"
            ref={scrollRef}
            onScroll={handleScroll}
            style={{
              display: 'flex',
              gap: '24px',
              overflowX: 'auto',
              scrollSnapType: 'none',
              scrollbarWidth: 'none',
              paddingLeft: '0',
              paddingRight: '0',
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={`${t.id}-${i}`}
                style={{
                  background: colors.surface,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '16px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  minWidth: '320px',
                  maxWidth: '320px',
                  flexShrink: 0,
                }}
              >
                {/* Stars */}
                <div style={{ display: 'flex', gap: '3px' }}>
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} size={15} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                {/* Quote */}
                <p style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: 1.7, flex: 1, margin: 0, fontStyle: 'italic' }}>
                  "{t.text}"
                </p>
                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: t.avatarColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      flexShrink: 0,
                    }}
                  >
                    {t.avatarInitial}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: colors.text }}>{t.name}</div>
                    <div style={{ fontSize: '12px', color: colors.textMuted }}>{t.role}</div>
                  </div>
                </div>
                {/* Destination */}
                <div
                  style={{
                    fontSize: '12px',
                    color: colors.primary,
                    fontWeight: 500,
                    background: colors.skyWash,
                    borderRadius: '9999px',
                    padding: '4px 12px',
                    alignSelf: 'flex-start',
                  }}
                >
                  📍 {t.destination}
                </div>
              </div>
            ))}
          </div>

          <button style={{ ...arrowBtn, position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }} onClick={() => scroll('right')} aria-label="Scroll right">&#8250;</button>
        </div>
    </section>
  );
}

// ─── 12. FINAL CTA ───────────────────────────────────────────────────────────

function FinalCTA() {
  const navigate = useNavigate();

  const sectionStyle: CSSProperties = {
    background: colors.background,
    padding: '80px 24px',
    fontFamily: font,
    textAlign: 'center',
  };

  const innerStyle: CSSProperties = {
    maxWidth: '640px',
    margin: '0 auto',
  };

  const titleStyle: CSSProperties = {
    fontSize: '40px',
    fontWeight: 800,
    color: colors.text,
    letterSpacing: '-0.75px',
    lineHeight: 1.2,
    marginBottom: '16px',
  };

  const descStyle: CSSProperties = {
    fontSize: '17px',
    color: colors.textSecondary,
    lineHeight: 1.7,
    marginBottom: '36px',
  };

  const btnRowStyle: CSSProperties = {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  };

  const btnPrimaryStyle: CSSProperties = {
    background: colors.primary,
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '9999px',
    padding: '14px 36px',
    fontSize: '16px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: font,
    boxShadow: '0 4px 16px rgba(0,122,255,0.3)',
  };

  const btnOutlineStyle: CSSProperties = {
    background: 'transparent',
    color: colors.primary,
    border: `2px solid ${colors.primary}`,
    borderRadius: '9999px',
    padding: '14px 36px',
    fontSize: '16px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: font,
  };

  return (
    <section className="final-cta-section" style={sectionStyle}>
      <style>{`
        @media (max-width: 540px) {
          .final-cta-title { font-size: 28px !important; }
          .final-cta-section { padding: 56px 16px !important; }
        }
      `}</style>
      <motion.div
        style={innerStyle}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ fontSize: '36px', marginBottom: '16px' }}>⛵</div>
        <h2 className="final-cta-title" style={titleStyle}>
          Ready for Your<br />Next Adventure?
        </h2>
        <p style={descStyle}>
          Whether you want a local captain by your side or a fully custom itinerary — we've got you covered. Start planning today.
        </p>
        <div style={btnRowStyle}>
          <button style={btnPrimaryStyle} onClick={() => navigate('/captains')}>
            Book a Captain
          </button>
          <button style={btnOutlineStyle} onClick={() => navigate('/trips/custom')}>
            Plan Custom Trip
          </button>
        </div>
      </motion.div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <SearchBar />
      <FeaturedDestinations />
      <WhyTrippyMates />
      <Testimonials />
      <FinalCTA />
    </Layout>
  );
}
