import Head from 'next/head';

// types
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next/types';

// utils
// import listMarkdowns from '@/utils/backend/listMarkdowns';
import readMarkdown from '@/utils/backend/readMarkdown';

// components
import Project, { ProjectProps } from '@/components/project';
import { ProjectFrontmatter } from '@/types/markdownFrontmatter';

const ProjectPage: NextPage<ProjectProps> = (props: ProjectProps) => {
  return (
    <>
      <Head>
        <title>{props.frontmatterData.name}</title>
        <meta
          name='description'
          content={`Showcase of ${props.frontmatterData.name}`}
        />
      </Head>
      <Project {...props} />
    </>
  );
};

export const getStaticProps: GetStaticProps<ProjectProps> = async (context) => {
  if (
    typeof context.params === 'undefined' ||
    typeof context.params.slug !== 'string'
  )
    return {
      notFound: true
    };

  const mdxContent = await readMarkdown({
    filename: context.params.slug,
    folder: 'projects'
  });

  return {
    props: {
      frontmatterData: mdxContent.frontmatter as unknown as ProjectFrontmatter,
      mdxContent
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const files = await listMarkdowns({ folder: 'projects' });

  return {
    paths: [],
    fallback: false
  };
};

export default ProjectPage;
