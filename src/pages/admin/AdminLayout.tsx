import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Map, Users, Star, MessageSquare, Globe, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { to: '/admin/destinations', label: 'Destinations', icon: Globe },
  { to: '/admin/trips', label: 'Trips', icon: Map },
  { to: '/admin/captains', label: 'Captains', icon: Users },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { to: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare },
];

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar { display: none !important; }
          .admin-sidebar-mobile { display: flex !important; }
          .admin-main { padding: 16px !important; padding-top: 64px !important; }
          .admin-mobile-header { display: flex !important; }
        }
        @media (min-width: 769px) {
          .admin-sidebar { display: flex !important; }
          .admin-sidebar-mobile { display: none !important; }
          .admin-mobile-header { display: none !important; }
        }
      `}</style>

      {/* Mobile header */}
      <div className="admin-mobile-header" style={{ display: 'none', position: 'fixed', top: 0, left: 0, right: 0, height: 52, background: '#111827', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', zIndex: 200 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4 }}>
            <Menu size={22} />
          </button>
          <span style={{ color: '#fff', fontSize: 15, fontWeight: 700 }}>Trippy Mates</span>
        </div>
        <span style={{ color: '#9CA3AF', fontSize: 11 }}>Admin</span>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="admin-sidebar-mobile" style={{ display: 'none', position: 'fixed', inset: 0, zIndex: 300 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setSidebarOpen(false)} />
          <aside style={{ position: 'relative', width: 260, background: '#111827', color: '#fff', padding: '24px 0', display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', marginBottom: 32 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Trippy Mates</h2>
                <p style={{ fontSize: 12, color: '#9CA3AF', margin: '4px 0 0' }}>Admin Panel</p>
              </div>
              <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: 4 }}>
                <X size={20} />
              </button>
            </div>

            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {NAV.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  style={({ isActive }) => ({
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 20px', textDecoration: 'none',
                    fontSize: 14, fontWeight: 500,
                    color: isActive ? '#fff' : '#9CA3AF',
                    background: isActive ? '#1F2937' : 'transparent',
                    borderLeft: isActive ? '3px solid #007AFF' : '3px solid transparent',
                    transition: 'all 0.15s',
                  })}
                >
                  <item.icon size={18} />
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div style={{ padding: '0 20px', borderTop: '1px solid #374151', paddingTop: 16 }}>
              <p style={{ fontSize: 12, color: '#9CA3AF', margin: '0 0 8px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.email}
              </p>
              <button
                onClick={signOut}
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: 13, fontWeight: 500, padding: 0 }}
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="admin-sidebar" style={{ width: 240, background: '#111827', color: '#fff', padding: '24px 0', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', flexShrink: 0 }}>
        <div style={{ padding: '0 20px', marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Trippy Mates</h2>
          <p style={{ fontSize: 12, color: '#9CA3AF', margin: '4px 0 0' }}>Admin Panel</p>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 20px', textDecoration: 'none',
                fontSize: 14, fontWeight: 500,
                color: isActive ? '#fff' : '#9CA3AF',
                background: isActive ? '#1F2937' : 'transparent',
                borderLeft: isActive ? '3px solid #007AFF' : '3px solid transparent',
                transition: 'all 0.15s',
              })}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '0 20px', borderTop: '1px solid #374151', paddingTop: 16 }}>
          <p style={{ fontSize: 12, color: '#9CA3AF', margin: '0 0 8px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user?.email}
          </p>
          <button
            onClick={signOut}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: 13, fontWeight: 500, padding: 0 }}
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      <main className="admin-main" style={{ flex: 1, background: '#F9FAFB', padding: 32, overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}
