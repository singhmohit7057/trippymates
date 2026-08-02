import { useState, type CSSProperties } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plane,
  Users,
  MessageCircle,
  MapPin,
  Search,
  // CheckCircle,
  Star,
  ArrowRight,
  Shield,
  Headphones,
  Globe,
  Heart,
} from 'lucide-react';
import Layout from '../components/Layout';
import { colors, shadows } from '../lib/colors';
import {
  mockDestinations,
  mockCaptains,
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
    <section style={sectionStyle}>
      {/* Background video */}
      <video
        style={videoStyle}
        src="/video1.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div style={overlayStyle} />
      <style>{`
        .hero-search-input::placeholder { color: rgba(255,255,255,0.5); }
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
      style={sectionStyle}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div style={innerStyle}>
        {/* Heading */}
        <h2 style={headingStyle}>Find Your Perfect Trip</h2>
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

// ─── 3. CORE SERVICES ────────────────────────────────────────────────────────

// ─── COMPANION BANNER ────────────────────────────────────────────────────────

function CompanionBanner() {
  const navigate = useNavigate();
  return (
    <div style={{ position: 'relative', background: 'linear-gradient(180deg, #EBF5FF 0%, #F8FAFC 100%)' }}>
      <style>{`
        .companion-hero { height: 500px; }
        .companion-label { font-size: 72px; }
        @media(max-width:900px) { .companion-hero { height: 380px !important; } }
        @media(max-width:600px) { .companion-hero { height: 280px !important; } .companion-label { font-size: 52px !important; } }
      `}</style>

      {/* Title + image all in one unified block */}
      <div
        className="companion-hero"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'relative',
          overflow: 'hidden',
          height: 'auto',
          paddingTop: 56,
          marginBottom: 0,
        }}
      >
        {/* Title + subtitle */}
        <div style={{ textAlign: 'center', marginBottom: 8, position: 'relative', zIndex: 4, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
          <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, color: '#111827', letterSpacing: '-0.5px', margin: '0 0 10px' }}>
            Everything You Need to Travel Better
          </h2>
          <p style={{ fontSize: 16, color: '#64748B', margin: 0 }}>
            From booking to boarding — we handle it all.
          </p>
        </div>

        {/* Guide group image */}
        <img
          src="/meet-our-captain.png"
          alt="Trippy Mates Captain with group"
          style={{
            height: 480,
            width: 'auto',
            maxWidth: '90%',
            objectFit: 'contain',
            objectPosition: 'bottom',
            display: 'block',
            position: 'relative',
            zIndex: 2,
            marginTop: 20,
          }}
        />

        {/* CTA button */}
        <button
          onClick={() => navigate('/captains')}
          style={{
            position: 'absolute',
            bottom: 60,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
            background: 'rgba(255,255,255,0.95)',
            color: '#111827',
            border: 'none',
            borderRadius: '9999px',
            padding: '14px 32px',
            fontSize: '15px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(8px)',
          }}
        >
          Hire a Captain →
        </button>
      </div>
    </div>
  );
}

function CoreServices() {
  const sectionStyle: CSSProperties = {
    padding: '0px 24px 80px',
    background: colors.background,
    fontFamily: font,
  };

  const containerStyle: CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
  };

  const services = [
    {
      icon: <Plane size={24} color={colors.primary} />,
      iconBg: colors.skyWash,
      title: 'Book Trips',
      desc: 'Join curated travel experiences crafted by local experts for every kind of traveler.',
      link: '/trips',
    },
    {
      icon: <Users size={24} color="#F26110" />,
      iconBg: '#FFF3EB',
      title: 'Book a Captain',
      desc: 'Hire verified local experts who know every hidden gem, shortcut, and secret in their city.',
      link: '/captains',
    },
    {
      icon: <MessageCircle size={24} color="#9552E0" />,
      iconBg: colors.lilacMist,
      title: 'Travel Communities',
      desc: 'Connect with like-minded travelers worldwide — share stories, tips, and adventures.',
      link: '/community',
    },
    {
      icon: <MapPin size={24} color="#10B981" />,
      iconBg: colors.sprout,
      title: 'Custom Trip Planning',
      desc: 'Get a personalized itinerary tailored to your dates, budget, and travel style.',
      link: '/custom-trip',
    },
  ];

  return (
    <section style={sectionStyle}>
      <style>{`
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .services-title { font-size: 28px !important; }
        }
      `}</style>
      <div style={containerStyle}>
        <div className="services-grid" style={gridStyle}>
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              style={{
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: '16px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                cursor: 'default',
              }}
              whileHover={{ y: -4, boxShadow: shadows.lg }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: s.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: colors.text }}>{s.title}</div>
              </div>
              <div style={{ fontSize: '14px', color: colors.textSecondary, lineHeight: 1.6 }}>{s.desc}</div>
              <Link
                to={s.link}
                style={{ fontSize: '14px', color: colors.primary, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                Learn More <ArrowRight size={13} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. FEATURED DESTINATIONS ────────────────────────────────────────────────

function FeaturedDestinations() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | 'international' | 'domestic'>('all');

  const filters = [
    { key: 'all',           label: 'All',           emoji: '🌍' },
    { key: 'international', label: 'International',  emoji: '✈️' },
    { key: 'domestic',      label: 'Domestic',       emoji: '🇮🇳' },
  ] as const;

  const filtered = activeFilter === 'all'
    ? mockDestinations
    : mockDestinations.filter((d) => d.type === activeFilter);

  return (
    <section style={{ padding: '64px 0 80px', background: '#FFFFFF', fontFamily: font }}>
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
      `}</style>

      {/* Header */}
      <div style={{ maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto', marginBottom: 28, padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#111827', letterSpacing: '-0.5px', margin: '0 0 20px' }}>
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

// ─── 5. BOOK A CAPTAIN ───────────────────────────────────────────────────────

function BookACaptain() {
  const navigate = useNavigate();

  const sectionStyle: CSSProperties = {
    background: 'linear-gradient(135deg, #EBF5FF 0%, #F0F9FF 100%)',
    padding: '80px 24px',
    fontFamily: font,
  };

  const containerStyle: CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '64px',
    alignItems: 'center',
  };

  const titleStyle: CSSProperties = {
    fontSize: '40px',
    fontWeight: 800,
    color: colors.text,
    letterSpacing: '-0.5px',
    lineHeight: 1.15,
    marginBottom: '16px',
  };

  const descStyle: CSSProperties = {
    fontSize: '16px',
    color: colors.textSecondary,
    lineHeight: 1.7,
    marginBottom: '28px',
  };

  const featureListStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    marginBottom: '36px',
  };

  const featureItemStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '15px',
    color: colors.text,
    fontWeight: 500,
  };

  const checkStyle: CSSProperties = {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    background: colors.skyWash,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  const btnStyle: CSSProperties = {
    background: colors.primary,
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '9999px',
    padding: '14px 32px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: font,
  };

  const rightStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    position: 'relative',
  };

  const features = [
    { icon: <MapPin size={14} color={colors.primary} />, label: 'Physical Guidance on the ground' },
    { icon: <Headphones size={14} color={colors.primary} />, label: 'Virtual Assistance anytime' },
    { icon: <Globe size={14} color={colors.primary} />, label: 'Language Support for seamless communication' },
    { icon: <Heart size={14} color={colors.primary} />, label: 'Local Recommendations you cannot Google' },
    { icon: <Shield size={14} color={colors.primary} />, label: 'Emergency Help when you need it most' },
  ];

  const captainColors = ['#4FBEFF', '#F26110', '#9552E0'];

  return (
    <section style={sectionStyle}>
      <style>{`
        @media (max-width: 900px) {
          .captain-container { grid-template-columns: 1fr !important; gap: 48px !important; }
          .captain-title { font-size: 30px !important; }
        }
      `}</style>

      <div className="captain-container" style={{ ...containerStyle, paddingTop: 80 }}>
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="captain-title" style={titleStyle}>Travel with a Local Expert</h2>
          <p style={descStyle}>
            Our verified captains are more than guides — they're your local friend who knows the best spots, speaks the language, and ensures you experience the destination like a true local.
          </p>
          <div style={featureListStyle}>
            {features.map((f) => (
              <div key={f.label} style={featureItemStyle}>
                <div style={checkStyle}>{f.icon}</div>
                {f.label}
              </div>
            ))}
          </div>
          <button style={btnStyle} onClick={() => navigate('/captains')}>Browse Captains</button>
        </motion.div>

        {/* Right — Captain preview cards */}
        <motion.div
          style={rightStyle}
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {mockCaptains.slice(0, 3).map((captain, i) => (
            <motion.div
              key={captain.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
              whileHover={{ x: 4, boxShadow: shadows.lg }}
              style={{
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: '16px',
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                boxShadow: shadows.md,
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${captainColors[i]}, ${captainColors[i]}99)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  flexShrink: 0,
                }}
              >
                {captain.name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: colors.text }}>{captain.name}</div>
                <div style={{ fontSize: '13px', color: colors.textSecondary }}>
                  {captain.city}, {captain.country}
                </div>
                <div style={{ fontSize: '12px', color: colors.textMuted, marginTop: '2px' }}>
                  ⭐ {captain.rating} · {captain.review_count} reviews
                </div>
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  background: captain.availability === 'available' ? '#D3F6E3' : '#FEE2E2',
                  color: captain.availability === 'available' ? '#10B981' : '#EF4444',
                  borderRadius: '9999px',
                  padding: '4px 10px',
                }}
              >
                {captain.availability === 'available' ? 'Available' : 'Busy'}
              </div>
            </motion.div>
          ))}
          <Link
            to="/captains"
            style={{
              textAlign: 'center',
              fontSize: '14px',
              color: colors.primary,
              fontWeight: 600,
              textDecoration: 'none',
              padding: '12px',
              display: 'block',
            }}
          >
            View all {mockCaptains.length} captains →
          </Link>
        </motion.div>
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
      emoji: '🧭',
      title: 'Captains who truly care.',
      desc: "Our group captains are more than guides — they're companions who shape the vibe, keep the energy right, and make every trip unforgettable.",
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
    <section style={{ background: '#F0F7F7', padding: '88px 24px 96px', fontFamily: font, position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .wtm-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 24px; }
        .wtm-row2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; max-width: 780px; margin: 0 auto; }
        @media (max-width: 960px) {
          .wtm-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .wtm-row2 { grid-template-columns: repeat(2, 1fr) !important; max-width: 100% !important; }
        }
        @media (max-width: 560px) {
          .wtm-grid { grid-template-columns: 1fr !important; }
          .wtm-row2 { grid-template-columns: 1fr !important; }
          .wtm-title { font-size: 26px !important; }
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

        {/* Row 1 — 3 cards */}
        <div className="wtm-grid">
          {reasons.slice(0, 3).map((r, i) => (
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

        {/* Row 2 — 2 cards centered */}
        <div className="wtm-row2">
          {reasons.slice(3).map((r, i) => (
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

// ─── 7. COMMUNITY ────────────────────────────────────────────────────────────

function CommunitySection() {
  const navigate = useNavigate();


  const perks = [
    { icon: '🤝', title: 'Meet Like-minded Travelers', desc: 'Connect with people who share your travel vibe — before, during, and after the trip.' },
    { icon: '📸', title: 'Share Real Experiences', desc: 'Post photos, write stories, and inspire others with your adventures.' },
    { icon: '🗓️', title: 'Plan Together', desc: 'Coordinate itineraries, split costs, and build travel squads for upcoming trips.' },
    { icon: '🛡️', title: 'Safe & Verified Groups', desc: 'Every community is moderated by a verified Captain to keep it genuine.' },
  ];

  return (
    <section style={{ background: '#F8FAFC', padding: '88px 24px', fontFamily: font, position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .comm-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .comm-perks { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 56px; }
        @media (max-width: 1000px) { .comm-grid { grid-template-columns: repeat(2, 1fr); } .comm-perks { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px)  { .comm-grid { grid-template-columns: 1fr; } .comm-perks { grid-template-columns: 1fr; } }
        .comm-card:hover { transform: translateY(-4px); box-shadow: 0 8px 28px rgba(0,0,0,0.10) !important; border-color: #007AFF !important; }
        .comm-join-btn:hover { background: #0056CC !important; }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: '#EEF4FF', border: '1px solid #C7DCFF', borderRadius: '9999px', padding: '5px 16px', marginBottom: '18px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#007AFF', display: 'inline-block' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#007AFF', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Community</span>
          </div>
          <h2 style={{ fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 900, color: '#111827', margin: '0 0 6px', letterSpacing: '-1px', lineHeight: 1.1 }}>
            Travel Together,
          </h2>
          <h2 style={{ fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 900, margin: '0 0 18px', letterSpacing: '-1px', lineHeight: 1.1, color: '#007AFF' }}>
            Not Alone.
          </h2>
          <p style={{ fontSize: '17px', color: '#6B7280', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
            Join destination communities, share your stories, and meet fellow travelers who get it.
          </p>
        </motion.div>

        {/* Perks row */}
        <div className="comm-perks">
          {perks.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '22px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ fontSize: '24px', flexShrink: 0 }}>{p.icon}</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#111827' }}>{p.title}</div>
              </div>
              <div style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.6 }}>{p.desc}</div>
            </motion.div>
          ))}
        </div>


        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <button
            className="comm-join-btn"
            onClick={() => navigate('/community')}
            style={{ background: '#007AFF', color: '#fff', border: 'none', borderRadius: '9999px', padding: '14px 40px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: font, boxShadow: '0 4px 20px rgba(0,122,255,0.4)', transition: 'background 0.15s', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            Explore All Communities
            <ArrowRight size={16} />
          </button>
        </motion.div>

      </div>
    </section>
  );
}

// ─── 9. TESTIMONIALS ─────────────────────────────────────────────────────────

function Testimonials() {
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

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
  };

  return (
    <section style={sectionStyle}>
      <style>{`
        @media (max-width: 900px) {
          .testimonials-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .testimonials-title { font-size: 28px !important; }
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

        <div className="testimonials-grid" style={gridStyle}>
          {mockTestimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: shadows.lg }}
              style={{
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: '16px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
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
            </motion.div>
          ))}
        </div>
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
    <section style={sectionStyle}>
      <style>{`
        @media (max-width: 540px) {
          .final-cta-title { font-size: 28px !important; }
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
          Your Next Adventure<br />Needs a Captain.
        </h2>
        <p style={descStyle}>
          Stop travelling as a tourist. Start experiencing the world as a local. Find your captain and create memories that last a lifetime.
        </p>
        <div style={btnRowStyle}>
          <button style={btnPrimaryStyle} onClick={() => navigate('/captains')}>
            Book a Captain
          </button>
          <button style={btnOutlineStyle} onClick={() => navigate('/custom-trip')}>
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
      <CompanionBanner />
      <CoreServices />
      <FeaturedDestinations />
      <BookACaptain />
      <WhyTrippyMates />
      <CommunitySection />
      <Testimonials />
      <FinalCTA />
    </Layout>
  );
}
