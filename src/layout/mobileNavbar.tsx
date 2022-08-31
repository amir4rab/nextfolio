import { useCallback, Suspense, useEffect, useState } from 'react';

// next
import dynamic from 'next/dynamic';

// mantine
import { createStyles } from '@mantine/styles';

// icons
import { IoLocate } from 'react-icons/io5';

// components
import Button from '@/subcomponents/button';

// dynamic components
const MobileDrawer = dynamic(() => import('./mobileDrawer'), {
  ssr: false
});

// styles
const useStyles = createStyles((t) => ({
  fab: {
    zIndex: 10,
    position: 'fixed',
    right: '2rem',
    bottom: '2rem',
    background: t.primaryColor,
    color: t.black,
    padding: '.75rem',
    fontSize: t.fontSizes.xl * 1.25,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    WebkitTapHighlightColor: 'none',
    ['&:hover']: {
      transform: 'translate(0, -.25rem)',
      background: t.primaryColor,
      zIndex: 10
    },
    ['&:active']: {
      transform: 'translate(0, -.5rem)',
      background: t.primaryColor,
      zIndex: 10
    },
    [t.fn.largerThan('md')]: {
      display: 'none'
    }
  },
  fabIcon: {
    transition: 'transform .3s ease-in-out',
    ['&[data-active]']: {
      transform: 'rotate(180deg)'
    }
  }
}));

const MobileNavbar = () => {
  const [isActive, setIsActive] = useState(false);
  const { classes } = useStyles();

  const eventHandler = useCallback((state: boolean) => {
    const wrapperEl = document.getElementById('__next');
    if (wrapperEl === null) return;

    const transition =
      'transition: transform .2s ease-in-out, border-radius .2s ease-in-out; transform-origin: top;';

    if (state) {
      wrapperEl.setAttribute(
        'style',
        `${transition} transform: scale(0.95) translateY( 1rem ); border-radius: 1rem; overflow: hidden;`
      );
    } else {
      wrapperEl.setAttribute('style', `${transition}`);
    }
  }, []);

  useEffect(() => {
    typeof window !== undefined && eventHandler(isActive);
  }, [isActive, eventHandler]);

  return (
    <>
      <Suspense>
        <MobileDrawer
          links={[
            { name: 'Home', href: '/' },
            { name: 'About', href: '/about' },
            { name: 'showcase', href: '/#showcase' },
            { name: 'Projects', href: '/projects' },
            { name: 'Blog', href: '/blog' }
          ]}
          onClose={() => setIsActive(false)}
          status={isActive}
        />
      </Suspense>
      <Button
        onClick={() => setIsActive((curr) => !curr)}
        className={classes.fab}>
        <IoLocate
          className={classes.fabIcon}
          data-active={isActive ? true : undefined}
        />
      </Button>
    </>
  );
};

export default MobileNavbar;
