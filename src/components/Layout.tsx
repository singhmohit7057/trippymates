import React, { type CSSProperties } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const wrapperStyle: CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    background: '#F8FAFC',
  };

  const mainStyle: CSSProperties = {
    flex: 1,
  };

  return (
    <div style={wrapperStyle}>
      <AnnouncementBar />
      <Navbar />
      <main style={mainStyle}>{children}</main>
      <Footer />
    </div>
  );
}
