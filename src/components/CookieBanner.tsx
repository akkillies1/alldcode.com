import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const COOKIE_KEY = "dpl_cookie_consent";

export const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(COOKIE_KEY);
      if (!stored) {
        setVisible(true);
      }
    } catch {
      // If localStorage is not available, fail silently and hide banner
      setVisible(false);
    }
  }, []);

  const accept = () => {
    try {
      window.localStorage.setItem(COOKIE_KEY, "accepted");
    } catch {
      // ignore storage errors
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[94%] max-w-xl -translate-x-1/2 rounded-2xl border border-border bg-background/95 shadow-2xl backdrop-blur-md px-4 py-4 md:px-6 md:py-5">
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-start md:items-center">
        <p className="text-xs md:text-sm text-muted-foreground">
          We use cookies to provide a better browsing experience and analyze site
          traffic. By continuing to use this site, you agree to our{" "}
          <a
            href="/privacy-policy"
            className="underline underline-offset-2 hover:text-accent"
          >
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex gap-2 md:ml-auto">
          <Button size="sm" className="text-xs font-semibold px-4" onClick={accept}>
            I Agree
          </Button>
        </div>
      </div>
    </div>
  );
};

