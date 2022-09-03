import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// types
import type { GhStats } from '@/utils/backend/getGhStats';

// mantine
import { createStyles } from '@mantine/styles';
import AboutContact from './aboutContact';

// dynamic components
const AboutIconsRow = dynamic(() => import('./aboutIconsRow'), {
  suspense: true
});
const GhDisplay = dynamic(() => import('@/subcomponents/ghDisplay'), {
  suspense: true
});

// styles
const useStyles = createStyles((t) => ({
  title: {
    paddingBottom: t.spacing.md
  },
  paragraph: {
    lineHeight: '175%',
    '& a': {
      color: t.primaryColor,
      textDecoration: 'none'
    }
  }
}));

interface Props {
  ghData: GhStats;
}

const About = ({ ghData }: Props) => {
  const { classes } = useStyles();

  return (
    <>
      <h1 className={classes.title}>About</h1>
      <p className={classes.paragraph}>
        <span>{`I am a front-end engineer, interested in Web and Ui. I&apos;m currently studying Computer Engineering at university. I have been programming since February of 2020. I have some programming experience with the following technologies, `}</span>
        <a
          href='http://nextjs.org'
          target='_blank'
          rel='noreferrer'>{`Next.js`}</a>
        <span>{', '}</span>
        <a
          href='https://www.gatsbyjs.com'
          target='_blank'
          rel='noreferrer'>{`Gatsby.js`}</a>
        <span>{', '}</span>
        <a
          href='https://nodejs.org'
          target='_blank'
          rel='noreferrer'>{`Node.js`}</a>
        <span>{', '}</span>
        <a
          href='https://www.prisma.io/'
          target='_blank'
          rel='noreferrer'>{`Prisma.js`}</a>
        <span>{', '}</span>
        <a
          href='https://www.framer.com/motion/'
          target='_blank'
          rel='noreferrer'>{`Framer-motion`}</a>
        <span>{', '}</span>
        <a
          href='https://mantine.dev/'
          target='_blank'
          rel='noreferrer'>{`Mantine`}</a>
        <span>{', '}</span>
        <span>
          {`and many more. I also have published most of my coding journey on Github, feel free to check out my Github profile `}
        </span>
        <a
          href='https://github.com/amir4rab'
          target='_blank'
          rel='noreferrer'>{`here`}</a>
        <span>{`. `}</span>
      </p>
      <Suspense fallback={null}>
        <AboutIconsRow />
      </Suspense>
      <Suspense fallback={null}>
        <GhDisplay ghData={ghData} />
      </Suspense>
      <AboutContact />
    </>
  );
};

export default About;
