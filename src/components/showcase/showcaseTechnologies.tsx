import { useMemo } from 'react';

// framer
import { motion } from 'framer-motion';

// components
import IconsRow, { IconsRowProps } from '@/subcomponents/iconsRow';

// icons
import {
  SiNextdotjs,
  SiReact,
  SiFramer,
  SiVite,
  SiNginx,
  SiPrisma,
  SiDocker,
  SiGithub
} from 'react-icons/si';
import { IconType } from 'react-icons';
const supportedIcons = {
  next: SiNextdotjs,
  react: SiReact,
  framer: SiFramer,
  vite: SiVite,
  nginx: SiNginx,
  prisma: SiPrisma,
  docker: SiDocker,
  github: SiGithub
};

interface Props {
  delay?: number;
  technologies: string[];
}

const ShowcaseTechnologies = ({ technologies, delay = 0 }: Props) => {
  const icons: IconsRowProps['icons'] = useMemo(() => {
    const iconsWithUndefined = technologies.map((i) => {
      if (Object.prototype.hasOwnProperty.call(supportedIcons, i)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const icon = supportedIcons[i] as IconType;
        return {
          icon,
          href: ''
        };
      }
    });

    const filteredIcons = iconsWithUndefined.filter(
      (i) => typeof i !== 'undefined'
    ) as IconsRowProps['icons'];

    return filteredIcons;
  }, [technologies]);

  return (
    <motion.div
      animate={{ opacity: 1, transition: { delay } }}
      initial={{ opacity: 0 }}>
      <IconsRow title='Projects technologies' icons={icons} />
    </motion.div>
  );
};

export default ShowcaseTechnologies;
