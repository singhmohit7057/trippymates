import { type CSSProperties, useState, useEffect } from 'react';
import { Cookie, ChevronRight } from 'lucide-react';
import Layout from '../../components/Layout';

const SECTIONS = [
  {
    id: 'what-are-cookies',
    title: '1. What Are Cookies?',
    content: `Cookies are small text files that are placed on your device (computer, smartphone, or tablet) by websites you visit. They are widely used to make websites work efficiently and to provide information to website owners.

Cookies allow a website to recognize your device and store information about your preferences or past actions. Each cookie typically contains a name, a value, and an expiry date, and may contain additional information such as a domain and path.

**Session Cookies:** These are temporary cookies that expire when you close your browser. They are used to maintain your login state and shopping session during your visit.

**Persistent Cookies:** These remain on your device for a specified period and are activated each time you visit the website that created them. They remember your preferences and settings across visits.

**First-Party Cookies:** Set directly by Trippy Mates to make our platform function correctly and to personalize your experience.

**Third-Party Cookies:** Set by our partners and service providers (such as analytics or advertising platforms) to deliver relevant content and measure the effectiveness of our services.`,
  },
  {
    id: 'types-used',
    title: '2. Types of Cookies We Use',
    content: `We use the following categories of cookies on the Trippy Mates platform:

**Strictly Necessary Cookies**
These cookies are essential for the operation of our website and cannot be switched off. They include cookies used to keep you logged in, maintain your session state, prevent cross-site request forgery (CSRF), and remember items in your booking flow.
*Examples: auth_session, csrf_token, booking_flow_id*

**Performance & Analytics Cookies**
These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We use Google Analytics and our own internal analytics tools to track page views, session duration, and user flows.
*Examples: _ga, _gid, _tm_visitor*

**Functional Cookies**
These cookies allow the website to remember choices you have made (such as your preferred language, currency, or destination filters) and provide enhanced, more personalized features.
*Examples: user_currency, ui_language, last_search*

**Targeting & Advertising Cookies**
These cookies may be set through our advertising partners. They can be used to build a profile of your interests and show you relevant advertisements on other sites. They do not store directly personal information, but are based on uniquely identifying your browser.
*Examples: fbp (Facebook Pixel), _gcl_au (Google Ads)*

**Social Media Cookies**
If you use social login (Google, Facebook) or share content on social platforms, cookies from those platforms may be set on your device. These are governed by the respective platform's privacy policies.`,
  },
  {
    id: 'how-to-control',
    title: '3. How to Control Cookies',
    content: `You have several options to control or limit how cookies are used:

**Browser Settings**
All modern browsers allow you to manage cookies through their settings. You can set your browser to refuse all cookies, accept only first-party cookies, or notify you when a cookie is being set.

- *Chrome:* Settings → Privacy and Security → Cookies and other site data
- *Firefox:* Options → Privacy & Security → Cookies and Site Data
- *Safari:* Preferences → Privacy → Manage Website Data
- *Edge:* Settings → Cookies and Site Permissions → Cookies and site data

Note that blocking all cookies may impact the functionality of Trippy Mates, including your ability to stay logged in or complete bookings.

**Cookie Preferences Center**
You can update your cookie preferences at any time by clicking "Cookie Settings" in the footer of our website. Your preferences will be stored for 12 months.

**Opt-Out Tools**
For analytics, you can opt out of Google Analytics tracking using the Google Analytics Opt-out Browser Add-on available at tools.google.com/dlpage/gaoptout.
For interest-based advertising, visit youronlinechoices.eu or aboutads.info/choices.

**Do Not Track**
Some browsers send "Do Not Track" (DNT) signals to websites. We respect DNT signals and will not set non-essential tracking cookies if your browser is configured this way.

Changes to your cookie preferences take effect immediately and are stored for your future visits. If you clear your browser data, you will need to re-set your preferences.`,
  },
];

export default function CookiesPolicyPage() {
  const [activeSection, setActiveSection] = useState('what-are-cookies');

  useEffect(() => {
    const handleScroll = () => {
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) setActiveSection(s.id);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hero: CSSProperties = {
    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    padding: '64px 24px 48px',
    textAlign: 'center',
    color: '#fff',
  };

  const heroTitle: CSSProperties = {
    fontSize: 'clamp(28px, 4vw, 42px)',
    fontWeight: 800,
    margin: '0 0 8px',
  };

  const heroSub: CSSProperties = {
    fontSize: '15px',
    opacity: 0.85,
    maxWidth: '480px',
    margin: '0 auto',
  };

  const pageLayout: CSSProperties = {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '48px 24px 80px',
    display: 'flex',
    gap: '40px',
    alignItems: 'flex-start',
  };

  const sidebar: CSSProperties = {
    width: '240px',
    flexShrink: 0,
    position: 'sticky',
    top: '80px',
  };

  const sidebarCard: CSSProperties = {
    background: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    padding: '20px',
    border: '1px solid #E5E7EB',
  };

  const tocTitle: CSSProperties = {
    fontSize: '11px',
    fontWeight: 700,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    marginBottom: '12px',
  };

  const navItem = (active: boolean): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 10px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: active ? 600 : 500,
    color: active ? '#D97706' : '#6B7280',
    background: active ? '#FEF3C7' : 'transparent',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.15s',
    marginBottom: '2px',
  });

  const content: CSSProperties = {
    flex: 1,
    minWidth: 0,
  };

  const sectionWrap: CSSProperties = {
    background: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    padding: '32px',
    marginBottom: '24px',
    border: '1px solid #E5E7EB',
  };

  const sectionTitle: CSSProperties = {
    fontSize: '20px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 16px',
    paddingBottom: '12px',
    borderBottom: '2px solid #FEF3C7',
  };

  const renderContent = (text: string) => {
    const lines = text.trim().split('\n');
    return lines.map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;
      if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.includes(':**')) {
        return (
          <p key={i} style={{ margin: '14px 0 6px', fontSize: '15px', fontWeight: 700, color: '#111827' }}>
            {trimmed.replace(/\*\*/g, '')}
          </p>
        );
      }
      if (trimmed.startsWith('**') && trimmed.includes(':**')) {
        const colonIdx = trimmed.indexOf(':**');
        const label = trimmed.slice(2, colonIdx);
        const rest = trimmed.slice(colonIdx + 3).trim();
        return (
          <p key={i} style={{ margin: '10px 0 6px', fontSize: '14px', color: '#374151', lineHeight: 1.7 }}>
            <strong style={{ color: '#111827' }}>{label}:</strong> {rest}
          </p>
        );
      }
      if (trimmed.startsWith('*') && trimmed.endsWith('*')) {
        return (
          <p key={i} style={{ margin: '4px 0', fontSize: '13px', color: '#9CA3AF', fontStyle: 'italic' }}>
            {trimmed.replace(/\*/g, '')}
          </p>
        );
      }
      if (trimmed.startsWith('- ')) {
        return (
          <p key={i} style={{ margin: '5px 0 5px 16px', fontSize: '14px', color: '#374151', lineHeight: 1.6 }}>
            • {trimmed.slice(2)}
          </p>
        );
      }
      return <p key={i} style={{ margin: '6px 0', fontSize: '14px', color: '#374151', lineHeight: 1.7 }}>{trimmed}</p>;
    });
  };

  return (
    <Layout>
      <style>{`
        .legal-layout  { display: flex; gap: 40px; align-items: flex-start; }
        .legal-sidebar { width: 240px; flex-shrink: 0; position: sticky; top: 80px; }
        .legal-section { padding: 32px; }
        @media(max-width:768px){
          .legal-layout  { flex-direction: column !important; gap: 0 !important; }
          .legal-sidebar { display: none !important; }
          .legal-section { padding: 20px 16px !important; }
        }
      `}</style>
      <section style={hero}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '10px' }}>
            <Cookie size={28} color="#fff" />
          </div>
        </div>
        <h1 style={heroTitle}>Cookies Policy</h1>
        <p style={heroSub}>Last updated: January 1, 2024</p>
      </section>

      <div className="legal-layout" style={pageLayout}>
        <aside className="legal-sidebar" style={sidebar}>
          <div style={sidebarCard}>
            <p style={tocTitle}>Contents</p>
            {SECTIONS.map(s => (
              <a key={s.id} href={`#${s.id}`} style={navItem(activeSection === s.id)} onClick={() => setActiveSection(s.id)}>
                <ChevronRight size={12} />
                {s.title.replace(/^\d+\. /, '')}
              </a>
            ))}
          </div>
        </aside>

        <div style={content}>
          <div style={{ background: '#FEF3C7', borderRadius: '10px', padding: '16px 20px', marginBottom: '28px', fontSize: '14px', color: '#92400E', lineHeight: 1.6 }}>
            This Cookies Policy explains how Trippy Mates uses cookies and similar tracking technologies when you visit our website and use our services.
          </div>
          {SECTIONS.map(s => (
            <div key={s.id} id={s.id} className="legal-section" style={sectionWrap}>
              <h2 style={sectionTitle}>{s.title}</h2>
              {renderContent(s.content)}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
