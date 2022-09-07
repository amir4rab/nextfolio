import { useState } from 'react';

// mantine
import { createStyles, keyframes, useMantineTheme } from '@mantine/styles';

// framer-motion
import { AnimatePresence, motion } from 'framer-motion';

// components
import Button from './button';
import Link from 'next/link';

// types
import type { ShowcaseProjectFrontmatter } from '@/types/markdownFrontmatter';

// keyframes
const animateIn = keyframes({
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
});

// styles
const useStyles = createStyles((t) => ({
  highlightedApplicationsCard: {
    margin: '5vh 0',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignContents: 'stretch',
    alignItems: 'stretch',
    opacity: 0,
    animation: `${animateIn} .3s .1s ease-in forwards`,
    [t.fn.smallerThan('md')]: {
      flexDirection: 'column'
    }
  },
  side: {
    width: '25%',
    [t.fn.smallerThan('md')]: {
      width: '100%'
    }
  },
  controls: {
    marginTop: '3rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    [t.fn.smallerThan('md')]: {
      flexDirection: 'row'
    },
    ['& button']: {
      background: 'transparent',
      border: 'none',
      transition: 'opacity .3s ease-in-out',
      display: 'inline-block',
      opacity: 0.25,
      [t.fn.smallerThan('md')]: {
        flexDirection: 'row',
        ['&:not(last-of-type)']: {
          marginBottom: '0',
          marginRight: '2rem'
        }
      },
      ['&:hover']: {
        opacity: 0.5,
        ['&:not([data-active])']: {
          cursor: 'pointer'
        }
      },
      ['&:not(last-of-type)']: {
        marginBottom: '2rem'
      },
      ['&[data-active]']: {
        opacity: 1
      }
    },
    ['& button img']: {
      width: '5rem',
      height: '5rem',
      aspectRatio: '1/1',
      [t.fn.smallerThan('md')]: {
        width: '4rem',
        height: '4rem'
      }
    }
  },
  card: {
    width: '70%',
    position: 'relative',
    background: t.colorScheme === 'dark' ? t.colors.dark[5] : t.colors.gray[3],
    padding: t.spacing.xl,
    borderRadius: t.radius.lg,
    boxShadow: t.shadows.md,
    overflow: 'hidden',
    [t.fn.smallerThan('md')]: {
      width: '100%',
      height: '70vw'
    }
  },
  cardContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  cardDetails: {
    padding: `${t.spacing.xl * 1.25}px ${t.spacing.xl * 1.75}px`,
    zIndex: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '40%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'column',
    [t.fn.smallerThan('md')]: {
      width: '100%'
    }
  },
  cardTitle: {
    fontSize: t.fontSizes.xl * 1.75,
    fontWeight: 600,
    marginBottom: t.spacing.md,
    [t.fn.smallerThan('md')]: {
      fontSize: t.fontSizes.xl
    }
  },
  cardBanner: {
    position: 'absolute',
    top: '-1rem',
    right: '-40%',
    zIndex: 1,
    width: '100%',
    transform: 'rotate(5deg)',
    opacity: 0.7,
    background: 'black',
    aspectRatio: '2420/2160'
  },
  cardBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  }
}));

const InnerCard = ({
  application
}: {
  application: ShowcaseProjectFrontmatter;
}) => {
  const { colorScheme } = useMantineTheme();
  const { id, name, shortInfo, images, background } = application;
  const { banner } = images;
  const { muted, colorful } = background;

  const { classes } = useStyles();

  return (
    <>
      <motion.div
        className={classes.cardContent}
        initial={{ left: 100, opacity: 0, zIndex: 5 }}
        animate={{ left: [100, 50, 0], opacity: [0, 0, 1], zIndex: 5 }}
        exit={{ left: [0, -50, -100], opacity: [1, 0, 0], zIndex: 5 }}
        key={id}>
        <div className={classes.cardDetails}>
          <p className={classes.cardTitle}>{name}</p>
          <p>{shortInfo}</p>
          <Link href={`/showcase/${id}`} passHref>
            <Button component='a' sx={(t) => ({ fontSize: t.fontSizes.xs })}>
              Read more
            </Button>
          </Link>
        </div>
      </motion.div>
      <motion.div
        className={classes.cardBackground}
        initial={{ opacity: 0 }}
        animate={{ opacity: colorScheme === 'dark' ? 1 : 0.75 }}
        exit={{ opacity: 0 }}
        style={{ background: colorScheme === 'dark' ? muted : colorful }}
        key={id + '-banner'}>
        <img
          className={classes.cardBanner}
          src={banner.url}
          style={{ aspectRatio: banner.aspectRatio }}
          loading='lazy'
          alt={name + ' banner'}
        />
      </motion.div>
    </>
  );
};

interface Props {
  applications: ShowcaseProjectFrontmatter[];
}

const HighlightedApplicationsCard = ({ applications }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { classes } = useStyles();

  return (
    <div className={classes.highlightedApplicationsCard}>
      <div className={classes.side}>
        <h3 id='showcase'>Some of my highlighted projects</h3>
        <div className={classes.controls}>
          {applications.map(({ images, id, name }, i) => (
            <button
              onClick={() => setActiveIndex(i)}
              data-active={i === activeIndex ? true : undefined}
              key={id}>
              <img src={images.icon} alt={name + ' icon'} />
            </button>
          ))}
        </div>
      </div>
      <div className={classes.card}>
        <AnimatePresence initial={true}>
          <InnerCard
            application={applications[activeIndex]}
            key={activeIndex}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HighlightedApplicationsCard;
