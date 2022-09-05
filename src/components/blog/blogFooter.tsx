import { useEffect, useState } from 'react';

// mantine
import { useClipboard } from '@mantine/hooks';
import { createStyles, keyframes } from '@mantine/styles';

// icons
import { SiReddit, SiTwitter, SiWhatsapp } from 'react-icons/si';
import { IoCopy, IoCopyOutline, IoShareSocial } from 'react-icons/io5';

// data
const websiteUrl = (process.env.NEXT_PUBLIC_URL as string) + 'blog/';

interface Props {
  slug: string;
  text: string;
}

const socialMedias = [
  {
    id: 'twitter',
    href: 'https://twitter.com/intent/tweet?text=SHARE_TEXT read more: SHARE_URL',
    icon: SiTwitter
  },
  {
    id: 'reddit',
    href: 'https://www.reddit.com/submit?url=SHARE_URL',
    icon: SiReddit
  },
  {
    id: 'whatsapp',
    href: 'whatsapp://send?text=SHARE_TEXT read more: SHARE_URL',
    icon: SiWhatsapp
  }
];

const canUseBrowserShare = () =>
  typeof navigator.canShare !== 'undefined' &&
  typeof ClipboardItem !== 'undefined';

const browserShare = (text: string, blogUrl: string) => {
  if (typeof navigator.canShare !== 'undefined') {
    navigator.share({
      text: text + ' read more: ' + blogUrl
    });
  }
};

const hrefParser = (href: string, text: string, blogUrl: string) =>
  href.replace('SHARE_TEXT', text).replace('SHARE_URL', blogUrl);

// keyframes
const animateInWrapper = keyframes({
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
});

const animateInItem = keyframes({
  from: {
    opacity: 0,
    transform: 'translate(0, -0.25)'
  },
  to: {
    opacity: 1,
    transform: 'translate(0, 0)'
  }
});

// styles
const useStyles = createStyles((t) => ({
  card: {
    animation: `${animateInWrapper} .15s ease-in-out forwards`,
    opacity: 0,
    padding: t.spacing.xl,
    background:
      t.colorScheme === 'dark'
        ? t.colors.dark[5] + 'a0'
        : t.colors.gray[3] + 'a0',
    boxShadow: t.shadows.md,
    borderRadius: t.spacing.md
  },
  title: {
    fontSize: t.fontSizes.lg,
    marginBottom: t.spacing.lg
  },
  itemsWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center'
  },
  item: {
    animation: `${animateInItem} .15s ease-in-out forwards`,
    display: 'flex',
    padding: t.spacing.md,
    borderRadius: '50%',
    opacity: 0,
    background: t.colors.dark[7],
    color: t.colors.gray[3],
    transition: 'color .15s ease-in-out, background .15s ease-in-out',
    ['&:hover']: {
      color: t.primaryColor
    },
    ['&:active']: {
      background: t.colors.dark[5]
    },
    ['&:not(:last-of-type)']: {
      marginRight: t.spacing.md
    }
  }
}));

const BlogFooter = ({ slug, text = '' }: Props) => {
  const { classes } = useStyles();
  const [canShare, setCanShare] = useState(false);
  const { copy, copied } = useClipboard();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setCanShare(canUseBrowserShare());
  }, []);

  return (
    <div className={classes.card}>
      <p className={classes.title}>Share this blog</p>
      <div className={classes.itemsWrapper}>
        {socialMedias.map(({ id, icon: I, href }, i) => (
          <a
            key={id}
            href={hrefParser(href, text, websiteUrl + slug)}
            className={classes.item}
            target='_blank'
            style={{ animationDelay: `${(i + 1) * 0.1}s` }}
            rel='noreferrer'>
            <I />
          </a>
        ))}
        <a
          className={classes.item}
          target='_blank'
          style={{ animationDelay: `${(socialMedias.length + 1) * 0.1}s` }}
          onClick={() => copy(text + ' read more: ' + websiteUrl + slug)}>
          {copied ? <IoCopyOutline /> : <IoCopy />}
        </a>
        {canShare && (
          <a
            style={{ animationDelay: `${(socialMedias.length + 2) * 0.1}s` }}
            className={classes.item}
            target='_blank'
            onClick={() => browserShare(text, websiteUrl + slug)}>
            <IoShareSocial />
          </a>
        )}
      </div>
    </div>
  );
};

export default BlogFooter;
