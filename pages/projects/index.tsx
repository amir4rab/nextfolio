import Head from 'next/head';

// types
import type { NextPage, GetStaticProps } from 'next';
import type { ProjectsComponentProps } from '@/components/projects';
import type {
  ProjectFrontmatter,
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
  const [showcaseProjectsFiles, projectsFiles] = await Promise.all([
    listMarkdowns({ folder: 'showcase' }),
    listMarkdowns({ folder: 'projects' })
  ]);

  const [showcaseProjects, projects] = await Promise.all([
    readMarkdownListFrontMatter({
      folder: 'showcase',
      arr: showcaseProjectsFiles
    }) as unknown as Promise<ShowcaseProjectFrontmatter[]>,
    readMarkdownListFrontMatter({
      folder: 'projects',
      arr: projectsFiles
    }) as unknown as Promise<ProjectFrontmatter[]>
  ]);

  return {
    props: {
      showcaseProjects,
      projects
    }
  };
};

export default ProjectsPage;
