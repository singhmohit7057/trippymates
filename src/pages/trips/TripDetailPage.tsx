import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, MapPin, Star, Users, CheckCircle, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockTrips } from '../../data/mock';
import Layout from '../../components/Layout';

const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const BLUE = '#007AFF';

export default function TripDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const trip = mockTrips.find(t => t.slug === slug);

  if (!trip) {
    return (
      <Layout>
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, fontFamily: font }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111827' }}>Trip not found</h1>
          <p style={{ color: '#6B7280', fontSize: 15 }}>The trip you're looking for doesn't exist.</p>
          <Link to="/trips" style={{ color: BLUE, fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>← Back to Trips</Link>
        </div>
      </Layout>
    );
  }

  const spotsLeft = trip.max_travelers - trip.current_travelers;
  const pct = Math.round((trip.current_travelers / trip.max_travelers) * 100);
  const backLink = trip.type === 'international' ? '/trips/international' : trip.type === 'corporate' ? '/trips/corporate' : '/trips/domestic';
  const backLabel = trip.type === 'international' ? 'International Trips' : trip.type === 'corporate' ? 'Corporate Trips' : 'Domestic Trips';
  const waMsg = encodeURIComponent(`Hi, I'm interested in the trip: ${trip.title} (${trip.destination}, ${trip.duration_days} days, ₹${trip.price_per_person.toLocaleString('en-IN')}/person) on Trippy Mates.`);

  return (
    <Layout>
      <div style={{ fontFamily: font, background: '#F8FAFC' }}>
        {/* Hero */}
        <div style={{ position: 'relative', height: 420, overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '100%', backgroundImage: `url(${trip.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />

          {/* Back button */}
          <Link to={backLink} style={{ position: 'absolute', top: 20, left: 24, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)', borderRadius: 9999, padding: '8px 16px', fontSize: 13, fontWeight: 600, color: '#111827', textDecoration: 'none' }}>
            <ArrowLeft size={14} /> {backLabel}
          </Link>

          {/* Hero content */}
          <div style={{ position: 'absolute', bottom: 64, left: 0, right: 0, padding: '0 24px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <h1 style={{ fontSize: 36, fontWeight: 800, color: '#fff', margin: 0, textShadow: '0 2px 16px rgba(0,0,0,0.5)', lineHeight: 1.25 }}>
                {trip.title}
              </h1>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', margin: '10px 0 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={14} color="#fff" /> {trip.destination}
              </p>
            </div>
          </div>
        </div>

        {/* Quick info cards */}
        <div style={{ maxWidth: 1200, margin: '-28px auto 0', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, background: '#fff', borderRadius: 16, padding: '20px 24px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #F0F2F5' }}>
            <InfoChip icon={<Clock size={18} color={BLUE} />} value={`${trip.duration_days} Days`} label="Duration" />
            <InfoChip icon={<span style={{ fontSize: 18, color: BLUE, fontWeight: 700 }}>₹</span>} value={`₹${trip.price_per_person.toLocaleString('en-IN')}`} label="Per Person" />
            <InfoChip icon={<Star size={18} fill="#FBBF24" color="#FBBF24" />} value={`${trip.rating} / 5`} label={`${trip.review_count} reviews`} />
            <InfoChip icon={<Users size={18} color={BLUE} />} value={`${spotsLeft} spots left`} label={`${trip.current_travelers}/${trip.max_travelers} joined`} />
          </div>
        </div>

        {/* Main content */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, alignItems: 'start' }}>
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* About */}
            <section>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827', margin: '0 0 12px' }}>About this trip</h2>
              <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.7, margin: 0 }}>{trip.description}</p>
            </section>

            {/* Highlights */}
            {trip.highlights.length > 0 && (
              <section>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827', margin: '0 0 16px' }}>Trip Highlights</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {trip.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <CheckCircle size={18} color={BLUE} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 14, color: '#374151', lineHeight: 1.5 }}>{h}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Inclusions */}
            {trip.inclusions.length > 0 && (
              <section>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827', margin: '0 0 16px' }}>What's Included</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {trip.inclusions.map((inc, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <CheckCircle size={16} color="#059669" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: '#374151' }}>{inc}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right sidebar — Booking card */}
          <div style={{ position: 'sticky', top: 90 }}>
            <div style={{ background: '#fff', borderRadius: 20, border: '1.5px solid #F0F2F5', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: 28 }}>
              <div style={{ marginBottom: 20 }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: '#111827' }}>₹{trip.price_per_person.toLocaleString('en-IN')}</span>
                <span style={{ fontSize: 14, color: '#6B7280', marginLeft: 4 }}>/person</span>
              </div>

              {/* Capacity bar */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                  <span style={{ color: '#6B7280' }}>{trip.current_travelers}/{trip.max_travelers} travelers joined</span>
                  <span style={{ fontWeight: 600, color: pct >= 80 ? '#EF4444' : '#111827' }}>{spotsLeft} spots left</span>
                </div>
                <div style={{ height: 6, background: '#F3F4F6', borderRadius: 9999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: pct >= 80 ? '#EF4444' : BLUE, borderRadius: 9999 }} />
                </div>
              </div>

              {/* Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24, fontSize: 14, color: '#374151' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6B7280' }}>Duration</span>
                  <span style={{ fontWeight: 600 }}>{trip.duration_days} Days</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6B7280' }}>Category</span>
                  <span style={{ fontWeight: 600 }}>{trip.category.charAt(0).toUpperCase() + trip.category.slice(1)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6B7280' }}>Destination</span>
                  <span style={{ fontWeight: 600 }}>{trip.destination}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6B7280' }}>Rating</span>
                  <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Star size={13} fill="#FBBF24" color="#FBBF24" /> {trip.rating}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <a
                href={`https://wa.me/918981256860?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: BLUE, color: '#fff', borderRadius: 12, padding: 14, fontWeight: 700, fontSize: 15, textDecoration: 'none', width: '100%', boxSizing: 'border-box' }}
              >
                Book via WhatsApp →
              </a>

              <p style={{ fontSize: 12, color: '#9CA3AF', textAlign: 'center', margin: '12px 0 0' }}>
                Free consultation · No upfront payment
              </p>
            </div>
          </div>
        </div>

        {/* Journey in Frames */}
        <GalleryCarousel images={trip.gallery_images ?? []} />

        {/* Similar Trips */}
        <SimilarTrips currentTrip={trip} />

        {/* Responsive override */}
        <style>{`
          @media (max-width: 900px) {
            .trip-detail-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </Layout>
  );
}

function InfoChip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textAlign: 'center' }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: '#EBF5FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <p style={{ fontSize: 15, color: '#111827', margin: 0, fontWeight: 700 }}>{value}</p>
      <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0 }}>{label}</p>
    </div>
  );
}

function GalleryCarousel({ images }: { images: string[] }) {
  const [offset, setOffset] = useState(0);
  const visibleCount = 4;

  if (!images || images.length === 0) return null;

  const maxOffset = images.length - visibleCount;

  const prev = () => setOffset(o => Math.max(0, o - 1));
  const next = () => setOffset(o => Math.min(maxOffset, o + 1));

  return (
    <section style={{ padding: '60px 24px 80px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111827', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: 1 }}>Journey in Frames</h2>
        <p style={{ fontSize: 14, color: '#6B7280', margin: 0 }}>Pictures Perfect Moments</p>
      </div>

      <div style={{ position: 'relative' }}>
        {/* Carousel */}
        <div style={{ overflow: 'hidden', borderRadius: 16 }}>
          <div style={{ display: 'flex', gap: 14, transition: 'transform 0.4s ease', transform: `translateX(-${offset * (100 / visibleCount + 1.2)}%)` }}>
            {images.map((src, i) => (
              <div key={i} style={{ minWidth: `calc(${100 / visibleCount}% - 11px)`, borderRadius: 14, overflow: 'hidden', aspectRatio: '3/4' }}>
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        {offset > 0 && (
          <button onClick={prev} style={{ position: 'absolute', top: '50%', left: -18, transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: BLUE, color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,122,255,0.3)' }}>
            <ChevronLeft size={20} />
          </button>
        )}
        {offset < maxOffset && (
          <button onClick={next} style={{ position: 'absolute', top: '50%', right: -18, transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: BLUE, color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,122,255,0.3)' }}>
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </section>
  );
}

function SimilarTrips({ currentTrip }: { currentTrip: typeof mockTrips[0] }) {
  const similar = mockTrips.filter(t => t.id !== currentTrip.id && t.type === currentTrip.type).slice(0, 8);
  const [offset, setOffset] = useState(0);
  const visibleCount = 4;
  const maxOffset = Math.max(0, similar.length - visibleCount);

  if (!similar.length) return null;

  return (
    <section style={{ padding: '0 24px 80px', maxWidth: 1200, margin: '0 auto' }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111827', margin: '0 0 24px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1 }}>Similar Trips</h2>

      <div style={{ position: 'relative' }}>
        <div style={{ overflow: 'hidden', borderRadius: 16 }}>
          <div style={{ display: 'flex', gap: 16, transition: 'transform 0.4s ease', transform: `translateX(-${offset * (100 / visibleCount + 1.4)}%)` }}>
            {similar.map(t => (
              <Link key={t.id} to={`/trips/${t.slug}`} style={{ minWidth: `calc(${100 / visibleCount}% - 12px)`, borderRadius: 16, overflow: 'hidden', textDecoration: 'none', background: '#111827', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: 240 }}>
                  <img src={t.image_url} alt={t.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
                  {/* Price badge */}
                  <span style={{ position: 'absolute', top: 12, right: 12, background: '#FBBF24', color: '#111827', borderRadius: 8, padding: '5px 12px', fontSize: 12, fontWeight: 800 }}>
                    ₹{t.price_per_person.toLocaleString('en-IN')}/- Onwards
                  </span>
                  {/* Title on image */}
                  <p style={{ position: 'absolute', bottom: 12, left: 14, right: 14, color: '#fff', fontSize: 14, fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
                    {t.title}
                  </p>
                </div>
                <div style={{ padding: '12px 14px', display: 'flex', flexWrap: 'wrap', gap: 10, fontSize: 12, color: '#9CA3AF' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} color={BLUE} /> {t.duration_days}D</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={12} color={BLUE} /> {t.destination.length > 18 ? t.destination.slice(0, 18) + '...' : t.destination}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {offset > 0 && (
          <button onClick={() => setOffset(o => Math.max(0, o - 1))} style={{ position: 'absolute', top: '50%', left: -18, transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: BLUE, color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,122,255,0.3)' }}>
            <ChevronLeft size={20} />
          </button>
        )}
        {offset < maxOffset && (
          <button onClick={() => setOffset(o => Math.min(maxOffset, o + 1))} style={{ position: 'absolute', top: '50%', right: -18, transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: BLUE, color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,122,255,0.3)' }}>
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </section>
  );
}
