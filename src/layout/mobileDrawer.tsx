import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

// next
import Link from 'next/link';

// mantine
import { createStyles, keyframes } from '@mantine/styles';

// next
import { useRouter } from 'next/router';

// framer-motion
import { motion, AnimatePresence } from 'framer-motion';

// components
import Button from '@/subcomponents/button';

// keyframes
const animateInDrawer = keyframes({
  from: {
    transform: 'translate(0, 100%)',
    opacity: 0
  },
  to: {
    transform: 'translate(0, 0%)',
    opacity: 1
  }
});

const animateOutDrawer = keyframes({
  from: {
    transform: 'translate(0, 0%)',
    opacity: 1
  },
  to: {
    transform: 'translate(0, 100%)',
    opacity: 0
  }
});

// styles
const useStyles = createStyles((t) => ({
  wrapper: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(.1rem)'
  },
  drawer: {
    background: t.colorScheme === 'dark' ? t.colors.dark[5] : t.colors.gray[3],
    width: '100%',
    borderRadius: '1rem 1rem 0 0',
    padding: '1.5rem 1.5rem 2.5rem 1.5rem',
    position: 'fixed',
    left: 0,
    bottom: 0,
    minHeight: '10vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: t.shadows.md,
    opacity: 0,
    ['&[data-visible]']: {
      animation: `${animateInDrawer} .15s .1s ease-in-out forwards`
    },
    ['&[data-hidden]']: {
      animation: `${animateOutDrawer} .15s ease-in-out forwards`
    }
  },
  navButton: {
    ['&:not(:last-of-type)']: {
      marginBottom: '.5rem'
    },
    ['&[data-active]']: {
      background: t.primaryColor,
      color: t.black
    }
  }
}));

interface Props {
  onClose: () => void;
  status: boolean;
  links: {
    href: string;
    name: string;
    isActive?: boolean;
  }[];
}
const MobileDrawer = ({ onClose, status, links = [] }: Props) => {
  const { pathname } = useRouter();
  const { classes } = useStyles();
  const [drawer, setDrawer] = useState<boolean>(false);
  const closingTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (status) setDrawer(status);
  }, [status]);

  useEffect(() => {
    const timeout = closingTimeout.current;
    return () => {
      timeout !== null && clearTimeout(timeout);
    };
  }, []);

  const onWrapperClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    if ((ev.target as HTMLElement).id === 'mobileDrawerWrapper') {
      setDrawer(false);
      closingTimeout.current = setTimeout(() => onClose(), 100);
    }
  };

  const onNavigation = () => {
    setDrawer(false);
    closingTimeout.current = setTimeout(() => onClose(), 100);
  };

  return (
    <AnimatePresence>
      {status && (
        <motion.div
          animate={{ opacity: 1, transition: { duration: 0.1 } }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.1, delay: 0.1 } }}
          id='mobileDrawerWrapper'
          onClick={onWrapperClick}
          className={classes.wrapper}>
          <div
            data-visible={drawer ? true : undefined}
            data-hidden={!drawer ? true : undefined}
            className={classes.drawer}>
            {links.map(({ href, isActive, name }) => (
              <Link key={href} href={href} passHref>
                <Button
                  className={classes.navButton}
                  data-active={
                    isActive ? isActive : pathname === href ? true : undefined
                  }
                  component='a'
                  onClick={onNavigation}>
                  {name}
                </Button>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const _MobileDrawer = (props: Props) => {
  return ReactDOM.createPortal(
    <MobileDrawer {...props} />,
    document.getElementById('mobileNav') as HTMLDivElement
  );
};

export default _MobileDrawer;
