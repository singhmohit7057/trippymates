import React, { useState, type CSSProperties, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardList, Map, FileText, ShieldCheck, CheckCircle,
  ChevronDown, Users, CalendarDays, Tag, UserCheck,
  Home, MessageSquare, Phone, Sparkles, MapPin, Clock, Star,
} from 'lucide-react';
import Layout from '../components/Layout';

const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const PURPLE = '#007AFF';
const PURPLE_LIGHT = '#EBF5FF';
const PURPLE_MID = '#0056CC';

/* ── form state ─────────────────────────────────────────────────────────────── */
interface FormState {
  fullName: string; email: string; phone: string; destination: string;
  startDate: string; endDate: string; travelers: string; budgetRange: string;
  tripType: string; captainRequired: 'yes' | 'no' | 'not_sure';
  captainType: string; accommodationNeeded: 'yes' | 'no';
  transportNeeded: 'yes' | 'no'; additionalRequirements: string;
}
const INITIAL_FORM: FormState = {
  fullName: '', email: '', phone: '', destination: '',
  startDate: '', endDate: '', travelers: '', budgetRange: '',
  tripType: '', captainRequired: 'not_sure', captainType: '',
  accommodationNeeded: 'no', transportNeeded: 'no', additionalRequirements: '',
};

/* ── data ───────────────────────────────────────────────────────────────────── */
const HOW_STEPS = [
  { num: '01', icon: ClipboardList, title: 'Share Your Vision',      desc: 'Fill our quick form with your destination, dates, and travel style.' },
  { num: '02', icon: Map,           title: 'We Craft Your Trip',     desc: 'Our team designs a custom itinerary with the perfect local Captain.' },
  { num: '03', icon: FileText,      title: 'Review the Proposal',    desc: 'Get a detailed plan with day-by-day itinerary, costs, and inclusions.' },
  { num: '04', icon: ShieldCheck,   title: 'Travel With Confidence', desc: 'Book securely and travel with full support every step of the way.' },
];

const TRUST_CHIPS = [
  { emoji: '✅', text: 'Free custom proposal' },
  { emoji: '⚡', text: '24-hr response' },
  { emoji: '🔒', text: 'No upfront payment' },
  { emoji: '🧭', text: 'Verified captains' },
];

const HERO_STATS = [
  { value: '500+', label: 'Custom Trips Planned' },
  { value: '24h',  label: 'Response Guarantee' },
  { value: '4.9★', label: 'Avg Customer Rating' },
  { value: '100%', label: 'Free Consultation' },
];

const PERKS = [
  { icon: <MapPin size={18} />,  title: 'Any Destination',      desc: 'Domestic or international — anywhere you dream of going.' },
  { icon: <Users size={18} />,   title: 'Any Group Size',        desc: 'Solo travel, couples, families, or large groups — we handle it all.' },
  { icon: <Star size={18} />,    title: 'Curated by Experts',    desc: 'Every itinerary crafted by travellers who know the destination personally.' },
  { icon: <Clock size={18} />,   title: 'Any Duration',          desc: 'Weekend escapes to multi-week adventures — you decide the length.' },
  { icon: <ShieldCheck size={18} />, title: 'Fully Supported',  desc: 'Round-the-clock support from booking to your final day of travel.' },
  { icon: <Sparkles size={18} />, title: 'Completely Free',     desc: 'Getting a custom proposal costs you nothing. No commitment required.' },
];

/* ── shared field components ────────────────────────────────────────────────── */
function inputBase(err?: string): CSSProperties {
  return {
    width: '100%', height: '46px',
    border: `1.5px solid ${err ? '#EF4444' : '#E5E7EB'}`,
    borderRadius: '10px', padding: '0 14px', fontSize: '14px',
    color: '#111827', fontFamily: font, outline: 'none', boxSizing: 'border-box',
    background: '#fff', transition: 'border-color 0.18s',
  };
}

function Label({ children }: { children: React.ReactNode }) {
  return <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#374151', marginBottom:'6px' }}>{children}</label>;
}
function FieldErr({ msg }: { msg?: string }) {
  return msg ? <p style={{ margin:'4px 0 0', fontSize:'12px', color:'#EF4444' }}>{msg}</p> : null;
}

function SelectField({ value, onChange, placeholder, options }: {
  value: string; onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string; options: string[];
}) {
  return (
    <div style={{ position:'relative' }}>
      <select value={value} onChange={onChange}
        style={{ ...inputBase(), appearance:'none', WebkitAppearance:'none', paddingRight:'36px', cursor:'pointer' }}>
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={14} style={{ position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', color:'#9CA3AF', pointerEvents:'none' }} />
    </div>
  );
}

function RadioPills({ options, value, onChange }: {
  options: { value: string; label: string }[];
  value: string; onChange: (v: string) => void;
}) {
  return (
    <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
      {options.map(opt => {
        const active = value === opt.value;
        return (
          <div key={opt.value} onClick={() => onChange(opt.value)} style={{
            padding:'8px 20px', borderRadius:'9999px',
            border:`2px solid ${active ? PURPLE : '#E5E7EB'}`,
            background: active ? PURPLE_LIGHT : '#fff',
            color: active ? PURPLE_MID : '#6B7280',
            fontSize:'14px', fontWeight: active ? 700 : 500,
            cursor:'pointer', userSelect:'none', transition:'all 0.15s',
          }}>
            {opt.label}
          </div>
        );
      })}
    </div>
  );
}

function SectionCard({ icon: Icon, title, children }: {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  title: string; children: React.ReactNode;
}) {
  return (
    <div style={{ borderRadius:'14px', border:'1.5px solid #F0F2F5', padding:'24px 22px', display:'flex', flexDirection:'column', gap:'18px', background:'#FAFBFC' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
        <div style={{ width:'36px', height:'36px', borderRadius:'10px', background:PURPLE_LIGHT, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <Icon size={17} color={PURPLE} />
        </div>
        <h3 style={{ fontSize:'15px', fontWeight:700, color:'#111827', margin:0 }}>{title}</h3>
      </div>
      <div style={{ borderTop:'1px solid #E9EAEC' }} />
      <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>{children}</div>
    </div>
  );
}

/* ── page ───────────────────────────────────────────────────────────────────── */
export default function CustomTripPage() {
  const [form, setForm]       = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors]   = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name as keyof FormState]) setErrors(p => ({ ...p, [name]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim())    e.fullName    = 'Full name is required';
    if (!form.email.trim())       e.email       = 'Email is required';
    if (!form.phone.trim())       e.phone       = 'Phone number is required';
    if (!form.destination.trim()) e.destination = 'Destination is required';
    if (!form.startDate)          e.startDate   = 'Start date is required';
    if (!form.endDate)            e.endDate     = 'End date is required';
    if (!form.travelers)          e.travelers   = 'Number of travelers is required';
    else if (parseInt(form.travelers, 10) < 1) e.travelers = 'At least 1 traveler required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
  }

  return (
    <Layout>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .ct-inp:focus { border-color: ${PURPLE} !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.12) !important; }
        .ct-submit { transition: background 0.18s, transform 0.15s; }
        .ct-submit:hover:not(:disabled) { background: ${PURPLE_MID} !important; transform: translateY(-1px); }
        .ct-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .ct-step { transition: transform 0.2s, box-shadow 0.2s; }
        .ct-step:hover { transform: translateY(-5px); box-shadow: 0 14px 36px rgba(0,0,0,0.1) !important; }
        .ct-perk { transition: transform 0.2s, box-shadow 0.2s; }
        .ct-perk:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.08) !important; }
        @media(max-width:900px){
          .ct-main-grid  { grid-template-columns: 1fr !important; }
          .ct-perks-grid { grid-template-columns: 1fr 1fr !important; }
          .ct-steps-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media(max-width:640px){
          .ct-two-col    { grid-template-columns: 1fr !important; }
          .ct-perks-grid { grid-template-columns: 1fr !important; }
          .ct-hero-stats { grid-template-columns: 1fr 1fr !important; }
        }
        @media(max-width:480px){
          .ct-steps-grid { grid-template-columns: 1fr !important; }
          .ct-trust-chips { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg,#001F5B 0%,#001F5B 40%,#0056CC 80%,#003A99 100%)',
        height: '85vh', minHeight: '600px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden', fontFamily: font, color: '#fff',
      }}>
        <div style={{ position:'absolute', width:420, height:420, borderRadius:'50%', background:'rgba(167,139,250,0.1)', top:-120, right:-80, pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:280, height:280, borderRadius:'50%', background:'rgba(139,92,246,0.08)', bottom:60, left:-60, pointerEvents:'none' }} />

        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 24px', position:'relative', zIndex:1 }}>
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }} style={{ textAlign:'center', maxWidth:680, width:'100%' }}>

            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:9999, padding:'6px 18px', fontSize:13, fontWeight:600, color:'#80BDFF', marginBottom:20, backdropFilter:'blur(8px)' }}>
              <Sparkles size={13} /> Plan Your Perfect Trip — Free
            </div>

            <h1 style={{ fontSize:'clamp(30px,5.5vw,58px)', fontWeight:900, margin:'0 0 16px', lineHeight:'1.12', letterSpacing:'-1.5px' }}>
              Your Dream Trip,<br /><span style={{ color:'#80BDFF' }}>Built Just for You.</span>
            </h1>

            <p style={{ fontSize:'clamp(15px,2vw,18px)', opacity:0.82, maxWidth:520, margin:'0 auto 32px', lineHeight:'1.7' }}>
              Tell us where you want to go and we will craft a 100% custom itinerary with a verified local Captain — at zero cost to plan.
            </p>

            <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
              {TRUST_CHIPS.map(t => (
                <div key={t.text} style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.18)', borderRadius:9999, padding:'7px 14px', fontSize:13, fontWeight:500, backdropFilter:'blur(4px)' }}>
                  <span>{t.emoji}</span>{t.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* stats strip */}
        <div style={{ background:'rgba(0,0,0,0.3)', backdropFilter:'blur(10px)', borderTop:'1px solid rgba(255,255,255,0.1)', padding:'18px 24px', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, textAlign:'center', zIndex:1 }}>
          {HERO_STATS.map(s => (
            <div key={s.label}>
              <div style={{ fontSize:'clamp(18px,2.5vw,24px)', fontWeight:800, color:'#80BDFF' }}>{s.value}</div>
              <div style={{ fontSize:12, opacity:0.7, marginTop:2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────────── */}
      <div style={{ background:'#F9FAFB', padding:'72px 24px', fontFamily:font }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ display:'inline-block', background:PURPLE_LIGHT, color:PURPLE_MID, padding:'4px 14px', borderRadius:9999, fontSize:12, fontWeight:700, letterSpacing:'0.5px', textTransform:'uppercase', marginBottom:12 }}>HOW IT WORKS</div>
            <h2 style={{ fontSize:'clamp(22px,3.5vw,36px)', fontWeight:800, color:'#111827', margin:'0 0 10px', letterSpacing:'-0.5px' }}>From idea to itinerary in 4 steps</h2>
            <p style={{ fontSize:15, color:'#6B7280', margin:0 }}>Simple, fast, and built entirely around you.</p>
          </motion.div>

          <div className="ct-steps-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {HOW_STEPS.map((s, i) => (
              <motion.div key={s.num} className="ct-step"
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.1 }}
                style={{ background:'#fff', border:'1.5px solid #E5E7EB', borderRadius:20, padding:'28px 22px', textAlign:'center', boxShadow:'0 2px 10px rgba(0,0,0,0.05)' }}
              >
                <div style={{ width:44, height:44, borderRadius:12, background:`linear-gradient(135deg,${PURPLE},${PURPLE_MID})`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 14px', boxShadow:`0 6px 14px rgba(124,58,237,0.3)` }}>
                  <span style={{ fontSize:14, fontWeight:800, color:'#fff' }}>{s.num}</span>
                </div>
                <div style={{ width:46, height:46, background:PURPLE_LIGHT, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 14px' }}>
                  <s.icon size={20} color={PURPLE} />
                </div>
                <h3 style={{ fontSize:15, fontWeight:700, color:'#111827', margin:'0 0 8px' }}>{s.title}</h3>
                <p style={{ fontSize:13, color:'#6B7280', lineHeight:'1.55', margin:0 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN: LEFT INFO + RIGHT FORM ──────────────────────────────────────── */}
      <div style={{ background:'#fff', padding:'72px 24px 96px', fontFamily:font }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>

          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} style={{ textAlign:'center', marginBottom:56 }}>
            <div style={{ display:'inline-block', background:PURPLE_LIGHT, color:PURPLE_MID, padding:'4px 14px', borderRadius:9999, fontSize:12, fontWeight:700, letterSpacing:'0.5px', textTransform:'uppercase', marginBottom:12 }}>CUSTOM TRIP ENQUIRY</div>
            <h2 style={{ fontSize:'clamp(22px,3.5vw,36px)', fontWeight:800, color:'#111827', margin:'0 0 10px', letterSpacing:'-0.5px' }}>Build your perfect journey</h2>
            <p style={{ fontSize:16, color:'#6B7280', maxWidth:500, margin:'0 auto' }}>Fill in the details and we will craft your dream trip within 24 hours — completely free.</p>
          </motion.div>

          <div className="ct-main-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:48, alignItems:'start' }}>

            {/* LEFT: perks + contact */}
            <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}>
              {/* Why custom trip */}
              <div style={{ background:'linear-gradient(135deg,#001F5B,#001F5B)', borderRadius:20, padding:'32px 28px', color:'#fff', marginBottom:24 }}>
                <div style={{ fontSize:36, marginBottom:16 }}>🗺️</div>
                <h3 style={{ fontSize:20, fontWeight:800, margin:'0 0 10px', letterSpacing:'-0.3px' }}>Why Plan a Custom Trip?</h3>
                <p style={{ fontSize:14, opacity:0.8, lineHeight:'1.7', margin:'0 0 20px' }}>
                  Not every trip fits a template. We build experiences around you — your pace, your style, your bucket list.
                </p>
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  {['No cookie-cutter itineraries', 'Flexible dates & group size', 'Budget that works for you', 'Local Captain who knows the place'].map(t => (
                    <div key={t} style={{ display:'flex', alignItems:'center', gap:10, fontSize:14 }}>
                      <div style={{ width:20, height:20, borderRadius:'50%', background:'rgba(196,181,253,0.25)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <CheckCircle size={12} color="#80BDFF" />
                      </div>
                      <span style={{ opacity:0.9 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* perks grid */}
              <div className="ct-perks-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
                {PERKS.map((p, i) => (
                  <motion.div key={p.title} className="ct-perk"
                    initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.35, delay:i*0.07 }}
                    style={{ background:'#FAFBFC', border:'1.5px solid #F0F2F5', borderRadius:14, padding:'18px 16px', boxShadow:'0 1px 6px rgba(0,0,0,0.04)' }}
                  >
                    <div style={{ width:36, height:36, borderRadius:10, background:PURPLE_LIGHT, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:10, color:PURPLE }}>
                      {p.icon}
                    </div>
                    <h4 style={{ fontSize:13, fontWeight:700, color:'#111827', margin:'0 0 4px' }}>{p.title}</h4>
                    <p style={{ fontSize:12, color:'#6B7280', lineHeight:'1.5', margin:0 }}>{p.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* call us card */}
              <div style={{ background:'#F9FAFB', border:'1.5px solid #E5E7EB', borderRadius:16, padding:'20px 20px', display:'flex', alignItems:'center', gap:16 }}>
                <div style={{ width:48, height:48, borderRadius:12, background:PURPLE_LIGHT, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Phone size={20} color={PURPLE} />
                </div>
                <div>
                  <p style={{ fontSize:13, fontWeight:600, color:'#374151', margin:'0 0 4px' }}>Prefer to talk?</p>
                  <a href="tel:+918287636079" style={{ fontSize:15, fontWeight:700, color:PURPLE, textDecoration:'none' }}>+91 82876 36079</a>
                  <p style={{ fontSize:12, color:'#9CA3AF', margin:'2px 0 0' }}>Mon–Sat · 9 AM – 7 PM</p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: form */}
            <motion.div initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success"
                    initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }} transition={{ duration:0.4 }}
                    style={{ background:'#fff', borderRadius:24, padding:'52px 40px', textAlign:'center', boxShadow:'0 8px 40px rgba(0,0,0,0.09)', border:'1.5px solid #E5E7EB' }}
                  >
                    <div style={{ width:72, height:72, borderRadius:'50%', background:'#D1FAE5', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
                      <CheckCircle size={36} color="#10B981" />
                    </div>
                    <h3 style={{ fontSize:24, fontWeight:800, color:'#111827', margin:'0 0 12px' }}>Request Submitted! 🎉</h3>
                    <p style={{ fontSize:15, color:'#6B7280', margin:'0 0 8px', lineHeight:'1.7' }}>
                      Your custom trip request is received. Our team will craft your personalised itinerary and get back within <strong style={{ color:'#111827' }}>24 hours</strong>.
                    </p>
                    <p style={{ fontSize:14, color:'#9CA3AF', margin:'0 0 28px' }}>
                      Confirmation sent to <strong style={{ color:'#111827' }}>{form.email}</strong>
                    </p>
                    <a href="tel:+918287636079" style={{ display:'inline-flex', alignItems:'center', gap:8, background:PURPLE_LIGHT, color:PURPLE_MID, borderRadius:9999, padding:'11px 22px', fontSize:14, fontWeight:600, textDecoration:'none' }}>
                      <Phone size={14} /> Or call us directly
                    </a>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}>
                    <div style={{ background:'#fff', borderRadius:24, boxShadow:'0 8px 40px rgba(0,0,0,0.08)', border:'1.5px solid #E5E7EB', padding:'36px 32px' }}>
                      <form onSubmit={handleSubmit} noValidate>
                        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>

                          {/* Personal */}
                          <SectionCard icon={Users} title="Personal Information">
                            <div>
                              <Label>Full Name *</Label>
                              <input className="ct-inp" type="text" name="fullName" value={form.fullName} onChange={handleChange}
                                placeholder="Your full name" style={inputBase(errors.fullName)} />
                              <FieldErr msg={errors.fullName} />
                            </div>
                            <div className="ct-two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                              <div>
                                <Label>Email *</Label>
                                <input className="ct-inp" type="email" name="email" value={form.email} onChange={handleChange}
                                  placeholder="you@email.com" style={inputBase(errors.email)} />
                                <FieldErr msg={errors.email} />
                              </div>
                              <div>
                                <Label>Phone *</Label>
                                <input className="ct-inp" type="tel" name="phone" value={form.phone} onChange={handleChange}
                                  placeholder="+91 98765 43210" style={inputBase(errors.phone)} />
                                <FieldErr msg={errors.phone} />
                              </div>
                            </div>
                          </SectionCard>

                          {/* Travel Info */}
                          <SectionCard icon={CalendarDays} title="Travel Details">
                            <div>
                              <Label>Destination *</Label>
                              <input className="ct-inp" type="text" name="destination" value={form.destination} onChange={handleChange}
                                placeholder="Where do you want to go? (e.g. Spiti, Bali, Europe…)" style={inputBase(errors.destination)} />
                              <FieldErr msg={errors.destination} />
                            </div>
                            <div className="ct-two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                              <div>
                                <Label>Start Date *</Label>
                                <input className="ct-inp" type="date" name="startDate" value={form.startDate} onChange={handleChange} style={inputBase(errors.startDate)} />
                                <FieldErr msg={errors.startDate} />
                              </div>
                              <div>
                                <Label>End Date *</Label>
                                <input className="ct-inp" type="date" name="endDate" value={form.endDate} onChange={handleChange} style={inputBase(errors.endDate)} />
                                <FieldErr msg={errors.endDate} />
                              </div>
                            </div>
                          </SectionCard>

                          {/* Trip Details */}
                          <SectionCard icon={Tag} title="Trip Preferences">
                            <div className="ct-two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                              <div>
                                <Label>Travelers *</Label>
                                <input className="ct-inp" type="number" name="travelers" value={form.travelers} onChange={handleChange}
                                  placeholder="No. of people" min={1} style={inputBase(errors.travelers)} />
                                <FieldErr msg={errors.travelers} />
                              </div>
                              <div>
                                <Label>Budget Range</Label>
                                <SelectField value={form.budgetRange}
                                  onChange={e => setForm(p => ({ ...p, budgetRange: e.target.value }))}
                                  placeholder="Select budget"
                                  options={['Under ₹20,000','₹20,000–50,000','₹50,000–1,00,000','₹1,00,000–2,00,000','Above ₹2,00,000']} />
                              </div>
                            </div>
                            <div>
                              <Label>Trip Type</Label>
                              <SelectField value={form.tripType}
                                onChange={e => setForm(p => ({ ...p, tripType: e.target.value }))}
                                placeholder="Select trip type"
                                options={['Adventure','Luxury','Family','Honeymoon','Backpacking','Weekend Getaway','Road Trip','Corporate','Cultural']} />
                            </div>
                          </SectionCard>

                          {/* Captain */}
                          <SectionCard icon={UserCheck} title="Captain Requirement">
                            <div>
                              <Label>Do you need a local captain?</Label>
                              <RadioPills
                                options={[{ value:'yes', label:'Yes' },{ value:'no', label:'No' },{ value:'not_sure', label:'Not Sure' }]}
                                value={form.captainRequired}
                                onChange={v => setForm(p => ({ ...p, captainRequired: v as FormState['captainRequired'] }))}
                              />
                            </div>
                            <AnimatePresence>
                              {form.captainRequired === 'yes' && (
                                <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }} transition={{ duration:0.25 }} style={{ overflow:'hidden' }}>
                                  <Label>Captain Type</Label>
                                  <SelectField value={form.captainType}
                                    onChange={e => setForm(p => ({ ...p, captainType: e.target.value }))}
                                    placeholder="Select captain type"
                                    options={['Adventure Guide','City Tour Guide','Language Interpreter','Food Expert','Cultural Expert']} />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </SectionCard>

                          {/* Stay & Transport */}
                          <SectionCard icon={Home} title="Stay & Transport">
                            <div>
                              <Label>Accommodation Needed?</Label>
                              <RadioPills options={[{ value:'yes', label:'Yes' },{ value:'no', label:'No' }]}
                                value={form.accommodationNeeded}
                                onChange={v => setForm(p => ({ ...p, accommodationNeeded: v as 'yes'|'no' }))} />
                            </div>
                            <div>
                              <Label>Transport Needed?</Label>
                              <RadioPills options={[{ value:'yes', label:'Yes' },{ value:'no', label:'No' }]}
                                value={form.transportNeeded}
                                onChange={v => setForm(p => ({ ...p, transportNeeded: v as 'yes'|'no' }))} />
                            </div>
                          </SectionCard>

                          {/* Additional */}
                          <SectionCard icon={MessageSquare} title="Additional Requirements">
                            <div>
                              <Label>Tell us about your dream trip</Label>
                              <textarea className="ct-inp" name="additionalRequirements" value={form.additionalRequirements}
                                onChange={handleChange} rows={4}
                                placeholder="Special requests, dietary needs, occasions, activities, anything else..."
                                style={{ ...inputBase(), height:'auto', padding:'12px 14px', resize:'vertical', lineHeight:'1.6' }} />
                            </div>
                          </SectionCard>

                          {/* Submit */}
                          <button type="submit" className="ct-submit" disabled={loading} style={{
                            width:'100%', background:PURPLE, color:'#fff', border:'none',
                            borderRadius:12, padding:'16px', fontSize:16, fontWeight:700,
                            cursor:'pointer', fontFamily:font, display:'flex', alignItems:'center',
                            justifyContent:'center', gap:10, boxShadow:`0 6px 20px rgba(124,58,237,0.35)`,
                          }}>
                            {loading ? (
                              <>
                                <div style={{ width:18, height:18, border:'2.5px solid rgba(255,255,255,0.4)', borderTopColor:'#fff', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />
                                Building your trip…
                              </>
                            ) : (
                              <><Sparkles size={18} /> Request Custom Trip</>
                            )}
                          </button>

                          <p style={{ textAlign:'center', fontSize:13, color:'#9CA3AF', margin:'2px 0 0' }}>
                            Or call us at{' '}
                            <a href="tel:+918287636079" style={{ color:PURPLE, fontWeight:600, textDecoration:'none' }}>+91 82876 36079</a>
                            {' '}— we are happy to plan over the phone.
                          </p>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
