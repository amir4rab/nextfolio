// mantine
import { createStyles } from '@mantine/styles';

// next
import Link from 'next/link';

// styles
const useStyles = createStyles((t) => ({
  center: {
    paddingTop: '10vh',
    flexDirection: 'column'
  },
  title: {
    [t.fn.largerThan('md')]: {
      fontSize: t.fontSizes.xl * 3
    },
    textAlign: 'left',
    fontSize: t.fontSizes.xl * 2,
    marginBottom: t.spacing.xl
  },
  subtitle: {
    fontWeight: 400,
    opacity: 0.8,
    ['& a']: {
      color: t.primaryColor,
      textDecoration: 'none'
    }
  }
}));

const NotFound = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.center}>
      <h1 className={classes.title}>Not found</h1>
      <h3 className={classes.subtitle}>
        <span>
          {`Sorry, it seems like you followed a wrong path, click here `}
        </span>
        <Link passHref href='/'>
          <a>Here</a>
        </Link>
        <span>{` to go back to home screen.`}</span>
      </h3>
    </div>
  );
};

export default NotFound;
