import type { BlogFrontmatter } from '@/types/markdownFrontmatter';

// mantine
import { createStyles, keyframes } from '@mantine/styles';

// components
import Button from '@/subcomponents/button';

// next
import Link from 'next/link';

// keyframes
const cardAnimation = keyframes({
  from: {
    opacity: 0,
    transform: 'translate(0, -0.25rem)'
  },
  to: {
    opacity: 1,
    transform: 'translate(0, 0)'
  }
});

// styles
const useStyles = createStyles((t) => ({
  title: {
    marginBottom: t.spacing.xl
  },
  blogsWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '1rem',
    [t.fn.smallerThan('md')]: {
      display: 'flex',
      flexDirection: 'column'
    }
  },
  blogCard: {
    opacity: 0,
    animation: `${cardAnimation} .3s ease-in forwards`,
    padding: t.spacing.xl,
    background:
      t.colorScheme === 'dark'
        ? t.colors.dark[5] + 'a0'
        : t.colors.gray[3] + 'a0',
    boxShadow: t.shadows.md,
    borderRadius: t.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'stretch',
    ['&[data-with-img]']: {
      gridRow: 'span 2'
    }
  },
  blogCardTitle: {
    fontSize: t.fontSizes.lg,
    fontWeight: 600,
    marginBottom: t.spacing.md
  },
  blogCardTitleInfo: {
    fontSize: t.spacing.sm
  },
  blogCardActions: {
    marginTop: t.spacing.md,
    display: 'flex',
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  blogCardImage: {
    width: '100%',
    maxHeight: '60%',
    objectFit: 'cover',
    marginBottom: t.spacing.xl,
    borderRadius: t.radius.md
  },
  date: {
    fontSize: t.fontSizes.sm
  }
}));

// utils
const getDate = (v: number) => {
  const d = new Date(v);
  return d.toLocaleDateString('de-DE');
};

interface Props {
  blogs: BlogFrontmatter[];
}

const Blogs = ({ blogs }: Props) => {
  const { classes } = useStyles();

  return (
    <div style={{ padding: '5vh 0' }}>
      <h1 className={classes.title}>Blog</h1>
      <div className={classes.blogsWrapper}>
        {blogs.map(({ title, shortInfo, thumbnail, date }, i) => {
          const slug = title.replace(/ /g, '-').toLowerCase();
          return (
            <div
              style={{ animationDelay: `${i * 0.15}s` }}
              className={classes.blogCard}
              data-with-img={thumbnail !== null ? true : undefined}
              key={slug}>
              {thumbnail && (
                <img
                  className={classes.blogCardImage}
                  src={thumbnail.url}
                  loading='lazy'
                  alt={title + ' thumbnail'}
                  style={{ aspectRatio: thumbnail.ratio }}
                />
              )}
              <p className={classes.blogCardTitle}>{title}</p>
              <p className={classes.blogCardTitleInfo}>{shortInfo}</p>
              <div className={classes.blogCardActions}>
                <p className={classes.date}>{getDate(date)}</p>
                <Link passHref href={`/blog/${slug}`}>
                  <Button component='a'>Read</Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
