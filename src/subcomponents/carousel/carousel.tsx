import { useState } from 'react';

// types
import type { AnimationProps } from 'framer-motion';

// framer-motion
import { motion, AnimatePresence } from 'framer-motion';

// icons
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

// styles
import classes from './carousel.module.scss';

// components
import Button from '../button';

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

interface Props {
  images: string[];
  ratio: string;
}

const Carousel = ({ images, ratio }: Props) => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <motion.div
      className={classes.carousel}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}>
      <Button
        disabled={activeItem <= 0}
        onClick={() => setActiveItem((curr) => curr - 1)}
        className={[classes.button, classes.leftButton].join(' ')}>
        <IoChevronBack />
      </Button>
      <Button
        disabled={activeItem >= images.length - 1}
        onClick={() => setActiveItem((curr) => curr + 1)}
        className={[classes.button, classes.rightButton].join(' ')}>
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
