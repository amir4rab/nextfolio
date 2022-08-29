import Head from 'next/head';

// types
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next/types';

// utils
import listMarkdowns from '@/utils/backend/listMarkdowns';
import readMarkdown from '@/utils/backend/readMarkdown';

// components
import Showcase, { ShowcaseProps } from '@/components/showcase';
import { ShowcaseProjectFrontmatter } from '@/types/markdownFrontmatter';

const ShowcasePage: NextPage<ShowcaseProps> = (props: ShowcaseProps) => {
  return (
    <>
      <Head>
        <title>{props.frontmatterData.name}</title>
        <meta
          name='description'
          content={`Showcase of ${props.frontmatterData.name}`}
        />
      </Head>
      <Showcase {...props} />
    </>
  );
};

export const getStaticProps: GetStaticProps<ShowcaseProps> = async (
  context
) => {
  if (
    typeof context.params === 'undefined' ||
    typeof context.params.slug !== 'string'
  )
    return {
      notFound: true
    };

  const mdxContent = await readMarkdown({
    filename: context.params.slug,
    folder: 'showcase'
  });

  return {
    props: {
      frontmatterData:
        mdxContent.frontmatter as unknown as ShowcaseProjectFrontmatter,
      mdxContent
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = await listMarkdowns({ folder: 'showcase' });

  return {
    paths: files.map((i) => ({
      params: {
        slug: i
      }
    })),
    fallback: false
  };
};

export default ShowcasePage;
