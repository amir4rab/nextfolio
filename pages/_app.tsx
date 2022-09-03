// next
import { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/code.css';
import MantineProvider from '@/providers/mantineProvider';

const domain = 'https://amir4rab.com';
const title = 'Amir4rab';
const description = 'Front-end engineer, interested in Web and UI';
const twitterCard = 'My personal portfolio';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Amir4rab</title>

        {/* Global conf */}
        <meta name='application-name' content={title} />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content={title} />
        <meta name='description' content={description} />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />

        {/* Microsoft Application */}
        <meta name='msapplication-TileColor' content='#ffc0cb' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='theme-color' content='#1A1B1E' />

        {/* Apple icons */}
        <link
          rel='apple-touch-icon'
          sizes='152x152'
          href='/assets/icons/touch-icon-ipad.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/assets/icons/touch-icon-iphone-retina.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='167x167'
          href='/assets/icons/touch-icon-ipad-retina.png'
        />

        {/* Favicons */}
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/assets/favicons/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/assets/favicons/favicon-16x16.png'
        />
        <link rel='shortcut icon' href='/favicon.png' />

        {/* Twitter card */}
        <meta name='twitter:card' content={twitterCard} />
        <meta name='twitter:url' content={domain} />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta
          name='twitter:image'
          content={`${domain}/assets/icons/android-chrome-192x192.png`}
        />
        <meta name='twitter:creator' content='@amir4rab' />

        {/* Open graph */}
        <meta property='og:type' content='website' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:site_name' content={title} />
        <meta property='og:url' content={domain} />
        <meta
          property='og:image'
          content={`${domain}/assets/icons/touch-icon-iphone-retina.png`}
        />

        {/* viewport */}
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
