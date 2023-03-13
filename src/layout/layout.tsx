import { Suspense } from 'react';
import type { ReactNode } from 'react';

// next
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

// mantine
import { createStyles } from '@mantine/styles';

// components
import DesktopNavbar from './desktopNavbar';
import MobileNavbar from './mobileNavbar';

const AuroraBackground = dynamic(() => import('./auroraBackground'), {
  suspense: true
});
const Footer = dynamic(() => import('./footer'), {
  suspense: true
});

// constants
const desktopMaxWidth = 966;

const useStyles = createStyles((t) => ({
  main: {
    padding: '5vh 0',
    [t.fn.largerThan('md')]: {
      margin: '0 auto',
      minHeight: '90.675vh',
      maxWidth: desktopMaxWidth
    },
    [t.fn.smallerThan('md')]: {
      minHeight: '94vh',
      padding: `0 ${t.spacing.md}px ${t.spacing.md}px ${t.spacing.md}px`
    }
  }
}));

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { classes } = useStyles();
  const { pathname } = useRouter();

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
        <DesktopNavbar.Item
          active={pathname.includes('showcase')}
          href='/#showcase'>
          Showcase
        </DesktopNavbar.Item>
        <DesktopNavbar.Item href='/projects'>Projects</DesktopNavbar.Item>
        <DesktopNavbar.Item href='/blog'>Blog</DesktopNavbar.Item>
      </DesktopNavbar>
      <MobileNavbar />
      <Suspense fallback={null}>
        <AuroraBackground />
      </Suspense>
      <main id='__main' className={classes.main}>
        {children}
      </main>
      <Suspense fallback={null}>
        <Footer desktopMaxWidth={desktopMaxWidth} />
      </Suspense>
    </>
  );
};

export default Layout;
