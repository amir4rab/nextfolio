// types
import type { ShowcaseProjectFrontmatter } from '@/types/markdownFrontmatter';

// mantine
import { createStyles, useMantineTheme } from '@mantine/styles';

// framer-motion
import { motion } from 'framer-motion';

const useStyles = createStyles((t) => ({
  title: {
    marginBottom: t.spacing.md
  },
  showcaseScores: {
    margin: '5vh 0'
  },
  mainScores: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    [t.fn.smallerThan('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    [t.fn.largerThan('md')]: {
      gridTemplateColumns: 'repeat(5, 1fr)'
    }
  },
  score: {
    position: 'relative',
    width: '100px',
    height: '100px'
  },
  scoreText: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    fontWeight: 600,
    color: t.primaryColor
  },
  scoreBackground: {
    position: 'absolute',
    left: 0,
    top: 0
  },
  scoreWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scoreLabel: {
    fontSize: t.fontSizes.sm
  }
}));

interface ShowcaseScoresProps {
  frontmatter: ShowcaseProjectFrontmatter;
}

const ScoreItem = ({
  score,
  count = 0,
  label
}: {
  label: string;
  score: number;
  count?: number;
}) => {
  const { primaryColor, colors } = useMantineTheme();
  const { classes } = useStyles();
  const delayAmount = count * 0.25;

  return (
    <div className={classes.scoreWrapper}>
      <div className={classes.score}>
        <motion.p
          animate={{ opacity: 1, transition: { delay: delayAmount } }}
          initial={{ opacity: 0 }}
          className={classes.scoreText}>
          {score}
        </motion.p>
        <motion.svg
          className={classes.scoreBackground}
          width='100'
          height='100'
          viewBox='0 0 200 200'
          initial='hidden'
          animate='visible'>
          <motion.circle
            cx='100'
            cy='100'
            r='60'
            stroke={primaryColor}
            strokeWidth='.5rem'
            custom={1}
            variants={{
              hidden: {
                pathLength: 0,
                opacity: 0,
                fill: colors[primaryColor][3] + '00'
              },
              visible: () => {
                return {
                  pathLength: score / 100,
                  fill: colors[primaryColor][3] + '10',
                  width: 5,
                  opacity: 1,
                  transition: {
                    pathLength: {
                      delay: delayAmount,
                      type: 'spring',
                      duration: 0.5,
                      bounce: 0
                    },
                    opacity: { delay: delayAmount, duration: 0.01 }
                  }
                };
              }
            }}></motion.circle>
        </motion.svg>
      </div>
      <motion.p
        animate={{ opacity: 1, transition: { delay: delayAmount } }}
        initial={{ opacity: 0 }}
        className={classes.scoreLabel}>
        {label}
      </motion.p>
    </div>
  );
};

const ShowcaseScores = ({ frontmatter }: ShowcaseScoresProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.showcaseScores}>
      <h2 className={classes.title}>Lighthouse Scores</h2>
      <div className={classes.mainScores}>
        <ScoreItem label='SEO' score={frontmatter.scores.SEO} />
        <ScoreItem
          count={1}
          label='Accessibility'
          score={frontmatter.scores.accessibility}
        />
        <ScoreItem
          count={2}
          label='Best practices'
          score={frontmatter.scores.bestPractices}
        />
        <ScoreItem
          count={3}
          label='Desktop Performance Score'
          score={frontmatter.scores.performance.desktop.score}
        />
        <ScoreItem
          count={4}
          label='Mobile Performance Score'
          score={frontmatter.scores.performance.mobile.score}
        />
      </div>
    </div>
  );
};

export default ShowcaseScores;
