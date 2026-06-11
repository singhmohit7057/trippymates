import { useState, type CSSProperties, type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
  hoverable?: boolean;
}

export default function Card({ children, style, onClick, hoverable = false }: CardProps) {
  const [hovered, setHovered] = useState(false);

  const baseStyle: CSSProperties = {
    background: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: '16px',
    overflow: 'hidden',
    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
    cursor: onClick ? 'pointer' : 'default',
    boxSizing: 'border-box',
    boxShadow: hoverable && hovered
      ? '0 4px 12px rgba(0,0,0,0.08)'
      : '0 1px 3px rgba(0,0,0,0.08)',
    transform: hoverable && hovered ? 'translateY(-2px)' : 'translateY(0)',
    ...style,
  };

  return (
    <div
      style={baseStyle}
      onClick={onClick}
      onMouseEnter={() => hoverable && setHovered(true)}
      onMouseLeave={() => hoverable && setHovered(false)}
    >
      {children}
    </div>
  );
}
