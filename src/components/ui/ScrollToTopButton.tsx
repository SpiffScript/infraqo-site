import React, { useEffect, useState } from "react";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;

      // show button after some scroll
      setIsVisible(scrollY > 300);

      // treat the bottom ~400px of the page as the "footer zone"
      const footerZoneHeight = 150;
      const atBottom =
        viewportHeight + scrollY >= docHeight - footerZoneHeight;
      setIsNearFooter(atBottom);
    };

    handleScroll(); // run once on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const baseClasses =
    "fixed bottom-6 right-6 z-50 flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 " +
    (isVisible ? "opacity-100" : "opacity-0 pointer-events-none");

  // Light glass version (for main page background)
  const lightGlassClasses =
  "border border-blue-500/70 bg-white/70 backdrop-blur text-blue-700 " +
  "shadow-[0_0_14px_rgba(37,99,235,0.30)] " +
  "hover:bg-blue-600 hover:text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.55)] hover:-translate-y-0.5";

  // Solid blue / glow version (for when we overlap the footer)
  const darkSolidClasses =
  "bg-blue-600 text-white " +
  "shadow-[0_0_14px_rgba(37,99,235,0.45)] " +
  "hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.75)] hover:-translate-y-0.5";

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`${baseClasses} ${
        isNearFooter ? darkSolidClasses : lightGlassClasses
      }`}
    >
      <span className="text-xl leading-none">↑</span>
    </button>
  );
};

export default ScrollToTopButton;
