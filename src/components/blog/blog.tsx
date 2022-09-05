import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// types
import type { BlogFrontmatter } from '@/types/markdownFrontmatter';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

// components
const MarkdownWrapper = dynamic(
  () => import('@/subcomponents/markdownWrapper'),
  { suspense: true }
);
const BlogFooter = dynamic(() => import('./blogFooter'), { suspense: true });

// mantine
import { createStyles } from '@mantine/styles';

// useStyles
const useStyles = createStyles((t) => ({
  wrapper: {
    padding: '5vh 0'
  },
  title: {
    marginBottom: t.spacing.xl
  },
  thumbnail: {
    width: '100%',
    margin: `${t.spacing.md}px 0`,
    borderRadius: t.radius.md
  }
}));

export interface BlogProps {
  frontmatter: BlogFrontmatter;
  mdxContent: MDXRemoteSerializeResult;
}

const Blog = ({ frontmatter, mdxContent }: BlogProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.thumbnail}>
      <h1 className={classes.thumbnail}>{frontmatter.title}</h1>
      {frontmatter.thumbnail && (
        <img
          className={classes.thumbnail}
          loading='lazy'
          src={frontmatter.thumbnail.url}
          alt='thumbnail'
          style={{ aspectRatio: frontmatter.thumbnail.ratio }}
        />
      )}
      <Suspense fallback={null}>
        <MarkdownWrapper animate={{ delay: 0 }} mdxContent={mdxContent} />
      </Suspense>
      <Suspense fallback={null}>
        <BlogFooter
          text={frontmatter.shortInfo}
          slug={frontmatter.title.replace(/ /g, '-').toLowerCase()}
        />
      </Suspense>
    </div>
  );
};

export default Blog;
