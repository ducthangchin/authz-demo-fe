import { useCallback, useEffect } from 'react';

const useDebounce = (effect: any, dependencies: any, delay: number) => {
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);

    return () => clearTimeout(timeout);
  }, [callback, delay]);
};

export default useDebounce;