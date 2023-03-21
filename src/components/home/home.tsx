'use client';

import dynamic from 'next/dynamic';

import classes from './home.module.scss';

import Button from '@/subcomponents/button';

const XpRow = dynamic(() => import('./xpRow'));

import { IoOpenOutline } from 'react-icons/io5';

import { Suspense, useEffect } from 'react';

import { useInView } from 'react-intersection-observer';

import { useData } from '@/providers/dataProvider';

const Home = () => {
  const { setFloatingActions } = useData();
  const { ref, inView } = useInView({
    threshold: 0.15
  });

  useEffect(() => {
    inView
      ? setFloatingActions({
          id: 'hero-cta',
          actions: [
            {
              content: 'Contact',
              type: 'anchor',
              href: '/contact',
              primary: true,
              key: 'contact-cta'
            },
            {
              content: 'About',
              type: 'anchor',
              href: '/about',
              primary: false,
              key: 'about-cta'
            }
          ]
        })
      : setFloatingActions((curr) => (curr?.id === 'hero-cta' ? null : curr));
  }, [inView, setFloatingActions]);

  return (
    <div className={classes.home}>
      <section ref={ref} className={classes.hero}>
        <h1 className={classes.title}>
          <span data-highlighted>{'FRONTEND '}</span>
          <span>WEB DEVELOPER</span>
        </h1>
        <p className={classes.description}>
          <span>{'My name is '}</span>
          <span data-highlighted>Amir Arab</span>
          <span>
            {`. Inserted in creating awesome, fast, reliable web applications.
            Currently, I am studying Computer engineering at IAU.`}
          </span>
        </p>
        <div className={classes.actions}>
          <Button
            rightIcon={<IoOpenOutline />}
            data-no-radius
            className={classes.actionLink}
            type='link'>
            About
          </Button>
          <Button
            data-no-radius
            data-primary
            className={classes.actionLink}
            type='link'>
            Contact
          </Button>
        </div>
      </section>
      <Suspense fallback={null}>
        <XpRow />
      </Suspense>
      <div style={{ height: '100vh' }} />
    </div>
  );
};

export default Home;
