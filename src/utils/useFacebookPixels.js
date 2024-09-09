"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation"; 
import { initFacebookPixel, trackPageView } from "@/libs/facebookPixel";

const useFacebookPixel = () => {
  const pathname = usePathname(); 

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      initFacebookPixel();
      trackPageView();

      trackPageView();
    }
  }, [pathname]); 
};

export default useFacebookPixel;
