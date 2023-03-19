'use client';

import dynamic from 'next/dynamic';

// styles
import classes from './home.module.scss';

// subcomponents
import Button from '@/subcomponents/button';

// lazy subcomponents
const XpRow = dynamic(() => import('./xpRow'));

// icons
import { IoOpenOutline } from 'react-icons/io5';

import { Suspense } from 'react';

const Home = () => {
  return (
    <div className={classes.home}>
      <section className={classes.hero}>
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
      <section className={classes.experiences}>
        <Suspense fallback={null}>
          <XpRow />
        </Suspense>
      </section>
    </div>
  );
};

export default Home;
