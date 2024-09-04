"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { initFacebookPixel, trackPageView } from '@/libs/facebookPixel';

const useFacebookPixel = () => {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      initFacebookPixel();
      trackPageView();

      const handleRouteChange = () => {
        trackPageView();
      };

      router.events.on('routeChangeComplete', handleRouteChange);

      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [router.events]);
};

export default useFacebookPixel;
