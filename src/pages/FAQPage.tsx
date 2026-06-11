import { type CSSProperties, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Send, CheckCircle, Phone, Mail, MessageCircle } from 'lucide-react';
import Layout from '../components/Layout';

const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

type Category = 'General' | 'Captains' | 'Trips' | 'Payments' | 'Account';

interface FAQ { q: string; a: string; }

const faqData: Record<Category, FAQ[]> = {
  General: [
    { q: 'What is Trippy Mates?', a: 'Trippy Mates is a travel platform that connects travelers with verified local experts called Captains. Our Captains design and lead authentic, personalised experiences — from weekend getaways to international expeditions.' },
    { q: 'How is Trippy Mates different from a regular travel agency?', a: 'Traditional agencies sell packaged tours. We match you with a local Captain who lives and breathes your destination. Every trip is led by someone who knows the hidden gems, local cuisine, and offbeat stories no tourist brochure mentions.' },
    { q: 'Is Trippy Mates available outside India?', a: "Yes! We currently operate in India (domestic trips) as well as Thailand, Nepal, Vietnam, Bhutan, and several other countries internationally. We're expanding our Captain network rapidly — new destinations are added every month." },
    { q: 'Do I need to create an account to browse trips?', a: "You can browse all trips and Captain profiles without an account. However, you'll need to register to make bookings, save favourites, join communities, and access your travel history." },
    { q: 'How do I contact Trippy Mates support?', a: 'You can reach us via our Contact page, WhatsApp (+91 82876 36079), or email at support@trippymates.com. Our team is available Monday–Friday, 9 AM to 7 PM IST.' },
  ],
  Captains: [
    { q: 'Who are Captains?', a: 'Captains are verified local experts — guides, hosts, and travel enthusiasts who know their destination deeply. They design itineraries, lead groups, share stories, and ensure every traveler has a safe, authentic, and memorable experience.' },
    { q: 'How are Captains verified?', a: 'Every Captain goes through a multi-step verification process including identity checks, background screening, a knowledge assessment of their destination, and a trial review period. Captains with consistently high ratings receive a "Verified" badge.' },
    { q: 'Can I choose my own Captain for a trip?', a: "Absolutely. You can browse Captain profiles, read reviews, check their expertise and specialties, and request a specific Captain when booking. If your preferred Captain is unavailable, we'll suggest equally skilled alternatives." },
    { q: 'How do I become a Captain on Trippy Mates?', a: "Visit the \"Become a Captain\" section and submit your application. You'll be asked about your destination expertise, languages spoken, available dates, and experience leading trips. Our team reviews applications within 5–7 business days." },
    { q: 'Can Captains lead trips in multiple destinations?', a: 'Yes — many of our top Captains are experts in multiple cities or regions. Each destination they list goes through a separate review, ensuring quality across all the experiences they offer.' },
  ],
  Trips: [
    { q: 'What types of trips does Trippy Mates offer?', a: 'We offer domestic trips within India, international trips across 10+ countries, and (coming soon) corporate team experiences. Trips range from 2-day weekend escapes to 14-day international expeditions, covering adventure, wellness, cultural, and nature categories.' },
    { q: 'How many travelers are in a typical group?', a: 'Most of our trips have a group size of 8–15 travelers, balancing the fun of meeting new people with the intimacy of personalised attention from your Captain. Some luxury and custom trips can be arranged for smaller groups.' },
    { q: 'What is included in the trip price?', a: "Inclusions vary by trip and are listed on each trip's detail page. Common inclusions are accommodation, breakfasts, airport transfers, Captain fees, and entry tickets. International flights are generally not included unless specified." },
    { q: 'Can I customise an existing trip itinerary?', a: 'Many Captains are happy to personalise your experience. You can discuss custom requests — dietary needs, accessibility requirements, activity preferences — during the booking process via our Custom Trip page.' },
    { q: 'What happens if a trip is cancelled due to weather or unforeseen events?', a: "If we cancel a trip for reasons within our control, you'll receive a full refund or the option to reschedule. For cancellations due to force majeure, we work with you on credits or alternative dates." },
  ],
  Payments: [
    { q: 'What payment methods are accepted?', a: 'We accept all major credit and debit cards, UPI, net banking, popular digital wallets (Paytm, GPay, PhonePe), and EMI options via select banks. All transactions are secured with 256-bit SSL encryption.' },
    { q: 'Is there a cancellation and refund policy?', a: 'Yes. Cancellations made 15+ days before departure receive a full refund. 7–14 days: 75% refund. 3–6 days: 50%. Less than 3 days: no refund. Refunds are processed within 5–7 business days.' },
    { q: 'Do I pay the full amount upfront or can I pay in installments?', a: "For most trips, you pay a 30% booking deposit to secure your spot, with the remaining 70% due 14 days before departure. EMI options are available for trips priced above ₹10,000. Full upfront payment earns a 3% discount." },
    { q: 'Are there any hidden fees or service charges?', a: 'Never. The price displayed on each trip card is the final per-person price. Any optional add-ons or tips to your Captain are entirely your choice. GST (18%) is applicable and is included in the displayed price.' },
    { q: 'How do I apply a coupon or referral discount?', a: 'Enter your coupon code in the "Promo Code" field during checkout. Discounts are applied instantly before payment. Referral credits are applied as wallet balance.' },
  ],
  Account: [
    { q: 'How do I create a Trippy Mates account?', a: "Click \"Register\" on any page. You can sign up with your email or continue with Google. Registration takes under 2 minutes, and you'll receive a confirmation email to verify your address before your first booking." },
    { q: 'Can I change my email address or phone number?', a: 'Yes — go to Account → Settings → Personal Information. You can update your email, phone, and other profile details at any time. Changes to your email require password confirmation and a verification link.' },
    { q: 'How do I view or manage my bookings?', a: 'All your bookings — past, upcoming, and pending — are in Account → My Bookings. From there you can view itinerary details, download booking confirmations, contact your Captain, and manage cancellations.' },
    { q: 'What is the referral program?', a: "Invite friends using your unique referral link from Account → Referrals. When a friend books their first trip, you both receive ₹500 in Trippy Mates wallet credit. There's no limit on how many friends you can refer." },
    { q: 'How do I delete my account?', a: 'You can request account deletion from Account → Settings → Privacy → Delete Account. This is irreversible and will permanently remove your data, bookings history, and wallet credits. Active bookings must be resolved before deletion.' },
  ],
};

const categories: Category[] = ['General', 'Captains', 'Trips', 'Payments', 'Account'];
const catIcons: Record<Category, string> = { General: '💡', Captains: '🧭', Trips: '✈️', Payments: '💳', Account: '👤' };

/* ── Enquiry Form ─────────────────────────────────────────────────────────── */
function EnquiryForm() {
  const [form, setForm]     = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone]     = useState(false);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim())   e.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.subject.trim()) e.subject = 'Please select a subject';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setDone(true);
  };

  const inputBase: CSSProperties = {
    width: '100%', padding: '11px 14px', border: '1.5px solid #E5E7EB',
    borderRadius: '10px', fontSize: '14px', color: '#111827', outline: 'none',
    background: '#fff', boxSizing: 'border-box', fontFamily: font, transition: 'border-color 0.15s',
  };
  const inputErr: CSSProperties  = { ...inputBase, borderColor: '#EF4444' };
  const errTxt: CSSProperties    = { fontSize: '12px', color: '#EF4444', marginTop: '4px' };
  const label: CSSProperties     = { fontSize: '13px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' };
  const fieldWrap: CSSProperties = { marginBottom: '18px' };

  if (done) return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ textAlign: 'center', padding: '48px 24px' }}
    >
      <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#EBF5FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
        <CheckCircle size={32} color="#007AFF" />
      </div>
      <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>Enquiry Sent!</h3>
      <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.65 }}>
        Thanks for reaching out. Our team will get back to you within 24 hours.
      </p>
      <button
        onClick={() => { setDone(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
        style={{ marginTop: '24px', background: '#007AFF', color: '#fff', border: 'none', borderRadius: '9999px', padding: '10px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: font }}
      >
        Send Another
      </button>
    </motion.div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Row: Name + Email */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="eq-row">
        <div style={fieldWrap}>
          <label style={label}>Full Name *</label>
          <input style={errors.name ? inputErr : inputBase} placeholder="Rahul Sharma" value={form.name} onChange={e => set('name', e.target.value)} />
          {errors.name && <p style={errTxt}>{errors.name}</p>}
        </div>
        <div style={fieldWrap}>
          <label style={label}>Email Address *</label>
          <input type="email" style={errors.email ? inputErr : inputBase} placeholder="rahul@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
          {errors.email && <p style={errTxt}>{errors.email}</p>}
        </div>
      </div>

      {/* Row: Phone + Subject */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="eq-row">
        <div style={fieldWrap}>
          <label style={label}>Phone Number</label>
          <input type="tel" style={inputBase} placeholder="+91 98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)} />
        </div>
        <div style={fieldWrap}>
          <label style={label}>Subject *</label>
          <select
            style={errors.subject ? { ...inputErr, appearance: 'none' } : { ...inputBase, appearance: 'none' }}
            value={form.subject}
            onChange={e => set('subject', e.target.value)}
          >
            <option value="">Select a topic…</option>
            <option value="booking">Trip Booking</option>
            <option value="captain">Become a Captain</option>
            <option value="custom">Custom Trip Request</option>
            <option value="payment">Payment / Refund</option>
            <option value="other">Other</option>
          </select>
          {errors.subject && <p style={errTxt}>{errors.subject}</p>}
        </div>
      </div>

      {/* Message */}
      <div style={fieldWrap}>
        <label style={label}>Message *</label>
        <textarea
          rows={5}
          style={errors.message ? { ...inputErr, resize: 'vertical' as const } : { ...inputBase, resize: 'vertical' as const }}
          placeholder="Tell us how we can help you…"
          value={form.message}
          onChange={e => set('message', e.target.value)}
        />
        {errors.message && <p style={errTxt}>{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{ width: '100%', padding: '13px', background: loading ? '#3395FF' : '#007AFF', color: '#fff', border: 'none', borderRadius: '9999px', fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: font, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
      >
        {loading ? (
          <>
            <span style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
            Sending…
          </>
        ) : (
          <><Send size={15} /> Send Enquiry</>
        )}
      </button>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @media(max-width:600px){ .eq-row { grid-template-columns: 1fr !important; } }`}</style>
    </form>
  );
}

/* ── Main Page ────────────────────────────────────────────────────────────── */
export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('General');
  const [openIndex, setOpenIndex]           = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(prev => prev === i ? null : i);

  return (
    <Layout>
      <style>{`
        .faq-pill { display:inline-flex; align-items:center; gap:6px; padding:9px 18px; border-radius:9999px; font-size:14px; font-weight:600; cursor:pointer; border:1.5px solid #E5E7EB; background:#fff; color:#6B7280; transition:all 0.15s; font-family:${font}; }
        .faq-pill:hover { border-color:#007AFF; color:#007AFF; }
        .faq-pill.active { background:#007AFF; color:#fff; border-color:#007AFF; }
        .faq-item { background:#fff; border-radius:14px; border:1px solid #E5E7EB; margin-bottom:10px; overflow:hidden; transition:border-color 0.15s, box-shadow 0.15s; }
        .faq-item:hover { border-color:#C7DCFF; box-shadow:0 4px 16px rgba(0,122,255,0.07); }
        .faq-item.open { border-color:#007AFF; box-shadow:0 4px 16px rgba(0,122,255,0.10); }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 60%, #003A99 100%)', padding: '80px 24px 72px', textAlign: 'center', color: '#fff', fontFamily: font }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <span style={{ display:'inline-block', background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.3)', borderRadius:'9999px', padding:'4px 14px', fontSize:'11px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
            Help Center
          </span>
          <h1 style={{ fontSize:'clamp(28px,5vw,50px)', fontWeight:900, margin:'0 0 14px', letterSpacing:'-1px', lineHeight:1.1 }}>
            How can we help you?
          </h1>
          <p style={{ fontSize:'17px', opacity:0.85, maxWidth:'460px', margin:'0 auto', lineHeight:1.65 }}>
            Find instant answers to the most common questions — or send us an enquiry below.
          </p>
          {/* Quick contact chips */}
          <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', justifyContent:'center', marginTop:'28px' }}>
            {[
              { icon: <Phone size={13} />, label: '+91 82876 36079' },
              { icon: <Mail size={13} />, label: 'support@trippymates.com' },
              { icon: <MessageCircle size={13} />, label: 'WhatsApp Us' },
            ].map(c => (
              <div key={String(c.label)} style={{ display:'flex', alignItems:'center', gap:'6px', background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:'9999px', padding:'7px 16px', fontSize:'13px', fontWeight:600, color:'rgba(255,255,255,0.92)' }}>
                {c.icon}{c.label}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Body ── */}
      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'60px 24px 80px', fontFamily: font }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 420px', gap:'48px', alignItems:'start' }} className="faq-layout">
          <style>{`@media(max-width:900px){ .faq-layout { grid-template-columns: 1fr !important; } }`}</style>

          {/* ── LEFT: FAQ ── */}
          <div>
            <h2 style={{ fontSize:'24px', fontWeight:800, color:'#111827', margin:'0 0 24px', letterSpacing:'-0.4px' }}>
              Frequently Asked Questions
            </h2>

            {/* Category pills */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'32px' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`faq-pill${activeCategory === cat ? ' active' : ''}`}
                  onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                >
                  <span>{catIcons[cat]}</span>{cat}
                </button>
              ))}
            </div>

            {/* Accordion */}
            <motion.div key={activeCategory} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              {faqData[activeCategory].map((faq, i) => (
                <div
                  key={i}
                  className={`faq-item${openIndex === i ? ' open' : ''}`}
                  onClick={() => toggle(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && toggle(i)}
                >
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 20px', cursor:'pointer', gap:'12px' }}>
                    <span style={{ fontSize:'15px', fontWeight:600, color: openIndex === i ? '#007AFF' : '#111827', flex:1 }}>
                      {faq.q}
                    </span>
                    <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ flexShrink:0, color: openIndex === i ? '#007AFF' : '#9CA3AF' }}>
                      <ChevronDown size={18} />
                    </motion.div>
                  </div>

                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
                        key="ans"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding:'0 20px 18px', borderTop:'1px solid #EEF4FF' }}>
                          <p style={{ margin:0, fontSize:'14px', color:'#6B7280', lineHeight:1.75, paddingTop:'14px' }}>{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Enquiry Form ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              style={{ background:'#fff', borderRadius:'20px', boxShadow:'0 4px 32px rgba(0,0,0,0.09)', border:'1px solid #F0F0F0', overflow:'hidden', position:'sticky', top:'110px' }}
            >
              {/* Form header */}
              <div style={{ background:'linear-gradient(135deg, #007AFF, #0056CC)', padding:'24px 28px' }}>
                <h3 style={{ fontSize:'20px', fontWeight:800, color:'#fff', margin:'0 0 4px', letterSpacing:'-0.3px' }}>
                  Send an Enquiry
                </h3>
                <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.78)', margin:0 }}>
                  We'll get back to you within 24 hours.
                </p>
              </div>

              <div style={{ padding:'28px' }}>
                <EnquiryForm />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
