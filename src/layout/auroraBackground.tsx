import { useCallback, useEffect, useMemo, useState } from 'react';

// framer-motion
import { AnimatePresence, motion } from 'framer-motion';

// mantine
import { createStyles, keyframes } from '@mantine/styles';
import { useDebouncedState } from '@mantine/hooks';

// keyframes
const shine = keyframes({
  from: {
    transform: 'scale(1)'
  },
  to: {
    transform: 'scale(1.05)'
  }
});

const useStyles = createStyles(() => ({
  wrapper: {
    position: 'absolute',
    overflow: 'hidden',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    zIndex: -5
  },
  item: {
    opacity: 0,
    zIndex: -5,
    position: 'absolute',
    animation: `${shine} 5s 1s ease-in-out infinite alternate`
  }
}));

interface Aurora {
  size: number;
  left: string;
  top: number;
  background: string;
  key: string;
}

const AuroraBackground = () => {
  const { classes } = useStyles();
  const [auroras, setAuroras] = useState<Aurora[]>([]);
  const [displayHeight, setDisplayHeight] = useDebouncedState<number | null>(
    null,
    300
  );

  useMemo(() => {
    if (displayHeight === null) return;

    const sectionHeights = 1_000;
    const newAurorasCount = parseInt(
      (displayHeight / sectionHeights).toFixed(0)
    );
    const currentCount = auroras.length;

    if (currentCount === newAurorasCount) return;

    if (currentCount > newAurorasCount) {
      setAuroras((curr) => curr.slice(0, newAurorasCount));

      return;
    }

    const newAuroras: Aurora[] = [];
    for (let i = 0 + currentCount; i < newAurorasCount; i++) {
      const size = parseInt((50 + Math.random() * 50).toFixed(2));
      const left = `calc(${(Math.random() * 100).toFixed(2)}vw - ${
        size / 2
      }rem)`;

      newAuroras.push({
        key: (Math.random() * 100000).toFixed(0),
        size: size,
        left,
        top: i * sectionHeights - Math.random() * sectionHeights,
        background:
          'radial-gradient(50% 50% at 50% 50%, #ffc0cb70 0%, #00000000 100%)'
      });
    }
    setAuroras((curr) => [...curr, ...newAuroras]);
  }, [displayHeight, auroras.length]);

  const setHeightFn = useCallback(() => {
    const body = document.body as HTMLBodyElement;

    setDisplayHeight(body.offsetHeight);
  }, [setDisplayHeight]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setHeightFn();

    window.addEventListener('resize', setHeightFn);
    return () => {
      window.removeEventListener('resize', setHeightFn);
    };
  }, [setHeightFn]);

  return (
    <div
      style={displayHeight !== null ? { height: displayHeight } : {}}
      className={classes.wrapper}>
      <AnimatePresence>
        {auroras.map(({ size, key, ...props }) => (
          <motion.div
            animate={{
              opacity: 0.5,
              transition: {
                duration: 1
              }
            }}
            initial={{
              opacity: 0
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 1
              }
            }}
            key={key}
            className={classes.item}
            style={{
              ...props,
              width: size + 'rem',
              height: size + 'rem'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AuroraBackground;
