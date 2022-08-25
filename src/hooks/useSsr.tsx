import { useEffect, useState } from 'react';

const useSsr = () => {
  const [ssr, setSrr] = useState(true);

  useEffect(() => {
    if (ssr && typeof window !== 'undefined') setSrr(false);
  }, [ssr]);

  return ssr;
};

export default useSsr;
