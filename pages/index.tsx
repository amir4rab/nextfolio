import Head from 'next/head';
import { NextPage } from 'next/types';

import Home from '@/components/home';

const HomePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Amir4rab</title>
        <meta name='description' content='Personal portfolio' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Home />
    </div>
  );
};

export default HomePage;
