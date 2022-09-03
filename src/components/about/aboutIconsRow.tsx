import IconsRow from '@/subcomponents/iconsRow';

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

const AboutIconsRow = () => <IconsRow icons={iconsArray} />;

export default AboutIconsRow;
