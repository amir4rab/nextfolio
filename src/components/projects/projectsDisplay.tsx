import { useMemo, useState } from 'react';

// next
import Link from 'next/link';

// types
import type { ProjectFrontmatter } from '@/types/markdownFrontmatter';

// components
import ProjectsFilters from './projectsFilters';
import Button from '@/subcomponents/button';

// mantine
import { createStyles, keyframes } from '@mantine/styles';

// framer-motion
import { AnimatePresence, motion } from 'framer-motion';

// hooks
import useSsr from '@/hooks/useSsr';

const initialLoading = keyframes({
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
});

// styles
const useStyles = createStyles((t) => ({
  main: {
    paddingTop: '10vh',
    animation: `${initialLoading} .3s ease-in-out forwards`
  },
  title: {
    marginBottom: t.spacing.xl
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  projectsWrapper: {
    paddingTop: '5vh'
  },
  project: {
    padding: `${t.spacing.md}px 0`,
    ['&:not(:last-of-type)']: {
      marginBottom: t.spacing.xl,
      borderBottom: `${
        t.colorScheme === 'dark' ? t.colors.dark[3] : t.colors.gray[3]
      } .1rem solid`
    }
  },
  projectTitle: {
    fontSize: t.fontSizes.xl * 1.25,
    marginBottom: t.spacing.md
  },
  projectThumbnail: {
    width: '100%',
    maxHeight: '50vh',
    borderRadius: t.radius.md
  },
  projectInfo: {
    margin: `${t.spacing.xs}px 0`,
    fontSize: t.fontSizes.md
  },
  projectsTags: {
    margin: `${t.spacing.xs}px 0`,
    fontSize: t.fontSizes.xs
  },
  projectActions: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

interface Props {
  projects: ProjectFrontmatter[];
  filters: string[];
}

const ProjectsDisplay = ({ filters, projects }: Props) => {
  const { classes } = useStyles();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const ssr = useSsr();

  const selectedProjects: ProjectFrontmatter[] = useMemo(() => {
    if (activeFilters.length === 0) return projects;

    const filteredProjects = projects.filter(({ tags }) => {
      const stringifiedTags = tags.sort().join(' ');
      let everyTagWasIncluded = true;
      activeFilters.every((i) => {
        if (stringifiedTags.includes(i)) {
          return true;
        } else {
          everyTagWasIncluded = false;
          return false;
        }
      });
      return everyTagWasIncluded;
    });

    return filteredProjects;
  }, [projects, activeFilters]);

  return (
    <article className={classes.main}>
      <header className={classes.header}>
        <h2 className={classes.title}>Projects</h2>
        <ProjectsFilters
          filters={filters}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
      </header>
      <div className={classes.projectsWrapper}>
        <AnimatePresence>
          {selectedProjects.map(({ id, name, tags, thumbnail, shortInfo }) => (
            <motion.div
              layoutId={!ssr ? id : undefined}
              layout={!ssr ? true : undefined}
              animate={{ opacity: 1, zIndex: 0 }}
              exit={{ opacity: 0, zIndex: 0 }}
              initial={{ opacity: 0, zIndex: 0 }}
              className={classes.project}
              key={id}>
              <h5 className={classes.projectTitle}>{name}</h5>
              {thumbnail && (
                <img
                  src={thumbnail.url}
                  alt={name + ' image'}
                  style={{ aspectRatio: thumbnail.ratio }}
                  className={classes.projectThumbnail}
                />
              )}
              <p className={classes.projectInfo}>{shortInfo}</p>
              <p className={classes.projectsTags}>
                {'Tags: ' + tags.join(', ')}
              </p>
              <div className={classes.projectActions}>
                <Link passHref href={`/projects/${id}`}>
                  <Button component='a'>Learn more</Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </article>
  );
};

export default ProjectsDisplay;
