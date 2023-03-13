import {
  createContext,
  MouseEventHandler,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';

// mantine
import { createStyles } from '@mantine/styles';

// next
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

// icons
import { SiGithub, SiCodesandbox, SiNpm } from 'react-icons/si';

// styles
const useStyles = createStyles((t, desktopMaxWidth: number) => ({
  navbarWrapper: {
    position: 'sticky',
    left: 0,
    top: 0,
    width: '100%',
    zIndex: 10,
    backdropFilter: 'blur(.2rem)',
    background:
      t.colorScheme === 'dark'
        ? t.colors.dark[7] + 'a0'
        : t.colors.dark[7] + 'c0',
    overflow: 'hidden'
  },
  navbar: {
    [t.fn.largerThan('md')]: {
      maxWidth: desktopMaxWidth,
      margin: '0 auto'
    },
    position: 'relative',
    overflow: 'hidden',
    padding: t.spacing.xs
  },
  navbarInner: {
    display: 'flex',
    justifyContent: 'space-between',
    [t.fn.smallerThan('md')]: {
      maxWidth: '100%',
      paddingBottom: t.spacing.xs,
      overflowX: 'scroll'
    },
    [t.fn.smallerThan('md')]: {
      display: 'none'
    }
  },
  navbarItems: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  title: {
    display: 'inline-block',
    color: t.white,
    textDecoration: 'none',
    marginBottom: t.spacing.xs,
    marginLeft: t.spacing.xs * 0.75,
    fontSize: t.fontSizes.xl,
    fontWeight: 600,
    transition: 'color .1s ease-in-out',
    ['&:hover']: {
      color: t.primaryColor
    },
    [t.fn.smallerThan('md')]: {
      margin: 0,
      color: t.primaryColor,
      display: 'block',
      textAlign: 'center'
    }
  },
  item: {
    display: 'block',
    marginRight: t.spacing.md,
    ['&:hover']: {
      cursor: 'pointer',
      opacity: 1
    },
    padding: `${t.spacing.xs * 0.5}px ${t.spacing.lg}px`,
    userSelect: 'none',
    fontSize: t.fontSizes.sm,
    opacity: 0.5,
    transition: 'opacity .1s ease-in-out',
    color: t.white,
    textDecoration: 'none'
  },
  activeItem: {
    opacity: 1,
    background: t.colors[t.primaryColor][4] + '30',
    borderRadius: t.radius.md
  },
  hoverEl: {
    pointerEvents: 'none',
    userSelect: 'none',
    zIndex: -1,
    position: 'fixed',
    left: 0,
    top: 0,
    borderRadius: t.radius.md,
    background: t.colorScheme === 'dark' ? t.white : t.colors.gray[1]
  },
  borderBottom: {
    borderBottom: `${
      t.colorScheme === 'dark' ? t.colors.dark[3] : t.colors.gray[3]
    } .1rem solid`,
    [t.fn.smallerThan('md')]: {
      border: 'none'
    }
  },
  social: {
    ['&:not(:last-of-type)']: {
      marginRight: t.spacing.md
    },
    color: t.white,
    opacity: 0.5,
    transition: 'opacity .1s ease-in-out',
    ['&:hover']: {
      opacity: 1
    }
  }
}));

interface NavbarContextProps {
  onHover: MouseEventHandler<HTMLAnchorElement>;
}

const defaultNavbarContextProps: NavbarContextProps = {
  onHover: () => undefined
};

const NavbarContext = createContext<NavbarContextProps>(
  defaultNavbarContextProps
);

interface NavbarProps {
  children: ReactNode | ReactNode[];
  desktopMaxWidth: number;
  socials?: {
    github?: string;
    codeSandbox?: string;
    npm?: string;
  };
}
const DesktopNavbar = ({ children, desktopMaxWidth, socials }: NavbarProps) => {
  const { classes } = useStyles(desktopMaxWidth);
  const [ssr, setSrr] = useState(true);
  const [hoverElStyles, setHoverElStyles] = useState({
    transform: '',
    transition: '',
    opacity: 0,
    width: 0,
    height: 0
  });
  const firstEl = useRef<HTMLAnchorElement>();

  const onHover: MouseEventHandler<HTMLAnchorElement> = (e) => {
    const el = e.target as HTMLAnchorElement;
    const pos = el.getBoundingClientRect();

    if (hoverElStyles.opacity === 0) {
      setHoverElStyles((per) => ({
        ...per,
        width: pos.width,
        height: pos.height,
        transform: `translate(${pos.x}px, ${pos.y}px)`
      }));

      setTimeout(() => {
        setHoverElStyles((per) => ({
          ...per,
          opacity: 0.1,
          transition:
            'transform .1s ease-in-out, width .05s ease, opacity .15s ease-in-out'
        }));
      }, 5);
    } else {
      setHoverElStyles((per) => ({
        ...per,
        width: pos.width,
        height: pos.height,
        opacity: 0.1,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition:
          'transform .1s ease-in-out, width .05s ease, opacity .15s ease-in-out'
      }));
    }
  };

  const onExit = () => {
    setHoverElStyles((per) => ({
      ...per,
      opacity: 0,
      transition: 'opacity .15s ease-in-out'
    }));

    setTimeout(() => {
      setHoverElStyles((per) => ({
        ...per,
        transition: per.opacity === 0 ? '' : per.transition
      }));
    }, 150);
  };

  useEffect(() => {
    if (
      hoverElStyles.transform !== '' ||
      typeof firstEl.current === 'undefined'
    )
      return;
    const el = firstEl.current as HTMLAnchorElement;
    const pos = el.getBoundingClientRect();

    setHoverElStyles((per) => ({
      ...per,
      transform: `translate(${pos.x}px, ${pos.y}px)`
    }));
  }, [hoverElStyles.transform]);

  useEffect(() => {
    if (typeof window !== 'undefined') setSrr(false);
  }, []);

  return (
    <NavbarContext.Provider
      value={{
        onHover
      }}>
      <div className={classes.navbarWrapper}>
        <nav className={classes.navbar}>
          <Link href='/' passHref legacyBehavior>
            <a className={classes.title}>Amir4rab</a>
          </Link>
          {!ssr && (
            <div
              className={classes.hoverEl}
              style={{
                ...hoverElStyles
              }}
            />
          )}
          <div className={classes.navbarInner}>
            <div onMouseLeave={onExit} className={classes.navbarItems}>
              {children}
            </div>
            {socials && (
              <div>
                {socials.github && (
                  <a
                    className={classes.social}
                    href={socials.github}
                    target='_blank'
                    rel='noreferrer'>
                    <SiGithub size={24} />
                  </a>
                )}
                {socials.npm && (
                  <a
                    className={classes.social}
                    href={socials.npm}
                    target='_blank'
                    rel='noreferrer'>
                    <SiNpm size={24} />
                  </a>
                )}
                {socials.codeSandbox && (
                  <a
                    className={classes.social}
                    href={socials.codeSandbox}
                    target='_blank'
                    rel='noreferrer'>
                    <SiCodesandbox size={24} />
                  </a>
                )}
              </div>
            )}
          </div>
        </nav>
        <div className={classes.borderBottom} />
      </div>
    </NavbarContext.Provider>
  );
};

interface ItemProps extends LinkProps {
  children?: ReactNode;
  active?: boolean;
}

const Item = ({ children, active = false, ...props }: ItemProps) => {
  const { onHover } = useContext(NavbarContext);
  const { classes, cx } = useStyles(0);
  const { pathname } = useRouter();

  return (
    <Link {...props} passHref legacyBehavior>
      <a
        onMouseEnter={onHover}
        className={cx(
          classes.item,
          (props.href === pathname || active) && classes.activeItem
        )}>
        {children}
      </a>
    </Link>
  );
};
DesktopNavbar.Item = Item;

export default DesktopNavbar;
