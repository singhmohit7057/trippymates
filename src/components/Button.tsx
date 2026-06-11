import React, { useState, type CSSProperties, type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  fullWidth?: boolean;
  style?: CSSProperties;
}

const sizeMap: Record<Size, { paddingV: string; paddingH: string; fontSize: string }> = {
  sm: { paddingV: '8px', paddingH: '16px', fontSize: '13px' },
  md: { paddingV: '10px', paddingH: '24px', fontSize: '15px' },
  lg: { paddingV: '14px', paddingH: '32px', fontSize: '16px' },
};

type VariantConfig = {
  base: CSSProperties;
  hover: CSSProperties;
  disabled: CSSProperties;
};

const variantMap: Record<Variant, VariantConfig> = {
  primary: {
    base: {
      background: '#007AFF',
      color: '#FFFFFF',
      border: '1.5px solid #007AFF',
    },
    hover: {
      background: '#0056CC',
      border: '1.5px solid #0056CC',
    },
    disabled: {
      background: '#93C5FD',
      border: '1.5px solid #93C5FD',
      color: '#FFFFFF',
    },
  },
  secondary: {
    base: {
      background: '#111827',
      color: '#FFFFFF',
      border: '1.5px solid #111827',
    },
    hover: {
      background: '#1F2937',
      border: '1.5px solid #1F2937',
    },
    disabled: {
      background: '#6B7280',
      border: '1.5px solid #6B7280',
      color: '#FFFFFF',
    },
  },
  ghost: {
    base: {
      background: 'transparent',
      color: '#007AFF',
      border: '1.5px solid transparent',
    },
    hover: {
      background: '#EBF5FF',
      border: '1.5px solid transparent',
    },
    disabled: {
      background: 'transparent',
      color: '#93C5FD',
      border: '1.5px solid transparent',
    },
  },
  outline: {
    base: {
      background: '#FFFFFF',
      color: '#007AFF',
      border: '1.5px solid #007AFF',
    },
    hover: {
      background: '#EBF5FF',
      border: '1.5px solid #007AFF',
    },
    disabled: {
      background: '#FFFFFF',
      color: '#93C5FD',
      border: '1.5px solid #93C5FD',
    },
  },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  style,
}: ButtonProps) {
  const [hovered, setHovered] = useState(false);

  const { paddingV, paddingH, fontSize } = sizeMap[size];
  const config = variantMap[variant];

  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: '9999px',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontWeight: 600,
    fontSize,
    padding: `${paddingV} ${paddingH}`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background 0.15s ease, border-color 0.15s ease, color 0.15s ease',
    width: fullWidth ? '100%' : undefined,
    boxSizing: 'border-box',
    lineHeight: 1.4,
    letterSpacing: '-0.1px',
    ...(!disabled ? config.base : config.disabled),
    ...(hovered && !disabled ? config.hover : {}),
    ...style,
  };

  return (
    <button
      type={type}
      style={baseStyle}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}
