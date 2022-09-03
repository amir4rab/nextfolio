import { useState } from 'react';

// mantine
import { createStyles } from '@mantine/styles';

// icons
import { SiGithub, SiCodesandbox, SiNpm } from 'react-icons/si';

// motion
import { AnimatePresence, motion } from 'framer-motion';

// styles
const useStyles = createStyles((t) => ({
  contact: {
    margin: '5vh 0'
  },
  title: {
    marginBottom: t.spacing.xl
  },
  contentWrapper: {
    display: 'flex',
    justifyItems: 'space-between',
    alignContent: 'center',
    alignItems: 'center'
  },
  button: {
    background: 'transparent',
    border: 'none',
    padding: t.spacing.xs,
    display: 'flex',
    justifyItems: 'center',
    alignContent: 'center',
    borderRadius: '50%',
    fontSize: t.spacing.xl,
    color: t.colorScheme === 'dark' ? t.colors.gray[4] : t.colors.dark[7],
    transition: 'background .15s ease-in-out, transform .15s ease-in-out',
    ['&[data-active]']: {
      background: t.primaryColor,
      color: t.colors.dark[7]
    },
    ['&:not(:last-of-type)']: {
      marginRight: t.spacing.md
    }
  },
  actionsWrapper: {
    display: 'flex',
    justifyItems: 'center',
    alignContent: 'center'
  },
  resultsWrapper: {
    marginLeft: t.spacing.xl,
    fontSize: t.fontSizes.md,
    minHeight: '4rem',
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyItems: 'center',
    alignContent: 'center',
    ['& p']: {
      top: '50%',
      transform: 'translateY(-50%)',
      position: 'absolute'
    },
    ['& a']: {
      color: t.primaryColor,
      textDecoration: 'none'
    }
  }
}));

// data
const socials = [
  {
    icon: SiGithub,
    name: 'Github',
    url: 'https://gtihub.com/amir4rab'
  },
  {
    icon: SiCodesandbox,
    name: 'Code Sandbox',
    url: 'https://codesandbox.io/u/amir4rab'
  },
  {
    icon: SiNpm,
    name: 'npm',
    url: 'https://www.npmjs.com/~amir4rab'
  }
];

const AboutContact = () => {
  const { classes } = useStyles();
  const [activeItem, setActiveItem] = useState(0);

  return (
    <article className={classes.contact}>
      <h3 id='contact' className={classes.title}>
        Socials
      </h3>
      <div className={classes.contentWrapper}>
        <div className={classes.actionsWrapper}>
          {socials.map(({ url, icon: I }, i) => (
            <button
              data-active={i === activeItem ? true : undefined}
              onMouseEnter={() => setActiveItem(i)}
              className={classes.button}
              onClick={() => setActiveItem(i)}
              key={url}>
              <I />
            </button>
          ))}
        </div>
        <div className={classes.resultsWrapper}>
          <AnimatePresence mode='sync'>
            {
              <motion.p
                animate={{
                  y: '-50%',
                  opacity: 1
                }}
                exit={{ y: '50%', opacity: 0 }}
                initial={{ y: '-150%', opacity: 0 }}
                key={socials[activeItem].url}>
                <span>{`you can find my ${socials[activeItem].name} account `}</span>
                <a
                  href={socials[activeItem].url}
                  target='_blank'
                  rel='noreferrer'>{`Here`}</a>
                <span>{`.`}</span>
              </motion.p>
            }
          </AnimatePresence>
        </div>
      </div>
    </article>
  );
};

export default AboutContact;
