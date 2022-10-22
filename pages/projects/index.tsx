import Head from 'next/head';

// types
import type { NextPage, GetStaticProps } from 'next';
import type { ProjectsComponentProps } from '@/components/projects';
import type {
  ShowcaseProjectFrontmatter
} from '@/types/markdownFrontmatter';

// components
import Projects from '@/components/projects';

// utils
import listMarkdowns, {
  readMarkdownListFrontMatter
} from '@/utils/backend/listMarkdowns';

const ProjectsPage: NextPage<ProjectsComponentProps> = (
  props: ProjectsComponentProps
) => {
  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <Projects {...props} />
    </>
  );
};

export const getStaticProps: GetStaticProps<
  ProjectsComponentProps
> = async () => {
  const [showcaseProjectsFiles] = await Promise.all([
    listMarkdowns({ folder: 'showcase' })
  ]);

  const [showcaseProjects] = await Promise.all([
    readMarkdownListFrontMatter({
      folder: 'showcase',
      arr: showcaseProjectsFiles
    }) as unknown as Promise<ShowcaseProjectFrontmatter[]>
  ]);

  const projectsFilters: { [v: string]: null } = {};

  return {
    props: {
      showcaseProjects,
      projects: [],
      projectsFilters: Object.keys(projectsFilters)
    }
  };
};

export default ProjectsPage;
