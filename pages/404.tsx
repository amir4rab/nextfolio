import NotFound from '@/components/notFound';
import Head from 'next/head';

// types
import type { NextPage } from 'next/types';

const NotFoundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Not found</title>
      </Head>
      <NotFound />
    </>
  );
};
export default NotFoundPage;
