import { Suspense } from 'react';

// next
import dynamic from 'next/dynamic';

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

const Home = () => {
  return (
    <>
      <header>
        <HomeCard />
      </header>
      <Suspense>
        <IconsRow icons={iconsArray} />
      </Suspense>
      <Suspense>
        <HighlightedApplicationsCard />
      </Suspense>
      <div style={{ height: '500vh' }} />
    </>
  );
};

export default Home;
