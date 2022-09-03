import { ReactNode, useState } from 'react';

// types
import { GhStats } from '@/utils/backend/getGhStats';

// mantine
import { createStyles, keyframes } from '@mantine/styles';

// icons
import { IoPeople, IoStar, IoOpen } from 'react-icons/io5';
import { GoRepo, GoGitCommit } from 'react-icons/go';

// utils
import getLangColor from '@/utils/frontend/getLangColor';

// components
import Button from './button';

// framer-motion
import { AnimatePresence, motion } from 'framer-motion';

const MotionArticle = ({
  children,
  ...props
}: {
  className: string;
  key: string | number;
  children: ReactNode;
}) => (
  <motion.article
    {...props}
    animate={{ opacity: 1 }}
    initial={{ opacity: 0 }}
    exit={{ opacity: 0 }}>
    {children}
  </motion.article>
);

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
  ghDisplay: {
    margin: '10vh 0',
    animation: `${animateIn} .5s ease-in-out forwards`
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    [t.fn.largerThan('md')]: {
      flexDirection: 'row'
    }
  },
  socialStats: {
    display: 'flex',
    justifyContent: 'flex-end',
    [t.fn.smallerThan('md')]: {
      flexDirection: 'column'
    }
  },
  socialStatsItem: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: t.spacing.md,
    fontSize: t.fontSizes.sm,
    alignItems: 'center',
    alignContent: 'center',
    color: t.colorScheme === 'dark' ? t.colors.gray[2] : t.black,
    [t.fn.largerThan('md')]: {
      flexDirection: 'row',
      marginTop: 0,
      ['&:not(:last-of-type)']: {
        marginRight: t.spacing.xl
      }
    },
    ['& svg']: {
      fontSize: t.fontSizes.xl
    },
    ['& p:first-of-type']: {
      marginLeft: '.5rem'
    },
    ['& span']: {
      opacity: 0.5
    },
    ['& a']: {
      color: t.colorScheme === 'dark' ? t.colors.gray[2] : t.black,
      textDecoration: 'none'
    }
  },
  cardWrapper: {
    marginTop: '2.5vh',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    [t.fn.smallerThan('sm')]: {
      gridTemplateColumns: 'repeat(1, 1fr)'
    },
    [t.fn.largerThan('md')]: {
      gridTemplateColumns: 'repeat(3, 1fr)'
    }
  },
  card: {
    padding: t.spacing.xl * 1.25,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: t.radius.lg,
    background:
      t.colorScheme === 'dark'
        ? t.colors.dark[5] + 'a0'
        : t.colors.gray[3] + 'a0',
    boxShadow: t.shadows.md,
    [t.fn.largerThan('md')]: {
      opacity: 0.75,
      transition: 'transform .15s ease-in-out, opacity .15s ease-in-out',
      ['&:hover']: {
        transform: 'translate(0, -.1rem)',
        opacity: 1
      }
    }
  },
  cardTitle: {
    marginBottom: t.spacing.xl,
    fontSize: t.fontSizes.lg,
    fontWeight: 600
  },
  cardDescription: {
    fontSize: t.fontSizes.sm,
    marginBottom: t.spacing.md
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'flex-end',
    flexGrow: 1,
    lineHeight: '100%'
  },
  langColorWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: t.spacing.md,
    ['& p']: {
      fontSize: t.fontSizes.sm,
      marginLeft: t.spacing.xs * 0.5
    }
  },
  langColor: {
    display: 'flex',
    borderRadius: '50%',
    width: '.75rem',
    height: '.75rem'
  },
  starsWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
    marginRight: t.spacing.md,
    ['& svg']: {
      color: t.primaryColor
    },
    ['& p']: {
      fontSize: t.fontSizes.sm,
      marginRight: t.spacing.xs * 0.5
    }
  },
  openRepo: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
    color: t.colors.gray[4]
  }
}));

const formatNumbers = (num: number) => {
  const intl = new Intl.NumberFormat('de-DE');
  return intl.format(num);
};

interface Props {
  ghData: GhStats;
}

const GhDisplay = ({ ghData }: Props) => {
  const { classes } = useStyles();
  const { followers, following, rawData, total, totalRepos } = ghData;
  const [itemCount, setItemCount] = useState(4);

  return (
    <section className={classes.ghDisplay}>
      <header className={classes.header}>
        <h4>My Github stats</h4>
        <div className={classes.socialStats}>
          <div className={classes.socialStatsItem}>
            <GoGitCommit />
            <p>
              <span>{`Commits: `}</span>
              <a>{formatNumbers(total)}</a>
            </p>
          </div>
          <div className={classes.socialStatsItem}>
            <GoRepo />
            <p>
              <span>{`Repos: `}</span>
              <a>{formatNumbers(totalRepos)}</a>
            </p>
          </div>
          <div className={classes.socialStatsItem}>
            <IoPeople />
            <p>
              <span>{`Followers: `}</span>
              <a
                href='https://github.com/amir4rab?tab=followers'
                target='_blank'
                rel='noreferrer'>
                {formatNumbers(followers)}
              </a>
              <span>{`, Followings: `}</span>
              <a
                href='https://github.com/amir4rab?tab=following'
                target='_blank'
                rel='noreferrer'>
                {formatNumbers(following)}
              </a>
            </p>
          </div>
        </div>
      </header>
      <div className={classes.cardWrapper}>
        <AnimatePresence>
          {(() => (
            <>
              {rawData.repos
                .slice(0, itemCount)
                .map(
                  ({
                    id,
                    name,
                    description,
                    stargazers_count,
                    language,
                    html_url
                  }) => (
                    <MotionArticle className={classes.card} key={id}>
                      <h5 className={classes.cardTitle}>{name}</h5>
                      <p className={classes.cardDescription}>{description}</p>
                      <footer className={classes.cardFooter}>
                        {language && (
                          <div className={classes.langColorWrapper}>
                            <div
                              className={classes.langColor}
                              style={{ background: getLangColor(language) }}
                            />
                            <p>{language}</p>
                          </div>
                        )}
                        <div className={classes.starsWrapper}>
                          <p>{stargazers_count}</p>
                          <IoStar />
                        </div>
                        <a
                          target='_blank'
                          rel='noreferrer'
                          className={classes.openRepo}
                          href={html_url}>
                          <IoOpen />
                        </a>
                      </footer>
                    </MotionArticle>
                  )
                  )}
                  {rawData.repos.length > itemCount && (
                  <MotionArticle className={classes.card} key={`ghDisplay-show-more-${itemCount}`}>
                    <h5 className={classes.cardTitle}>Show more</h5>
                    <p className={classes.cardDescription}>want to see more?</p>
                    <footer
                      className={classes.cardFooter}
                      style={{ justifyContent: 'flex-end' }}>
                      <Button
                        onClick={() => setItemCount((curr) => curr + 4)}
                        sx={(t) => ({ fontSize: t.fontSizes.xs })}>
                        Click here
                      </Button>
                    </footer>
                  </MotionArticle>
                )}
            </>
          ))()}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GhDisplay;
