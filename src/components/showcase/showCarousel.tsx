import { useState } from 'react';

// mantine
import { Carousel as MantineCarousel } from '@mantine/carousel';
import { createStyles } from '@mantine/styles';

// types
import { ShowcaseProjectFrontmatter } from '@/types/markdownFrontmatter';

// framer
import { AnimatePresence, motion } from 'framer-motion';

// icons
import { IoPhonePortraitOutline, IoLaptopOutline } from 'react-icons/io5';

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

const useCarouselStyles = createStyles((t, _params, getRef) => ({
  controls: {
    ref: getRef('controls'),
    transition: 'opacity 150ms ease',
    opacity: 0
  },

  root: {
    '&:hover': {
      [`& .${getRef('controls')}`]: {
        opacity: 1
      }
    }
  },

  control: {
    ref: getRef('controls'),
    background: t.colorScheme === 'dark' ? t.colors.dark[5] : t.colors.gray[4],
    color: t.colorScheme === 'dark' ? t.colors.gray[4] : t.colors.dark[5],
    transition: 'background .15s ease-in-out, color .15s ease-in-out',
    border: 'none',
    ['&:hover']: {
      background: t.primaryColor,
      color: t.colors.dark[5]
    }
  },

  indicator: {
    ref: getRef('indicators'),
    background: t.primaryColor,
    boxShadow: t.shadows.md
  }
}));

const ShowcaseCarousel = ({ title, data, delay = 0 }: Props) => {
  const [imgType, setImgType] = useState<'desktop' | 'mobile'>('desktop');
  const { classes, cx } = useStyles();
  const { classes: cClasses } = useCarouselStyles();

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
            <motion.div
              key='mobile'
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}>
              <MantineCarousel
                classNames={cClasses}
                slideGap='md'
                controlsOffset='xs'
                loop
                withIndicators
                sx={{ width: '100%' }}
                mx='auto'>
                {data['desktop'].map((i) => (
                  <MantineCarousel.Slide
                    sx={{ display: 'flex', justifyContent: 'center' }}
                    key={i}>
                    <img
                      className={classes.img}
                      src={i}
                      alt=''
                      loading='lazy'
                      style={{ aspectRatio: data.ratios['desktop'] }}
                    />
                  </MantineCarousel.Slide>
                ))}
              </MantineCarousel>
            </motion.div>
          ) : (
            <motion.div
              key='desktop'
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}>
              <MantineCarousel
                classNames={cClasses}
                slideGap='md'
                controlsOffset='xs'
                loop
                withIndicators
                sx={{ width: '100%' }}
                mx='auto'>
                {data['mobile'].map((i) => (
                  <MantineCarousel.Slide
                    sx={{ display: 'flex', justifyContent: 'center' }}
                    key={i}>
                    <img
                      className={classes.img}
                      src={i}
                      alt=''
                      loading='lazy'
                      style={{ aspectRatio: data.ratios['mobile'] }}
                    />
                  </MantineCarousel.Slide>
                ))}
              </MantineCarousel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};
export default ShowcaseCarousel;
