'use client';

import { ReactNode, Suspense } from 'react';
import dynamic from 'next/dynamic';

// styles
import classes from './layout.module.scss';

// subcomponents
import DesktopNavbar from './desktopNavbar';
const MobileNavbar = dynamic(() => import('./mobileNavbar/mobileNavbar'), {
  ssr: false
});

// icons
import useBlob from './useBlob';
import { IoFolderOpen, IoHome, IoInformation } from 'react-icons/io5';

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
      <main style={{ height: '300vh' }} className={classes.mainLayout}>
        {children}
      </main>
      <Suspense fallback={null}>
        <MobileNavbar
          socials={{
            github: 'https://github.com/amir4rab',
            codeSandbox: 'https://codesandbox.io/u/amir4rab',
            linkedin: 'https://www.linkedin.com/in/amir4rab/'
          }}
          paths={[
            { href: '/', icon: <IoHome />, label: 'Home page' },
            { href: '/about', icon: <IoInformation />, label: 'About page' },
            {
              href: '/projects',
              icon: <IoFolderOpen />,
              label: 'Projects page'
            }
          ]}
        />
      </Suspense>
    </>
  );
};

export default Layout;
