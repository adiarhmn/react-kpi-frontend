import { App } from '@capacitor/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, useLocation, useNavigate } from 'react-router-dom';

import { AuthProvider } from '@/features/auth';
import { queryClient } from '@/lib/react-query';

import { ErrorProvider } from './ErrorProvider';
import { StyleProvider } from './StyleProvider';
import { TitleProvider } from './TitleProvider';

type Props = {
  children: React.ReactNode;
};

const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const root = document.getElementById('root');
    root?.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) return navigate(-1);
      App.exitApp();
    });
  }, []);

  return <>{children}</>;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  return (
    <ErrorProvider>
      <QueryClientProvider client={queryClient}>
        <StyleProvider>
          <Router>
            <AuthProvider>
              {/* <OutletProvider> */}
              <HelmetProvider>
                <TitleProvider>
                  <LocationProvider>{children}</LocationProvider>
                </TitleProvider>
              </HelmetProvider>
              {/* </OutletProvider> */}
            </AuthProvider>
          </Router>
        </StyleProvider>
      </QueryClientProvider>
    </ErrorProvider>
  );
};
