import '@/styles/styles.global.scss';
import Layout from '@/layout';

const domain = 'https://amir4rab.com';
const title = 'Amir4rab';
const description = 'Front-end engineer, interested in Web and UI';

export const metadata = {
  title,
  description,
  keywords: ['web developer', 'frontend developer', 'next.js', 'react.js'],
  themeColor: 'var(--background-0)',
  category: 'technology',
  openGraph: {
    url: domain,
    title,
    description,
    siteName: 'Portfolio',
    images: [{ url: domain + '/banner.png', width: 1280, height: 720 }],
    locale: 'en-US',
    type: 'website'
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: [
      {
        type: 'apple-touch-icon',
        sizes: '152x152',
        url: '/assets/icons/touch-icon-ipad.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: '/assets/icons/touch-icon-iphone-retina.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '167x167',
        url: '/assets/icons/touch-icon-ipad-retina.png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amir4rab',
    description,
    creator: '@amir4rab',
    images: [domain + '/banner.png']
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' data-color-scheme='dark'>
      <body>
        <Layout>{children}</Layout>
        <div id='mobileNav' />
      </body>
    </html>
  );
}
