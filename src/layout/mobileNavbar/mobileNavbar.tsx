'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

// styles
import classes from './styles.module.scss';

// components
import Button from '@/subcomponents/button';

const MobileNavbar = ({ children }: { children: ReactNode }) => {
  return <nav className={classes.mobileNav}>{children}</nav>;
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
      <span>{title}</span>
    </Button>
  );
};

MobileNavbar.Item = Item;

export default MobileNavbar;
