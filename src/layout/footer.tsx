import {
  createStyles,
  keyframes,
  useMantineColorScheme
} from '@mantine/styles';
import { IoSunny, IoMoon } from 'react-icons/io5';

// keyframes
const animateIn = keyframes({
  from: {
    transform: 'translate(-100%, 0)'
  },
  to: {
    transform: 'translate(0%, 0)'
  }
});

// styles
const useStyles = createStyles((t, desktopMaxWidth: number) => ({
  footer: {
    position: 'sticky',
    left: 0,
    top: '90vh',
    background: t.colorScheme === 'dark' ? t.colors.dark[7] : t.colors.gray[3],
    padding: t.spacing.md,
    animation: `${animateIn} .15s ease-in-out forward`
  },
  inner: {
    display: 'flex',
    alignContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    [t.fn.largerThan('md')]: {
      maxWidth: desktopMaxWidth,
      margin: 'auto'
    }
  },
  text: {
    color: t.colorScheme === 'dark' ? t.colors.gray[4] : t.colors.dark[5],
    ['& a']: {
      color:
        t.colorScheme === 'dark'
          ? t.colors[t.primaryColor][3]
          : t.colors[t.primaryColor][7],
      textDecoration: 'none'
    }
  },
  actionsWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  themeButton: {
    marginLeft: '.5rem',
    border: 'none',
    background: 'transparent',
    transition: 'color .15s ease-in-out',
    ['&:hover']: {
      cursor: 'pointer',
      color: t.colorScheme === 'dark' ? t.colors.gray[3] : t.colors.dark[6]
    },
    color: t.colorScheme === 'dark' ? t.colors.gray[4] : t.colors.dark[5],
    minWidth: '2rem',
    minHeight: '2rem',
    position: 'relative',
    ['& svg']: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: 0,
      transition: 'opacity .15s ease-in-out'
    },
    ['& svg[data-active]']: {
      opacity: 1
    }
  }
}));

interface Props {
  desktopMaxWidth: number;
}

const Footer = ({ desktopMaxWidth }: Props) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes } = useStyles(desktopMaxWidth);

  return (
    <footer className={classes.footer}>
      <div className={classes.inner}>
        <div>
          <p className={classes.text}>
            {'View code on '}
            <a
              href='https://github.com/amir4rab/nextfolio'
              target='_blank'
              rel='noreferrer'>
              Github
            </a>
          </p>
        </div>
        <div className={classes.actionsWrapper}>
          <p>Color Scheme</p>
          <button
            onClick={() => toggleColorScheme()}
            className={classes.themeButton}>
            <IoSunny data-active={colorScheme === 'dark' ? true : undefined} />
            <IoMoon data-active={colorScheme === 'light' ? true : undefined} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
