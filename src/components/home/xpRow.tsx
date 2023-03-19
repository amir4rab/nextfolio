'use client';

// subcomponents
import IconsRow from '@/subcomponents/iconsRow';

// icons
import {
  SiNextdotjs,
  SiReact,
  SiPrisma,
  SiDocker,
  SiSass,
  SiNodedotjs,
  SiFramer,
  SiSvelte,
  SiGithub,
  SiFigma
} from 'react-icons/si';

// data
const iconsArray = [
  { href: 'https://nextjs.org/', icon: SiNextdotjs },
  { href: 'https://svelte.dev/', icon: SiSvelte },
  { href: 'https://github.com/', icon: SiGithub },
  { href: 'https://www.figma.com/', icon: SiFigma },
  { href: 'https://reactjs.org/', icon: SiReact },
  { href: 'https://www.prisma.io/', icon: SiPrisma },
  { href: 'https://www.docker.com/', icon: SiDocker },
  { href: 'https://sass-lang.com/', icon: SiSass },
  { href: 'https://nodejs.org/', icon: SiNodedotjs },
  { href: 'https://www.framer.com/motion/', icon: SiFramer }
];

const XpRow = () => (
  <IconsRow stopOnHover={false} title={false} icons={iconsArray} />
);

export default XpRow;
