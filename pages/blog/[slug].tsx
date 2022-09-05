import Head from 'next/head';

// types
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next/types';
import type { BlogFrontmatter } from '@/types/markdownFrontmatter';
import type { BlogProps } from '@/components/blog';

// utils
import listMarkdowns from '@/utils/backend/listMarkdowns';
import readMarkdown from '@/utils/backend/readMarkdown';

// components
import Blog from '@/components/blog';

const ProjectPage: NextPage<BlogProps> = (props: BlogProps) => {
  return (
    <>
      <Head>
        <title>{`${props.frontmatter.title} - Amir4rab`}</title>
        <meta
          name='description'
          content={`Showcase of ${props.frontmatter.title}`}
        />
      </Head>
      <Blog {...props} />
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogProps> = async (context) => {
  if (
    typeof context.params === 'undefined' ||
    typeof context.params.slug !== 'string'
  )
    return {
      notFound: true
    };

  const mdxContent = await readMarkdown({
    filename: context.params.slug,
    folder: 'blogs'
  });

  return {
    props: {
      frontmatter: mdxContent.frontmatter as unknown as BlogFrontmatter,
      mdxContent
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = await listMarkdowns({ folder: 'blogs' });

  return {
    paths: files.map((i) => ({
      params: {
        slug: i
      }
    })),
    fallback: false
  };
};

export default ProjectPage;
