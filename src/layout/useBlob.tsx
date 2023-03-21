import { useEffect } from 'react';

const useBlob = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

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
  }, []);

  return {};
};

export default useBlob;
