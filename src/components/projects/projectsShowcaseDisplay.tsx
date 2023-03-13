import { useState } from 'react';

// mantine
import { createStyles } from '@mantine/styles';

// framer
import { motion, AnimatePresence } from 'framer-motion';

// types
import type { ShowcaseProjectFrontmatter } from '@/types/markdownFrontmatter';
import type { AnimationProps } from 'framer-motion';

// components
import Button from '@/subcomponents/button';
import TechnologiesRow from '@/subcomponents/technologiesRow';
import Link from 'next/link';

// styles
const useStyles = createStyles((t) => ({
  section: {
    margin: '2.5vh 0'
  },
  header: {
    marginBottom: t.spacing.xl * 2
  },
  contentWrapper: {
    [t.fn.largerThan('md')]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignContents: 'stretch',
      alignItems: 'stretch',
      minHeight: '70vh'
    }
  },
  innerSection: {
    [t.fn.largerThan('md')]: {
      width: '48%',
      display: 'flex',
      flexDirection: 'column'
    }
  },
  iconButton: {
    background: 'transparent',
    border: 'none',
    opacity: 0.5,
    transition: 'opacity .15s ease-in-out',
    ['& img']: {
      width: '4rem',
      height: '4rem'
    },
    ['&:not(:last-of-type)']: {
      marginRight: '.75rem'
    },
    ['&:hover']: {
      cursor: 'pointer',
      opacity: 0.75
    },
    ['&[data-active]']: {
      opacity: 1
    }
  },
  itemInfo: {
    paddingTop: '3rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  itemInfoTitle: {
    fontSize: t.fontSizes.xl,
    color: t.primaryColor,
    marginBottom: t.spacing.xl
  },
  itemInfoDescription: {
    flexGrow: 1
  },
  figure: {
    position: 'relative',
    borderRadius: t.radius.xl,
    overflow: 'hidden',
    [t.fn.smallerThan('md')]: {
      display: 'none'
    }
  },
  figureBackground: {
    zIndex: -1,
    position: 'absolute',
    left: 0,
    top: 0,
    display: 'flex',
    width: '100%',
    height: '100%',
    transition: 'opacity .15s ease-in-out',
    opacity: 0,
    ['&[data-displayed]']: {
      opacity: 1
    }
  },
  screenshot: {
    maxHeight: '80%',
    borderRadius: t.radius.lg,
    position: 'absolute',
    left: '50%',
    top: '50%',
    userSelect: 'none',
    boxShadow: t.shadows.xl,
    ['&:hover:not([data-active])']: {
      cursor: 'pointer'
    }
  },
  figureControls: {
    position: 'absolute',
    left: '50%',
    bottom: '1rem',
    transform: 'translate(-50%, 0)'
  },
  figureButton: {
    fontSize: 0,
    color: 'transparent',
    useSelect: 'none',
    border: 'none',
    background: t.colors.dark[5],
    borderRadius: '50%',
    width: '1rem',
    height: '1rem',
    opacity: 0.5,
    transition: 'background .15s ease-in-out, opacity .15s ease-in-out',
    ['&:not(:last-of-type)']: {
      marginRight: t.spacing.xs
    },
    ['&:hover:not([data-active])']: {
      cursor: 'pointer',
      opacity: 0.75,
      background: t.colors.dark[6]
    },
    ['&[data-active]']: {
      opacity: 1,
      background: t.colors.dark[7]
    }
  }
}));

// animations
const animationsTransition: AnimationProps['transition'] = {
  type: 'spring',
  bounce: 0.45,
  duration: 1
};

const imageVariants: AnimationProps['variants'] = {
  center: {
    transform: 'translate(-50%, -50%) scale(1)',
    opacity: 1,
    transition: animationsTransition
  },
  per: {
    transform: 'translate(-150%, -50%) scale(.75)',
    opacity: 1,
    transition: animationsTransition
  },
  next: {
    transform: 'translate(50%, -50%) scale(.75)',
    opacity: 1,
    transition: animationsTransition
  },
  perHover: {
    transform: 'translate(-150%, -50%) scale(.77)',
    opacity: 1,
    transition: animationsTransition
  },
  nextHover: {
    transform: 'translate(50%, -50%) scale(.77)',
    opacity: 1,
    transition: animationsTransition
  },
  hiddenRight: {
    transform: 'translate(175%, -50%) scale(.75)',
    opacity: 1,
    transition: animationsTransition
  },
  hiddenLeft: {
    transform: 'translate(-275%, -50%) scale(.75)',
    opacity: 1,
    transition: animationsTransition
  },
  exit: {
    opacity: 0
  },
  centerInitial: {
    transform: 'translate(-50%, -100%) scale(1)',
    opacity: 0
  },
  perInitial: {
    transform: 'translate(-150%, -100%) scale(.75)',
    opacity: 0
  },
  nextInitial: {
    transform: 'translate(50%, -100%) scale(.75)',
    opacity: 0
  },
  hiddenRightInitial: {
    transform: 'translate(175%, -100%) scale(.75)',
    opacity: 0
  },
  hiddenLeftInitial: {
    transform: 'translate(-275%, -100%) scale(.75)',
    opacity: 0
  },
  centerExit: {
    transform: 'translate(-50%, 0%) scale(1)',
    opacity: 0,
    transition: animationsTransition
  },
  perExit: {
    transform: 'translate(-150%, 0%) scale(.75)',
    opacity: 0,
    transition: animationsTransition
  },
  nextExit: {
    transform: 'translate(50%, 0%) scale(.75)',
    opacity: 0,
    transition: animationsTransition
  },
  hiddenRightExit: {
    transform: 'translate(175%, 0%) scale(.75)',
    opacity: 0,
    transition: animationsTransition
  },
  hiddenLeftExit: {
    transform: 'translate(-275%, 0%) scale(.75)',
    opacity: 0,
    transition: animationsTransition
  }
};

const getAnimationName = (
  i: number,
  activeIndex: number,
  prefix: '' | 'Exit' | 'Initial' | 'Hover'
) =>
  i === activeIndex
    ? 'center' + prefix
    : i - 1 === activeIndex
    ? 'next' + prefix
    : i + 1 === activeIndex
    ? 'per' + prefix
    : i > activeIndex
    ? 'hiddenRight' + prefix
    : 'hiddenLeft' + prefix;

interface Props {
  projects: ShowcaseProjectFrontmatter[];
}

const ProjectsShowcaseDisplay = ({ projects }: Props) => {
  const [activeItem, setActiveItem] = useState(0);
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  const changeActiveProject = (v: number) => {
    setActiveItem(v);
    setActiveScreenshot(0);
  };

  const { classes, cx } = useStyles();

  return (
    <motion.section
      className={classes.section}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}>
      <header className={classes.header}>
        <h2>Highlighted projects</h2>
      </header>
      <div className={classes.contentWrapper}>
        <div className={classes.innerSection}>
          <div>
            {projects.map(({ id, images, name }, i) => (
              <button
                data-active={i === activeItem ? true : undefined}
                className={classes.iconButton}
                onClick={() => changeActiveProject(i)}
                key={id + '-icon'}
                aria-label={'Select ' + name}>
                <img src={images.icon} alt={name + ' icon'} />
              </button>
            ))}
          </div>
          <div style={{ flexGrow: 1 }}>
            <AnimatePresence mode='wait'>
              {(() => {
                const { id, name, shortInfo, mainTechnologies, background } =
                  projects[activeItem];
                return (
                  <motion.div
                    className={classes.itemInfo}
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    key={id + '-data'}>
                    <h3 className={classes.itemInfoTitle}>{name}</h3>
                    <p className={classes.itemInfoDescription}>{shortInfo}</p>
                    <TechnologiesRow technologies={mainTechnologies} />
                    <div>
                      <Link passHref href={'/showcase/' + id} legacyBehavior>
                        <Button
                          sx={(t) => ({
                            background: background.colorful,
                            color: t.black,
                            position: 'relative',
                            overflow: 'visible',
                            ['&:hover']: {
                              transform: 'translate(0rem, -.2rem)',
                              ['&::after']: {
                                opacity: 0.75
                              }
                            },
                            ['&:active']: {
                              transform: 'translate(0rem, -.4rem)'
                            },
                            ['&::after']: {
                              left: '-.5rem',
                              top: '-.5rem',
                              width: 'calc(100% + 1rem)',
                              height: 'calc(100% + 1rem)',
                              background: background.colorful,
                              zIndex: -1,
                              position: 'absolute',
                              content: '""',
                              opacity: 0.2,
                              filter: 'blur(1rem)',
                              transition: 'opacity .15s ease-in-out'
                            }
                          })}
                          component='a'>
                          Read more
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>
        </div>
        <figure className={cx(classes.innerSection, classes.figure)}>
          {projects.map(({ id, background }, i) => (
            <div
              className={classes.figureBackground}
              key={id + '-figure-background'}
              aria-label='hidden'
              data-displayed={i === activeItem ? true : undefined}
              style={{ background: background.colorful }}
            />
          ))}
          <AnimatePresence>
            {projects[activeItem].images.mobile.map((src, i) => (
              <motion.img
                data-active={i === activeScreenshot ? true : undefined}
                onClick={() => setActiveScreenshot(i)}
                variants={imageVariants}
                initial={getAnimationName(i, activeScreenshot, 'Initial')}
                animate={getAnimationName(i, activeScreenshot, '')}
                exit={getAnimationName(i, activeScreenshot, 'Exit')}
                whileHover={getAnimationName(i, activeScreenshot, 'Hover')}
                loading='lazy'
                style={{
                  aspectRatio: projects[activeItem].images.ratios.mobile
                }}
                className={classes.screenshot}
                key={src + '-' + projects[activeItem].id}
                src={src}
                alt={projects[activeItem].name + ' Screen shot'}
              />
            ))}
            {(() => {
              const images = projects[activeItem].images.mobile;
              return (
                <motion.div
                  className={classes.figureControls}
                  key={projects[activeItem] + '-controls'}>
                  {images.map((_, i) => (
                    <button
                      className={classes.figureButton}
                      onClick={() => setActiveScreenshot(i)}
                      data-active={activeScreenshot === i ? true : undefined}
                      aria-label='select image'
                      key={i + 'screen-shot-btn'}>
                      {i}
                    </button>
                  ))}
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </figure>
      </div>
    </motion.section>
  );
};

export default ProjectsShowcaseDisplay;
