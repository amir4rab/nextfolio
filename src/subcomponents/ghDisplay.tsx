// types
import { GetGhResult } from '@/utils/backend/getGh';

// mantine
import { createStyles, keyframes } from '@mantine/styles';

// icons
import { IoPeople, IoStar, IoOpen } from 'react-icons/io5';

// utils
import getLangColor from '@/utils/frontend/getLangColor';

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
    marginTop: t.spacing.md,
    fontSize: t.fontSizes.sm,
    alignItems: 'center',
    alignContent: 'center',
    color: t.colorScheme === 'dark' ? t.colors.gray[2] : t.black,
    [t.fn.largerThan('md')]: {
      flexDirection: 'row',
      marginTop: 0
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
        ? t.colors.dark[4] + '50'
        : t.colors.gray[3] + '50',
    backdropFilter: 'blur(.5rem)',
    boxShadow: t.shadows.md
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

interface Props {
  ghData: GetGhResult;
}

const GhDisplay = ({ ghData }: Props) => {
  const { classes } = useStyles();

  return (
    <section className={classes.ghDisplay}>
      <header className={classes.header}>
        <h4>My Github stats</h4>
        <div className={classes.socialStats}>
          <IoPeople />
          <p>
            <span>{`Followers: `}</span>
            <a
              href='https://github.com/amir4rab?tab=followers'
              target='_blank'
              rel='noreferrer'>
              {ghData.profile?.followers}
            </a>
            <span>{`, Followings: `}</span>
            <a
              href='https://github.com/amir4rab?tab=following'
              target='_blank'
              rel='noreferrer'>
              {ghData.profile?.following}
            </a>
          </p>
        </div>
      </header>
      <div className={classes.cardWrapper}>
        {ghData.repos
          .slice(0, 4)
          .map(
            ({
              id,
              name,
              description,
              stargazers_count,
              language,
              html_url
            }) => (
              <article className={classes.card} key={id}>
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
              </article>
            )
          )}
      </div>
    </section>
  );
};

export default GhDisplay;
