interface performanceObjInterface {
  score: number;
  fcp: number;
  si: number;
  lgp: number;
  tti: number;
  tbt: number;
  cls: number;
}

export type MarkdownFolders = 'blogs' | 'projects' | 'showcase';

type Technologies =
  | 'next'
  | 'react'
  | 'i18n'
  | 'framer-motion'
  | 'vite'
  | 'docker'
  | 'nginx'
  | 'prisma';

export interface ShowcaseProjectFrontmatter {
  id: string;
  name: string;
  scores: {
    accessibility: number;
    bestPractices: number;
    SEO: number;
    performance: {
      mobile: performanceObjInterface;
      desktop: performanceObjInterface;
    };
  };
  images: {
    ratios: {
      mobile: string;
      desktop: string;
    };
    mobile: string[];
    desktop: string[];
  };
  website: 'string';
  github: 'string';
  license: 'string';
  mainTechnologies: Technologies[];
}
