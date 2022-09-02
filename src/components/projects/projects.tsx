import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// types
import type {
  ProjectFrontmatter,
  ShowcaseProjectFrontmatter
} from '@/types/markdownFrontmatter';

// components
const ProjectsDisplay = dynamic(() => import('./projectsDisplay'), {
  suspense: true
});
const ProjectsShowcaseDisplay = dynamic(
  () => import('./projectsShowcaseDisplay'),
  {
    suspense: true
  }
);

export interface ProjectsComponentProps {
  showcaseProjects: ShowcaseProjectFrontmatter[];
  projectsFilters: string[];
  projects: ProjectFrontmatter[];
}

const Projects = ({
  showcaseProjects,
  projects,
  projectsFilters
}: ProjectsComponentProps) => {
  return (
    <article style={{ paddingTop: '5vh' }}>
      <h1>Projects</h1>
      <Suspense fallback={null}>
        <ProjectsShowcaseDisplay projects={showcaseProjects} />
      </Suspense>
      <Suspense fallback={null}>
        <ProjectsDisplay projects={projects} filters={projectsFilters} />
      </Suspense>
    </article>
  );
};

export default Projects;
