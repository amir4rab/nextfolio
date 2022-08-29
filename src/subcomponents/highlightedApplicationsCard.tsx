import { useState } from 'react';

// mantine
import { createStyles, keyframes } from '@mantine/styles';

// framer-motion
import { AnimatePresence, motion } from 'framer-motion';

// components
import Button from './button';
import Link from 'next/link';

// data
interface Application {
  website: string;
  name: string;
  icon: string;
  banner: string;
  id: string;
  bg: string;
  description: string;
}
const applications: Application[] = [
  {
    id: 'secure-file',
    banner: '/assets/highlighted/sf-banner.png',
    icon: '/assets/highlighted/sf-icon.png',
    name: 'Secure file',
    website: 'https://secure-file.amir4rab.com',
    description:
      'An experimental website to take WebCrypto API and IndexDB API to their limits!',
    bg: 'linear-gradient(66.59deg, #16B4B410 0%, rgba(22, 180, 180, 0) 100%), linear-gradient(113.97deg, #1C7ED610 0%, rgba(28, 126, 214, 0) 100.83%)'
  },
  {
    id: 'earthquake-monitoring',
    banner: '/assets/highlighted/em-banner.png',
    icon: '/assets/highlighted/em-icon.png',
    name: 'Earthquake monitoring',
    website: 'https://earthquake-monitoring.amir4rab.com',
    description: 'My final project for my bachelor degree.',
    bg: 'linear-gradient(66.59deg, #164CB410 0%, rgba(22, 118, 180, 0) 100%), linear-gradient(113.97deg, #1C7ED610 0%, rgba(28, 126, 214, 0) 100.83%)'
  }
];

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

const InnerCard = ({ application }: { application: Application }) => {
  const { id, name, description, banner, bg } = application;
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
          <p>{description}</p>
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
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ background: bg }}
        key={id + '-banner'}>
        <img
          className={classes.cardBanner}
          src={banner}
          loading='lazy'
          alt={name + ' banner'}
        />
      </motion.div>
    </>
  );
};

const HighlightedApplicationsCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { classes } = useStyles();

  return (
    <div className={classes.highlightedApplicationsCard}>
      <div className={classes.side}>
        <h3 id='showcase'>Some of my highlighted projects</h3>
        <div className={classes.controls}>
          {applications.map(({ icon, id, name }, i) => (
            <button
              onClick={() => setActiveIndex(i)}
              data-active={i === activeIndex ? true : undefined}
              key={id}>
              <img src={icon} alt={name + ' icon'} />
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
