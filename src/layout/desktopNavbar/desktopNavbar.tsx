'use client';

import dynamic from 'next/dynamic';
import { MouseEventHandler, ReactNode, useState, Suspense } from 'react';

const HoverFollower = dynamic(() => import('./hoverFollower'), { ssr: false });

// next
import Link from 'next/link';

// icons
import { SiGithub, SiCodesandbox, SiLinkedin } from 'react-icons/si';

// navbar context
import { NavbarContext } from './context';

// subcomponents
import Item from './item';
import Toggle from '@/subcomponents/toggle';

// styles
import classes from './desktopNavbar.module.scss';

// custom hooks
import { useTheme } from '@/providers/themeProvider';

// icons
import { IoMoon } from 'react-icons/io5';

interface NavbarProps {
  children: ReactNode | ReactNode[];
  socials?: {
    github?: string;
    codeSandbox?: string;
    linkedin?: string;
  };
}
const DesktopNavbar = ({ children, socials }: NavbarProps) => {
  const { colorScheme, setColorScheme } = useTheme();

  const [wrapperHovering, setWrapperHovering] = useState(false);
  const [hElPos, setHElPos] = useState({
    left: 0,
    right: 0,
    width: 0,
    height: 0
  });

  const onHover: MouseEventHandler<HTMLAnchorElement> = (e) => {
    const el = e.target as HTMLAnchorElement;
    const pos = el.getBoundingClientRect();

    const { left, right, width, height } = pos;

    setHElPos({ left, right, width, height });
    setWrapperHovering(true);
  };

  const onExit = () => {
    setWrapperHovering(false);
  };

  return (
    <NavbarContext.Provider
      value={{
        onHover,
        hoveredElStats: hElPos,
        wrapperHovering
      }}>
      <nav className={classes.nav}>
        <div style={{ position: 'relative' }}>
          <Suspense fallback={null}>
            <HoverFollower />
          </Suspense>
          <div className={classes.navbar}>
            <Link href='/' className={classes.title}>
              Amir4rab
            </Link>
            <div className={classes.secondRow}>
              <div onMouseLeave={onExit} className={classes.navbarItems}>
                {children}
                <Item href='#' active={false} key='socials' title='Socials'>
                  <p className={classes.socialTitle}>My Social medias</p>
                  {socials?.github && (
                    <a
                      className={classes.social}
                      href={socials.github}
                      target='_blank'
                      rel='noreferrer'>
                      <SiGithub />
                      <span>Github</span>
                    </a>
                  )}
                  {socials?.linkedin && (
                    <a
                      className={classes.social}
                      href={socials.linkedin}
                      target='_blank'
                      rel='noreferrer'>
                      <SiLinkedin />
                      <span>Linkedin</span>
                    </a>
                  )}
                  {socials?.codeSandbox && (
                    <a
                      className={classes.social}
                      href={socials.codeSandbox}
                      target='_blank'
                      rel='noreferrer'>
                      <SiCodesandbox />
                      <span>Code Sandbox</span>
                    </a>
                  )}
                </Item>
              </div>
              <Item href='#' active={false} key='settings' title='Settings'>
                <div className={classes.settingsRow}>
                  <IoMoon className={classes.icon} />
                  <p className={classes.label}>Dark mode</p>
                  <div className={classes.action}>
                    <Toggle
                      size='sm'
                      label='colorscheme'
                      onChange={() => setColorScheme()}
                      defaultChecked={colorScheme === 'dark'}
                    />
                  </div>
                </div>
              </Item>
            </div>
          </div>
        </div>
      </nav>
    </NavbarContext.Provider>
  );
};

DesktopNavbar.Item = Item;

export default DesktopNavbar;
