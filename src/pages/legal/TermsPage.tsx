import { type CSSProperties, useState, useEffect } from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import Layout from '../../components/Layout';

const SECTIONS = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: `By accessing or using the Trippy Mates website, mobile application, or any of our services, you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree with any part of these Terms, you must not use our platform.

These Terms constitute a legally binding agreement between you ("User") and Trippy Mates Technologies Pvt. Ltd. ("Company", "we", "us", or "our"), a company incorporated under the laws of India.

We reserve the right to modify these Terms at any time. Continued use of the platform after changes are published constitutes acceptance of the revised Terms. We will notify you of material changes via email or prominent notice on the platform.

These Terms should be read in conjunction with our Privacy Policy and Cookies Policy, both of which are incorporated by reference.`,
  },
  {
    id: 'services',
    title: '2. Our Services',
    content: `Trippy Mates is an online travel marketplace that connects travelers with locally verified guides ("Captains") and offers curated group and individual trips to domestic and international destinations.

**Trip Bookings:** We offer pre-packaged trips organized and operated by our team or partner operators. Bookings are subject to availability and confirmed only upon successful payment.

**Captain Services:** Our platform enables users to discover, evaluate, and book verified local guides for personalized travel experiences. Captains operate as independent service providers; Trippy Mates acts as an intermediary platform.

**Community Features:** Users can participate in destination-based communities, share experiences, and connect with fellow travelers. Community content is subject to our Community Guidelines.

**Custom Trips:** We offer a custom trip planning service where users can request tailored itineraries. These are subject to separate quotation and agreement.

We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.`,
  },
  {
    id: 'user-accounts',
    title: '3. User Accounts',
    content: `To access most features of Trippy Mates, you must create an account. By creating an account, you agree to:

**Eligibility:** You must be at least 18 years of age or have the consent of a parent or legal guardian to use our services.

**Accurate Information:** Provide truthful, accurate, current, and complete information during registration and keep your profile up to date.

**Account Security:** Maintain the confidentiality of your password and account credentials. You are responsible for all activity that occurs under your account.

**One Account Per User:** You may only maintain one personal account. Creating multiple accounts to circumvent restrictions or abuse our systems is prohibited.

**Notification of Breach:** You must promptly notify us at security@trippymates.com if you become aware of any unauthorized use of your account.

We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or pose a risk to other users or the platform.`,
  },
  {
    id: 'bookings',
    title: '4. Bookings & Reservations',
    content: `All bookings made through Trippy Mates are subject to availability and the following conditions:

**Booking Confirmation:** A booking is confirmed only after you receive a confirmation email with a booking reference number. Payment authorization alone does not constitute confirmation.

**Traveler Information:** You are responsible for providing accurate traveler details including names, ages, dietary requirements, and any medical conditions relevant to the trip activities.

**Age Restrictions:** Certain trips and activities have minimum age requirements. It is your responsibility to ensure all travelers meet eligibility criteria before booking.

**Group Bookings:** For group bookings, the primary booker accepts these Terms on behalf of all travelers and is responsible for communicating trip details and requirements to the group.

**Modifications:** Date changes and participant modifications are subject to availability and may incur fees. Requests must be submitted at least 14 days before departure.`,
  },
  {
    id: 'payments',
    title: '5. Payments & Pricing',
    content: `All prices displayed on Trippy Mates are in Indian Rupees (INR) unless otherwise stated.

**Payment Methods:** We accept major credit and debit cards, UPI, net banking, and select digital wallets through our payment partner Razorpay. All transactions are secured with industry-standard encryption.

**Pricing:** Prices are inclusive of the costs specified in each trip listing. Additional charges may apply for optional activities, personal expenses, visa fees, travel insurance, and similar items not listed as included.

**Price Changes:** We reserve the right to adjust prices at any time. The price applicable to your booking is the one confirmed at the time of payment.

**Taxes:** All applicable GST and service taxes are included in the displayed price unless explicitly stated otherwise.

**Failed Transactions:** If a payment fails, your booking is not confirmed. You will need to reattempt payment. We are not responsible for charges applied by your bank for failed transactions.

**Refunds:** Refunds are processed to the original payment method within 7–14 business days, subject to cancellation policy terms.`,
  },
  {
    id: 'cancellations',
    title: '6. Cancellations & Refunds',
    content: `Our cancellation policy applies as follows:

**User-Initiated Cancellations:**
- 30+ days before departure: 90% refund (10% cancellation fee)
- 15–29 days before departure: 60% refund
- 7–14 days before departure: 30% refund
- Less than 7 days: No refund

**Captain Booking Cancellations:**
- 48+ hours before scheduled session: Full refund
- 24–48 hours before: 50% refund
- Less than 24 hours: No refund

**Company-Initiated Cancellations:** In rare cases where we must cancel a trip due to safety concerns, natural disasters, or insufficient enrollment, affected users will receive a full refund or credit for a future trip.

**Force Majeure:** No refunds or compensation will be provided for cancellations caused by events beyond our control including natural disasters, government travel advisories, pandemics, or civil unrest.

To cancel a booking, log into your account and navigate to "My Bookings," or contact support at bookings@trippymates.com.`,
  },
  {
    id: 'captain-services',
    title: '7. Captain Services',
    content: `Local Captains on Trippy Mates operate as independent contractors, not employees of the Company. The following terms govern Captain bookings:

**Vetting Process:** All Captains undergo a verification process including identity verification, reference checks, and a review of their local expertise. However, we do not guarantee the accuracy of all Captain-provided information.

**Service Quality:** While we maintain quality standards, the Company is not liable for the individual performance of Captains. Disputes should first be raised with the Captain, then escalated to our support team.

**Captain Conduct:** Captains are bound by a separate Captain Agreement and our Community Guidelines. Captains must not engage in aggressive solicitation, discriminatory behavior, illegal activities, or misrepresentation.

**Review System:** After a Captain experience, users are encouraged to leave honest reviews. We prohibit fake, purchased, or incentivized reviews.

**Liability:** Trippy Mates serves as an intermediary and is not a party to the contract between you and the Captain. We are not liable for incidents, accidents, or losses that occur during Captain-led activities.`,
  },
  {
    id: 'community',
    title: '8. Community Rules',
    content: `Our community spaces are designed for sharing travel inspiration and connecting with fellow travelers. By participating, you agree to the following rules:

**Respectful Communication:** Treat all members with respect. Harassment, hate speech, discrimination, or personal attacks of any kind will result in immediate account suspension.

**Authentic Content:** Only post genuine experiences, honest reviews, and original content. Spam, promotional posts without disclosure, and misinformation are prohibited.

**No Illegal Content:** Do not post content that is illegal, defamatory, obscene, or that infringes upon the intellectual property rights of others.

**Privacy:** Do not share private information about other users without their explicit consent.

**Moderation:** We reserve the right to remove any content that violates these guidelines at our sole discretion, and to suspend or terminate accounts of repeat offenders without prior notice.

**User-Generated Content:** By posting content on our platform, you grant Trippy Mates a non-exclusive, royalty-free, worldwide license to use, reproduce, and display that content in connection with our services.`,
  },
  {
    id: 'liability',
    title: '9. Limitation of Liability',
    content: `To the fullest extent permitted by applicable law:

**Platform Limitation:** Trippy Mates provides a platform to facilitate connections between travelers and service providers. We are not responsible for the quality, safety, legality, or any other aspect of services provided by Captains or trip operators.

**Travel Risks:** Travel inherently involves risk. You acknowledge that participation in trips or Captain-led activities is at your own risk. We strongly recommend purchasing comprehensive travel insurance.

**Indirect Damages:** The Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services, even if we have been advised of the possibility of such damages.

**Maximum Liability:** Our maximum aggregate liability to you for any cause of action shall not exceed the total amount you paid to us in the six months preceding the event giving rise to the claim.

**Indemnification:** You agree to indemnify and hold harmless Trippy Mates, its officers, directors, employees, and agents from any claims, losses, or damages arising from your violation of these Terms or your use of our services.

**Governing Law:** These Terms are governed by the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka, India.`,
  },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('acceptance');

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
    background: 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 100%)',
    padding: '64px 24px 48px',
    textAlign: 'center',
    color: '#fff',
  };

  const heroTitle: CSSProperties = {
    fontSize: 'clamp(28px, 4vw, 42px)',
    fontWeight: 800,
    margin: '0 0 8px',
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
    fontSize: '12px',
    fontWeight: active ? 600 : 500,
    color: active ? '#1D4ED8' : '#6B7280',
    background: active ? '#EBF4FF' : 'transparent',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.15s',
    marginBottom: '2px',
  });

  const content: CSSProperties = { flex: 1, minWidth: 0 };

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
    borderBottom: '2px solid #DBEAFE',
  };

  const renderContent = (text: string) => {
    const lines = text.trim().split('\n');
    return lines.map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;
      if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.includes(':**')) {
        return (
          <p key={i} style={{ margin: '14px 0 4px', fontSize: '15px', fontWeight: 700, color: '#111827' }}>
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
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '10px' }}>
            <FileText size={28} color="#fff" />
          </div>
        </div>
        <h1 style={heroTitle}>Terms & Conditions</h1>
        <p style={{ fontSize: '15px', opacity: 0.75, margin: 0 }}>Last updated: January 1, 2024</p>
      </section>

      <div className="legal-layout" style={pageLayout}>
        <aside className="legal-sidebar" style={sidebar}>
          <div style={sidebarCard}>
            <p style={tocTitle}>Sections</p>
            {SECTIONS.map(s => (
              <a key={s.id} href={`#${s.id}`} style={navItem(activeSection === s.id)} onClick={() => setActiveSection(s.id)}>
                <ChevronRight size={11} />
                {s.title.replace(/^\d+\. /, '')}
              </a>
            ))}
          </div>
        </aside>

        <div style={content}>
          <div style={{ background: '#DBEAFE', borderRadius: '10px', padding: '16px 20px', marginBottom: '28px', fontSize: '14px', color: '#1E40AF', lineHeight: 1.6 }}>
            Please read these Terms and Conditions carefully before using Trippy Mates. By using our platform, you agree to be bound by these terms.
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
