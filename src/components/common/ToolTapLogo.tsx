import React from 'react';
import toolTapLogoPng from '@/assets/branding/tooltap-logo.png';
import toolTapIconPng from '@/assets/branding/tooltap-icon.png';

export type ToolTapLogoProps = {
  variant?: 'navbar' | 'footer' | 'loading' | 'icon';
  className?: string;
  width?: number;
  height?: number;
};

export function ToolTapLogo({
  variant = 'navbar',
  className = '',
  width,
  height,
}: ToolTapLogoProps) {
  if (variant === 'icon') {
    return (
      <img
        src={toolTapIconPng}
        alt="ToolTap"
        width={width || 36}
        height={height || 36}
        className={`tooltap-logo tooltap-logo--icon h-8 sm:h-9 w-auto object-contain shrink-0 ${className}`}
        loading="eager"
        decoding="async"
      />
    );
  }

  const variantStyles = {
    navbar: 'h-[34px] sm:h-[38px] md:h-[42px] max-w-[145px] sm:max-w-[175px] md:max-w-[200px] w-auto object-contain object-left shrink-0',
    footer: 'h-[40px] sm:h-[44px] md:h-[48px] max-w-[180px] sm:max-w-[210px] w-auto object-contain object-left shrink-0',
    loading: 'w-[min(220px,65vw)] h-auto object-contain animate-logo-fade',
  };

  const logoSrc = toolTapLogoPng;

  return (
    <img
      src={logoSrc}
      alt="ToolTap"
      width={width || (variant === 'footer' ? 210 : 180)}
      height={height || (variant === 'footer' ? 48 : 42)}
      className={`tooltap-logo tooltap-logo--${variant} ${variantStyles[variant] || ''} ${className}`}
      loading={variant === 'navbar' ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
