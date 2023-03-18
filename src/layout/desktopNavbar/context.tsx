'use client';

import { createContext, MouseEventHandler } from 'react';

interface NavbarContextProps {
  onHover: MouseEventHandler<HTMLAnchorElement>;
  hoveredElStats: {
    left: number;
    right: number;
    width: number;
    height: number;
  };
  wrapperHovering: boolean;
}

const defaultNavbarContextProps: NavbarContextProps = {
  onHover: () => undefined,
  hoveredElStats: {
    left: 0,
    right: 0,
    width: 0,
    height: 0
  },
  wrapperHovering: false
};

export const NavbarContext = createContext<NavbarContextProps>(
  defaultNavbarContextProps
);
