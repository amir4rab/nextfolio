'use client';

import { ReactNode, Suspense, useState } from 'react';

// next
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

// styles
import classes from './mobileNavbar.module.scss';

// subcomponents
import Button from '@/subcomponents/button';

// lazy subcomponents
const TopRow = dynamic(() => import('./topRow'));

// icons
import { IoHome, IoMenu, IoSettings } from 'react-icons/io5';
import Settings from './settings';

const MobileNavbar = ({ children }: { children: ReactNode }) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <nav data-expanded={activeItem !== null} className={classes.mobileNav}>
      <Suspense>
        <TopRow
          activeItem={activeItem}
          items={[
            {
              content: children,
              id: 'navigation'
            },
            {
              content: <Settings />,
              id: 'settings'
            }
          ]}
        />
      </Suspense>
      <div className={classes.bottomRow}>
        <Button data-main className={classes.navLink} type='link' href='/'>
          <IoHome size='16' />
        </Button>
        <Button
          data-main
          className={classes.navLink}
          data-active={activeItem === 'navigation'}
          onClick={() =>
            setActiveItem((curr) =>
              curr === 'navigation' ? null : 'navigation'
            )
          }>
          <IoMenu size='16' />
        </Button>
        <Button
          data-main
          className={classes.navLink}
          data-active={activeItem === 'settings'}
          onClick={() =>
            setActiveItem((curr) => (curr === 'settings' ? null : 'settings'))
          }>
          <IoSettings size='16' />
        </Button>
      </div>
    </nav>
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
  const pathname = usePathname();

  return (
    <Button
      className={classes.navLink}
      data-active={pathname === href}
      type='link'
      href={href}>
      {icon}
      <span className={classes.text}>{title}</span>
    </Button>
  );
};

MobileNavbar.Item = Item;

export default MobileNavbar;
