import ReactDOM from 'react-dom';

// next
import Link from 'next/link';

// mantine
import { createStyles, keyframes } from '@mantine/styles';
import { useScrollLock } from '@mantine/hooks';

// next
import { useRouter } from 'next/router';

// framer-motion
import { motion, AnimatePresence, useIsPresent } from 'framer-motion';

// components
import Button from '@/subcomponents/button';
import { useEffect } from 'react';

// types
interface Link {
  href: string;
  name: string;
  isActive?: boolean;
}
type Links = Link[];

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
    background: t.colors.dark[7] + 'b0'
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
    transform: 'translate(0, 100%)',
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

const Drawer = ({ links, onClose }: { links: Links; onClose: () => void }) => {
  const { pathname } = useRouter();
  const { classes } = useStyles();
  const isPresent = useIsPresent();

  return (
    <div
      data-visible={isPresent ? true : undefined}
      data-hidden={!isPresent ? true : undefined}
      className={classes.drawer}>
      {links.map(({ href, isActive, name }) => (
        <Link key={href} href={href}>
          <Button
            className={classes.navButton}
            data-active={
              isActive ? isActive : pathname === href ? true : undefined
            }
            onClick={onClose}>
            {name}
          </Button>
        </Link>
      ))}
    </div>
  );
};

interface Props {
  onClose: () => void;
  status: boolean;
  links: Links;
}

const MobileDrawer = ({ onClose, status, links = [] }: Props) => {
  const { classes } = useStyles();
  const [, setScrollLocked] = useScrollLock();

  useEffect(() => {
    typeof window !== 'undefined' && setScrollLocked(status);
  }, [status, setScrollLocked]);

  return (
    <AnimatePresence>
      {status && (
        <motion.div
          key='mobileDrawerWrapper'
          animate={{ opacity: 1, transition: { duration: 0.1 } }}
          initial={{ opacity: 0 }}
          exit={{
            opacity: 0,
            userSelect: 'none',
            transition: { duration: 0.1, delay: 0.1 }
          }}
          onClick={onClose}
          className={classes.wrapper}>
          <Drawer links={links} onClose={onClose} />
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
