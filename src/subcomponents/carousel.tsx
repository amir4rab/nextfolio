import { useState } from 'react';

// types
import type { AnimationProps } from 'framer-motion';

// framer-motion
import { motion, AnimatePresence } from 'framer-motion';

// icons
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

// mantine
import { createStyles } from '@mantine/styles';

// components
import Button from './button';

const itemVariants: AnimationProps['variants'] = {
  display: {
    transform: 'translate(-50%, 0%)',
    opacity: 1
  },
  hiddenLeft: {
    transform: 'translate(50%, 0%)',
    opacity: 0
  },
  hiddenRight: {
    transform: 'translate(-100%, 0%)',
    opacity: 0
  }
};

// styles
const useStyle = createStyles((t) => ({
  carousel: {
    position: 'relative',
    width: '100%',
    height: '40vh'
  },
  imageWrapper: {
    position: 'absolute',
    left: '50%',
    top: '0%',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignContents: 'center',
    alignItems: 'center',
    pointerEvents: 'none'
  },
  image: {
    objectFit: 'contain',
    width: '100%',
    maxHeight: '100%'
  },
  button: {
    zIndex: 5,
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    padding: t.spacing.xs,
    borderRadius: '50%',
    ['&:hover']: {
      transform: 'translate(0, calc(-50% - .05rem))',
      background: t.colors.dark[4]
    },
    ['&:active']: {
      transform: 'translate(0, calc(-50% - .1rem))',
      background: t.colors.dark[5]
    },
    ['&:disabled']: {
      opacity: 0
    }
  },
  rightButton: {
    right: '1rem'
  },
  leftButton: {
    left: '1rem'
  }
}));

interface Props {
  images: string[];
  ratio: string;
}

const Carousel = ({ images, ratio }: Props) => {
  const [activeItem, setActiveItem] = useState(0);
  const { classes, cx } = useStyle();

  return (
    <motion.div
      className={classes.carousel}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}>
      <Button
        disabled={activeItem <= 0}
        onClick={() => setActiveItem((curr) => curr - 1)}
        className={cx(classes.button, classes.leftButton)}>
        <IoChevronBack />
      </Button>
      <Button
        disabled={activeItem >= images.length - 1}
        onClick={() => setActiveItem((curr) => curr + 1)}
        className={cx(classes.button, classes.rightButton)}>
        <IoChevronForward />
      </Button>
      <AnimatePresence>
        <motion.div
          variants={itemVariants}
          animate='display'
          initial='hiddenLeft'
          exit='hiddenRight'
          className={classes.imageWrapper}
          key={images[activeItem]}>
          <img
            className={classes.image}
            src={images[activeItem]}
            loading='lazy'
            alt={`image-${images[activeItem]}`}
            style={{ aspectRatio: ratio }}
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Carousel;
