import React from "react";
import { Link } from "react-router-dom";

type CtaButtonProps = {
  children: React.ReactNode;
  to?: string;
  href?: string;
  variant?: "light" | "dark" | "glow";
  fullWidth?: boolean;
  className?: string;
};

const CtaButton: React.FC<CtaButtonProps> = ({
  children,
  to,
  href,
  variant = "light",
  fullWidth = false,
  className = "",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center px-5 py-3 text-sm font-bold uppercase tracking-widest border-2 bg-transparent transition-all duration-200";

  let colorClasses: string;

  if (variant === "dark") {
    colorClasses = [
      "text-sky-400 border-sky-400",
      "shadow-[0_0_10px_rgba(59,130,246,0.30)]",
      "hover:bg-blue-600 hover:text-white hover:border-blue-600",
      "hover:shadow-[0_0_18px_rgba(59,130,246,0.55)]",
      "transition-shadow",
    ].join(" ");
  } else if (variant === "glow") {
  colorClasses = [
    "bg-blue-700 text-white border-blue-700",
    "shadow-[0_0_12px_rgba(37,99,235,0.45)]",
    "hover:bg-blue-500 hover:border-blue-500",
    "hover:shadow-[0_0_20px_rgba(59,130,246,0.65)]",
    "transition-shadow",
  ].join(" ");
  } else if (variant === "blue") {
  colorClasses = [
    "bg-blue-700 text-white border-blue-700",
    "shadow-[0_0_12px_rgba(37,99,235,0.45)]",
    "hover:bg-sky-400 hover:border-sku-400",
    "hover:shadow-[0_0_20px_rgba(59,130,246,0.65)]",
    "transition-shadow",
  ].join(" ");
} else {
    colorClasses = [
      "text-blue-700 border-blue-500",
      "shadow-[0_2px_6px_rgba(0,0,0,0.08)]",
      "hover:bg-blue-600 hover:text-white hover:border-blue-600",
      "hover:shadow-[0_0_14px_rgba(37,99,235,0.45)]",
      "transition-shadow",
    ].join(" ");
  }

  const widthClasses = fullWidth ? "w-full" : "";

  const finalClassName = `${baseClasses} ${colorClasses} ${widthClasses} ${className}`;

  if (to) {
    return (
      <Link to={to} className={finalClassName}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={finalClassName}>
        {children}
      </a>
    );
  }

  return <button className={finalClassName}>{children}</button>;
};

export default CtaButton;
