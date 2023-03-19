import { RefObject, useEffect, useRef, useState } from 'react';

interface RectObj {
  height: number;
  width: number;
}

const useRect = <T extends HTMLElement>(): [RefObject<T>, RectObj] => {
  const elRef = useRef<T>(null);
  const [rect, setRect] = useState<RectObj>({ height: 0, width: 0 });

  const resizeObserver = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (resizeObserver.current === null) {
      resizeObserver.current = new ResizeObserver((items) => {
        const { width, height } = items[0].contentRect;
        setRect({ width, height });
      });
    }
  }, []);

  useEffect(() => {
    if (elRef.current === null || resizeObserver.current === null) return;

    const el = elRef.current;
    const observer = resizeObserver.current;

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [elRef]);

  return [elRef, rect];
};

export default useRect;
