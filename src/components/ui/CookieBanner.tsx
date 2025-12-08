import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "infraqo_cookie_consent";

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setVisible(true);
      }
    } catch {
      // If localStorage is unavailable, fail quietly and just show nothing.
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // ignore write errors
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-4">
        <div className="bg-slate-900/95 border border-slate-800 shadow-lg shadow-black/40 px-4 py-3 sm:px-5 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-10">
            <div className="text-xs sm:text-sm text-slate-200">
              <p className="font-semibold text-slate-100">
                Cookies help us improve your experience.
              </p>
              <p className="mt-1 text-slate-300">
                InfraQo uses cookies and analytical tools to understand site usage, optimize performance, enhance the 
                services we provide, and improve your overall experience. By continuing to use this site, you consent to our{" "}
                <Link
                  to="/privacy"
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-none items-center gap-2 sm:ml-auto">
              <Link
                to="/privacy#cookie-policy"
                className="px-3 py-1.5 text-xs sm:text-sm border border-slate-600 text-slate-200 hover:border-slate-400 hover:text-slate-100 transition-colors"
              >
                Learn more
              </Link>
              <button
                type="button"
                onClick={handleAccept}
                className="px-4 py-1.5 text-xs sm:text-sm bg-blue-500 hover:bg-blue-400 text-white font-medium transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
