
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Youtube } from 'lucide-react';

const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const quickLinks = [
  { label: 'Home',        to: '/' },
  { label: 'Trips',       to: '/trips' },
  { label: 'Captains',    to: '/captains' },
  { label: 'Custom Trip', to: '/custom-trip' },
  { label: 'Community',   to: '/community' },
  { label: 'Gallery',     to: '/gallery' },
];

const supportLinks = [
  { label: 'FAQ',       to: '/faq' },
  { label: 'Contact',   to: '/contact' },
  { label: 'About',     to: '/about' },
  { label: 'Referrals', to: '/referrals' },
  { label: 'Coupons',   to: '/coupons' },
];

const legalLinks = [
  { label: 'Privacy Policy',    to: '/privacy-policy' },
  { label: 'Cookies Policy',    to: '/cookies-policy' },
  { label: 'Terms & Conditions',to: '/terms-and-conditions' },
];

const SOCIAL = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/trippymates',
    icon: <Instagram size={16} />,
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@trippymates',
    icon: <Youtube size={16} />,
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/trippymates',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com/trippymates',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <>
      <style>{`
        .tf-link {
          font-size: 14px; color: #64748B; text-decoration: none;
          font-family: ${font}; transition: color 0.15s; line-height: 1.4;
          display: flex; align-items: center; gap: 6px;
        }
        .tf-link:hover { color: #007AFF; }
        .tf-link:hover .tf-link-dot { background: #007AFF; }
        .tf-link-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #CBD5E1; flex-shrink: 0; transition: background 0.15s;
        }
        .tf-social {
          width: 38px; height: 38px; border-radius: 10px;
          background: #EBF5FF; border: 1px solid #99CEFF;
          display: inline-flex; align-items: center; justify-content: center;
          color: #007AFF; text-decoration: none; transition: all 0.18s;
        }
        .tf-social:hover { background: #007AFF; border-color: #007AFF; color: #fff; transform: translateY(-2px); }
        .tf-col-head {
          font-size: 11px; font-weight: 700; color: #111827;
          letter-spacing: 0.08em; text-transform: uppercase;
          margin: 0 0 18px; padding-bottom: 10px;
          border-bottom: 1px solid #99CEFF;
        }
        @media(max-width:900px) {
          .tf-top  { grid-template-columns: 1fr 1fr 1fr !important; }
          .tf-brand-col { grid-column: 1 / -1; }
        }
        @media(max-width:700px) {
          .tf-newsletter { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
          .tf-newsletter-form { width: 100% !important; }
          .tf-newsletter-form input { width: 100% !important; box-sizing: border-box !important; }
          .tf-newsletter-form > div { flex-direction: column !important; }
          .tf-newsletter-form button { width: 100% !important; }
          .tf-newsletter-unsub { text-align: left !important; }
        }
        @media(max-width:600px) {
          .tf-top { grid-template-columns: 1fr 1fr !important; }
          .tf-brand-col { grid-column: 1 / -1; }
          .tf-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
        }
        @media(max-width:400px) {
          .tf-top { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <footer style={{ background: '#EBF5FF', color: '#111827', fontFamily: font, borderTop: '1px solid #99CEFF' }}>

        {/* ── top accent bar ─────────────────────────────────────────────────── */}
        <div style={{ height: 3, background: 'linear-gradient(90deg, #007AFF, #4DB2FF, #007AFF)' }} />

        {/* ── newsletter strip ───────────────────────────────────────────────── */}
        <div style={{ borderBottom: '1px solid #99CEFF', padding: '36px 24px', background: '#CCE4FF' }}>
          <div className="tf-newsletter" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.3px', color: '#111827' }}>
                Get trip ideas in your inbox 📬
              </h3>
              <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>
                New destinations, deals & travel guides — no spam, ever.
              </p>
            </div>
            <div className="tf-newsletter-form" style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{ padding: '10px 16px', borderRadius: 9, border: '1.5px solid #99CEFF', background: '#fff', color: '#111827', fontSize: 14, fontFamily: font, outline: 'none', width: 220 }}
                />
                <button style={{ padding: '10px 20px', borderRadius: 9, background: '#007AFF', color: '#fff', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: font, whiteSpace: 'nowrap' }}>
                  Subscribe
                </button>
              </div>
              <p className="tf-newsletter-unsub" style={{ margin: 0, fontSize: 12, color: '#64748B', textAlign: 'right' }}>
                Already subscribed?{' '}
                <Link to="/unsubscribe" style={{ color: '#007AFF', textDecoration: 'none', fontWeight: 600 }}>
                  Unsubscribe here.
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* ── main columns ───────────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px 40px' }}>
          <div className="tf-top" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: '40px 32px', marginBottom: 48 }}>

            {/* Brand col */}
            <div className="tf-brand-col">
              <img
                src="/logo.png"
                alt="Trippy Mates"
                style={{ height: 44, width: 'auto', display: 'block', objectFit: 'contain', marginBottom: 14, filter: 'none' }}
              />
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: '1.7', margin: '0 0 20px', maxWidth: 280 }}>
                Handcrafted trips led by local Captains. Every journey is designed to go beyond the checklist.
              </p>

              {/* contact snippets */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
                <a href="tel:+918287636079" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#64748B', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')} onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}>
                  <Phone size={13} color="#007AFF" /> +91 82876 36079
                </a>
                <a href="mailto:hello@trippymates.in" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#64748B', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')} onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}>
                  <Mail size={13} color="#007AFF" /> hello@trippymates.in
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#64748B' }}>
                  <MapPin size={13} color="#007AFF" /> India · Operating Nationwide
                </div>
              </div>

              {/* socials */}
              <div style={{ display: 'flex', gap: 10 }}>
                {SOCIAL.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="tf-social" title={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <p className="tf-col-head">Explore</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {quickLinks.map(l => (
                  <li key={l.to}>
                    <Link to={l.to} className="tf-link">
                      <span className="tf-link-dot" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <p className="tf-col-head">Support</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {supportLinks.map(l => (
                  <li key={l.to}>
                    <Link to={l.to} className="tf-link">
                      <span className="tf-link-dot" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p className="tf-col-head">Legal</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {legalLinks.map(l => (
                  <li key={l.to}>
                    <Link to={l.to} className="tf-link">
                      <span className="tf-link-dot" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* trust badges */}
              <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['🔒 Secure Payments', '✅ Verified Captains', '📞 24/7 Support'].map(t => (
                  <div key={t} style={{ fontSize: 12, color: '#64748B', display: 'flex', alignItems: 'center', gap: 6 }}>{t}</div>
                ))}
              </div>
            </div>
          </div>

          {/* divider */}
          <div style={{ borderTop: '1px solid #99CEFF', marginBottom: 0 }} />
        </div>

        {/* bottom bar */}
        <div style={{ background: '#CCE4FF', borderTop: '1px solid #99CEFF', padding: '16px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="tf-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: 13, color: '#64748B' }}>
              © 2025 Trippy Mates. All rights reserved.
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 13, color: '#64748B' }}>
                Made with ❤️ for travellers by{' '}
                <a href="https://www.tmmt.in" target="_blank" rel="noopener noreferrer"
                  style={{ color: '#007AFF', textDecoration: 'none', fontWeight: 600 }}>
                  TMMT
                </a>
              </span>
            </div>
          </div>
          </div>
        </div>
      </footer>
    </>
  );
}
