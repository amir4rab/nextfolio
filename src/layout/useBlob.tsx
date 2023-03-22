import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useEffect } from 'react';

const useBlob = () => {
  const isDesktop = useMediaQuery('(min-width: 992px)');

  useEffect(() => {
    if (typeof window === 'undefined' || !isDesktop) return;

    const handler = (e: MouseEvent) => {
      const blob = document.getElementById('__blob') as HTMLDivElement;

      const { clientX: x, clientY: y } = e;

      const posX = `${x}px`;
      const posY = `${y}px`;

      blob.style.setProperty('--pos-x', posX);
      blob.style.setProperty('--pos-y', posY);
    };

    const body = document.body;
    body.addEventListener('mousemove', handler);
    return () => {
      body.removeEventListener('mousemove', handler);
    };
  }, [isDesktop]);

  return {};
};

export default useBlob;
