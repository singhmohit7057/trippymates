import { type CSSProperties, useState, useEffect } from 'react';
import { Shield, ChevronRight } from 'lucide-react';
import Layout from '../../components/Layout';

const SECTIONS = [
  {
    id: 'data-collection',
    title: '1. Data We Collect',
    content: `We collect the following categories of personal information when you use Trippy Mates:

**Account Information:** When you register, we collect your full name, email address, phone number, and a securely hashed password. You may optionally add a profile photo and bio.

**Booking Data:** When you book a trip or captain, we collect trip preferences, traveler count, payment confirmation references (not full card numbers), booking dates, and special requests.

**Usage Data:** We automatically collect information about how you interact with our platform including pages visited, search queries, click patterns, session duration, and referral sources.

**Device Information:** We collect your IP address, browser type and version, operating system, device identifiers, and approximate geographic location derived from your IP.

**Communications:** If you contact our support team, we retain records of those communications to help resolve issues and improve service quality.

**Captain Interaction Data:** Reviews, ratings, messages, and booking history with captains are stored to maintain platform integrity and display accurate captain profiles.`,
  },
  {
    id: 'data-usage',
    title: '2. How We Use Your Data',
    content: `We use the information we collect for the following purposes:

**Service Delivery:** To process bookings, connect you with local captains, confirm reservations, and provide customer support throughout your travel experience.

**Platform Improvement:** To analyze usage patterns, identify technical issues, test new features, and continuously improve the quality and performance of our platform.

**Personalization:** To recommend trips, captains, and destinations based on your past bookings, browsing behavior, and stated preferences.

**Communications:** To send booking confirmations, trip reminders, receipt emails, policy updates, and — with your consent — marketing communications about new trips and offers.

**Safety & Security:** To detect fraudulent activity, prevent abuse of our platform, verify captain credentials, and maintain a safe community for all users.

**Legal Compliance:** To fulfill our obligations under applicable law, respond to legal requests, and enforce our Terms and Conditions.

We do not sell your personal data to third parties for their own marketing purposes.`,
  },
  {
    id: 'cookies',
    title: '3. Cookies & Tracking',
    content: `Trippy Mates uses cookies and similar tracking technologies to provide and improve our services.

**Essential Cookies:** Required for basic platform functionality including authentication sessions, shopping cart state, and security protections. These cannot be disabled.

**Analytics Cookies:** Help us understand how visitors interact with our website. We use anonymized aggregated data to improve user experience. You may opt out via your browser settings.

**Preference Cookies:** Remember your settings such as language, currency, and display preferences across visits.

**Marketing Cookies:** Used to show you relevant advertisements on third-party platforms and measure campaign effectiveness. You can opt out via our cookie preferences center.

You can manage or delete cookies through your browser settings at any time. Note that disabling certain cookies may affect platform functionality.`,
  },
  {
    id: 'third-parties',
    title: '4. Third-Party Sharing',
    content: `We share your information with third parties only in the following circumstances:

**Service Providers:** We work with trusted vendors for payment processing (Razorpay), cloud hosting (AWS), email delivery (SendGrid), analytics (Google Analytics), and customer support tools. These providers are contractually bound to protect your data.

**Local Captains:** When you complete a booking, we share your name, contact number, and trip details with your assigned captain to enable coordination and service delivery.

**Legal Requirements:** We may disclose information if required by law, court order, or government authority, or to protect the rights and safety of Trippy Mates, its users, or the public.

**Business Transfers:** In the event of a merger, acquisition, or sale of assets, user data may be transferred to the successor entity, subject to equivalent privacy protections.

**With Your Consent:** We share information in other circumstances only when you have explicitly consented to such sharing.

We do not share your data with data brokers or allow third parties to use your data for their own marketing without your explicit consent.`,
  },
  {
    id: 'user-rights',
    title: '5. Your Rights',
    content: `Under applicable data protection laws, you have the following rights regarding your personal data:

**Right to Access:** You may request a copy of all personal data we hold about you at any time, free of charge, subject to reasonable verification.

**Right to Rectification:** If any information we hold is inaccurate or incomplete, you have the right to request correction. You can update most information directly in your account settings.

**Right to Erasure:** You may request deletion of your personal data. Note that some data may be retained for legal compliance, fraud prevention, or legitimate business purposes even after an erasure request.

**Right to Data Portability:** You may request your data in a structured, machine-readable format to transfer to another service.

**Right to Restrict Processing:** In certain circumstances, you may request that we limit how we use your data while a dispute is being resolved.

**Right to Object:** You may object to processing of your data for direct marketing purposes at any time without providing a reason.

**Right to Withdraw Consent:** Where processing is based on your consent, you may withdraw that consent at any time without affecting the lawfulness of prior processing.

To exercise any of these rights, contact us at privacy@trippymates.com. We will respond within 30 days.`,
  },
  {
    id: 'contact',
    title: '6. Contact Us',
    content: `If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:

**Email:** privacy@trippymates.com
**Address:** Trippy Mates Technologies Pvt. Ltd., 4th Floor, WeWork Galaxy, 43 Residency Road, Bengaluru, Karnataka 560025, India.
**Grievance Officer:** For data privacy grievances under Indian law, contact our designated officer at grievance@trippymates.com.
**Response Time:** We aim to acknowledge all requests within 48 hours and resolve them within 30 days.

If you are not satisfied with our response, you have the right to lodge a complaint with the relevant data protection authority in your jurisdiction.`,
  },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('data-collection');

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
    background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
    padding: '64px 24px 48px',
    textAlign: 'center',
    color: '#fff',
  };

  const heroTitle: CSSProperties = {
    fontSize: 'clamp(28px, 4vw, 42px)',
    fontWeight: 800,
    margin: '0 0 12px',
  };

  const heroSub: CSSProperties = {
    fontSize: '15px',
    opacity: 0.75,
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
    color: active ? '#007AFF' : '#6B7280',
    background: active ? '#EBF5FF' : 'transparent',
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
    borderBottom: '2px solid #EBF5FF',
  };

  const renderContent = (text: string) => {
    const lines = text.trim().split('\n');
    return lines.map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;
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
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '10px' }}>
            <Shield size={28} color="#fff" />
          </div>
        </div>
        <h1 style={heroTitle}>Privacy Policy</h1>
        <p style={heroSub}>Last updated: January 1, 2024</p>
      </section>

      <div className="legal-layout" style={pageLayout}>
        {/* Sidebar TOC */}
        <aside className="legal-sidebar" style={sidebar}>
          <div style={sidebarCard}>
            <p style={tocTitle}>Contents</p>
            {SECTIONS.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                style={navItem(activeSection === s.id)}
                onClick={() => setActiveSection(s.id)}
              >
                <ChevronRight size={12} />
                {s.title.replace(/^\d+\. /, '')}
              </a>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <div style={content}>
          <div style={{ background: '#EBF5FF', borderRadius: '10px', padding: '16px 20px', marginBottom: '28px', fontSize: '14px', color: '#0056CC', lineHeight: 1.6 }}>
            This Privacy Policy describes how Trippy Mates Technologies Pvt. Ltd. ("we", "us", or "our") collects, uses, and shares information when you use our website and services.
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
