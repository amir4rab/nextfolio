import { useEffect, useState, useRef, useCallback } from 'react';

const useDebouncedValue = <T = unknown,>(value: T, wait: number) => {
  const [_value, setValue] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const timeoutFunction = useCallback((v: T) => setValue(v), []);
  const clearPerTimeout = useCallback(
    () => timeoutRef.current && clearTimeout(timeoutRef.current),
    []
  );

  useEffect(() => {
    clearPerTimeout();
    timeoutRef.current = setTimeout(() => timeoutFunction(value), wait);
  }, [value, clearPerTimeout, timeoutFunction, wait]);

  return [_value, setValue] as const;
};

export default useDebouncedValue;
