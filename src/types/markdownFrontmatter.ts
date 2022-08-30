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
  | 'framer'
  | 'vite'
  | 'docker'
  | 'nginx'
  | 'prisma'
  | 'web3'
  | 'node'
  | 'webRTC'
  | 'mongodb'
  | 'socket'
  | 'mongo'
  | 'pwa'
  | 'postgres'
  | 'redis'
  | 'electron'
  | 'typescript';

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
    icon: string;
    mobile: string[];
    desktop: string[];
    banner: {
      aspectRatio: string;
      url: string;
    };
    ratios: {
      mobile: string;
      desktop: string;
    };
  };
  website: string;
  github: string;
  license: string;
  shortInfo: string;
  background: {
    muted: string;
    colorful: string;
  };
  mainTechnologies: Technologies[];
}

export interface ProjectFrontmatter {
  id: string;
  name: string;
  website: null | string;
  github: null | string;
  npmPackage: null | string;
  thumbnail: {
    url: string;
    ratio: string;
  } | null;
  shortInfo: string;
  tags: string[];
  mainTechnologies: Technologies[];
}
