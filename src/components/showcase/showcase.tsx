import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// types
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { ShowcaseProjectFrontmatter } from '@/types/markdownFrontmatter';

// mantine
import { createStyles } from '@mantine/styles';

// icons
import { SiGithub } from 'react-icons/si';
import { IoGlobe } from 'react-icons/io5';

// lazy loaded components
const ShowcaseScores = dynamic(() => import('./showcaseScores'), {
  suspense: true
});
const ShowcaseSecondaryScore = dynamic(
  () => import('./showcaseSecondaryScore'),
  { suspense: true }
);
const MarkdownWrapper = dynamic(
  () => import('@/subcomponents/markdownWrapper'),
  { suspense: true }
);
const ShowcaseCarousel = dynamic(() => import('./showcaseCarousel'), {
  suspense: true
});
const ShowcaseTechnologies = dynamic(
  () => import('@/subcomponents/technologiesRow'),
  {
    suspense: true
  }
);

// styles
const useStyles = createStyles((t) => ({
  article: {
    minHeight: '120vh'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center'
  },
  link: {
    fontSize: t.fontSizes.xl * 1.25,
    color: t.colorScheme === 'dark' ? t.colors.gray[4] : t.colors.dark[7],
    opacity: 0.5,
    transition: 'color .15s ease-in-out, opacity .15s ease-in-out',
    ['&:not(:last-of-type)']: {
      marginRight: t.spacing.xs
    },
    ['&:hover']: {
      opacity: 0.75,
      color: t.colors[t.primaryColor][2]
    },
    ['&:active']: {
      opacity: 1,
      color: t.colors[t.primaryColor][3]
    }
  }
}));

export interface ShowcaseProps {
  mdxContent: MDXRemoteSerializeResult;
  frontmatterData: ShowcaseProjectFrontmatter;
}

const Showcase = ({ mdxContent, frontmatterData }: ShowcaseProps) => {
  const { classes } = useStyles();
  const { name, scores, github, website } = frontmatterData;

  return (
    <article className={classes.article}>
      <header className={classes.header}>
        <h1>{name}</h1>
        <div>
          <a
            className={classes.link}
            href={github}
            target='_blank'
            rel='noreferrer'>
            <SiGithub />
          </a>
          <a
            className={classes.link}
            href={website}
            target='_blank'
            rel='noreferrer'>
            <IoGlobe />
          </a>
        </div>
      </header>
      <Suspense fallback={null}>
        <ShowcaseScores frontmatter={frontmatterData} />
      </Suspense>
      <Suspense fallback={null}>
        <ShowcaseTechnologies
          delay={Object.keys(scores).length * 0.3}
          technologies={frontmatterData.mainTechnologies}
        />
      </Suspense>
      <Suspense fallback={null}>
        <ShowcaseSecondaryScore
          delay={Object.keys(scores).length * 0.3}
          frontmatter={frontmatterData}
        />
      </Suspense>
      <Suspense fallback={null}>
        <ShowcaseCarousel
          data={frontmatterData.images}
          title='Screen shots'
          delay={Object.keys(scores).length * 0.3}
        />
      </Suspense>
      <Suspense fallback={null}>
        <MarkdownWrapper
          animate={{ delay: Object.keys(scores).length * 0.3 }}
          mdxContent={mdxContent}
        />
      </Suspense>
    </article>
  );
};

export default Showcase;
