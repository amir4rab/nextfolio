import Head from 'next/head';

// types
import type { NextPage, GetStaticProps } from 'next/types';
import type { GhStats } from '@/utils/backend/getGhStats';
import type { ShowcaseProjectFrontmatter } from '@/types/markdownFrontmatter';

// components
import Home from '@/components/home';

// utils
import listMarkdowns, {
  readMarkdownListFrontMatter
} from '@/utils/backend/listMarkdowns';
import getGhStats from '@/utils/backend/getGhStats';

interface Props {
  ghData: GhStats;
  showcases: ShowcaseProjectFrontmatter[];
}

const HomePage: NextPage<Props> = ({ ghData, showcases }: Props) => {
  return (
    <div>
      <Head>
        <title>Home - Amir4rab</title>
      </Head>
      <Home ghData={ghData} showcases={showcases} />
    </div>
  );
};

const getMarkdownData = async () => {
  const showcases = await listMarkdowns({ folder: 'showcase' });
  const arr = await readMarkdownListFrontMatter({
    arr: showcases,
    folder: 'showcase'
  });
  return arr as unknown as ShowcaseProjectFrontmatter[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const [ghData, showcases] = await Promise.all([
      getGhStats(),
      getMarkdownData()
    ]);
    return {
      props: {
        ghData,
        showcases
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
        },
        showcases: [] as Props['showcases']
      }
    };
  }
};

export default HomePage;
