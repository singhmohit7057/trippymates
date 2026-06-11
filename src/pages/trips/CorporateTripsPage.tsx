import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Mail, CheckCircle, ChevronDown, Globe, Users, Target, Award, Shield, Plane } from 'lucide-react';
import Layout from '../../components/Layout';

const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/* ── OFFERINGS ───────────────────────────────────────────────────────────── */
const OFFERINGS = [
  { emoji:'🏔️', icon: Users,   title:'Team Retreats',        desc:'We will curate mountain, beach, and forest retreats designed to rebuild morale, spark energy, and foster genuine connection.',       bg:'#EBF5FF', color:'#007AFF' },
  { emoji:'🏆', icon: Award,   title:'Incentive Trips',       desc:'We will reward your top performers with unforgettable experiences — from Himalayan treks to international getaways that truly inspire.', bg:'#FEF3C7', color:'#F59E0B' },
  { emoji:'💡', icon: Target,  title:'Offsite Planning',      desc:'We will plan structured off-sites with the perfect blend of strategy sessions, adventure activities, and downtime for deeper bonding.',   bg:'#D1FAE5', color:'#10B981' },
  { emoji:'🌏', icon: Globe,   title:'International MICE',    desc:'We will deliver full-service Meetings, Incentives, Conferences & Exhibitions across South-East Asia, Europe, and beyond.',               bg:'#F1E6FF', color:'#9552E0' },
  { emoji:'🎯', icon: Target,  title:'Goal-Aligned Travel',   desc:"We will craft every itinerary around your company objectives — leadership alignment, culture-building, or team celebration.",           bg:'#FEE2E2', color:'#EF4444' },
  { emoji:'🛡️', icon: Shield, title:'End-to-End Managed',    desc:'From visa support and logistics to on-ground captains and 24/7 assistance — we will handle everything so your team just shows up.',       bg:'#E0F2FE', color:'#0EA5E9' },
];

/* ── WHY US ──────────────────────────────────────────────────────────────── */
const WHY = [
  { emoji:'🧭', title:'Expert Trip Captains',    desc:'Every corporate trip is led by a verified Captain who manages logistics, team dynamics, and on-ground coordination end-to-end.' },
  { emoji:'📋', title:'Custom Itineraries',      desc:'No cookie-cutter packages. Every offsite is designed around your team size, goals, culture, and budget.' },
  { emoji:'🔒', title:'Safe & Compliant',        desc:'All travel is planned with corporate duty-of-care in mind — safety protocols, emergency contacts, and 24/7 support included.' },
  { emoji:'💸', title:'Transparent Pricing',     desc:'Detailed cost breakdowns, GST invoices, and flexible payment terms — everything your finance team needs.' },
];

/* ── FAQ ─────────────────────────────────────────────────────────────────── */
const FAQS = [
  { q: 'What types of corporate trips do you offer?',          a: "We'll offer team retreats, incentive trips, structured offsites, international MICE events, and goal-aligned corporate travel — all fully managed end-to-end." },
  { q: 'Can you handle large groups?',                         a: 'Yes. We will scale from 10-person leadership offsites to 500+ person incentive tours with the same level of attention to detail and logistics.' },
  { q: 'Do you provide GST invoices?',                         a: 'Absolutely. We will provide proper GST-compliant invoices and cost breakdowns to make corporate reimbursement and accounting seamless.' },
  { q: 'Can itineraries be customised to our goals?',          a: "Every itinerary will be built around your company's specific objectives — whether that's leadership alignment, team building, culture reinforcement, or pure celebration." },
  { q: 'What destinations will you cover?',                    a: 'Domestically — hill stations, beaches, forests, and heritage circuits. Internationally — South-East Asia, Europe, the Middle East, and beyond.' },
  { q: 'Will you handle visa and travel documentation?',       a: 'Yes. We will assist with visa guidance, document checklists, travel insurance recommendations, and pre-trip briefings for all team members.' },
  { q: 'What is the booking lead time?',                       a: 'We recommend reaching out at least 4–6 weeks before your desired travel date. For large groups (100+), 8–12 weeks is ideal to secure the best options.' },
  { q: 'How do we get started?',                               a: 'Join the waitlist below or reach out directly via WhatsApp or email. A dedicated corporate travel specialist will be assigned to your company.' },
];

/* ── GUIDELINES ──────────────────────────────────────────────────────────── */
const GUIDELINES = [
  { emoji:'📋', title:'Advance Planning',        desc:'Corporate trips require coordination across teams. We recommend booking at least 4–6 weeks in advance for smooth logistics.' },
  { emoji:'🛂', title:'Travel Documentation',    desc:'Ensure all team members have valid IDs or passports. For international trips, we will provide a full visa and document checklist.' },
  { emoji:'🏥', title:'Travel Insurance',        desc:'Corporate group travel insurance is strongly recommended. We will guide you to providers who offer group rates and corporate-specific coverage.' },
  { emoji:'📱', title:'Communication Plan',      desc:'Designate a trip coordinator from your team. We will provide a dedicated Captain and 24/7 support line for the duration of the trip.' },
  { emoji:'🌿', title:'Responsible Travel',      desc:'We design all corporate trips with sustainability in mind — minimising environmental impact and supporting local communities at every destination.' },
  { emoji:'💊', title:'Health & Wellness',        desc:'Share any dietary requirements, allergies, or medical needs in advance. We will ensure all arrangements respect every team member\'s needs.' },
  { emoji:'💰', title:'Budget & Approvals',      desc:'We will provide detailed cost proposals with line-item breakdowns to help you get internal approvals quickly and transparently.' },
  { emoji:'🎯', title:'Goal Alignment',          desc:'Before every trip, we will run a brief discovery call to align the itinerary with your team\'s goals, culture, and expected outcomes.' },
];

export default function CorporateTripsPage() {
  const [email, setEmail]       = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]       = useState('');
  const [faqOpen, setFaqOpen]   = useState<number | null>(null);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <Layout>
      <style>{`
        .corp-card { transition: transform 0.22s, box-shadow 0.22s; }
        .corp-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,0,0,0.10) !important; }
        .corp-why-card { transition: transform 0.2s; }
        .corp-why-card:hover { transform: translateY(-3px); }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media(max-width:900px){
          .corp-offerings-grid { grid-template-columns: 1fr 1fr !important; }
          .corp-why-grid       { grid-template-columns: 1fr 1fr !important; }
          .corp-guide-grid     { grid-template-columns: 1fr 1fr !important; }
        }
        @media(max-width:600px){
          .corp-offerings-grid { grid-template-columns: 1fr !important; }
          .corp-why-grid       { grid-template-columns: 1fr !important; }
          .corp-guide-grid     { grid-template-columns: 1fr !important; }
          .corp-stats-row      { grid-template-columns: 1fr 1fr !important; }
          .corp-waitlist-card  { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(140deg, #0a1628 0%, #0b1f4d 40%, #0f2d6e 70%, #0056CC 100%)',
        height: '85vh', minHeight: '600px', padding: '0 24px', color: '#fff', fontFamily: font,
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        {/* Decorative circles */}
        <div style={{ position:'absolute', top:'-100px', right:'-100px', width:'480px', height:'480px', borderRadius:'50%', border:'1.5px solid rgba(255,255,255,0.05)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'-40px', right:'-40px', width:'280px', height:'280px', borderRadius:'50%', border:'1.5px solid rgba(255,255,255,0.07)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-80px', left:'-60px', width:'340px', height:'340px', borderRadius:'50%', border:'1.5px solid rgba(255,255,255,0.04)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'30%', left:'5%', width:'6px', height:'6px', borderRadius:'50%', background:'rgba(255,255,255,0.2)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'20%', right:'15%', width:'10px', height:'10px', borderRadius:'50%', background:'rgba(255,255,255,0.12)', pointerEvents:'none' }} />

        {/* Centre content */}
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', zIndex:1 }}>
          <div style={{ maxWidth:'860px', width:'100%', textAlign:'center', padding:'40px 0 24px' }}>
            {/* Badge */}
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:'9999px', padding:'7px 18px', fontSize:'13px', fontWeight:600, marginBottom:'24px', backdropFilter:'blur(8px)' }}>
                <Briefcase size={14} /> Corporate Travel Solutions
              </div>

              <h1 style={{ fontSize:'clamp(36px, 6vw, 64px)', fontWeight:900, margin:'0 0 18px', letterSpacing:'-2px', lineHeight:1.05 }}>
                Travel That Builds<br />
                <span style={{ color:'#80BDFF' }}>Stronger Teams.</span>
              </h1>

              <p style={{ fontSize:'17px', opacity:0.82, maxWidth:'560px', margin:'0 auto 32px', lineHeight:1.75 }}>
                From leadership offsites to international incentive trips — we will design end-to-end corporate travel experiences your team will talk about for years.
              </p>

              {/* Coming Soon pill */}
              <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'rgba(255,255,255,0.08)', border:'1.5px solid rgba(255,255,255,0.18)', borderRadius:'14px', padding:'12px 24px', backdropFilter:'blur(10px)' }}>
                <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#FBBF24', boxShadow:'0 0 8px #FBBF24', flexShrink:0, animation:'pulse 1.8s ease-in-out infinite' }} />
                <span style={{ fontSize:'14px', fontWeight:700, color:'#fff' }}>🚀 Coming Soon — Corporate Trips launching shortly</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Coming soon bottom strip */}
        <div style={{ position:'relative', zIndex:1, borderTop:'1px solid rgba(255,255,255,0.1)', display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap', gap:'0', padding:'0' }}>
          {[
            { icon:'🚀', label:'Launching Q4 2026' },
            { icon:'✉️', label:'Join the waitlist below' },
            { icon:'🎁', label:'Free for early members' },
            { icon:'📞', label:'Early enquiries welcome' },
          ].map((s, i) => (
            <div key={s.label} style={{ flex:'1 1 160px', padding:'18px 16px', textAlign:'center', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' }}>
              <span style={{ fontSize:'16px' }}>{s.icon}</span>
              <span style={{ fontSize:'13px', fontWeight:600, color:'rgba(255,255,255,0.75)' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT WE WILL OFFER ─────────────────────────────────────────────── */}
      <section style={{ background:'#fff', padding:'80px 24px', fontFamily:font }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'52px' }}>
            <div style={{ display:'inline-block', background:'#EBF5FF', color:'#007AFF', borderRadius:'9999px', padding:'5px 16px', fontSize:'12px', fontWeight:700, marginBottom:'14px', textTransform:'uppercase', letterSpacing:'0.08em' }}>
              What We Will Offer
            </div>
            <h2 style={{ fontSize:'clamp(22px,4vw,38px)', fontWeight:800, color:'#111827', margin:'0 0 12px', letterSpacing:'-0.5px' }}>
              Every kind of corporate travel, coming your way.
            </h2>
            <p style={{ fontSize:'15px', color:'#6B7280', maxWidth:'500px', margin:'0 auto', lineHeight:1.7 }}>
              Whether it will be a 10-person offsite or a 200-person incentive tour, we will have the expertise to pull it off seamlessly.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px,1fr))', gap:'24px' }}>
            {OFFERINGS.map((o, i) => (
              <motion.div key={o.title}
                initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay: i * 0.07 }}
                className="corp-card"
                style={{ background:'#fff', borderRadius:'20px', padding:'28px 26px', border:'1.5px solid #F0F2F5', boxShadow:'0 4px 16px rgba(0,0,0,0.05)', display:'flex', flexDirection:'column', gap:'14px' }}
              >
                <div style={{ width:'52px', height:'52px', borderRadius:'14px', background:o.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'26px' }}>
                  {o.emoji}
                </div>
                <h3 style={{ fontSize:'17px', fontWeight:700, color:'#111827', margin:0 }}>{o.title}</h3>
                <p style={{ fontSize:'14px', color:'#6B7280', lineHeight:1.65, margin:0 }}>{o.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY TRIPPY MATES ───────────────────────────────────────────────── */}
      <section style={{ background:'#F8FAFC', padding:'80px 24px', fontFamily:font }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'52px' }}>
            <div style={{ display:'inline-block', background:'#EBF5FF', color:'#0056CC', borderRadius:'9999px', padding:'5px 16px', fontSize:'12px', fontWeight:700, marginBottom:'14px', textTransform:'uppercase', letterSpacing:'0.08em' }}>
              Why Trippy Mates?
            </div>
            <h2 style={{ fontSize:'clamp(22px,4vw,38px)', fontWeight:800, color:'#111827', margin:'0 0 12px', letterSpacing:'-0.5px' }}>
              Corporate travel, done right
            </h2>
            <p style={{ fontSize:'15px', color:'#6B7280', maxWidth:'480px', margin:'0 auto', lineHeight:1.7 }}>
              We will be more than a travel vendor — we will be an extension of your people & culture team.
            </p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(230px, 1fr))', gap:'22px' }}>
            {WHY.map((w, i) => (
              <div key={i} className="corp-why-card" style={{ background:'linear-gradient(145deg, #EBF5FF, #CCE4FF)', borderRadius:'20px', padding:'28px 24px', border:'1.5px solid #99CEFF', display:'flex', flexDirection:'column', gap:'12px' }}>
                <div style={{ fontSize:'32px' }}>{w.emoji}</div>
                <h3 style={{ fontSize:'15px', fontWeight:700, color:'#111827', margin:0 }}>{w.title}</h3>
                <p style={{ fontSize:'13px', color:'#6B7280', lineHeight:1.7, margin:0 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAITLIST ───────────────────────────────────────────────────────── */}
      <section style={{ background:'#F8FAFC', padding:'80px 24px', fontFamily:font }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.55 }}
            className="corp-waitlist-card"
            style={{
              background:'linear-gradient(135deg, #0b1f4d 0%, #003A99 50%, #0056CC 100%)',
              borderRadius:'28px', overflow:'hidden', position:'relative',
              display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0',
            }}
          >
            {/* Decorative circles */}
            <div style={{ position:'absolute', top:'-60px', right:'-60px', width:'300px', height:'300px', borderRadius:'50%', border:'1.5px solid rgba(255,255,255,0.06)', pointerEvents:'none' }} />
            <div style={{ position:'absolute', bottom:'-40px', left:'40%', width:'200px', height:'200px', borderRadius:'50%', border:'1.5px solid rgba(255,255,255,0.05)', pointerEvents:'none' }} />

            {/* Left: copy */}
            <div style={{ padding:'56px 48px', position:'relative', zIndex:1 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:'9999px', padding:'6px 14px', fontSize:'12px', fontWeight:700, marginBottom:'24px', backdropFilter:'blur(6px)', color:'#fff' }}>
                <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#FBBF24', animation:'pulse 1.8s ease-in-out infinite' }} />
                Launching Q4 2026
              </div>

              <h2 style={{ fontSize:'clamp(24px,3vw,36px)', fontWeight:900, color:'#fff', margin:'0 0 16px', letterSpacing:'-0.5px', lineHeight:1.15 }}>
                Be the first to know<br />when we launch.
              </h2>
              <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.72)', margin:'0 0 32px', lineHeight:1.75 }}>
                Join the waitlist and get early access, exclusive launch offers, and a dedicated corporate travel specialist assigned to your company.
              </p>

              {/* Perks */}
              <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                {[
                  { icon:'🎁', text:'Exclusive early-bird pricing' },
                  { icon:'🧑‍💼', text:'Dedicated corporate specialist' },
                  { icon:'⚡', text:'Priority access at launch' },
                ].map(p => (
                  <div key={p.text} style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                    <div style={{ width:'32px', height:'32px', borderRadius:'9px', background:'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'15px', flexShrink:0 }}>{p.icon}</div>
                    <span style={{ fontSize:'14px', color:'rgba(255,255,255,0.82)', fontWeight:500 }}>{p.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div style={{ padding:'56px 48px 56px 40px', display:'flex', flexDirection:'column', justifyContent:'center', position:'relative', zIndex:1 }}>
              {submitted ? (
                <div style={{ background:'rgba(255,255,255,0.08)', backdropFilter:'blur(12px)', borderRadius:'20px', padding:'36px 28px', border:'1.5px solid rgba(255,255,255,0.15)', textAlign:'center' }}>
                  <CheckCircle size={44} color="#6EE7B7" style={{ margin:'0 auto 14px', display:'block' }} />
                  <p style={{ margin:'0 0 6px', fontWeight:800, color:'#fff', fontSize:'18px' }}>You're on the waitlist! 🎉</p>
                  <p style={{ margin:0, color:'rgba(255,255,255,0.65)', fontSize:'14px', lineHeight:1.6 }}>
                    We'll notify <strong style={{ color:'#80BDFF' }}>{email}</strong> the moment Corporate Trips goes live.
                  </p>
                </div>
              ) : (
                <div style={{ background:'rgba(255,255,255,0.06)', backdropFilter:'blur(12px)', borderRadius:'20px', padding:'36px 32px', border:'1.5px solid rgba(255,255,255,0.12)' }}>
                  <h3 style={{ fontSize:'18px', fontWeight:800, color:'#fff', margin:'0 0 6px' }}>Get Early Access</h3>
                  <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.55)', margin:'0 0 24px' }}>No spam. Only notified when it matters.</p>

                  <form onSubmit={handleWaitlist} noValidate style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                    <div style={{ position:'relative' }}>
                      <Mail size={15} style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', color:'rgba(255,255,255,0.4)', pointerEvents:'none' }} />
                      <input
                        type="email"
                        placeholder="your.work@company.com"
                        value={email}
                        onChange={e => { setEmail(e.target.value); setError(''); }}
                        style={{
                          width:'100%', height:'50px',
                          border:`1.5px solid ${error ? '#FCA5A5' : 'rgba(255,255,255,0.2)'}`,
                          borderRadius:'12px', paddingLeft:'42px', paddingRight:'14px',
                          fontSize:'14px', color:'#fff', background:'rgba(255,255,255,0.08)',
                          fontFamily:font, outline:'none', boxSizing:'border-box',
                        }}
                      />
                    </div>
                    {error && <p style={{ margin:0, fontSize:'12px', color:'#FCA5A5' }}>{error}</p>}
                    <button type="submit" style={{ height:'50px', background:'#fff', color:'#0056CC', border:'none', borderRadius:'12px', fontSize:'15px', fontWeight:700, cursor:'pointer', fontFamily:font, transition:'opacity 0.15s' }}>
                      Join Waitlist →
                    </button>
                  </form>

                  {/* Social proof mini */}
                  <div style={{ display:'flex', gap:'16px', marginTop:'20px', flexWrap:'wrap' }}>
                    {['200+ pre-registered', 'Free for early members'].map(t => (
                      <div key={t} style={{ display:'flex', alignItems:'center', gap:'5px', fontSize:'12px', color:'rgba(255,255,255,0.5)', fontWeight:500 }}>
                        <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#80BDFF', flexShrink:0 }} />{t}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section style={{ background:'#F8FAFC', padding:'80px 24px', fontFamily:font }}>
        <div style={{ maxWidth:'760px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'48px' }}>
            <div style={{ display:'inline-block', background:'#EBF5FF', color:'#0056CC', borderRadius:'9999px', padding:'5px 16px', fontSize:'12px', fontWeight:700, marginBottom:'14px', textTransform:'uppercase', letterSpacing:'0.08em' }}>
              FAQ
            </div>
            <h2 style={{ fontSize:'clamp(22px,4vw,36px)', fontWeight:800, color:'#111827', margin:'0 0 12px', letterSpacing:'-0.4px' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize:'15px', color:'#6B7280', margin:0, lineHeight:1.7 }}>
              Everything you need to know about corporate travel with Trippy Mates.
            </p>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            {FAQS.map((item, i) => {
              const isOpen = faqOpen === i;
              return (
                <div key={i} style={{ background:'#fff', borderRadius:'14px', border:`1.5px solid ${isOpen ? '#0056CC' : '#E5E7EB'}`, overflow:'hidden', transition:'border-color 0.2s', boxShadow: isOpen ? '0 4px 20px rgba(29,78,216,0.1)' : '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <button onClick={() => setFaqOpen(isOpen ? null : i)}
                    style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px', padding:'18px 22px', background:'none', border:'none', cursor:'pointer', textAlign:'left', fontFamily:font }}>
                    <span style={{ fontSize:'15px', fontWeight:600, color:'#111827', lineHeight:1.4 }}>{item.q}</span>
                    <div style={{ flexShrink:0, width:'28px', height:'28px', borderRadius:'50%', background: isOpen ? '#0056CC' : '#F3F4F6', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s' }}>
                      <ChevronDown size={15} color={isOpen ? '#fff' : '#6B7280'} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition:'transform 0.25s' }} />
                    </div>
                  </button>
                  {isOpen && (
                    <div style={{ padding:'0 22px 18px', fontSize:'14px', color:'#6B7280', lineHeight:1.75, borderTop:'1px solid #F3F4F6' }}>
                      <div style={{ paddingTop:'14px' }}>{item.a}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TRAVEL GUIDELINES ─────────────────────────────────────────────── */}
      <section style={{ background:'#fff', padding:'80px 24px 96px', fontFamily:font }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'52px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'7px', background:'#CCE4FF', color:'#0056CC', borderRadius:'9999px', padding:'5px 16px', fontSize:'12px', fontWeight:700, marginBottom:'14px', textTransform:'uppercase', letterSpacing:'0.08em' }}>
              <Plane size={13} /> Corporate Travel Guidelines
            </div>
            <h2 style={{ fontSize:'clamp(22px,4vw,36px)', fontWeight:800, color:'#111827', margin:'0 0 12px', letterSpacing:'-0.4px' }}>
              Plan Your Corporate Trip Right
            </h2>
            <p style={{ fontSize:'15px', color:'#6B7280', maxWidth:'500px', margin:'0 auto', lineHeight:1.7 }}>
              Keep these pointers in mind for a smooth, compliant, and impactful corporate travel experience.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(235px, 1fr))', gap:'20px' }}>
            {GUIDELINES.map((g, i) => (
              <div key={i} style={{ background:'#F8FAFC', borderRadius:'18px', padding:'26px 22px', border:'1.5px solid #E5E7EB', display:'flex', flexDirection:'column', gap:'10px' }}>
                <div style={{ width:'48px', height:'48px', borderRadius:'13px', background:'#EBF5FF', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px' }}>
                  {g.emoji}
                </div>
                <h3 style={{ fontSize:'15px', fontWeight:700, color:'#111827', margin:0 }}>{g.title}</h3>
                <p style={{ fontSize:'13px', color:'#6B7280', lineHeight:1.7, margin:0 }}>{g.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop:'40px', background:'linear-gradient(135deg, #EBF5FF, #CCE4FF)', borderRadius:'18px', padding:'24px 32px', display:'flex', alignItems:'center', gap:'16px', border:'1.5px solid #99CEFF' }}>
            <div style={{ width:'48px', height:'48px', borderRadius:'13px', background:'#0056CC', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:'22px' }}>
              💡
            </div>
            <p style={{ margin:0, fontSize:'14px', color:'#1e3a8a', lineHeight:1.75 }}>
              <strong>We've got your team covered.</strong> When we launch, every corporate trip will be assigned a dedicated Captain and a Trippy Mates account manager — so your HR and admin teams have one point of contact for everything.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
