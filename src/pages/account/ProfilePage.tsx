import { type CSSProperties, useState } from 'react';
import { Camera, User, Mail, Phone, FileText, Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';

export default function ProfilePage() {
  const [form, setForm] = useState({
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 98765 43210',
    bio: 'Passionate traveler and adventure seeker. Love exploring new cultures, local cuisines, and hidden gems around the world.',
  });
  const [saved, setSaved] = useState(false);
  const [avatarHovered, setAvatarHovered] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const hero: CSSProperties = {
    background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 100%)',
    padding: '40px 24px 32px',
    color: '#fff',
  };

  const body: CSSProperties = {
    maxWidth: '680px',
    margin: '0 auto',
    padding: '40px 24px 80px',
  };

  const card: CSSProperties = {
    background: '#FFFFFF',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '36px',
  };

  const avatarWrap: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '36px',
  };

  const avatarOuter: CSSProperties = {
    position: 'relative',
    cursor: 'pointer',
    display: 'inline-block',
  };

  const avatarCircle: CSSProperties = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 100%)',
    color: '#fff',
    fontSize: '36px',
    fontWeight: 800,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '4px solid #E5E7EB',
    transition: 'opacity 0.2s',
    opacity: avatarHovered ? 0.8 : 1,
  };

  const cameraOverlay: CSSProperties = {
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    background: 'rgba(0,0,0,0.4)',
    display: avatarHovered ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '4px',
  };

  const fieldGroup: CSSProperties = {
    marginBottom: '24px',
  };

  const label: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '8px',
  };

  const inputStyle: CSSProperties = {
    width: '100%',
    border: '1.5px solid #E5E7EB',
    borderRadius: '10px',
    padding: '12px 14px',
    fontSize: '15px',
    color: '#111827',
    background: '#fff',
    fontFamily: 'inherit',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s',
  };

  const disabledInput: CSSProperties = {
    ...inputStyle,
    background: '#F9FAFB',
    color: '#9CA3AF',
    cursor: 'not-allowed',
  };

  const textareaStyle: CSSProperties = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: '100px',
    lineHeight: 1.6,
  };

  const saveBtn: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    background: saved ? '#10B981' : '#007AFF',
    color: '#fff',
    border: 'none',
    borderRadius: '9999px',
    padding: '14px',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'background 0.2s',
  };

  return (
    <Layout>
      <div style={hero}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <Link to="/account" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: 500, textDecoration: 'none', marginBottom: '12px' }}>
            <ArrowLeft size={15} />
            Back to Account
          </Link>
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 4px' }}>My Profile</h1>
          <p style={{ margin: 0, opacity: 0.8, fontSize: '15px' }}>Manage your personal information</p>
        </div>
      </div>

      <div style={body}>
        <div style={card}>
          {/* Avatar upload */}
          <div style={avatarWrap}>
            <div
              style={avatarOuter}
              onMouseEnter={() => setAvatarHovered(true)}
              onMouseLeave={() => setAvatarHovered(false)}
              title="Click to change photo"
            >
              <div style={avatarCircle}>JD</div>
              <div style={cameraOverlay}>
                <Camera size={22} color="#fff" />
                <span style={{ color: '#fff', fontSize: '11px', fontWeight: 600 }}>Change</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSave}>
            {/* Full Name */}
            <div style={fieldGroup}>
              <label style={label}>
                <User size={15} color="#9CA3AF" />
                Full Name
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={e => handleChange('fullName', e.target.value)}
                style={inputStyle}
                placeholder="Your full name"
              />
            </div>

            {/* Email (readonly) */}
            <div style={fieldGroup}>
              <label style={label}>
                <Mail size={15} color="#9CA3AF" />
                Email Address
                <span style={{ marginLeft: '6px', fontSize: '11px', color: '#9CA3AF', fontWeight: 500, background: '#F3F4F6', borderRadius: '6px', padding: '2px 8px' }}>Read only</span>
              </label>
              <input
                type="email"
                value={form.email}
                readOnly
                style={disabledInput}
              />
              <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#9CA3AF' }}>To change your email, contact support at support@trippymates.com</p>
            </div>

            {/* Phone */}
            <div style={fieldGroup}>
              <label style={label}>
                <Phone size={15} color="#9CA3AF" />
                Phone Number
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => handleChange('phone', e.target.value)}
                style={inputStyle}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            {/* Bio */}
            <div style={fieldGroup}>
              <label style={label}>
                <FileText size={15} color="#9CA3AF" />
                Bio
              </label>
              <textarea
                value={form.bio}
                onChange={e => handleChange('bio', e.target.value)}
                style={textareaStyle}
                placeholder="Tell fellow travelers about yourself..."
              />
              <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#9CA3AF' }}>{form.bio.length}/300 characters</p>
            </div>

            <button type="submit" style={saveBtn}>
              <Save size={16} />
              {saved ? 'Saved Successfully!' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
