// types
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ReactNode, useRef } from 'react';

// mdx
import { MDXRemote } from 'next-mdx-remote';

// mantine
import { createStyles } from '@mantine/styles';
import { TypographyStylesProvider } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';

// framer
import { motion } from 'framer-motion';

// components
import Button from './button';

// styles
const useStyles = createStyles((t) => ({
  codeWrapper: {
    position: 'relative',
    boxShadow: t.shadows.md,
    maxWidth: '100%'
  },
  codeWrapperInner: {
    padding: '2rem',
    maxWidth: '100%',
    overflow: 'auto'
  },
  copyButton: {
    top: '1rem',
    right: '1rem',
    position: 'absolute',
    fontSize: t.fontSizes.xs,
    opacity: 0.75,
    background: t.colors.green[4],
    color: t.black,
    padding: `${t.spacing.xs}px ${t.spacing.md}px`,
    ['&:hover']: {
      background: t.colors.green[7]
    },
    ['&:active']: {
      background: t.colors.green[8]
    },
    ['&[data-copied]']: {
      background: t.colors.green[8]
    }
  }
}));

const Code = ({ children }: { children?: ReactNode }) => {
  const { classes } = useStyles();
  const { copy, copied } = useClipboard({ timeout: 1000 });
  const codeWrapperRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={classes.codeWrapper}>
      <Button
        onClick={() => copy(codeWrapperRef.current?.innerText)}
        className={classes.copyButton}
        data-copied={copied ? true : undefined}>
        {copied ? 'Copied' : 'Copy'}
      </Button>
      <div className={classes.codeWrapperInner} ref={codeWrapperRef}>
        {children}
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Image = (props: any) => {
  return (
    <img
      {...props}
      loading='lazy'
      alt='image'
      style={{
        width: '100%',
        height: '25vh',
        minHeight: '25vh',
        objectFit: 'cover',
        objectPosition: 'center'
      }}
    />
  );
};

interface props {
  mdxContent: MDXRemoteSerializeResult;
  animate?: {
    delay: number;
  };
}

const MarkdownWrapper = ({ mdxContent, animate }: props) => {
  if (typeof animate === 'undefined')
    return (
      <TypographyStylesProvider>
        <MDXRemote
          {...mdxContent}
          lazy
          components={{ code: Code, img: Image }}
        />
      </TypographyStylesProvider>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: animate.delay } }}>
      <TypographyStylesProvider>
        <MDXRemote
          {...mdxContent}
          lazy
          components={{ code: Code, img: Image }}
        />
      </TypographyStylesProvider>
    </motion.div>
  );
};

export default MarkdownWrapper;
