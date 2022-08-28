// types
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ReactNode, useRef } from 'react';

// mdx
import { MDXRemote } from 'next-mdx-remote';

// mantine
import { createStyles, useMantineTheme } from '@mantine/styles';
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
    boxShadow: t.shadows.md
  },
  copyButton: {
    top: '0',
    right: '0',
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
      <div ref={codeWrapperRef}>{children}</div>
    </div>
  );
};

interface props {
  mdxContent: MDXRemoteSerializeResult;
  animate?: {
    delay: number;
  };
}

const MarkdownWrapper = ({ mdxContent, animate }: props) => {
  const t = useMantineTheme();

  if (typeof animate === 'undefined')
    return (
      <TypographyStylesProvider
        sx={{
          color: t.colorScheme === 'dark' ? t.colors.gray[5] : t.colors.dark[7]
        }}>
        <MDXRemote {...mdxContent} lazy components={{ code: Code }} />
      </TypographyStylesProvider>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: animate.delay } }}>
      <TypographyStylesProvider
        sx={{
          color: t.colorScheme === 'dark' ? t.colors.gray[5] : t.colors.dark[7]
        }}>
        <MDXRemote {...mdxContent} lazy components={{ code: Code }} />
      </TypographyStylesProvider>
    </motion.div>
  );
};

export default MarkdownWrapper;
