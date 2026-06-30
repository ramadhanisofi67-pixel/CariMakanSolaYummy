import React from "react";

// Reusable SVG wrapper to enforce consistency
const IconWrapper = ({ children, size = "1em", className = "", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`custom-icon ${className}`}
    style={{ display: "inline-block", verticalAlign: "middle", ...props.style }}
    {...props}
  >
    {children}
  </svg>
);

export const HomeIcon = (props) => (
  <IconWrapper {...props}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </IconWrapper>
);

export const HeartIcon = ({ filled, ...props }) => (
  <IconWrapper
    fill={filled ? "currentColor" : "none"}
    stroke={filled ? "none" : "currentColor"}
    {...props}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </IconWrapper>
);

export const BrokenHeartIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    <path d="m11 5.5 2.5 4.5-3 3 3.5 3.5" />
  </IconWrapper>
);

export const CartIcon = (props) => (
  <IconWrapper {...props}>
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </IconWrapper>
);

export const SearchIcon = (props) => (
  <IconWrapper {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </IconWrapper>
);

export const StarIcon = ({ filled = true, ...props }) => (
  <IconWrapper
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </IconWrapper>
);

export const TimeIcon = (props) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </IconWrapper>
);

export const TrashIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </IconWrapper>
);

export const CheckIcon = (props) => (
  <IconWrapper {...props}>
    <polyline points="20 6 9 17 4 12" />
  </IconWrapper>
);

export const CloseIcon = (props) => (
  <IconWrapper {...props}>
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </IconWrapper>
);

export const InfoIcon = (props) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="16" y2="12" />
    <line x1="12" x2="12.01" y1="8" y2="8" />
  </IconWrapper>
);

export const PortionIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M3 2v7c0 1.1.9 2 2 2h4v10M19 2v20M14 2v4c0 1.1.9 2 2 2h3" />
  </IconWrapper>
);

export const CalorieIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </IconWrapper>
);

export const SparklesIcon = (props) => (
  <IconWrapper {...props}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </IconWrapper>
);

export const FlameIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </IconWrapper>
);

export const LogoIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M3 12h18M3 8h18M8 2v6M16 2v6M12 2v6" />
    <path d="M12 22c5.523 0 10-4.477 10-10H2c0 5.523 4.477 10 10 10z" />
  </IconWrapper>
);

export const ArrowLeftIcon = (props) => (
  <IconWrapper {...props}>
    <line x1="19" x2="5" y1="12" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </IconWrapper>
);

export const PlusIcon = (props) => (
  <IconWrapper {...props}>
    <line x1="12" x2="12" y1="5" y2="19" />
    <line x1="5" x2="19" y1="12" y2="12" />
  </IconWrapper>
);

export const MinusIcon = (props) => (
  <IconWrapper {...props}>
    <line x1="5" x2="19" y1="12" y2="12" />
  </IconWrapper>
);

export const QrisIcon = (props) => (
  <IconWrapper {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <rect width="5" height="5" x="6" y="6" />
    <rect width="5" height="5" x="13" y="6" />
    <rect width="5" height="5" x="6" y="13" />
    <rect width="2" height="2" x="15" y="15" />
  </IconWrapper>
);

export const BankIcon = (props) => (
  <IconWrapper {...props}>
    <polyline points="2 22 22 22" />
    <polyline points="2 11 12 2 22 11" />
    <rect width="20" height="4" x="2" y="11" />
    <line x1="6" x2="6" y1="15" y2="19" />
    <line x1="10" x2="10" y1="15" y2="19" />
    <line x1="14" x2="14" y1="15" y2="19" />
    <line x1="18" x2="18" y1="15" y2="19" />
  </IconWrapper>
);

export const CashIcon = (props) => (
  <IconWrapper {...props}>
    <rect width="20" height="12" x="2" y="6" rx="2" />
    <circle cx="12" cy="12" r="3" />
    <line x1="6" x2="6.01" y1="12" y2="12" />
    <line x1="18" x2="18.01" y1="12" y2="12" />
  </IconWrapper>
);

export const DeliveryIcon = (props) => (
  <IconWrapper {...props}>
    <rect width="10" height="10" x="2" y="9" rx="1" />
    <path d="M12 9h4l4 4v6h-8V9z" />
    <circle cx="6.5" cy="20.5" r="1.5" />
    <circle cx="16.5" cy="20.5" r="1.5" />
  </IconWrapper>
);

export const StoreIcon = (props) => (
  <IconWrapper {...props}>
    <path d="m2 7 4.41-3.67A2 2 0 0 1 7.72 3h8.56a2 2 0 0 1 1.31.33L22 7" />
    <path d="M4 12V22a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V12" />
    <path d="M2 7H22" />
    <path d="M9 17h6v-6H9v6z" />
  </IconWrapper>
);

export const NoteIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </IconWrapper>
);

export const ChevronRightIcon = (props) => (
  <IconWrapper {...props}>
    <polyline points="9 18 15 12 9 6" />
  </IconWrapper>
);

export const UserIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </IconWrapper>
);
