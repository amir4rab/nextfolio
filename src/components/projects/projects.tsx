import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// types
import type {
  ProjectFrontmatter,
  ShowcaseProjectFrontmatter
} from '@/types/markdownFrontmatter';

// components
const ProjectsShowcaseDisplay = dynamic(
  () => import('./projectsShowcaseDisplay'),
  {
    suspense: true
  }
);

export interface ProjectsComponentProps {
  showcaseProjects: ShowcaseProjectFrontmatter[];
  projects: ProjectFrontmatter[];
}

const Projects = ({ showcaseProjects }: ProjectsComponentProps) => {
  return (
    <div style={{ padding: '5vh 0' }}>
      <h1>Projects</h1>
      <Suspense>
        <ProjectsShowcaseDisplay projects={showcaseProjects} />
      </Suspense>
    </div>
  );
};

export default Projects;
