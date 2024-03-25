import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppProvider } from '@/components/providers';

import { AppRoutes } from './routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  </React.StrictMode>
);
