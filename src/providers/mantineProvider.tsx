import { ReactNode } from 'react';

// mantine
import {
  ColorSchemeProvider,
  Global,
  MantineProvider as MantineStylingProvider,
  ColorScheme
} from '@mantine/styles';
import { useLocalStorage } from '@mantine/hooks';

// components
import Layout from '@/layout';

interface Props {
  children: ReactNode;
}

const MantineProvider = ({ children }: Props) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}>
      <MantineStylingProvider
        theme={{
          colorScheme: colorScheme,
          primaryColor: 'pink',
          primaryShade: 7
        }}>
        <Layout>{children}</Layout>
      </MantineStylingProvider>
    </ColorSchemeProvider>
  );
};

export default MantineProvider;
