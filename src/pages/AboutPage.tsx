import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Globe, Users, Shield } from 'lucide-react';
import Layout from '../components/Layout';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const teamMembers = [
  { name: 'Vikash Aggarwal', role: 'Co-Founder', initials: 'VA', color: '#007AFF', emoji: '🚀' },
  { name: 'Gajendra Singh',  role: 'Co-Founder', initials: 'GS', color: '#0056CC', emoji: '🧭' },
  { name: 'Nidhi Kedia',     role: 'Content Manager', initials: 'NK', color: '#9552E0', emoji: '✍️' },
  { name: 'TMMT',            role: 'Developer', initials: '⚡', color: '#10B981', emoji: '💻', link: 'https://www.tmmt.in' },
];

const values = [
  {
    icon: Heart,
    title: 'Passion for Travel',
    desc: 'We believe travel transforms lives. Every feature we build is rooted in our deep love for exploration and discovery.',
    color: '#EF4444',
    bg: '#FEE2E2',
  },
  {
    icon: Globe,
    title: 'Global Connections',
    desc: 'We bridge cultures by connecting travelers with authentic local experts who truly know their destinations.',
    color: '#007AFF',
    bg: '#EBF5FF',
  },
  {
    icon: Users,
    title: 'Community First',
    desc: 'Our platform thrives on shared stories. Every review, tip, and photo builds a community of passionate travelers.',
    color: '#9552E0',
    bg: '#F1E6FF',
  },
  {
    icon: Shield,
    title: 'Safety & Trust',
    desc: 'Every Captain is verified. Every transaction is secure. We make sure you travel with complete peace of mind.',
    color: '#10B981',
    bg: '#D3F6E3',
  },
];

export default function AboutPage() {
  const section: CSSProperties = {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 24px',
  };

  return (
    <Layout>
      {/* Hero */}
      <div
        style={{
          background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 60%, #003A99 100%)',
          padding: '80px 24px 72px',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <motion.div {...fadeUp()}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '9999px',
              padding: '6px 16px',
              fontSize: '13px',
              fontWeight: 600,
              marginBottom: '20px',
              backdropFilter: 'blur(6px)',
            }}
          >
            ✈️ Our Story
          </div>
          <h1
            style={{
              fontSize: 'clamp(30px, 5vw, 52px)',
              fontWeight: 800,
              margin: '0 0 16px',
              letterSpacing: '-0.5px',
            }}
          >
            About Trippy Mates
          </h1>
          <p
            style={{
              fontSize: '18px',
              opacity: 0.88,
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: '1.7',
            }}
          >
            We're on a mission to make travel deeply personal, safe, and unforgettable — one Captain at a time.
          </p>
        </motion.div>
      </div>

      {/* Mission */}
      <div style={{ background: '#fff', padding: '80px 24px' }}>
        <div style={{ ...section, maxWidth: '720px', textAlign: 'center' }}>
          <motion.div {...fadeUp()}>
            <div
              style={{
                display: 'inline-block',
                background: '#EBF5FF',
                color: '#007AFF',
                borderRadius: '9999px',
                padding: '5px 16px',
                fontSize: '12px',
                fontWeight: 700,
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
              }}
            >
              Our Mission
            </div>
            <h2
              style={{
                fontSize: 'clamp(22px, 4vw, 36px)',
                fontWeight: 800,
                color: '#111827',
                margin: '0 0 20px',
                letterSpacing: '-0.3px',
              }}
            >
              Connecting travelers with the world's best local experts
            </h2>
            <p style={{ fontSize: '17px', color: '#6B7280', lineHeight: '1.75', margin: 0 }}>
              Trippy Mates was built on a single belief: the best travel experiences happen when you explore with someone who truly belongs there. Our platform connects curious travelers with verified local Captains across the world — people who know the hidden alleys, secret restaurants, off-trail hikes, and timeless sunsets that guidebooks never cover.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Story */}
      <div style={{ background: '#F8FAFC', padding: '80px 24px' }}>
        <div style={section}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            <motion.div {...fadeUp()}>
              <div
                style={{
                  display: 'inline-block',
                  background: '#EBF5FF',
                  color: '#007AFF',
                  borderRadius: '9999px',
                  padding: '5px 16px',
                  fontSize: '12px',
                  fontWeight: 700,
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                }}
              >
                How We Started
              </div>
              <h2
                style={{
                  fontSize: 'clamp(22px, 3vw, 32px)',
                  fontWeight: 800,
                  color: '#111827',
                  margin: '0 0 16px',
                  letterSpacing: '-0.3px',
                }}
              >
                Born from a solo trip gone wrong — and right
              </h2>
              <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: '1.8', margin: '0 0 16px' }}>
                In 2021, our co-founder Vikram took a solo trip to Bali. Despite meticulous planning, he spent the first two days lost, overcharged by tourist traps, and eating mediocre food. On day three, he met Wayan — a local who spent an afternoon showing him the "real" Bali. That afternoon changed everything.
              </p>
              <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: '1.8', margin: 0 }}>
                Back in Bengaluru, Vikram and his childhood friend Asha built the first version of Trippy Mates in a tiny apartment, fuelled by filter coffee and an obsession with making travel feel human again. Two years later, we've helped over 50,000 travelers discover the world through local eyes.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.15)}>
              <div
                style={{
                  background: 'linear-gradient(135deg, #007AFF, #9552E0)',
                  borderRadius: '20px',
                  padding: '40px',
                  color: '#fff',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '24px',
                }}
              >
                {[
                  { label: 'Travelers Served', value: '50,000+' },
                  { label: 'Local Captains', value: '1,200+' },
                  { label: 'Destinations', value: '80+' },
                  { label: 'Countries', value: '28' },
                ].map((s) => (
                  <div key={s.label}>
                    <div style={{ fontSize: '28px', fontWeight: 800, marginBottom: '4px' }}>{s.value}</div>
                    <div style={{ fontSize: '13px', opacity: 0.8 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div style={{ background: '#fff', padding: '80px 24px' }}>
        <div style={section}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: 'clamp(22px, 4vw, 36px)',
                fontWeight: 800,
                color: '#111827',
                margin: '0 0 12px',
              }}
            >
              Meet the team
            </h2>
            <p style={{ fontSize: '16px', color: '#6B7280', maxWidth: '480px', margin: '0 auto' }}>
              A small team with a big heart for travel, technology, and people.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '24px',
            }}
          >
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                {...fadeUp(i * 0.08)}
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '32px 20px 28px',
                  textAlign: 'center',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${member.color}22, ${member.color}44)`,
                    border: `2.5px solid ${member.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '30px',
                    marginBottom: '16px',
                  }}
                >
                  {member.emoji}
                </div>

                {/* Name */}
                {'link' in member && member.link ? (
                  <a
                    href={member.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '17px', fontWeight: 700, color: '#007AFF', textDecoration: 'none' }}
                  >
                    {member.name} ↗
                  </a>
                ) : (
                  <div style={{ fontSize: '17px', fontWeight: 700, color: '#111827' }}>
                    {member.name}
                  </div>
                )}

                {/* Role badge */}
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: '6px',
                    background: `${member.color}18`,
                    color: member.color,
                    borderRadius: '9999px',
                    padding: '3px 12px',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                  }}
                >
                  {member.role}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div style={{ background: '#F8FAFC', padding: '80px 24px' }}>
        <div style={section}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: 'clamp(22px, 4vw, 36px)',
                fontWeight: 800,
                color: '#111827',
                margin: '0 0 12px',
              }}
            >
              Our values
            </h2>
            <p style={{ fontSize: '16px', color: '#6B7280', maxWidth: '480px', margin: '0 auto' }}>
              These principles guide every decision we make at Trippy Mates.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '24px',
            }}
          >
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                {...fadeUp(i * 0.08)}
                style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '28px 24px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  border: '1px solid #E5E7EB',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: v.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <v.icon size={22} color={v.color} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.6', margin: 0 }}>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 100%)',
          padding: '80px 24px',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <motion.div {...fadeUp()}>
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800, margin: '0 0 16px' }}>
            Join us on this journey
          </h2>
          <p style={{ fontSize: '17px', opacity: 0.88, maxWidth: '480px', margin: '0 auto 32px', lineHeight: '1.6' }}>
            Whether you're a traveler seeking authentic experiences or a local ready to share your world — Trippy Mates is for you.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/trips"
              style={{
                padding: '13px 32px',
                background: '#fff',
                color: '#007AFF',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '15px',
                textDecoration: 'none',
              }}
            >
              Explore Trips
            </Link>
            <Link
              to="/captains"
              style={{
                padding: '13px 32px',
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '15px',
                textDecoration: 'none',
                backdropFilter: 'blur(6px)',
                border: '1.5px solid rgba(255,255,255,0.35)',
              }}
            >
              Become a Captain
            </Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
