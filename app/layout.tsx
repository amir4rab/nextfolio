import '@/styles/styles.global.scss';
import Layout from '@/layout';

export const metadata = {
  title: 'Amir4rab',
  description: 'Front-end engineer, interested in Web and UI'
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
