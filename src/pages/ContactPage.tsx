import React, { type CSSProperties, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, CheckCircle, Send, ChevronDown } from 'lucide-react';
import Layout from '../components/Layout';

const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const WA_SVG = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const QUICK = [
  { svgIcon: WA_SVG,  icon: null, label: 'WhatsApp', value: '+91 82876 36079', sub: 'Usually replies in minutes', color: '#25D366', bg: '#DCFCE7', href: 'https://wa.me/918287636079' },
  { svgIcon: null, icon: Phone, label: 'Call Us',  value: '+91 82876 36079', sub: 'Mon–Sat, 9 AM – 7 PM IST', color: '#007AFF', bg: '#EBF5FF', href: 'tel:+918287636079' },
  { svgIcon: null, icon: Mail,  label: 'Email Us', value: 'hello@trippymates.com', sub: 'We reply within 24 hrs', color: '#9552E0', bg: '#F1E6FF', href: 'mailto:hello@trippymates.com' },
];

const INFO = [
  { icon: MapPin,  color: '#007AFF', bg: '#EBF5FF', label: 'Address',       lines: ['New Delhi, India'] },
  { icon: Phone,   color: '#9552E0', bg: '#F1E6FF', label: 'Phone',         lines: ['+91 82876 36079'] },
  { icon: Mail,    color: '#EF4444', bg: '#FEE2E2', label: 'Email',         lines: ['hello@trippymates.com'] },
  { icon: Clock,   color: '#F59E0B', bg: '#FEF3C7', label: 'Working Hours', lines: ['Mon – Sat: 9 AM – 7 PM IST', 'Sun: 10 AM – 4 PM IST'] },
];

const SOCIALS = [
  {
    label: 'Facebook', href: 'https://facebook.com', color: '#1877F2', bg: '#E7F0FD', shadow: 'rgba(24,119,242,0.3)',
    viewBox: '0 0 24 24',
    path: <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>,
  },
  {
    label: 'Instagram', href: 'https://instagram.com', color: '#E1306C', bg: '#FDE8EF', shadow: 'rgba(225,48,108,0.3)',
    viewBox: '0 0 24 24',
    path: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>,
  },
  {
    label: 'X (Twitter)', href: 'https://x.com', color: '#000000', bg: '#F0F0F0', shadow: 'rgba(0,0,0,0.2)',
    viewBox: '0 0 24 24',
    path: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>,
  },
  {
    label: 'LinkedIn', href: 'https://linkedin.com', color: '#0A66C2', bg: '#E8F1FB', shadow: 'rgba(10,102,194,0.3)',
    viewBox: '0 0 24 24',
    path: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>,
  },
  {
    label: 'WhatsApp', href: 'https://wa.me/918287636079', color: '#25D366', bg: '#DCFCE7', shadow: 'rgba(37,211,102,0.3)',
    viewBox: '0 0 24 24',
    path: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>,
  },
];

export default function ContactPage() {
  const [form, setForm]     = useState({ name: '', email: '', whatsapp: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [f]: e.target.value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.subject) e.subject = 'Please select a subject';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setSuccess(true);
    setForm({ name: '', email: '', whatsapp: '', subject: '', message: '' });
  };

  const inp = (err?: string): CSSProperties => ({
    width: '100%', height: '46px',
    border: `1.5px solid ${err ? '#EF4444' : '#E5E7EB'}`,
    borderRadius: '10px', padding: '0 14px', fontSize: '14px',
    color: '#111827', fontFamily: font, outline: 'none',
    boxSizing: 'border-box', background: '#fff',
  });

  return (
    <Layout>
      <style>{`
        .ct-input:focus { border-color: #007AFF !important; box-shadow: 0 0 0 3px rgba(0,122,255,0.12) !important; }
        .ct-quick:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.10) !important; }
        .ct-quick { transition: transform 0.2s, box-shadow 0.2s; }
        .ct-send:hover:not(:disabled) { background: #0056CC !important; transform: translateY(-1px); }
        .ct-send { transition: background 0.18s, transform 0.15s; }
        .ct-send:disabled { opacity: 0.7; cursor: not-allowed; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 860px) { .ct-main-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 560px) { .ct-name-row { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #001F5B 0%, #0043C4 55%, #007AFF 100%)',
        padding: '88px 24px 80px', textAlign: 'center', color: '#fff',
        fontFamily: font, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position:'absolute', top:'-80px', right:'-80px', width:'360px', height:'360px', borderRadius:'50%', border:'1.5px solid rgba(255,255,255,0.06)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:'260px', height:'260px', borderRadius:'50%', border:'1.5px solid rgba(255,255,255,0.05)', pointerEvents:'none' }} />

        <motion.div initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55 }}
          style={{ maxWidth:'600px', margin:'0 auto' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'7px', background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.22)', borderRadius:'9999px', padding:'6px 16px', fontSize:'13px', fontWeight:600, marginBottom:'20px', backdropFilter:'blur(6px)' }}>
            💬 We'd love to hear from you
          </div>
          <h1 style={{ fontSize:'clamp(32px,5.5vw,56px)', fontWeight:900, margin:'0 0 16px', lineHeight:1.1, letterSpacing:'-1.5px' }}>
            Get in Touch
          </h1>
          <p style={{ fontSize:'18px', opacity:0.82, maxWidth:'480px', margin:'0 auto 36px', lineHeight:1.7 }}>
            Have a question, want to plan your next adventure, or just want to say hello? We're always happy to help.
          </p>

          {/* Quick contact chips */}
          <div style={{ display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap' }}>
            {[['⚡','24-hr email reply'], ['📞','Call Mon–Sat 9–7'], ['💚','WhatsApp support']].map(([e,t]) => (
              <div key={t} style={{ display:'flex', alignItems:'center', gap:'6px', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.18)', borderRadius:'9999px', padding:'7px 14px', fontSize:'13px', fontWeight:500 }}>
                <span>{e}</span>{t}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── QUICK CONTACT CARDS ───────────────────────────────────────────────── */}
      <section style={{ background:'#F8FAFC', padding:'56px 24px', fontFamily:font, borderBottom:'1px solid #E5E7EB' }}>
        <div style={{ maxWidth:'1000px', margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'20px' }}>
            {QUICK.map((q, i) => (
              <motion.a key={q.label} href={q.href} target={q.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer" className="ct-quick"
                {...fadeUp(i * 0.08)}
                style={{ display:'flex', alignItems:'center', gap:'16px', background:'#fff', border:'1.5px solid #E5E7EB', borderRadius:'18px', padding:'22px 24px', textDecoration:'none', boxShadow:'0 4px 12px rgba(0,0,0,0.05)' }}
              >
                <div style={{ width:'52px', height:'52px', borderRadius:'14px', background:q.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {q.svgIcon ? q.svgIcon : q.icon && <q.icon size={22} color={q.color} />}
                </div>
                <div>
                  <div style={{ fontSize:'11px', fontWeight:700, color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'3px' }}>{q.label}</div>
                  <div style={{ fontSize:'15px', fontWeight:700, color:'#111827' }}>{q.value}</div>
                  <div style={{ fontSize:'12px', color:'#9CA3AF', marginTop:'2px' }}>{q.sub}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN: INFO + FORM ─────────────────────────────────────────────────── */}
      <section style={{ background:'linear-gradient(180deg,#F0F7FF 0%,#fff 100%)', padding:'72px 24px 96px', fontFamily:font }}>
        <div style={{ maxWidth:'1060px', margin:'0 auto' }}>
          <div className="ct-main-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:'40px', alignItems:'stretch' }}>

            {/* ── LEFT: Info card ────────────────────────────────────────────── */}
            <motion.div {...fadeUp()} style={{ display:'flex', flexDirection:'column' }}>
              <div style={{ background:'#fff', borderRadius:'22px', border:'1.5px solid #E5E7EB', boxShadow:'0 6px 24px rgba(0,0,0,0.07)', overflow:'hidden', flex:1, display:'flex', flexDirection:'column' }}>

                {/* Top banner */}
                <div style={{ background:'linear-gradient(135deg,#001F5B,#0043C4)', padding:'28px 28px 24px' }}>
                  <h2 style={{ fontSize:'20px', fontWeight:800, color:'#fff', margin:'0 0 6px' }}>Contact Information</h2>
                  <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.7)', margin:0, lineHeight:1.5 }}>Reach us through any of the channels below.</p>
                </div>

                {/* Info rows */}
                <div style={{ padding:'24px 28px', display:'flex', flexDirection:'column', gap:'20px' }}>
                  {INFO.map(item => (
                    <div key={item.label} style={{ display:'flex', alignItems:'flex-start', gap:'14px' }}>
                      <div style={{ width:'40px', height:'40px', borderRadius:'11px', background:item.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <item.icon size={18} color={item.color} />
                      </div>
                      <div>
                        <div style={{ fontSize:'11px', fontWeight:700, color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'3px' }}>{item.label}</div>
                        {item.lines.map(l => <div key={l} style={{ fontSize:'14px', fontWeight:600, color:'#111827', lineHeight:1.6 }}>{l}</div>)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map placeholder */}
                <div style={{ margin:'0 28px 28px', background:'linear-gradient(135deg,#EBF5FF,#F0F7FF)', borderRadius:'14px', height:'160px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'8px', border:'1.5px dashed #BFDBFE' }}>
                  <span style={{ fontSize:'28px' }}>📍</span>
                  <span style={{ fontSize:'13px', fontWeight:600, color:'#007AFF' }}>New Delhi, India</span>
                  <span style={{ fontSize:'12px', color:'#9CA3AF' }}>Find us on Google Maps</span>
                </div>

                {/* Social row */}
                <div style={{ borderTop:'1px solid #F3F4F6', padding:'20px 28px', display:'flex', gap:'10px' }}>
                  {SOCIALS.map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                      style={{ width:'40px', height:'40px', borderRadius:'11px', background:s.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, textDecoration:'none', transition:'transform 0.15s, box-shadow 0.15s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow=`0 6px 16px ${s.shadow}`; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='none'; (e.currentTarget as HTMLElement).style.boxShadow='none'; }}
                    >
                      <svg width="18" height="18" viewBox={s.viewBox} fill={s.color}>{s.path}</svg>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT: Form card ───────────────────────────────────────────── */}
            <motion.div {...fadeUp(0.1)} style={{ display:'flex', flexDirection:'column' }}>
              <div style={{ background:'#fff', borderRadius:'22px', border:'1.5px solid #E5E7EB', boxShadow:'0 8px 40px rgba(0,0,0,0.08)', padding:'40px', flex:1, display:'flex', flexDirection:'column' }}>
                <h2 style={{ fontSize:'22px', fontWeight:800, color:'#111827', margin:'0 0 6px' }}>Send us a Message</h2>
                <p style={{ fontSize:'14px', color:'#6B7280', margin:'0 0 28px', lineHeight:1.6 }}>Fill out the form and our team will get back to you within 24 hours.</p>

                <AnimatePresence>
                  {success && (
                    <motion.div key="success" initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                      style={{ background:'#D1FAE5', border:'1.5px solid #10B981', borderRadius:'12px', padding:'16px 18px', display:'flex', alignItems:'center', gap:'12px', marginBottom:'24px' }}>
                      <CheckCircle size={22} color="#10B981" style={{ flexShrink:0 }} />
                      <div>
                        <p style={{ margin:'0 0 2px', fontWeight:700, color:'#065F46', fontSize:'14px' }}>Message sent successfully! 🎉</p>
                        <p style={{ margin:0, color:'#047857', fontSize:'13px' }}>We'll get back to you within 24 hours.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} noValidate style={{ flex:1, display:'flex', flexDirection:'column' }}>
                  <div className="ct-name-row" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px' }}>
                    <div>
                      <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#374151', marginBottom:'6px' }}>Your Name *</label>
                      <input className="ct-input" type="text" value={form.name} onChange={set('name')} placeholder="Rahul Sharma"
                        style={inp(errors.name)} />
                      {errors.name && <p style={{ margin:'4px 0 0', fontSize:'12px', color:'#EF4444' }}>{errors.name}</p>}
                    </div>
                    <div>
                      <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#374151', marginBottom:'6px' }}>
                        WhatsApp Number
                        <span style={{ fontSize:'11px', fontWeight:500, color:'#9CA3AF', marginLeft:'6px' }}>(optional)</span>
                      </label>
                      <div style={{ position:'relative' }}>
                        <div style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                        </div>
                        <input className="ct-input" type="tel" value={form.whatsapp} onChange={set('whatsapp')}
                          placeholder="+91 98765 43210"
                          style={{ ...inp(), paddingLeft: '36px' }} />
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom:'16px' }}>
                    <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#374151', marginBottom:'6px' }}>Email Address *</label>
                    <input className="ct-input" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com"
                      style={inp(errors.email)} />
                    {errors.email && <p style={{ margin:'4px 0 0', fontSize:'12px', color:'#EF4444' }}>{errors.email}</p>}
                  </div>

                  <div style={{ marginBottom:'16px' }}>
                    <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#374151', marginBottom:'6px' }}>Subject *</label>
                    <div style={{ position:'relative' }}>
                      <select className="ct-input" value={form.subject} onChange={set('subject')}
                        style={{ ...inp(errors.subject), appearance:'none', WebkitAppearance:'none', paddingRight:'36px', cursor:'pointer' }}>
                        <option value="">Select a topic…</option>
                        <option value="booking">Booking Enquiry</option>
                        <option value="captain">Become a Captain</option>
                        <option value="support">Customer Support</option>
                        <option value="corporate">Corporate Travel</option>
                        <option value="partnership">Partnership / Business</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown size={14} style={{ position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', color:'#9CA3AF', pointerEvents:'none' }} />
                    </div>
                    {errors.subject && <p style={{ margin:'4px 0 0', fontSize:'12px', color:'#EF4444' }}>{errors.subject}</p>}
                  </div>

                  <div style={{ marginBottom:'24px', flex:1, display:'flex', flexDirection:'column' }}>
                    <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#374151', marginBottom:'6px' }}>Message *</label>
                    <textarea className="ct-input" value={form.message} onChange={set('message')}
                      placeholder="Tell us how we can help — the more details, the better!"
                      style={{ ...inp(errors.message), height:'auto', flex:1, minHeight:'100px', padding:'12px 14px', resize:'none', lineHeight:1.6 }} />
                    {errors.message && <p style={{ margin:'4px 0 0', fontSize:'12px', color:'#EF4444' }}>{errors.message}</p>}
                  </div>

                  <button type="submit" className="ct-send" disabled={loading}
                    style={{ width:'100%', background:'#007AFF', color:'#fff', border:'none', borderRadius:'12px', padding:'15px', fontSize:'15px', fontWeight:700, cursor:'pointer', fontFamily:font, display:'flex', alignItems:'center', justifyContent:'center', gap:'9px' }}>
                    {loading ? (
                      <>
                        <div style={{ width:'18px', height:'18px', border:'2.5px solid rgba(255,255,255,0.4)', borderTopColor:'#fff', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />
                        Sending…
                      </>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

                  <p style={{ textAlign:'center', fontSize:'12px', color:'#9CA3AF', margin:'14px 0 0' }}>
                    🔒 Your information is safe with us. We never share your data.
                  </p>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
