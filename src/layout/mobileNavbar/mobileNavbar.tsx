'use client';

import { ReactNode, Suspense, useState } from 'react';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import Link from 'next/link';

// next
import dynamic from 'next/dynamic';

// styles
import classes from './mobileNavbar.module.scss';

// subcomponents
import Button from '@/subcomponents/button';
const NavbarDialog = dynamic(() => import('./dialog'), { ssr: false });

// icons
import { IoChevronUp, IoContrast } from 'react-icons/io5';

// global context
import { useData } from '@/providers/dataProvider';

// framer
import { AnimatePresence, motion } from 'framer-motion';

// providers
import { useTheme } from '@/providers/themeProvider';

// icons
import { SiCodesandbox, SiGithub, SiLinkedin } from 'react-icons/si';

interface Props {
  paths: {
    label: string;
    href: string;
    icon: ReactNode;
  }[];
  socials: {
    [key: string]: string;
  };
}

const MobileNavbar = ({ paths, socials }: Props) => {
  const pathname = usePathname();
  const { colorScheme, setColorScheme } = useTheme();
  const { floatingActions } = useData();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Suspense fallback={null}>
        {createPortal(
          <NavbarDialog displayed={expanded} setDisplayed={setExpanded}>
            <div className={classes.gridRow}>
              <button
                aria-label='Color scheme toggle'
                data-active={colorScheme === 'dark'}
                onClick={() => setColorScheme()}
                className={classes.actionEl}>
                <IoContrast
                  style={{
                    transform: colorScheme === 'dark' ? 'rotate(180deg)' : ''
                  }}
                />
              </button>
              {socials?.github && (
                <a
                  className={classes.actionEl}
                  href={socials.github}
                  target='_blank'
                  rel='noreferrer'>
                  <SiGithub />
                </a>
              )}
              {socials?.linkedin && (
                <a
                  className={classes.actionEl}
                  href={socials.linkedin}
                  target='_blank'
                  rel='noreferrer'>
                  <SiLinkedin />
                </a>
              )}
              {socials?.codeSandbox && (
                <a
                  className={classes.actionEl}
                  href={socials.codeSandbox}
                  target='_blank'
                  rel='noreferrer'>
                  <SiCodesandbox />
                </a>
              )}
            </div>
            <div className={classes.gridRow}>
              {paths.map(({ href, icon, label }) => (
                <Link
                  aria-label={label}
                  href={href}
                  key={href}
                  className={classes.actionEl}
                  data-active={pathname === href}>
                  {icon}
                </Link>
              ))}
            </div>
          </NavbarDialog>,
          document.body
        )}
      </Suspense>
      <nav className={classes.mobileNav}>
        <AnimatePresence>
          {floatingActions && (
            <motion.div
              key={floatingActions.id}
              transition={{ duration: 0.15 }}
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className={classes.floatingActionsWrapper}>
              {floatingActions.actions.map((action) => {
                const { type, content, key, primary } = action;

                return type === 'button' ? (
                  <button
                    data-primary={primary}
                    onClick={action.payload}
                    key={key}>
                    {content}
                  </button>
                ) : (
                  <Link key={key} data-primary={primary} href={action.href}>
                    {content}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setExpanded((curr) => !curr)}
          data-round
          className={classes.floatingAction}>
          <IoChevronUp />
        </button>
      </nav>
    </>
  );
};

const Item = ({
  icon,
  href,
  title
}: {
  title: string;
  href: string;
  icon?: ReactNode;
}) => {
  return (
    <Button type='link' href={href}>
      {icon}
      <span className={classes.text}>{title}</span>
    </Button>
  );
};

MobileNavbar.Item = Item;

export default MobileNavbar;
