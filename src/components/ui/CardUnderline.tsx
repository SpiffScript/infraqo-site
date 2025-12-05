import React from "react";

const CardUnderline: React.FC = () => {
  return (
    <div
      className="absolute bottom-0 left-0 h-[6px] w-0 bg-blue-500 transition-all duration-500 ease-out group-hover:w-full"
      aria-hidden="true"
    />
  );
};

export default CardUnderline;
