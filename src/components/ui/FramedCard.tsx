// src/components/FramedCard.tsx
import React from "react";
import CardUnderline from "./CardUnderline";

type FramedCardProps = {
  children: React.ReactNode;
  className?: string; // optional extra padding / layout tweaks
};

const FramedCard: React.FC<FramedCardProps> = ({ children, className = "" }) => (
  <div
    className={
      "group bg-white border border-slate-300 overflow-hidden shadow-sm flex flex-col relative p-6 " +
      className
    }
  >
    {children}
    <CardUnderline />
  </div>
);

export default FramedCard;
