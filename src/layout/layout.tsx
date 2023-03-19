'use client';

import type { ReactNode } from 'react';

// styles
import classes from './styles.module.scss';

// subcomponents
import DesktopNavbar from './desktopNavbar';
import MobileNavbar from './mobileNavbar/mobileNavbar';

// icons
import { IoFolderOpen, IoInformationCircle, IoSettings } from 'react-icons/io5';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
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
      <MobileNavbar>
        <MobileNavbar.Item
          href='/about'
          title='About'
          icon={<IoInformationCircle />}
        />
        <MobileNavbar.Item
          href='/projects'
          title='Projects'
          icon={<IoFolderOpen />}
        />
        <MobileNavbar.Item
          href='/settings'
          title='Settings'
          icon={<IoSettings />}
        />
      </MobileNavbar>
    </>
  );
};

export default Layout;
