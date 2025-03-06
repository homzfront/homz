import { useEffect } from 'react';

const QoreIDIntegration = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://dashboard.qoreid.com/qoreid-sdk/qoreid.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default QoreIDIntegration;