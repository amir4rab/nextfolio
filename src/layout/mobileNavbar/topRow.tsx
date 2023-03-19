import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

// framer motion
import { AnimatePresence, motion } from 'framer-motion';

// styles
import classes from './mobileNavbar.module.scss';

interface Props {
  items: {
    id: string;
    content: ReactNode;
  }[];
  activeItem: string | null;
}

const TopRow = ({ items, activeItem }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const updateHeight = useCallback((activeItem: string | null) => {
    if (ref.current === null || activeItem === null) {
      setHeight(0);
      return;
    }

    const { height } = ref.current.getBoundingClientRect();
    setHeight(height);
  }, []);

  useEffect(() => {
    updateHeight(activeItem);
  }, [activeItem, updateHeight]);

  return (
    <div
      className={classes.topRow}
      style={{
        height:
          activeItem !== null
            ? `calc(2rem + ${height}px + var(--spacing-md))`
            : 0
      }}>
      <motion.p className={classes.title}>{activeItem}</motion.p>
      <AnimatePresence mode='wait'>
        {items.map(({ content, id }) =>
          id === activeItem ? (
            <motion.div
              onAnimationComplete={() => updateHeight(activeItem)}
              className={classes.topRowInner}
              initial={{
                opacity: 0
              }}
              exit={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                duration: 0.1
              }}
              key={id}>
              <motion.div ref={id === activeItem ? ref : undefined}>
                {content}
              </motion.div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopRow;
