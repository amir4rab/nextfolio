import Head from 'next/head';

// types
import type { NextPage, GetStaticProps } from 'next';
import type { BlogFrontmatter } from '@/types/markdownFrontmatter';

// utils
import listMarkdowns, {
  readMarkdownListFrontMatter
} from '@/utils/backend/listMarkdowns';

// components
import Blogs from '@/components/blogs';

interface Props {
  blogs: BlogFrontmatter[];
}

const BlogPage: NextPage<Props> = (props: Props) => {
  return (
    <>
      <Head>
        <title>Blog - Amir4rab</title>
      </Head>
      <Blogs {...props} />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const blogs = await listMarkdowns({ folder: 'blogs' });

  const blogsFrontmatter = (await readMarkdownListFrontMatter({
    folder: 'blogs',
    arr: blogs
  })) as unknown as BlogFrontmatter[];

  return {
    props: {
      blogs: blogsFrontmatter
    }
  };
};

export default BlogPage;
