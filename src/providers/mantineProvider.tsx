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
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: colorScheme,
          primaryColor: 'pink',
          primaryShade: 7
        }}>
        <Global
          styles={(t) => ({
            '*, *::before, *::after': {
              boxSizing: 'border-box',
              padding: 0,
              margin: 0
            },

            '*::-webkit-scrollbar': {
              background: 'transparent',
              width: '.5em',
              height: '.5em'
            },
            '*::-webkit-scrollbar-thumb': {
              transition: 'background .5s ease-in-out',
              backgroundColor:
                t.colorScheme === 'dark'
                  ? t.colors[t.primaryColor][3] + '90'
                  : t.colors[t.primaryColor][3],
              outline: 'none',
              ['&:hover']: {
                backgroundColor:
                  t.colorScheme === 'dark'
                    ? t.colors[t.primaryColor][3] + 'a0'
                    : t.colors[t.primaryColor][4]
              },
              ['&:active']: {
                backgroundColor:
                  t.colorScheme === 'dark'
                    ? t.colors[t.primaryColor][3] + 'c0'
                    : t.colors[t.primaryColor][5]
              }
            }
          })}
        />
        <Layout>{children}</Layout>
      </MantineStylingProvider>
    </ColorSchemeProvider>
  );
};

export default MantineProvider;
