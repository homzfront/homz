"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReactPixel from 'react-facebook-pixel';
import "dotenv/config";

const FacebookPixelTracker = () => {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactPixel.init(process.env.NEXT_PUBLIC_PIXEL_ID);
      ReactPixel.pageView();

      const handleRouteChange = () => {
        ReactPixel.pageView();
      };

      router.events.on('routeChangeComplete', handleRouteChange);

      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [router.events]);

  return null;
};

export default FacebookPixelTracker;
