'use client';

import { ReactNode, Suspense, useState } from 'react';
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
import { IoChevronUp } from 'react-icons/io5';

// global context
import { useData } from '@/providers/dataProvider';

// framer
import { AnimatePresence, motion } from 'framer-motion';

const MobileNavbar = () => {
  const { floatingActions } = useData();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Suspense fallback={null}>
        {createPortal(
          <NavbarDialog displayed={expanded} setDisplayed={setExpanded} />,
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
                  <motion.button
                    data-primary={primary}
                    onClick={action.payload}
                    key={key}>
                    {content}
                  </motion.button>
                ) : (
                  <motion.div key={key}>
                    <Link data-primary={primary} href={action.href}>
                      {content}
                    </Link>
                  </motion.div>
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
