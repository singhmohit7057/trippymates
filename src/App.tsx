import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// ── Scroll to top on every route change ──────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// ── Floating back-to-top button ───────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed', bottom: 28, right: 28, zIndex: 9999,
        width: 44, height: 44, borderRadius: '50%',
        background: '#007AFF', color: '#fff', border: 'none',
        boxShadow: '0 4px 16px rgba(0,122,255,0.4)',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20, transition: 'opacity 0.2s, transform 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      ↑
    </button>
  );
}

// ── Loading fallback ──────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F8FAFC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '3px solid #E5E7EB',
          borderTopColor: '#007AFF',
          animation: 'spin 0.75s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Lazy page imports (each wrapped so a missing file never crashes the app) ──

const HomePage = lazy(() =>
  import('./pages/HomePage').catch(() => ({ default: () => <ComingSoon label="Home" /> }))
);
const AboutPage = lazy(() =>
  import('./pages/AboutPage').catch(() => ({ default: () => <ComingSoon label="About" /> }))
);

// Trips
const TripsPage = lazy(() =>
  import('./pages/TripsPage').catch(() => ({ default: () => <ComingSoon label="Trips" /> }))
);
const DomesticTripsPage = lazy(() =>
  import('./pages/trips/DomesticTripsPage').catch(() => ({ default: () => <ComingSoon label="Domestic Trips" /> }))
);
const InternationalTripsPage = lazy(() =>
  import('./pages/trips/InternationalTripsPage').catch(() => ({ default: () => <ComingSoon label="International Trips" /> }))
);
const CorporateTripsPage = lazy(() =>
  import('./pages/trips/CorporateTripsPage').catch(() => ({ default: () => <ComingSoon label="Corporate Trips" /> }))
);

// Core pages
const CaptainsPage = lazy(() =>
  import('./pages/CaptainsPage').catch(() => ({ default: () => <ComingSoon label="Captains" /> }))
);
const CommunityPage = lazy(() =>
  import('./pages/CommunityPage').catch(() => ({ default: () => <ComingSoon label="Community" /> }))
);
const GalleryPage = lazy(() =>
  import('./pages/GalleryPage').catch(() => ({ default: () => <ComingSoon label="Gallery" /> }))
);
const CustomTripPage = lazy(() =>
  import('./pages/CustomTripPage').catch(() => ({ default: () => <ComingSoon label="Custom Trip" /> }))
);
const FAQPage = lazy(() =>
  import('./pages/FAQPage').catch(() => ({ default: () => <ComingSoon label="FAQ" /> }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').catch(() => ({ default: () => <ComingSoon label="Contact" /> }))
);
const ReferralsPage = lazy(() =>
  import('./pages/ReferralsPage').catch(() => ({ default: () => <ComingSoon label="Referrals" /> }))
);
const CouponsPage = lazy(() =>
  import('./pages/CouponsPage').catch(() => ({ default: () => <ComingSoon label="Coupons" /> }))
);

// Auth
const LoginPage = lazy(() =>
  import('./pages/auth/LoginPage').catch(() => ({ default: () => <ComingSoon label="Login" /> }))
);
const RegisterPage = lazy(() =>
  import('./pages/auth/RegisterPage').catch(() => ({ default: () => <ComingSoon label="Register" /> }))
);
const ForgotPasswordPage = lazy(() =>
  import('./pages/auth/ForgotPasswordPage').catch(() => ({ default: () => <ComingSoon label="Forgot Password" /> }))
);
const ResetPasswordPage = lazy(() =>
  import('./pages/auth/ResetPasswordPage').catch(() => ({ default: () => <ComingSoon label="Reset Password" /> }))
);

// Account
const AccountPage = lazy(() =>
  import('./pages/account/AccountPage').catch(() => ({ default: () => <ComingSoon label="Account" /> }))
);
const ProfilePage = lazy(() =>
  import('./pages/account/ProfilePage').catch(() => ({ default: () => <ComingSoon label="Profile" /> }))
);
const SettingsPage = lazy(() =>
  import('./pages/account/SettingsPage').catch(() => ({ default: () => <ComingSoon label="Settings" /> }))
);
const BookingsPage = lazy(() =>
  import('./pages/account/BookingsPage').catch(() => ({ default: () => <ComingSoon label="Bookings" /> }))
);
const AccountCaptainsPage = lazy(() =>
  import('./pages/account/AccountCaptainsPage').catch(() => ({ default: () => <ComingSoon label="My Captains" /> }))
);
const AccountReferralsPage = lazy(() =>
  import('./pages/account/AccountReferralsPage').catch(() => ({ default: () => <ComingSoon label="My Referrals" /> }))
);

// Unsubscribe
const UnsubscribePage = lazy(() =>
  import('./pages/UnsubscribePage').catch(() => ({ default: () => <ComingSoon label="Unsubscribe" /> }))
);

// Legal
const PrivacyPolicyPage = lazy(() =>
  import('./pages/legal/PrivacyPolicyPage').catch(() => ({ default: () => <ComingSoon label="Privacy Policy" /> }))
);
const CookiesPolicyPage = lazy(() =>
  import('./pages/legal/CookiesPolicyPage').catch(() => ({ default: () => <ComingSoon label="Cookies Policy" /> }))
);
const TermsPage = lazy(() =>
  import('./pages/legal/TermsPage').catch(() => ({ default: () => <ComingSoon label="Terms & Conditions" /> }))
);

// System
const AdminPage = lazy(() =>
  import('./pages/system/AdminPage').catch(() => ({ default: () => <ComingSoon label="Admin" /> }))
);
const ComingSoonPage = lazy(() =>
  import('./pages/system/ComingSoonPage').catch(() => ({ default: () => <ComingSoon label="Coming Soon" /> }))
);
const NotFoundPage = lazy(() =>
  import('./pages/system/NotFoundPage').catch(() => ({ default: () => <ComingSoon label="404 — Page Not Found" /> }))
);

// ── Inline fallback for pages not yet built ───────────────────────────────────
function ComingSoon({ label }: { label: string }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F8FAFC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '12px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div style={{ fontSize: '48px' }}>✈️</div>
      <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>{label}</h1>
      <p style={{ color: '#6B7280', fontSize: '15px' }}>This page is coming soon.</p>
      <a
        href="/"
        style={{
          marginTop: '8px',
          padding: '10px 24px',
          background: '#007AFF',
          color: '#fff',
          borderRadius: '9999px',
          fontSize: '14px',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        Back to Home
      </a>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <BackToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Main */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Trips */}
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/trips/domestic" element={<DomesticTripsPage />} />
          <Route path="/trips/international" element={<InternationalTripsPage />} />
          <Route path="/trips/corporate" element={<CorporateTripsPage />} />

          {/* Core */}
          <Route path="/captains" element={<CaptainsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/custom-trip" element={<CustomTripPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/referrals" element={<ReferralsPage />} />
          <Route path="/coupons" element={<CouponsPage />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Account */}
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/profile" element={<ProfilePage />} />
          <Route path="/account/settings" element={<SettingsPage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/captains" element={<AccountCaptainsPage />} />
          <Route path="/account/referrals" element={<AccountReferralsPage />} />

          {/* Unsubscribe */}
          <Route path="/unsubscribe" element={<UnsubscribePage />} />

          {/* Legal */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/cookies-policy" element={<CookiesPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />

          {/* System */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/coming-soon" element={<ComingSoonPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
