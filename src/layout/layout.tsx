'use client';

import { ReactNode, Suspense } from 'react';
import dynamic from 'next/dynamic';

// styles
import classes from './styles.module.scss';

// subcomponents
import DesktopNavbar from './desktopNavbar';
const MobileNavbar = dynamic(() => import('./mobileNavbar/mobileNavbar'), {
  ssr: false
});

// icons
import useBlob from './useBlob';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  useBlob();

  return (
    <>
      <DesktopNavbar
        socials={{
          github: 'https://github.com/amir4rab',
          codeSandbox: 'https://codesandbox.io/u/amir4rab',
          linkedin: 'https://www.linkedin.com/in/amir4rab/'
        }}>
        <DesktopNavbar.Item href='/' title='Home' />
        <DesktopNavbar.Item href='/about' title='About' />
        <DesktopNavbar.Item href='/projects' title='Projects' />
      </DesktopNavbar>
      <main style={{ height: '300vh' }} id='__main' className={classes.main}>
        {children}
      </main>
      <Suspense fallback={null}>
        <MobileNavbar />
      </Suspense>
    </>
  );
};

export default Layout;
