"use client"
import "dotenv/config";
import { useEffect } from 'react';
import ReactGA from 'react-ga';

const TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS; 

const GoogleAnalytics = () => {
  useEffect(() => {
    if (!window.location.href.includes('localhost')) { 
      ReactGA.initialize(TRACKING_ID, { debug: true }); 
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, []);

  return null; 
};

export default GoogleAnalytics;