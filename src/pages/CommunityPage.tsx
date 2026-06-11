import { useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  MessageSquare,
  Globe,
  Map,
  TrendingUp,
  Search,
  Flame,
  Plus,
  
  BookOpen,
} from 'lucide-react';
import Layout from '../components/Layout';
import { mockCommunities } from '../data/mock';
import type { Community } from '../types';

// ── design tokens ─────────────────────────────────────────────────────────────

const PRIMARY = '#007AFF';
const PRIMARY_DARK = '#0056CC';
const BORDER = '#E5E7EB';
const TEXT = '#111827';
const SECONDARY = '#6B7280';
const MUTED = '#9CA3AF';
const SURFACE = '#FFFFFF';
const RADIUS_CARD = '16px';
const RADIUS_BTN = '9999px';
const RADIUS_INNER = '8px';
const SHADOW = '0 4px 12px rgba(0,0,0,0.08)';

// ── filter categories ─────────────────────────────────────────────────────────

const FILTER_PILLS = ['All', 'Adventure', 'Beach', 'Mountain', 'Cultural', 'Food & Drink', 'Budget', 'Luxury'];

// ── trending discussions (static) ─────────────────────────────────────────────

const TRENDING_DISCUSSIONS = [
  { id: 1, topic: 'Best time to visit Bali in 2026?', destination: 'Bali, Indonesia', posts: 342, hot: true },
  { id: 2, topic: 'Street food guide — Bangkok edition', destination: 'Bangkok, Thailand', posts: 289, hot: true },
  { id: 3, topic: 'Houseboat tips for Dal Lake stay', destination: 'Kashmir, India', posts: 178, hot: false },
  { id: 4, topic: 'Goa beach clubs vs. quiet north beaches', destination: 'Goa, India', posts: 231, hot: true },
  { id: 5, topic: 'Visa-on-arrival guide for Vietnam', destination: 'Vietnam', posts: 154, hot: false },
];

// ── stats ─────────────────────────────────────────────────────────────────────

const STATS = [
  { label: 'Members', value: '10,000+', icon: <Users size={22} color={PRIMARY} /> },
  { label: 'Communities', value: '150+', icon: <Globe size={22} color={PRIMARY} /> },
  { label: 'Posts', value: '50,000+', icon: <MessageSquare size={22} color={PRIMARY} /> },
  { label: 'Countries', value: '100+', icon: <Map size={22} color={PRIMARY} /> },
];

// ── category → banner color map ───────────────────────────────────────────────

function getBannerColor(category: string): string {
  const c = category.toLowerCase();
  if (c.includes('beach') || c.includes('wellness')) return '#EBF5FF';
  if (c.includes('food') || c.includes('culture')) return '#FFF3EB';
  if (c.includes('luxury')) return '#F1E6FF';
  if (c.includes('mountain') || c.includes('nature')) return '#D3F6E3';
  if (c.includes('adventure')) return '#FEF3C7';
  if (c.includes('party')) return '#FEE2E2';
  return '#F3F4F6';
}

function getBannerText(category: string): string {
  const c = category.toLowerCase();
  if (c.includes('beach') || c.includes('wellness')) return '#007AFF';
  if (c.includes('food') || c.includes('culture')) return '#F26110';
  if (c.includes('luxury')) return '#9552E0';
  if (c.includes('mountain') || c.includes('nature')) return '#10B981';
  if (c.includes('adventure')) return '#F59E0B';
  if (c.includes('party')) return '#EF4444';
  return '#6B7280';
}

// ── community card ────────────────────────────────────────────────────────────

interface CommunityCardProps {
  community: Community;
  index: number;
}

function CommunityCard({ community, index }: CommunityCardProps) {
  const [hovered, setHovered] = useState(false);
  const [btnHov, setBtnHov] = useState(false);
  const bannerBg = getBannerColor(community.category);
  const bannerText = getBannerText(community.category);

  const cardStyle: CSSProperties = {
    background: SURFACE,
    border: `1px solid ${BORDER}`,
    borderRadius: RADIUS_CARD,
    overflow: 'hidden',
    boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.12)' : SHADOW,
    transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
  };

  const bannerStyle: CSSProperties = {
    background: bannerBg,
    height: '80px',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '0 24px 12px',
    flexShrink: 0,
    position: 'relative',
  };

  const trendingBadgeStyle: CSSProperties = {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: '#FFF3EB',
    color: '#F26110',
    fontSize: '11px',
    fontWeight: 700,
    padding: '3px 10px',
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  const categoryBadgeStyle: CSSProperties = {
    background: SURFACE,
    color: bannerText,
    fontSize: '11px',
    fontWeight: 700,
    padding: '3px 10px',
    borderRadius: '9999px',
    border: `1px solid ${BORDER}`,
  };

  const bodyStyle: CSSProperties = {
    padding: '20px 24px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flex: 1,
  };

  const nameStyle: CSSProperties = {
    fontSize: '18px',
    fontWeight: 800,
    color: TEXT,
    margin: '0 0 2px',
  };

  const destStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: PRIMARY,
    fontWeight: 600,
    background: '#EBF5FF',
    padding: '3px 10px',
    borderRadius: '9999px',
    alignSelf: 'flex-start',
  };

  const descStyle: CSSProperties = {
    fontSize: '14px',
    color: SECONDARY,
    lineHeight: 1.6,
    margin: 0,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };

  const statsRowStyle: CSSProperties = {
    display: 'flex',
    gap: '20px',
    marginTop: 'auto',
    paddingTop: '12px',
    borderTop: `1px solid ${BORDER}`,
  };

  const statItemStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '13px',
    color: SECONDARY,
    fontWeight: 500,
  };

  const joinBtnStyle: CSSProperties = {
    border: `2px solid ${btnHov ? PRIMARY_DARK : PRIMARY}`,
    color: btnHov ? PRIMARY_DARK : PRIMARY,
    background: btnHov ? '#EBF5FF' : 'transparent',
    borderRadius: RADIUS_BTN,
    padding: '10px 0',
    fontSize: '14px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.15s ease',
    width: '100%',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Banner */}
      <div style={bannerStyle}>
        {community.trending && (
          <div style={trendingBadgeStyle}>
            <Flame size={10} />
            Trending
          </div>
        )}
        <span style={categoryBadgeStyle}>{community.category}</span>
      </div>

      {/* Body */}
      <div style={bodyStyle}>
        <div>
          <h3 style={nameStyle}>{community.name}</h3>
          <span style={destStyle}>
            <Map size={11} />
            {community.destination}
          </span>
        </div>

        <p style={descStyle}>{community.description}</p>

        <div style={statsRowStyle}>
          <div style={statItemStyle}>
            <Users size={13} color={MUTED} />
            {community.member_count.toLocaleString()} members
          </div>
          <div style={statItemStyle}>
            <MessageSquare size={13} color={MUTED} />
            {community.post_count.toLocaleString()} posts
          </div>
        </div>

        <button
          style={joinBtnStyle}
          onMouseEnter={() => setBtnHov(true)}
          onMouseLeave={() => setBtnHov(false)}
        >
          Join Community
        </button>
      </div>
    </motion.div>
  );
}

// ── trending sidebar ──────────────────────────────────────────────────────────

function TrendingDiscussions() {
  const wrapStyle: CSSProperties = {
    background: SURFACE,
    border: `1px solid ${BORDER}`,
    borderRadius: RADIUS_CARD,
    padding: '24px',
    boxShadow: SHADOW,
    position: 'sticky',
    top: '80px',
  };

  const titleStyle: CSSProperties = {
    fontSize: '16px',
    fontWeight: 800,
    color: TEXT,
    margin: '0 0 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const itemStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    padding: '14px 0',
    borderBottom: `1px solid ${BORDER}`,
    cursor: 'pointer',
  };

  const topicStyle: CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: TEXT,
    lineHeight: 1.45,
  };

  const metaRowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const destStyle: CSSProperties = {
    fontSize: '12px',
    color: MUTED,
  };

  const hotBadgeStyle: CSSProperties = {
    background: '#FEE2E2',
    color: '#EF4444',
    fontSize: '10px',
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
  };

  const postCountStyle: CSSProperties = {
    fontSize: '12px',
    color: SECONDARY,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  return (
    <div style={wrapStyle}>
      <h3 style={titleStyle}>
        <TrendingUp size={16} color={PRIMARY} />
        Trending Discussions
      </h3>
      {TRENDING_DISCUSSIONS.map((d, i) => (
        <div key={d.id} style={{ ...itemStyle, ...(i === TRENDING_DISCUSSIONS.length - 1 ? { borderBottom: 'none' } : {}) }}>
          <span style={topicStyle}>{d.topic}</span>
          <div style={metaRowStyle}>
            <span style={destStyle}>{d.destination}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {d.hot && (
                <span style={hotBadgeStyle}>
                  <Flame size={9} /> Hot
                </span>
              )}
              <span style={postCountStyle}>
                <MessageSquare size={11} />
                {d.posts}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── main page ─────────────────────────────────────────────────────────────────

export default function CommunityPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = mockCommunities.filter((c) => {
    const matchesSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.destination.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === 'All' ||
      c.category.toLowerCase().includes(activeFilter.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  // ── styles ──────────────────────────────────────────────────────────────────

  const heroStyle: CSSProperties = {
    background: '#111827',
    padding: '80px 24px',
    textAlign: 'center',
  };

  const heroInnerStyle: CSSProperties = { maxWidth: '680px', margin: '0 auto' };

  const h1Style: CSSProperties = {
    fontSize: '48px',
    fontWeight: 900,
    color: '#FFFFFF',
    margin: '0 0 16px',
    lineHeight: 1.15,
    letterSpacing: '-0.5px',
  };

  const heroSubStyle: CSSProperties = {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.72)',
    margin: 0,
    lineHeight: 1.6,
  };

  const statsBarStyle: CSSProperties = {
    background: SURFACE,
    borderBottom: `1px solid ${BORDER}`,
    padding: '24px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
  };

  const statsInnerStyle: CSSProperties = {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
  };

  const statCardStyle: CSSProperties = {
    background: SURFACE,
    border: `1px solid ${BORDER}`,
    borderRadius: RADIUS_CARD,
    padding: '20px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    boxShadow: SHADOW,
  };

  const statIconBgStyle: CSSProperties = {
    width: '44px',
    height: '44px',
    background: '#EBF5FF',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  const statValStyle: CSSProperties = { fontSize: '22px', fontWeight: 800, color: TEXT, margin: 0 };
  const statLabelStyle: CSSProperties = { fontSize: '13px', color: SECONDARY, margin: 0 };

  const filterSectionStyle: CSSProperties = {
    background: '#F8FAFC',
    borderBottom: `1px solid ${BORDER}`,
    padding: '20px 24px',
  };

  const filterInnerStyle: CSSProperties = {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const searchWrapStyle: CSSProperties = { position: 'relative' };

  const searchIconStyle: CSSProperties = {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    color: MUTED,
  };

  const searchInputStyle: CSSProperties = {
    width: '100%',
    border: `1px solid ${BORDER}`,
    borderRadius: RADIUS_INNER,
    padding: '11px 14px 11px 42px',
    fontSize: '14px',
    color: TEXT,
    background: SURFACE,
    fontFamily: 'inherit',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const pillsRowStyle: CSSProperties = {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  };

  const mainBodyStyle: CSSProperties = {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '40px 24px',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '32px',
    alignItems: 'flex-start',
  };

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
  };

  const emptyStyle: CSSProperties = {
    textAlign: 'center',
    padding: '48px 0',
    color: MUTED,
    fontSize: '15px',
    gridColumn: '1 / -1',
  };

  const resultLabelStyle: CSSProperties = {
    fontSize: '14px',
    color: SECONDARY,
    fontWeight: 500,
    marginBottom: '20px',
    gridColumn: '1 / -1',
  };

  const ctaSectionStyle: CSSProperties = {
    background: 'linear-gradient(135deg, #001F5B 0%, #007AFF 100%)',
    padding: '64px 24px',
    textAlign: 'center',
  };

  const ctaInnerStyle: CSSProperties = {
    maxWidth: '560px',
    margin: '0 auto',
  };

  const ctaH2Style: CSSProperties = {
    fontSize: '30px',
    fontWeight: 800,
    color: '#FFFFFF',
    margin: '0 0 12px',
  };

  const ctaSubStyle: CSSProperties = {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.8)',
    margin: '0 0 28px',
  };

  const [ctaBtnHov, setCtaBtnHov] = useState(false);
  const ctaBtnStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: ctaBtnHov ? '#FFFFFF' : 'rgba(255,255,255,0.15)',
    color: '#FFFFFF',
    border: '2px solid rgba(255,255,255,0.6)',
    borderRadius: RADIUS_BTN,
    padding: '14px 32px',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.15s ease',
    ...(ctaBtnHov ? { color: PRIMARY } : {}),
  };

  return (
    <Layout>
      <style>{`
        @media (max-width: 900px) {
          .community-main-body { grid-template-columns: 1fr !important; }
          .community-grid { grid-template-columns: 1fr !important; }
          .community-sidebar { display: none; }
          .stats-inner { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .stats-inner { grid-template-columns: 1fr 1fr !important; }
        }
        input:focus { border-color: ${PRIMARY} !important; box-shadow: 0 0 0 2px rgba(0,122,255,0.15); }
      `}</style>

      {/* Hero */}
      <section style={heroStyle}>
        <motion.div
          style={heroInnerStyle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <h1 style={h1Style}>Join the Trippy Mates Community</h1>
          <p style={heroSubStyle}>
            Connect with thousands of passionate travelers. Share stories, discover hidden gems, and
            find your next adventure partner.
          </p>
        </motion.div>
      </section>

      {/* Stats row */}
      <div style={statsBarStyle}>
        <div className="stats-inner" style={statsInnerStyle}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              style={statCardStyle}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
            >
              <div style={statIconBgStyle}>{s.icon}</div>
              <div>
                <p style={statValStyle}>{s.value}</p>
                <p style={statLabelStyle}>{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Search + filters */}
      <div style={filterSectionStyle}>
        <div style={filterInnerStyle}>
          <div style={searchWrapStyle}>
            <Search size={16} style={searchIconStyle} />
            <input
              type="text"
              placeholder="Search communities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={searchInputStyle}
            />
          </div>
          <div style={pillsRowStyle}>
            {FILTER_PILLS.map((pill) => {
              const active = activeFilter === pill;
              const pillStyle: CSSProperties = {
                padding: '7px 18px',
                borderRadius: RADIUS_BTN,
                border: `2px solid ${active ? PRIMARY : BORDER}`,
                background: active ? '#EBF5FF' : SURFACE,
                color: active ? PRIMARY : SECONDARY,
                fontSize: '13px',
                fontWeight: active ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
                userSelect: 'none',
              };
              return (
                <div key={pill} style={pillStyle} onClick={() => setActiveFilter(pill)}>
                  {pill}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main body: communities grid + sidebar */}
      <div className="community-main-body" style={mainBodyStyle}>
        {/* Communities grid */}
        <div>
          <div className="community-grid" style={gridStyle}>
            {filtered.length === 0 ? (
              <div style={emptyStyle}>
                <BookOpen size={48} color="#E5E7EB" style={{ display: 'block', margin: '0 auto 16px' }} />
                <p>No communities match your search. Try a different filter.</p>
              </div>
            ) : (
              <>
                <p style={resultLabelStyle}>
                  {filtered.length} communit{filtered.length !== 1 ? 'ies' : 'y'} found
                </p>
                {filtered.map((community, i) => (
                  <CommunityCard key={community.id} community={community} index={i} />
                ))}
              </>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="community-sidebar">
          <TrendingDiscussions />
        </div>
      </div>

      {/* Start Your Own CTA */}
      <section style={ctaSectionStyle}>
        <motion.div
          style={ctaInnerStyle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 style={ctaH2Style}>Can't find your community?</h2>
          <p style={ctaSubStyle}>
            Start one! Build a travel community around your favourite destination and connect with
            like-minded explorers from across the world.
          </p>
          <button
            style={ctaBtnStyle}
            onMouseEnter={() => setCtaBtnHov(true)}
            onMouseLeave={() => setCtaBtnHov(false)}
          >
            <Plus size={18} />
            Create Community
          </button>
        </motion.div>
      </section>
    </Layout>
  );
}
