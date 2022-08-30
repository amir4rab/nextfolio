import { readdirSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';

// types
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import type {
  MarkdownFolders,
  ProjectFrontmatter,
  ShowcaseProjectFrontmatter
} from '@/types/markdownFrontmatter';

// utils
import readMarkdown from './readMarkdown';

export interface MarkdownItemWithFrontMatter {
  frontmatter?: MDXRemoteSerializeResult['frontmatter'];
  filename: string;
}

export type ListMarkdownsResult = string[] | MarkdownItemWithFrontMatter[];

/** Reads markdown directory and returns markdown file names and their content */
const listMarkdowns = async ({
  folder
}: {
  folder: MarkdownFolders;
}): Promise<string[]> => {
  try {
    const path = resolve(cwd() + `/markdown/${folder}`);
    const files = readdirSync(path).map((i) => i.replace('.md', ''));

    return files;
  } catch (err) {
    console.error(`listMarkdowns: `, err);
    return [] as string[];
  }
};

/** Parses markdown file's front matter */
export const readMarkdownListFrontMatter = async ({
  arr,
  folder
}: {
  arr: string[];
  folder: MarkdownFolders;
}) => {
  const filesWithFrontMatter = [];
  for (let i = 0; i < arr.length; i++) {
    const filename = arr[i];

    try {
      const { frontmatter } = await readMarkdown({ filename, folder });
      filesWithFrontMatter.push(frontmatter);
    } catch (err) {
      console.error(`Failed to read following file: ${filename}: `, err);
    }
  }

  if (folder === 'showcase')
    return filesWithFrontMatter as unknown as ShowcaseProjectFrontmatter[];
  if (folder === 'projects')
    return filesWithFrontMatter as unknown as ProjectFrontmatter[];

  return filesWithFrontMatter as unknown as string[];
};

export default listMarkdowns;
