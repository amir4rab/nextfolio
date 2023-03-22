'use client';

import { useContext, Suspense, ReactNode } from 'react';
import dynamic from 'next/dynamic';

const ItemHoverExtension = dynamic(() => import('./itemHoverExtension'), {
  ssr: false
});

// next
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

// context
import { NavbarContext } from './context';

// custom hooks
import useHover from '@/hooks/useHover';

// styles
import classes from './desktopNavbar.module.scss';

interface ItemProps extends LinkProps {
  title?: string;
  active?: boolean;
  children?: ReactNode;
}

const Item = ({ children, title, active = false, ...props }: ItemProps) => {
  const { onHover } = useContext(NavbarContext);
  const [hovering, ref] = useHover<HTMLAnchorElement>();
  const pathname = usePathname();

  return (
    <>
      <Link
        {...props}
        ref={ref}
        onMouseEnter={onHover}
        className={[
          classes.item,
          (props.href === pathname || active) && classes.activeItem
        ].join(' ')}>
        {title}
      </Link>
      {children && (
        <Suspense fallback={null}>
          <ItemHoverExtension visible={hovering}>{children}</ItemHoverExtension>
        </Suspense>
      )}
      {}
    </>
  );
};

export default Item;
