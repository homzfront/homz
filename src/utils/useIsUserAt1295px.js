import { useState, useEffect } from 'react';

function useIsUserAt1295px() {
  const [isAt1295px, setIsAt1295px] = useState(window.innerWidth >= 1295);

  useEffect(() => {
    const handleResize = () => {
      setIsAt1295px(window.innerWidth >= 1295);
    };

    window.addEventListener('resize', handleResize);

    // Clean up listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isAt1295px;
}

export default useIsUserAt1295px;
