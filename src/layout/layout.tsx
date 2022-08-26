import { Suspense } from 'react';
import type { ReactNode } from 'react';

// next
import dynamic from 'next/dynamic';

// mantine
import { createStyles } from '@mantine/styles';

// components
import DesktopNavbar from './desktopNavbar';
const AuroraBackground = dynamic(() => import('./auroraBackground'), {
  suspense: true
});

// constants
const desktopMaxWidth = 966;

const useStyles = createStyles((t) => ({
  main: {
    [t.fn.largerThan('md')]: {
      margin: '0 auto',
      maxWidth: desktopMaxWidth
    },
    [t.fn.smallerThan('md')]: {
      padding: `0 ${t.spacing.md}px ${t.spacing.md}px ${t.spacing.md}px`
    }
  }
}));

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { classes } = useStyles();

  return (
    <>
      <DesktopNavbar
        desktopMaxWidth={desktopMaxWidth}
        socials={{
          github: 'https://github.com/amir4rab',
          codeSandbox: 'https://codesandbox.io/u/amir4rab',
          npm: 'https://www.npmjs.com/~amir4rab'
        }}>
        <DesktopNavbar.Item href='/'>Home</DesktopNavbar.Item>
        <DesktopNavbar.Item href='/about'>About</DesktopNavbar.Item>
        <DesktopNavbar.Item href='/projects'>Projects</DesktopNavbar.Item>
        <DesktopNavbar.Item href='/blog'>Blog</DesktopNavbar.Item>
      </DesktopNavbar>
      <Suspense>
        <AuroraBackground />
      </Suspense>
      <main className={classes.main}>{children}</main>
    </>
  );
};

export default Layout;
