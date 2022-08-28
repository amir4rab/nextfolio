import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';

// third party utils
import { serialize } from 'next-mdx-remote/serialize';

import rehypePrism from 'rehype-prism-plus/common';

// types
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { MarkdownFolders } from '@/types/markdownFrontmatter';

export interface ReadMarkdownProps {
  folder: MarkdownFolders;
  filename: string;
}

export type ReadMarkdownResult = MDXRemoteSerializeResult;

/** Reads markdown file and returns MDXRemoteSerializeResult */
const readMarkdown = async ({
  filename,
  folder
}: ReadMarkdownProps): Promise<ReadMarkdownResult> => {
  const markdown = readFileSync(
    resolve(cwd() + `/markdown/${folder}/${filename}.md`),
    {
      encoding: 'utf-8'
    }
  );
  const mdxSource = await serialize(markdown, {
    parseFrontmatter: true,
    mdxOptions: {
      rehypePlugins: [rehypePrism]
    }
  });

  return mdxSource;
};

export default readMarkdown;
