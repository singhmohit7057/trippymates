import { useState, useRef, useEffect, type CSSProperties } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Search, Headset, ChevronDown, Phone, Mail } from 'lucide-react';

const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const tripsDropdown = [
  { label: 'All Trips',          to: '/trips',               emoji: '🗺️', desc: 'Browse all our trips' },
  { label: 'Explore India',      to: '/trips/domestic',      emoji: '🇮🇳', desc: 'Domestic destinations' },
  { label: 'Explore the World',  to: '/trips/international', emoji: '✈️', desc: 'International adventures' },
  { label: 'Corporate Trips',    to: '/trips/corporate',     emoji: '💼', desc: 'Team & corporate travel' },
  { label: 'Custom Trip',        to: '/custom-trip',         emoji: '✏️', desc: 'Plan your own adventure' },
];

const navLinks = [
  { label: 'Trips',       to: '/trips',       hasDropdown: true },
  { label: 'Captains',    to: '/captains',    hasDropdown: false },
  { label: 'Community',   to: '/community',   hasDropdown: false },
  { label: 'About',       to: '/about',       hasDropdown: false },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [searchVal, setSearchVal]         = useState('');
  const [tripsOpen, setTripsOpen]         = useState(false);
  const [mobileTripsOpen, setMobileTripsOpen] = useState(false);
  const [supportOpen, setSupportOpen]     = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setTripsOpen(false);
      }
      if (supportRef.current && !supportRef.current.contains(e.target as Node)) {
        setSupportOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const wrapperStyle: CSSProperties = {
    position: 'sticky', top: 0, zIndex: 100,
    background: '#FFFFFF', fontFamily: font,
    boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
    overflow: 'visible',
  };

  const containerStyle: CSSProperties = {
    maxWidth: '1280px', width: '100%', margin: '0 auto',
    padding: '0 28px', display: 'flex', alignItems: 'center',
    height: '52px', gap: '20px',
  };

  const searchBarStyle: CSSProperties = {
    flex: 1, maxWidth: '320px', position: 'relative',
  };

  const searchInputStyle: CSSProperties = {
    width: '100%', height: '38px', border: '1.5px solid #E5E7EB',
    borderRadius: '9999px', padding: '0 16px 0 38px', fontSize: '13px',
    color: '#111827', outline: 'none', fontFamily: font,
    background: '#FAFAFA', boxSizing: 'border-box' as const,
  };

  const searchIconStyle: CSSProperties = {
    position: 'absolute', left: '12px', top: '50%',
    transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none',
  };

  const navStyle: CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '4px',
  };

  const rightStyle: CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto', flexShrink: 0,
  };

  const loginBtnStyle: CSSProperties = {
    background: '#007AFF', color: '#FFFFFF', border: 'none',
    borderRadius: '9999px', padding: '8px 20px', fontSize: '13px',
    fontWeight: 700, cursor: 'pointer', fontFamily: font,
    textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap' as const,
  };

  const mobileMenuStyle: CSSProperties = {
    position: 'fixed', top: '52px', left: 0, right: 0,
    background: '#FFFFFF', borderBottom: '1px solid #E5E7EB',
    boxShadow: '0 8px 24px rgba(0,0,0,0.10)', zIndex: 99,
    padding: '8px 0 16px',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap');

        @media (max-width: 900px) {
          .tm-search-bar { display: none !important; }
          .tm-nav-links { display: none !important; }
          .tm-support-btn { display: none !important; }
          .tm-login-btn { display: none !important; }
          .tm-hamburger { display: flex !important; }
        }
        @media (min-width: 901px) {
          .tm-hamburger { display: none !important; }
          .tm-mobile-menu { display: none !important; }
        }

        .tm-nav-link {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 6px 12px; font-size: 14px; font-weight: 600;
          color: #1a1a2e; text-decoration: none; border-radius: 6px;
          white-space: nowrap; transition: background 0.12s, color 0.12s;
          font-family: 'Poppins', sans-serif; letter-spacing: 0.01em;
          position: relative; cursor: pointer; background: none; border: none;
        }
        .tm-nav-link:hover { background: #EEF4FF; color: #007AFF; }
        .tm-nav-link.active { color: #007AFF; font-weight: 700; }

        .tm-trips-dropdown {
          position: absolute; top: calc(100% + 6px); left: 50%;
          transform: translateX(-50%);
          background: #fff; border-radius: 16px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
          border: 1px solid #E5E7EB; padding: 8px;
          min-width: 260px; z-index: 9999;
        }
        .tm-trips-dropdown a {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 12px; border-radius: 10px;
          text-decoration: none; transition: background 0.12s;
        }
        .tm-trips-dropdown a:hover { background: #F0F7FF; }
        .tm-trips-dropdown a .dd-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: #EEF4FF; display: flex; align-items: center;
          justify-content: center; font-size: 18px; flex-shrink: 0;
        }
        .tm-trips-dropdown a .dd-label { font-size: 14px; font-weight: 600; color: #111827; line-height: 1.2; }
        .tm-trips-dropdown a .dd-desc  { font-size: 11px; color: #9CA3AF; }
        .tm-trips-dropdown a:hover .dd-label { color: #007AFF; }
        .tm-trips-dropdown hr { border: none; border-top: 1px solid #F3F4F6; margin: 4px 0; }

        .tm-support-dropdown {
          position: absolute; top: calc(100% + 8px); right: 0;
          background: #fff; border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          border: 1px solid #E5E7EB; padding: 8px;
          min-width: 260px; z-index: 9999;
        }
        .tm-support-item {
          display: flex; align-items: center; gap: 12px;
          padding: 12px; border-radius: 8px;
          text-decoration: none; transition: background 0.12s;
        }
        .tm-support-item:hover { background: #F0F7FF; }
        .tm-support-icon {
          width: 40px; height: 40px; border-radius: 50%;
          background: #EEF4FF; display: flex; align-items: center;
          justify-content: center; flex-shrink: 0;
        }
        .tm-support-label { font-size: 14px; font-weight: 600; color: #111827; }
        .tm-support-detail { font-size: 12px; color: #007AFF; margin-top: 2px; }

        .tm-mobile-link {
          font-size: 15px; color: #111827; text-decoration: none;
          font-weight: 500; padding: 12px 0;
          border-bottom: 1px solid #F3F4F6; font-family: ${font};
          display: flex; align-items: center; gap: 8px; transition: color 0.15s;
          background: none; border-left: none; border-right: none; border-top: none;
          width: 100%; cursor: pointer;
        }
        .tm-mobile-link:hover { color: #007AFF; }
        .tm-mobile-link.active { color: #007AFF; font-weight: 600; }

        .tm-mobile-sub { padding-left: 28px; background: #F8FAFC; border-radius: 8px; margin: 4px 0 8px; overflow: hidden; }
        .tm-mobile-sub a { display: flex; align-items: center; gap: 8px; padding: 10px 12px; font-size: 14px; color: #374151; text-decoration: none; font-weight: 500; transition: color 0.12s; }
        .tm-mobile-sub a:hover { color: #007AFF; }
      `}</style>

      <div style={wrapperStyle}>
        <div style={containerStyle}>
          {/* Logo */}
          <Link to="/" style={{ display:'flex', alignItems:'center', textDecoration:'none', flexShrink:0 }}>
            <img src="/logo.png" alt="Trippy Mates" style={{ height: '56px', width: 'auto', display: 'block', objectFit: 'contain' }} />
          </Link>

          {/* Search */}
          <div className="tm-search-bar" style={searchBarStyle}>
            <Search size={15} style={searchIconStyle} />
            <input style={searchInputStyle} type="text" placeholder="Search your trip..."
              value={searchVal} onChange={(e) => setSearchVal(e.target.value)} />
          </div>

          {/* Nav Links */}
          <nav className="tm-nav-links" style={navStyle}>
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.to} ref={dropdownRef} style={{ position: 'relative' }}>
                  <button
                    className={tripsOpen ? 'tm-nav-link active' : 'tm-nav-link'}
                    onClick={() => setTripsOpen(o => !o)}
                    aria-haspopup="true"
                    aria-expanded={tripsOpen}
                  >
                    {link.label}
                    <ChevronDown size={13} style={{ transition: 'transform 0.2s', transform: tripsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                  </button>

                  {tripsOpen && (
                    <div className="tm-trips-dropdown" onClick={() => setTripsOpen(false)}>
                      {tripsDropdown.map((item, i) => (
                        <div key={item.to}>
                          {i === 1 && <hr />}
                          <Link to={item.to}>
                            <div className="dd-icon">{item.emoji}</div>
                            <div>
                              <div className="dd-label">{item.label}</div>
                              <div className="dd-desc">{item.desc}</div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => isActive ? 'tm-nav-link active' : 'tm-nav-link'}
                >
                  {link.label}
                </NavLink>
              )
            )}
          </nav>

          {/* Right: Support + Login */}
          <div style={rightStyle}>
            <div ref={supportRef} className="tm-support-btn" style={{ position: 'relative' }}>
              <button
                onClick={() => setSupportOpen(o => !o)}
                style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '8px' }}
                aria-label="Support"
                aria-expanded={supportOpen}
              >
                <Headset size={22} color="#111827" />
                <ChevronDown size={13} color="#111827" style={{ transition: 'transform 0.2s', transform: supportOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              {supportOpen && (
                <div className="tm-support-dropdown">
                  <a href="tel:+918287636079" className="tm-support-item">
                    <div className="tm-support-icon"><Phone size={18} color="#007AFF" /></div>
                    <div>
                      <div className="tm-support-label">Call Support</div>
                      <div className="tm-support-detail">Tel : (+91) 82876 36079</div>
                    </div>
                  </a>
                  <a href="mailto:support@trippymates.com" className="tm-support-item">
                    <div className="tm-support-icon"><Mail size={18} color="#007AFF" /></div>
                    <div>
                      <div className="tm-support-label">Mail Support</div>
                      <div className="tm-support-detail">support@trippymates.com</div>
                    </div>
                  </a>
                </div>
              )}
            </div>
            <Link to="/login" className="tm-login-btn" style={loginBtnStyle}>Login / Signup</Link>
            <button
              className="tm-hamburger"
              style={{ background:'none', border:'none', cursor:'pointer', padding:'4px', color:'#111827', display:'flex', alignItems:'center' }}
              onClick={() => setMobileOpen(p => !p)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileOpen && (
        <div className="tm-mobile-menu" style={mobileMenuStyle}>
          <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 24px', display:'flex', flexDirection:'column' }}>
            <NavLink to="/" end
              className={({ isActive }) => isActive ? 'tm-mobile-link active' : 'tm-mobile-link'}
              onClick={() => setMobileOpen(false)}
            >
              Home
            </NavLink>

            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.to}>
                  <button
                    className="tm-mobile-link"
                    onClick={() => setMobileTripsOpen(o => !o)}
                    style={{ justifyContent:'space-between', borderBottom: mobileTripsOpen ? 'none' : '1px solid #F3F4F6' }}
                  >
                    <span>{link.label}</span>
                    <ChevronDown size={14} style={{ transition:'transform 0.2s', transform: mobileTripsOpen ? 'rotate(180deg)' : 'rotate(0deg)', color:'#9CA3AF' }} />
                  </button>
                  {mobileTripsOpen && (
                    <div className="tm-mobile-sub">
                      {tripsDropdown.map(item => (
                        <Link key={item.to} to={item.to} onClick={() => { setMobileOpen(false); setMobileTripsOpen(false); }}>
                          <span>{item.emoji}</span> {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => isActive ? 'tm-mobile-link active' : 'tm-mobile-link'}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </NavLink>
              )
            )}

            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              style={{ marginTop:'12px', display:'inline-block', background:'#111827', color:'#fff', borderRadius:'9999px', padding:'10px 24px', fontSize:'15px', fontWeight:700, textDecoration:'none', textAlign:'center', fontFamily:font }}
            >
              Login / Signup
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
