import Head from 'next/head';

// types
import type { NextPage, GetStaticProps } from 'next/types';
import type { GhStats } from '@/utils/backend/getGhStats';

// components
import About from '@/components/about/about';

// utils
import getGhStats from '@/utils/backend/getGhStats';

interface Props {
  ghData: GhStats;
}

const AboutPage: NextPage<Props> = ({ ghData }: Props) => {
  return (
    <div>
      <Head>
        <title>About - Amir4rab</title>
      </Head>
      <About ghData={ghData} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const ghData = await getGhStats();
    return {
      props: {
        ghData
      },
      revalidate: 60 * 60 // every one hour
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        ghData: {
          total: 0,
          totalRepos: 0,
          followers: 0,
          following: 0,
          rawData: {
            profile: null,
            repos: []
          }
        }
      }
    };
  }
};

export default AboutPage;
