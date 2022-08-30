import { Suspense } from 'react';

// next
import dynamic from 'next/dynamic';

// types
import type { GetGhResult } from '@/utils/backend/getGh';
import type { ShowcaseProjectFrontmatter } from '@/types/markdownFrontmatter';

// components
import HomeCard from '@/subcomponents/homeCard';

// lazy loaded components
const IconsRow = dynamic(() => import('@/subcomponents/iconsRow'), {
  suspense: true
});
const HighlightedApplicationsCard = dynamic(
  () => import('@/subcomponents/highlightedApplicationsCard'),
  {
    suspense: true
  }
);
const GhDisplay = dynamic(() => import('@/subcomponents/ghDisplay'), {
  suspense: true
});

// icons
import {
  SiNextdotjs,
  SiReact,
  SiPrisma,
  SiDocker,
  SiSass,
  SiNodedotjs,
  SiFramer
} from 'react-icons/si';
const iconsArray = [
  { href: 'https://nextjs.org/', icon: SiNextdotjs },
  { href: 'https://reactjs.org/', icon: SiReact },
  { href: 'https://www.prisma.io/', icon: SiPrisma },
  { href: 'https://www.docker.com/', icon: SiDocker },
  { href: 'https://sass-lang.com/', icon: SiSass },
  { href: 'https://nodejs.org/', icon: SiNodedotjs },
  { href: 'https://www.framer.com/motion/', icon: SiFramer }
];

interface Props {
  ghData: GetGhResult;
  showcases: ShowcaseProjectFrontmatter[];
}

const Home = ({ ghData, showcases }: Props) => {
  return (
    <>
      <header>
        <HomeCard />
      </header>
      <Suspense>
        <IconsRow icons={iconsArray} />
      </Suspense>
      <Suspense>
        <HighlightedApplicationsCard applications={showcases} />
      </Suspense>
      <Suspense>
        <GhDisplay ghData={ghData} />
      </Suspense>
    </>
  );
};

export default Home;
