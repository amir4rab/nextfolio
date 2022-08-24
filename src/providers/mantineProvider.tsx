import { ReactNode } from 'react';

// mantine
import {
  Global,
  MantineProvider as MantineStylingProvider
} from '@mantine/styles';
import Layout from '@/layout';

interface Props {
  children: ReactNode;
}

const MantineProvider = ({ children }: Props) => {
  return (
    <MantineStylingProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
        primaryColor: 'pink',
        primaryShade: 7
      }}>
      <Global
        styles={{
          '*, *::before, *::after': {
            boxSizing: 'border-box',
            padding: 0,
            margin: 0
          }
        }}
      />
      <Layout>{children}</Layout>
    </MantineStylingProvider>
  );
};

export default MantineProvider;
