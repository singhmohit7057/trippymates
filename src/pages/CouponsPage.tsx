import { type CSSProperties, type ReactElement, useState } from 'react';
import { Copy, Check, Tag, Zap, Users, Star, Briefcase } from 'lucide-react';
import Layout from '../components/Layout';

type Category = 'All' | 'First Trip' | 'Group Travel' | 'Captain Booking' | 'Flash Sale';

interface Coupon {
  id: string;
  code: string;
  discount: string;
  description: string;
  validity: string;
  category: Category;
  accentColor: string;
  minOrder?: string;
}

const COUPONS: Coupon[] = [
  {
    id: 'cp1',
    code: 'WELCOME20',
    discount: '20% OFF',
    description: 'Get 20% off on your first trip booking with Trippy Mates',
    validity: 'Valid till 31 Dec 2026',
    category: 'First Trip',
    accentColor: '#007AFF',
    minOrder: 'Min. booking ₹5,000',
  },
  {
    id: 'cp2',
    code: 'SQUAD15',
    discount: '15% OFF',
    description: 'Book a group trip of 5 or more travelers and save big',
    validity: 'Valid till 30 Sep 2026',
    category: 'Group Travel',
    accentColor: '#10B981',
    minOrder: 'Group of 5+ travelers',
  },
  {
    id: 'cp3',
    code: 'CAPTAIN500',
    discount: '₹500 OFF',
    description: 'Flat ₹500 off when you book any verified captain for 3+ hours',
    validity: 'Valid till 31 Dec 2026',
    category: 'Captain Booking',
    accentColor: '#9552E0',
    minOrder: 'Min. 3 hr booking',
  },
  {
    id: 'cp4',
    code: 'FLASH30',
    discount: '30% OFF',
    description: 'Limited-time flash sale on select international trips. Book now!',
    validity: 'Valid till 15 Jun 2026',
    category: 'Flash Sale',
    accentColor: '#EF4444',
    minOrder: 'International trips only',
  },
  {
    id: 'cp5',
    code: 'NEWUSER10',
    discount: '10% OFF',
    description: 'Special discount for new members on any trip or captain booking',
    validity: 'Valid till 31 Mar 2027',
    category: 'First Trip',
    accentColor: '#F59E0B',
    minOrder: 'New accounts only',
  },
  {
    id: 'cp6',
    code: 'GROUP1K',
    discount: '₹1,000 OFF',
    description: 'Flat ₹1,000 off on group bookings of 10 or more travelers',
    validity: 'Valid till 31 Oct 2026',
    category: 'Group Travel',
    accentColor: '#F26110',
    minOrder: 'Group of 10+ travelers',
  },
];

const CATEGORIES: Category[] = ['All', 'First Trip', 'Group Travel', 'Captain Booking', 'Flash Sale'];

const categoryIcon: Record<Category, ReactElement> = {
  'All': <Tag size={14} />,
  'First Trip': <Star size={14} />,
  'Group Travel': <Users size={14} />,
  'Captain Booking': <Briefcase size={14} />,
  'Flash Sale': <Zap size={14} />,
};

const categoryColors: Record<Category, string> = {
  'All': '#007AFF',
  'First Trip': '#F59E0B',
  'Group Travel': '#10B981',
  'Captain Booking': '#9552E0',
  'Flash Sale': '#EF4444',
};

function CouponCard({ coupon }: { coupon: Coupon }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cardStyle: CSSProperties = {
    background: '#FFFFFF',
    border: '2px dashed #E5E7EB',
    borderRadius: '16px',
    display: 'flex',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    position: 'relative',
  };

  const stripStyle: CSSProperties = {
    width: '5px',
    background: coupon.accentColor,
    flexShrink: 0,
    borderRadius: '2px 0 0 2px',
  };

  const contentStyle: CSSProperties = {
    padding: '20px 20px 20px 18px',
    flex: 1,
  };

  const discountStyle: CSSProperties = {
    fontSize: '22px',
    fontWeight: 800,
    color: coupon.accentColor,
    margin: '0 0 6px',
    lineHeight: 1,
  };

  const descStyle: CSSProperties = {
    fontSize: '14px',
    color: '#374151',
    margin: '0 0 8px',
    lineHeight: 1.5,
    fontWeight: 500,
  };

  const metaStyle: CSSProperties = {
    fontSize: '12px',
    color: '#9CA3AF',
    margin: '0 0 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  };

  const codeRow: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const codeStyle: CSSProperties = {
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: '15px',
    fontWeight: 700,
    color: '#111827',
    background: '#F8FAFC',
    border: '1.5px solid #E5E7EB',
    borderRadius: '6px',
    padding: '6px 12px',
    letterSpacing: '1px',
    flex: 1,
  };

  const copyBtn: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    background: copied ? '#10B981' : coupon.accentColor,
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'background 0.2s',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  };

  const catBadge: CSSProperties = {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: coupon.accentColor + '18',
    color: coupon.accentColor,
    fontSize: '11px',
    fontWeight: 700,
    padding: '3px 10px',
    borderRadius: '9999px',
  };

  return (
    <div style={cardStyle}>
      <div style={stripStyle} />
      <div style={contentStyle}>
        <div style={catBadge}>{coupon.category}</div>
        <p style={discountStyle}>{coupon.discount}</p>
        <p style={descStyle}>{coupon.description}</p>
        <div style={metaStyle}>
          <span>📅 {coupon.validity}</span>
          {coupon.minOrder && <span>• {coupon.minOrder}</span>}
        </div>
        <div style={codeRow}>
          <span style={codeStyle}>{coupon.code}</span>
          <button style={copyBtn} onClick={handleCopy}>
            {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy Code</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CouponsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filtered = activeCategory === 'All' ? COUPONS : COUPONS.filter(c => c.category === activeCategory);

  const hero: CSSProperties = {
    background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 60%, #9552E0 100%)',
    padding: '72px 24px 56px',
    textAlign: 'center',
    color: '#fff',
  };

  const heroTitle: CSSProperties = {
    fontSize: 'clamp(28px, 5vw, 48px)',
    fontWeight: 800,
    margin: '0 0 12px',
    letterSpacing: '-0.5px',
  };

  const heroSub: CSSProperties = {
    fontSize: '17px',
    opacity: 0.88,
    maxWidth: '480px',
    margin: '0 auto 24px',
    lineHeight: 1.6,
  };

  const heroBadge: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '9999px',
    padding: '8px 20px',
    fontSize: '14px',
    fontWeight: 700,
    color: '#fff',
  };

  const body: CSSProperties = {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 24px 80px',
  };

  const filtersRow: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '40px 0 32px',
    flexWrap: 'wrap',
  };

  const pill = (active: boolean, cat: Category): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '9px 20px',
    borderRadius: '9999px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    border: active ? 'none' : '1.5px solid #E5E7EB',
    background: active ? categoryColors[cat] : '#fff',
    color: active ? '#fff' : '#6B7280',
    transition: 'all 0.15s',
  });

  const grid: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  };

  return (
    <Layout>
      {/* Hero */}
      <section style={hero}>
        <h1 style={heroTitle}>Exclusive Deals & Coupons</h1>
        <p style={heroSub}>
          Save more on every trip. Exclusive discount codes for Trippy Mates members.
        </p>
        <div style={heroBadge}>
          <Tag size={16} />
          {COUPONS.length} Active Coupons · Updated Weekly
        </div>
      </section>

      <div style={body}>
        {/* Category filters */}
        <div style={filtersRow}>
          {CATEGORIES.map(cat => (
            <button key={cat} style={pill(activeCategory === cat, cat)} onClick={() => setActiveCategory(cat)}>
              {categoryIcon[cat]}
              {cat}
            </button>
          ))}
        </div>

        {/* Result count */}
        <p style={{ margin: '0 0 24px', fontSize: '14px', color: '#6B7280', fontWeight: 500 }}>
          {filtered.length} coupon{filtered.length !== 1 ? 's' : ''} available
          {activeCategory !== 'All' ? ` for ${activeCategory}` : ''}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div style={grid}>
            {filtered.map(coupon => <CouponCard key={coupon.id} coupon={coupon} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#9CA3AF' }}>
            <Tag size={48} color="#E5E7EB" style={{ display: 'block', margin: '0 auto 16px' }} />
            <p style={{ fontSize: '16px' }}>No coupons in this category right now.</p>
          </div>
        )}

        {/* Info banner */}
        <div style={{
          marginTop: '48px',
          background: '#EBF5FF',
          borderRadius: '12px',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}>
          <Tag size={20} color="#007AFF" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <p style={{ margin: '0 0 4px', fontWeight: 700, color: '#111827', fontSize: '15px' }}>How to use coupons</p>
            <p style={{ margin: 0, fontSize: '14px', color: '#374151', lineHeight: 1.5 }}>
              Copy any coupon code and paste it at checkout during booking. Discounts are applied automatically.
              Coupons cannot be combined with each other unless stated.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
