import ReactDOM from 'react-dom';

// mantine
import { createStyles } from '@mantine/styles';

// next
import { useRouter } from 'next/router';

// framer-motion
import { motion, AnimatePresence } from 'framer-motion';

// components
import Button from '@/subcomponents/button';
import Link from 'next/link';

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
    transform: 'translate(0, 0)',
    minHeight: '10vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: t.shadows.md
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

  const onWrapperClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    if ((ev.target as HTMLElement).id === 'mobileDrawerWrapper') onClose();
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
          <motion.div
            transition={{
              duration: 0.2
            }}
            variants={{
              visible: {
                transform: 'translate(0%, 1rem)',
                transition: {
                  delay: 0.1,
                  duration: 0.2
                }
              },
              hidden: {
                transform: 'translate(0%, 100%)'
              }
            }}
            animate={status ? 'visible' : 'hidden'}
            exit='hidden'
            initial='hidden'
            className={classes.drawer}>
            {links.map(({ href, isActive, name }) => (
              <Link key={href} href={href} passHref>
                <Button
                  className={classes.navButton}
                  data-active={
                    isActive ? isActive : pathname === href ? true : undefined
                  }
                  component='a'
                  onClick={onClose}>
                  {name}
                </Button>
              </Link>
            ))}
          </motion.div>
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
