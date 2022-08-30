// types
import type { ShowcaseProjectFrontmatter } from '@/types/markdownFrontmatter';

// mantine
import { createStyles } from '@mantine/styles';

// framer-motion
import { motion } from 'framer-motion';

const useStyles = createStyles((t) => ({
  row: {
    margin: '3vh 0'
  },
  title: {
    marginBottom: t.spacing.sm
  },
  performanceItem: {
    fontSize: t.fontSizes.sm
  },
  itemsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    [t.fn.smallerThan('sm')]: {
      gridTemplateColumns: 'repeat(1, 1fr)'
    },
    [t.fn.largerThan('md')]: {
      gridTemplateColumns: 'repeat(4, 1fr)'
    }
  }
}));

const SecondaryScoreItem = ({
  score,
  label
}: {
  label: string;
  score: string | number;
}) => {
  const { classes } = useStyles();

  return (
    <motion.div
      className={classes.performanceItem}
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1 }
      }}>
      <p>
        <span>{label + ': '}</span>
        <span>{score}</span>
      </p>
    </motion.div>
  );
};

const ScoreRow = ({
  initialDelay,
  scores,
  title
}: {
  title: string;
  initialDelay: number;
  scores: ShowcaseProjectFrontmatter['scores']['performance'][
    | 'desktop'
    | 'mobile'];
}) => {
  const { classes } = useStyles();

  return (
    <div className={classes.row}>
      <motion.h3
        className={classes.title}
        animate={{ opacity: 1, transition: { delay: initialDelay } }}
        initial={{ opacity: 0 }}>
        {title}
      </motion.h3>
      <motion.div
        className={classes.itemsGrid}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.5,
              delayChildren: initialDelay
            }
          }
        }}
        initial='hidden'
        animate='show'>
        <SecondaryScoreItem
          label='Cumulative Layout Shift'
          score={scores.cls}
        />
        <SecondaryScoreItem
          label='First Contentful Paint'
          score={scores.fcp + ' s'}
        />
        <SecondaryScoreItem
          label='Largest Contentful Paint'
          score={scores.lgp + ' s'}
        />
        <SecondaryScoreItem label='Speed Index' score={scores.si + ' s'} />
        <SecondaryScoreItem
          label='Total Blocking Time'
          score={scores.tbt + ' ms'}
        />
        <SecondaryScoreItem
          label='Time to Interactive'
          score={scores.tti + ' s'}
        />
      </motion.div>
    </div>
  );
};

interface ShowcaseScoresProps {
  frontmatter: ShowcaseProjectFrontmatter;
  delay: number;
}

const ShowcaseSecondaryScore = ({
  frontmatter,
  delay
}: ShowcaseScoresProps) => {
  return (
    <div>
      <ScoreRow
        initialDelay={delay}
        scores={frontmatter.scores.performance.mobile}
        title='Mobile Performance Statics'
      />
      <ScoreRow
        initialDelay={delay}
        scores={frontmatter.scores.performance.desktop}
        title='Desktop Performance Statics'
      />
    </div>
  );
};

export default ShowcaseSecondaryScore;
