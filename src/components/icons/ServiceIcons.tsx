import React from 'react';

const iconProps = {
  className: "w-full h-full",
  strokeWidth: "1.5",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  // FIX: The 'focusable' and 'aria-hidden' attributes expect a `Booleanish` type in React.
  // Changed string values to booleans to fix type errors and ensure type safety.
  "aria-hidden": true,
  focusable: false,
};

export const CableIcon: React.FC = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <path d="M4 14v-4h16v4" />
    <path d="M8 14v-10h8v10" />
    <path d="M6 14l-2 6h16l-2-6" />
    <path d="M10 5h4" />
  </svg>
);

export const WifiIcon: React.FC = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <path d="M12 18h.01" />
    <path d="M2.93 9.93a12.728 12.728 0 0118.14 0" />
    <path d="M6.46 13.46a7.071 7.071 0 0111.08 0" />
    <path d="M9.88 16.88a2.828 2.828 0 013.999.001" />
  </svg>
);

export const SecurityCameraIcon: React.FC = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <path d="M16 14l4-4-6-6-10 10v6h6l4-4z" />
    <path d="M21 21v-4l-3-3" />
    <path d="M11 10l.968-.968" />
  </svg>
);

export const ManagedItIcon: React.FC = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" />
    <path d="M7 8h10" />
    <path d="M7 12h10" />
    <path d="M7 16h4" />
    <path d="M15 16l3-3-3-3" />
  </svg>
);

export const PosIcon: React.FC = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <path d="M4 3h16v13h-7l-3 3-3-3H4V3z" />
    <path d="M8 7h8" />
    <path d="M8 11h8" />
    <path d="M2 21h20" />
  </svg>
);

export const InstallIcon: React.FC = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <path d="M12 3v18m-9-9h18" />
    <path d="M17 17l-5-5-5 5" />
    <path d="M7 7l5 5 5-5" />
  </svg>
);

export const CybersecurityIcon: React.FC = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 12l4-4m-8 0l4 4" />
    <path d="m12 8 v8" />
  </svg>
);

export const ConsultingIcon: React.FC = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <path d="M14 2H6v20h12V8l-4-6z" />
    <path d="M14 2v6h6" />
    <path d="M9 13h6" />
    <path d="M9 17h3" />
  </svg>
);