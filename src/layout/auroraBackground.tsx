import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';

// framer-motion
import { AnimatePresence, motion } from 'framer-motion';

// mantine
import { createStyles, keyframes, useMantineTheme } from '@mantine/styles';

// hooks
import useSsr from '@/hooks/useSsr';

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
    position: 'fixed',
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
  top: string;
  background: string;
  key: string;
}

const AuroraBackground = () => {
  const { colorScheme } = useMantineTheme();
  const { classes } = useStyles();
  const [auroras, setAuroras] = useState<Aurora[]>([]);
  const ssr = useSsr();
  const { pathname } = useRouter();

  useMemo(() => {
    if (ssr) return;

    const newAuroras: Aurora[] = [];
    for (let i = 0; i < 2; i++) {
      const size = parseInt((50 + Math.random() * 50).toFixed(2));
      const left = `calc(${(Math.random() * 100).toFixed(2)}vw - ${
        size / 2
      }rem)`;

      newAuroras.push({
        key: (Math.random() * pathname.length * 1000).toFixed(0),
        size: size,
        left,
        top: i * Math.random() * 50 + 'vh',
        background:
          'radial-gradient(50% 50% at 50% 50%, #ffc0cb 0%, #ffc0cb00 100%)'
      });
    }
    setAuroras([...newAuroras]);
  }, [ssr, pathname]);

  return (
    <div className={classes.wrapper}>
      <AnimatePresence>
        {auroras.map(({ size, key, ...props }) => (
          <motion.div
            animate={{
              opacity: colorScheme === 'dark' ? 0.25 : 0,
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
