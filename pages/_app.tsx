// next
import { AppProps } from 'next/app';
import Head from 'next/head';
import MantineProvider from '@/providers/mantineProvider';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Nextfolio</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <MantineProvider>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
