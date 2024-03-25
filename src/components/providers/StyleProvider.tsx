import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

import '@/styles/globals.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

import { DateProvider } from './DateProvider';

const theme: MantineThemeOverride = {
  fontFamily: 'Nunito, sans-serif',
  headings: {
    fontFamily: 'Nunito, sans-serif',
  },
};

type Props = {
  children: React.ReactNode;
};

export const StyleProvider: React.FC<Props> = ({ children }) => {
  return (
    <MantineProvider theme={theme}>
      <DateProvider>
        <Notifications autoClose={5000} />
        <ModalsProvider
          modalProps={{
            styles: {
              title: {
                fontWeight: 700,
                fontSize: 16,
              },
            },
          }}
          labels={{ confirm: 'Konfirmasi', cancel: 'Batal' }}
        >
          {children}
        </ModalsProvider>
      </DateProvider>
    </MantineProvider>
  );
};
