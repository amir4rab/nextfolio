import { useState } from 'react';

// mantine
import { createStyles } from '@mantine/styles';

// types
import { ShowcaseProjectFrontmatter } from '@/types/markdownFrontmatter';

// framer
import { AnimatePresence, motion } from 'framer-motion';

// icons
import { IoPhonePortraitOutline, IoLaptopOutline } from 'react-icons/io5';

// components
import Carousel from '@/subcomponents/carousel';

interface Props {
  data: ShowcaseProjectFrontmatter['images'];
  delay?: number;
  title: string;
}

// styles
const useStyles = createStyles((t) => ({
  img: {
    maxHeight: '50vh',
    objectPosition: 'center',
    maxWidth: '100%',
    borderRadius: t.radius.md,
    overflow: 'hidden'
  },
  carousel: {
    maxWidth: '100%',
    overflow: 'hidden',
    margin: '5vh 0',
    height: '60vh'
  },
  title: {
    marginBottom: t.spacing.md
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  controls: {},
  button: {
    background: 'none',
    padding: 0,
    border: 'none',
    color: t.colorScheme === 'dark' ? t.colors.gray[4] : t.colors.dark[7],
    opacity: 0.5,
    fontSize: t.fontSizes.xl,
    transition: 'color .15s ease-in-out, opacity .15s ease-in-out',
    ['&:not(:last-of-type)']: {
      marginRight: t.spacing.xs
    },
    ['&:hover']: {
      cursor: 'pointer',
      opacity: 0.75
    }
  },
  mobileImgWrapper: {
    height: '40vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ['& img']: {
      maxHeight: '80%',
      minHeight: '80%',
      maxWidth: 'none'
    }
  },
  activeButton: {
    opacity: 1,
    color: t.primaryColor,
    ['&:hover']: {
      cursor: 'default',
      opacity: 1
    }
  },
  contentWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
}));

const ShowcaseCarousel = ({ title, data, delay = 0 }: Props) => {
  const [imgType, setImgType] = useState<'desktop' | 'mobile'>('desktop');
  const { classes, cx } = useStyles();

  return (
    <motion.section
      animate={{ opacity: 1, transition: { delay } }}
      initial={{ opacity: 0 }}
      className={classes.carousel}>
      <header className={classes.header}>
        <h3 className={classes.title}>{title}</h3>
        <div className={classes.controls}>
          <button
            onClick={() => setImgType('mobile')}
            className={cx(
              classes.button,
              imgType === 'mobile' && classes.activeButton
            )}>
            <IoPhonePortraitOutline />
          </button>
          <button
            onClick={() => setImgType('desktop')}
            className={cx(
              classes.button,
              imgType === 'desktop' && classes.activeButton
            )}>
            <IoLaptopOutline />
          </button>
        </div>
      </header>
      <div className={classes.contentWrapper}>
        <AnimatePresence mode='wait' initial>
          {imgType === 'desktop' ? (
            <Carousel images={data.desktop} ratio={data.ratios.desktop} />
          ) : (
            <Carousel images={data.mobile} ratio={data.ratios.mobile} />
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};
export default ShowcaseCarousel;
