import Head from 'next/head';

// types
import type { NextPage, GetStaticProps } from 'next/types';
import { GetGhResult } from '@/utils/backend/getGh';

// components
import Home from '@/components/home';

// utils
import getGh from '@/utils/backend/getGh';

interface Props {
  ghData: GetGhResult;
}

const HomePage: NextPage<Props> = ({ ghData }: Props) => {
  return (
    <div>
      <Head>
        <title>Amir4rab</title>
        <meta name='description' content='Personal portfolio' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Home ghData={ghData} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const ghData = await getGh();

  return {
    props: {
      ghData
    },
    revalidate: 60 * 60 // every one hour
  };
};

export default HomePage;
