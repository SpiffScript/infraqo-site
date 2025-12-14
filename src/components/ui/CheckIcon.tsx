import React from "react";

type CheckIconProps = {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
};

export default function CheckIcon({
  className = "",
  style,
  title,
}: CheckIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill="none"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M20 7L10 17l-4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
