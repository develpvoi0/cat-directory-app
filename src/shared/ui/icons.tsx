type IconProps = { className?: string };

function Icon({ className = "", children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-5 ${className}`}
    >
      {children}
    </svg>
  );
}

export function RefreshIcon({ className = "" }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M20 12a8 8 0 1 1-2.35-5.65" />
      <path d="M20 4v5h-5" />
    </Icon>
  );
}

export function ThemeIcon({ className = "" }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4a8 8 0 0 0 0 16z" fill="currentColor" />
    </Icon>
  );
}

export function ChevronRightIcon({ className = "" }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M9 6l6 6-6 6" />
    </Icon>
  );
}

export function AlertIcon({ className = "" }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M12 3.5l9.5 16.5h-19z" />
      <path d="M12 10v4.5" />
      <circle cx="12" cy="17.2" r=".6" fill="currentColor" />
    </Icon>
  );
}

export function SearchIcon({ className = "" }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </Icon>
  );
}

export function CloseIcon({ className = "" }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </Icon>
  );
}

export function ArrowLeftIcon({ className = "" }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </Icon>
  );
}

export function WifiOffIcon({ className = "" }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M3 3l18 18" />
      <path d="M8.5 16.4a5 5 0 0 1 7 0" />
      <path d="M5 12.9a10 10 0 0 1 5.2-2.8" />
      <path d="M14.8 10.2A10 10 0 0 1 19 12.9" />
      <path d="M2 9.3a15 15 0 0 1 4.2-2.6" />
      <path d="M10.7 5.1A15 15 0 0 1 22 9.3" />
      <circle cx="12" cy="19.5" r=".6" fill="currentColor" />
    </Icon>
  );
}

export function CheckCircleIcon({ className = "" }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.7 2.7L16 10" />
    </Icon>
  );
}

export function AlertCircleIcon({ className = "" }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V13" />
      <circle cx="12" cy="16.3" r=".5" fill="currentColor" />
    </Icon>
  );
}
