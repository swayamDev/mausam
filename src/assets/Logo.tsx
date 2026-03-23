interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

const Logo = ({
  className = "w-48 h-auto",
  variant = "light",
}: LogoProps) => {
  const baseColor = variant === "light" ? "#000000" : "#FFFFFF";

  return (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Icon Group */}
      <g className="mausam-icon">
        {/* Abstract Sun */}
        <circle cx="28" cy="18" r="8" fill={baseColor} fillOpacity="0.8" />

        {/* Geometric Cloud */}
        <path
          d="M12 35c0-4.4 3.6-8 8-8h1.1c1.5-3.5 5-6 9.1-6 4.7 0 8.6 3.3 9.7 7.7 0.6-0.1 1.2-0.2 1.8-0.2 3.9 0 7 3.1 7 7s-3.1 7-7 7H20c-4.4 0-8-3.6-8-8z"
          fill={baseColor}
        />

        {/* Wind Swirls (Motion Lines) */}
        <path
          d="M15 44h22M18 48h14"
          stroke={baseColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M37 44c1.5 0 2.5-0.8 2.5-1.8s-1-1.8-2.5-1.8M32 48c1.5 0 2.5-0.8 2.5-1.8s-1-1.8-2.5-1.8"
          stroke={baseColor}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Typography */}
      <text
        x="62"
        y="41"
        fill={baseColor}
        style={{
          fontFamily: "'Geist Variable', system-ui, sans-serif",
          fontWeight: 600,
          fontSize: "26px",
          letterSpacing: "-0.03em",
        }}
      >
        Mausam
      </text>
    </svg>
  );
};

export default Logo;
