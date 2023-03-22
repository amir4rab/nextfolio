import { Children, ReactNode, useContext, useState, useEffect } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

// context
import { NavbarContext } from './context';

// styles
import classes from './desktopNavbar.module.scss';

// framer motion variants
const variants = {
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.1
    }
  }),
  hidden: { opacity: 0, x: -1 }
};

interface Pos {
  left: number;
  right: number;
  width: number;
  anchorTo: 'left' | 'right';
}

const calcXPos = (pos: Pos, state: 'animate' | 'initial' | 'exit') => {
  const scale = state === 'animate' ? 1 : 0.95;

  const xTransform = `calc(${
    pos.anchorTo === 'left' ? pos.left : pos.right
  }px ${pos.anchorTo === 'left' ? '-' : `- 100% +`} var(--spacing-lg))`;

  const yTransform = 'calc(100% - .1rem - var(--spacing-xs))';

  return `translate(${xTransform},${yTransform}) scale(${scale})`;
};

const ItemHoverExtension = ({
  children,
  visible
}: {
  children: ReactNode;
  visible: boolean;
}) => {
  const [hovering, setHovering] = useState(false);
  const [displayed, setDisplayed] = useState(false);
  const [localPos, setLocalPos] = useState<Pos>({
    left: 0,
    right: 0,
    width: 0,
    anchorTo: 'left'
  });

  const { hoveredElStats } = useContext(NavbarContext);

  useEffect(() => {
    let blurringTimeOut: NodeJS.Timeout | undefined = undefined;

    // Setting highlighted el position only when the anchor is hovered
    if (visible) {
      const windowWidth = window.innerWidth;

      setLocalPos({
        ...hoveredElStats,
        anchorTo: hoveredElStats.left > windowWidth / 2 ? 'right' : 'left'
      });
    }

    // Delaying element removal by 300ms
    if (hovering || visible) {
      setDisplayed(true);
      typeof blurringTimeOut !== 'undefined' && clearTimeout(blurringTimeOut);
    } else {
      blurringTimeOut = setTimeout(() => {
        setDisplayed(false);
      }, 300);
    }

    return () => {
      clearTimeout(blurringTimeOut);
    };
  }, [hovering, visible, hoveredElStats]);

  return (
    <AnimatePresence>
      {displayed && (
        <motion.div
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            padding: 'calc(var(--spacing-xs) * 2 + .1rem) var(--spacing-lg)',
            transformOrigin: 'top left'
          }}
          key='item'
          animate={{
            opacity: 1,
            transform: calcXPos(localPos, 'animate'),
            pointerEvents: 'all',
            transition: {
              when: 'beforeChildren',
              duration: 0.1
            }
          }}
          exit={{
            opacity: 0,
            transform: calcXPos(localPos, 'exit'),
            pointerEvents: 'none',
            transition: { when: 'afterChildren', duration: 0.1 }
          }}
          initial={{
            opacity: 0,
            transform: calcXPos(localPos, 'initial')
          }}>
          <div className={classes.itemHoverExtension}>
            {Children.map(children, (el, i) => (
              <motion.div
                key={i}
                variants={variants}
                custom={i}
                initial='hidden'
                animate='visible'
                exit='hidden'>
                {el}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ItemHoverExtension;
