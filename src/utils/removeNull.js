// hooks/useRemoveNull.js
import { useCallback } from 'react';

const useRemoveNull = () => {
  const removeNull = useCallback((obj) => {
    if (obj) {
      for (const key in obj) {
        if (obj[key] === null) {
          delete obj[key];
        }
      }
    }
    return obj;
  }, []);

  return removeNull;
};

export default useRemoveNull;
