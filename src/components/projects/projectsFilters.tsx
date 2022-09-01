import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

// components
import Button from '@/subcomponents/button';

// mantine
import { createStyles, keyframes } from '@mantine/styles';

// hooks
import useDebouncedValue from '@/hooks/useDebouncedState';

// icons
import { IoChevronDown } from 'react-icons/io5';

// keyframes
const animateIn = keyframes({
  from: {
    opacity: 0,
    transform: 'translate(0, calc(90%))',
    pointerEvents: 'none',
    userSelect: 'none'
  },
  to: {
    opacity: 1,
    transform: 'translate(0, calc(100%))',
    pointerEvents: 'all',
    userSelect: 'all'
  }
});

const animateOut = keyframes({
  from: {
    opacity: 1,
    transform: 'translate(0, calc(100%))',
    pointerEvents: 'all',
    userSelect: 'all'
  },
  to: {
    opacity: 0,
    transform: 'translate(0, calc(90%))',
    pointerEvents: 'none',
    userSelect: 'none'
  }
});

// styles
const useStyles = createStyles((t) => ({
  filters: {
    borderRadius: t.radius.lg,
    position: 'relative',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center'
  },
  filtersText: {
    fontSize: t.fontSizes.xs,
    padding: 0,
    marginRight: '1rem'
  },
  filtersButton: {
    padding: t.spacing.xs,
    fontSize: t.fontSizes.md,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    ['& svg']: {
      transition: 'transform .1s ease-in-out'
    },
    ['&[data-active] svg']: {
      color: t.primaryColor,
      transform: 'rotate(180deg)'
    }
  },
  popup: {
    zIndex: 1005,
    position: 'absolute',
    right: '0',
    bottom: '0',
    transform: 'translate(0, 100%)',
    padding: `${t.spacing.md}px ${t.spacing.xl}px`,
    background: t.colorScheme === 'dark' ? t.colors.dark[5] : t.colors.gray[3],
    borderRadius: t.radius.lg,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem',
    width: 'min(60vw, 700px)',

    ['&[data-display]']: {
      animation: `${animateIn} .15s ease-in-out forwards`
    },
    ['&[data-hidden]']: {
      animation: `${animateOut} .15s ease-in-out forwards`
    },
    [t.fn.smallerThan('md')]: {
      width: '80vw'
    },
    [t.fn.smallerThan('sm')]: {
      gridTemplateColumns: 'repeat(1, 1fr)'
    }
  },
  filterItem: {
    fontSize: t.fontSizes.xs,
    width: '100%',
    height: '100%',
    userSelect: 'none',
    ['&[data-active]']: {
      background: t.colors[t.primaryColor][2],
      color: t.black
    },
    ['&:hover:not([data-active])']: {
      color: t.primaryColor,
      transform: 'none !important'
    }
  }
}));

interface Props {
  filters: string[];
  activeFilters: string[];
  setActiveFilters: Dispatch<SetStateAction<string[]>>;
}

const ProjectsFilters = ({
  filters,
  activeFilters,
  setActiveFilters
}: Props) => {
  const { classes } = useStyles();
  const [active, setActive] = useState(false);
  const [debouncedValue, setDebouncedValue] = useDebouncedValue(active, 150);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const windowEventlistener = useCallback(() => setActive(false), []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (active) {
      setDebouncedValue(true);
      window.addEventListener('click', windowEventlistener);
    } else {
      window.removeEventListener('click', windowEventlistener);
    }

    return () => {
      typeof window !== 'undefined' &&
        window.removeEventListener('click', windowEventlistener);
    };
  }, [active, windowEventlistener, setDebouncedValue]);

  return (
    <div ref={wrapperRef} className={classes.filters} id='projects-filters'>
      <p className={classes.filtersText}>
        {`Active filters: ${activeFilters.length}`}
      </p>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          setActive((curr) => !curr);
        }}
        data-active={active ? true : undefined}
        className={classes.filtersButton}>
        <IoChevronDown />
      </Button>
      {(debouncedValue || active) && (
        <div
          id='filers-popup'
          className={classes.popup}
          data-display={active ? true : undefined}
          data-hidden={!active ? true : undefined}
          onClick={(e) => e.stopPropagation()}>
          {(() => {
            const joinedFilters = activeFilters.sort().join('_');
            return filters.map((i) => (
              <Button
                key={i}
                onClick={() =>
                  joinedFilters.includes(i)
                    ? setActiveFilters((curr) =>
                        curr.filter((filter) => filter !== i)
                      )
                    : setActiveFilters((curr) => [...curr, i])
                }
                data-active={joinedFilters.includes(i) ? true : undefined}
                className={classes.filterItem}>
                {i}
              </Button>
            ));
          })()}
        </div>
      )}
    </div>
  );
};

export default ProjectsFilters;
