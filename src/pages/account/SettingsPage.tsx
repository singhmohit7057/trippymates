import { type CSSProperties, useState } from 'react';
import { Bell, Lock, Trash2, ArrowLeft, Eye, EyeOff, CheckCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';

interface Toggle {
  id: string;
  label: string;
  description: string;
  value: boolean;
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState<Toggle[]>([
    { id: 'email', label: 'Email Notifications', description: 'Booking confirmations, trip reminders, and updates', value: true },
    { id: 'sms', label: 'SMS Notifications', description: 'Text alerts for bookings and important travel changes', value: false },
    { id: 'push', label: 'Push Notifications', description: 'In-app alerts for messages, deals, and community activity', value: true },
    { id: 'marketing', label: 'Marketing Emails', description: 'Special offers, new destinations, and travel inspiration', value: false },
  ]);

  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwdSaved, setPwdSaved] = useState(false);
  const [pwdError, setPwdError] = useState('');
  const [deleteHovered, setDeleteHovered] = useState(false);

  const toggleNotif = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, value: !n.value } : n));
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError('');
    if (!passwords.current) { setPwdError('Please enter your current password.'); return; }
    if (passwords.newPass.length < 8) { setPwdError('New password must be at least 8 characters.'); return; }
    if (passwords.newPass !== passwords.confirm) { setPwdError('Passwords do not match.'); return; }
    setPwdSaved(true);
    setPasswords({ current: '', newPass: '', confirm: '' });
    setTimeout(() => setPwdSaved(false), 3000);
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

  const section: CSSProperties = {
    background: '#FFFFFF',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '28px',
    marginBottom: '24px',
  };

  const sectionHeader: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
    paddingBottom: '16px',
    borderBottom: '1px solid #F3F4F6',
  };

  const sectionTitle: CSSProperties = {
    fontSize: '17px',
    fontWeight: 700,
    color: '#111827',
    margin: 0,
  };

  const toggleRow: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 0',
    borderBottom: '1px solid #F9FAFB',
  };

  const toggleSwitch = (active: boolean): CSSProperties => ({
    width: '44px',
    height: '24px',
    borderRadius: '9999px',
    background: active ? '#007AFF' : '#D1D5DB',
    position: 'relative',
    cursor: 'pointer',
    border: 'none',
    flexShrink: 0,
    transition: 'background 0.2s',
  });

  const toggleKnob = (active: boolean): CSSProperties => ({
    position: 'absolute',
    top: '3px',
    left: active ? '23px' : '3px',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    background: '#fff',
    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
    transition: 'left 0.2s',
  });

  const fieldGroup: CSSProperties = {
    marginBottom: '16px',
    position: 'relative',
  };

  const labelStyle: CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '8px',
  };

  const inputStyle: CSSProperties = {
    width: '100%',
    border: '1.5px solid #E5E7EB',
    borderRadius: '10px',
    padding: '12px 44px 12px 14px',
    fontSize: '15px',
    color: '#111827',
    background: '#fff',
    fontFamily: 'inherit',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const eyeBtn: CSSProperties = {
    position: 'absolute',
    right: '14px',
    top: '40px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    color: '#9CA3AF',
  };

  const saveBtn: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    background: pwdSaved ? '#10B981' : '#007AFF',
    color: '#fff',
    border: 'none',
    borderRadius: '9999px',
    padding: '13px 28px',
    fontSize: '14px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'background 0.2s',
  };

  const dangerCard: CSSProperties = {
    background: '#FFF5F5',
    borderRadius: '16px',
    border: '1px solid #FECACA',
    padding: '28px',
    marginBottom: '24px',
  };

  const deleteBtn: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: '#F9FAFB',
    color: '#9CA3AF',
    border: '1.5px solid #E5E7EB',
    borderRadius: '9999px',
    padding: '11px 24px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'not-allowed',
    fontFamily: 'inherit',
    position: 'relative',
  };

  return (
    <Layout>
      <div style={hero}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <Link to="/account" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: 500, textDecoration: 'none', marginBottom: '12px' }}>
            <ArrowLeft size={15} />
            Back to Account
          </Link>
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 4px' }}>Settings</h1>
          <p style={{ margin: 0, opacity: 0.8, fontSize: '15px' }}>Manage notifications, security, and account preferences</p>
        </div>
      </div>

      <div style={body}>
        {/* Notifications */}
        <div style={section}>
          <div style={sectionHeader}>
            <div style={{ background: '#EBF5FF', borderRadius: '10px', padding: '8px' }}>
              <Bell size={18} color="#007AFF" />
            </div>
            <h2 style={sectionTitle}>Notification Preferences</h2>
          </div>
          {notifications.map((n, i) => (
            <div key={n.id} style={{ ...toggleRow, borderBottom: i === notifications.length - 1 ? 'none' : '1px solid #F9FAFB' }}>
              <div>
                <p style={{ margin: '0 0 3px', fontSize: '14px', fontWeight: 600, color: '#111827' }}>{n.label}</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#9CA3AF' }}>{n.description}</p>
              </div>
              <button style={toggleSwitch(n.value)} onClick={() => toggleNotif(n.id)}>
                <div style={toggleKnob(n.value)} />
              </button>
            </div>
          ))}
        </div>

        {/* Password */}
        <div style={section}>
          <div style={sectionHeader}>
            <div style={{ background: '#EBF5FF', borderRadius: '10px', padding: '8px' }}>
              <Lock size={18} color="#007AFF" />
            </div>
            <h2 style={sectionTitle}>Change Password</h2>
          </div>

          {pwdSaved && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#DCFCE7', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px' }}>
              <CheckCircle size={16} color="#15803D" />
              <span style={{ fontSize: '14px', color: '#15803D', fontWeight: 600 }}>Password updated successfully!</span>
            </div>
          )}

          {pwdError && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FEF2F2', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px' }}>
              <AlertTriangle size={16} color="#DC2626" />
              <span style={{ fontSize: '14px', color: '#DC2626', fontWeight: 500 }}>{pwdError}</span>
            </div>
          )}

          <form onSubmit={handlePasswordSave}>
            <div style={fieldGroup}>
              <label style={labelStyle}>Current Password</label>
              <input
                type={showCurrent ? 'text' : 'password'}
                value={passwords.current}
                onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))}
                style={inputStyle}
                placeholder="Enter current password"
              />
              <button type="button" style={eyeBtn} onClick={() => setShowCurrent(v => !v)}>
                {showCurrent ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            <div style={fieldGroup}>
              <label style={labelStyle}>New Password</label>
              <input
                type={showNew ? 'text' : 'password'}
                value={passwords.newPass}
                onChange={e => setPasswords(p => ({ ...p, newPass: e.target.value }))}
                style={inputStyle}
                placeholder="Min. 8 characters"
              />
              <button type="button" style={eyeBtn} onClick={() => setShowNew(v => !v)}>
                {showNew ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            <div style={{ ...fieldGroup, marginBottom: '24px' }}>
              <label style={labelStyle}>Confirm New Password</label>
              <input
                type={showConfirm ? 'text' : 'password'}
                value={passwords.confirm}
                onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
                style={inputStyle}
                placeholder="Repeat new password"
              />
              <button type="button" style={eyeBtn} onClick={() => setShowConfirm(v => !v)}>
                {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            <button type="submit" style={saveBtn}>
              <Lock size={15} />
              Update Password
            </button>
          </form>
        </div>

        {/* Danger Zone */}
        <div style={dangerCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <AlertTriangle size={20} color="#DC2626" />
            <h2 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#DC2626' }}>Danger Zone</h2>
          </div>
          <p style={{ margin: '0 0 20px', fontSize: '14px', color: '#6B7280', lineHeight: 1.5 }}>
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <div
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={() => setDeleteHovered(true)}
            onMouseLeave={() => setDeleteHovered(false)}
          >
            <button style={deleteBtn} disabled>
              <Trash2 size={15} />
              Delete Account
            </button>
            {deleteHovered && (
              <div style={{
                position: 'absolute',
                bottom: 'calc(100% + 8px)',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#111827',
                color: '#fff',
                borderRadius: '8px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                zIndex: 10,
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}>
                Contact support to delete your account
                <div style={{ position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid #111827' }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
