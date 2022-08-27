import { readdirSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';

// types
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

// utils
import readMarkdown from './readMarkdown';

export type Folder = 'blogs' | 'projects';

export interface MarkdownItemWithFrontMatter {
  frontmatter?: MDXRemoteSerializeResult['frontmatter'];
  filename: string;
}

export type ListMarkdownsResult = string[] | MarkdownItemWithFrontMatter[];

/** Reads markdown directory and returns markdown file names and their content */
const listMarkdowns = async (folder: Folder): Promise<string[]> => {
  try {
    const path = resolve(cwd() + `/markdown/${folder}`);
    const files = readdirSync(path);

    return files;
  } catch (err) {
    console.error(`listMarkdowns: `, err);
    return [] as string[];
  }
};

/** Parses markdown file's front matter */
export const readMarkdownListFrontMatter = async (
  arr: string[],
  folder: Folder
) => {
  const filesWithFrontMatter: MarkdownItemWithFrontMatter[] = [];
  for (let i = 0; i < arr.length; i++) {
    const filename = arr[i].replace('.md', '');

    try {
      const { frontmatter } = await readMarkdown({ filename, folder });
      filesWithFrontMatter.push({
        filename,
        frontmatter
      });
    } catch (err) {
      console.error(`Failed to read following file: ${filename}: `, err);
    }
  }

  return filesWithFrontMatter;
};

export default listMarkdowns;
