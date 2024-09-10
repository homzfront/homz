"use client"
import { useEffect } from 'react';
import "dotenv/config";

const FBpixels = () => {
  useEffect(() => {
    const pixel = `https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_PIXEL_ID}&ev=PageView&noscript=1`;

    const script = document.createElement('script');
    script.src = pixel;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default FBpixels;