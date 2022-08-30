import Head from 'next/head';

// types
import type { NextPage, GetStaticProps } from 'next/types';
import type { GetGhResult } from '@/utils/backend/getGh';
import type { ShowcaseProjectFrontmatter } from '@/types/markdownFrontmatter';

// components
import Home from '@/components/home';

// utils
import getGh from '@/utils/backend/getGh';
import listMarkdowns, {
  readMarkdownListFrontMatter
} from '@/utils/backend/listMarkdowns';

interface Props {
  ghData: GetGhResult;
  showcases: ShowcaseProjectFrontmatter[];
}

const HomePage: NextPage<Props> = ({ ghData, showcases }: Props) => {
  return (
    <div>
      <Head>
        <title>Amir4rab</title>
        <meta name='description' content='Personal portfolio' />
        <link rel='icon' href='/favicon.ico' />
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
    const [ghData, showcases] = await Promise.all([getGh(), getMarkdownData()]);
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
          profile: null,
          repos: []
        },
        showcases: [] as Props['showcases']
      }
    };
  }
};

export default HomePage;
