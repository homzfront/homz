"use client"
import useViewportStore from '@/store/useViewportState';
import { useEffect } from 'react';
import { useWindowSize } from 'react-use';

const ViewportTracker = () => {
  const { width } = useWindowSize();
  const setViewport = useViewportStore((state) => state.setViewport);

  useEffect(() => {
    setViewport(width);
  }, [width, setViewport]);

  return null; // this component doesn't render anything
};

export default ViewportTracker;
