import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tpaz.kpi',
  appName: 'KPI TEFA',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    hostname: 'kpi.tefa-it.politala.ac.id',
    androidScheme: 'https',
    iosScheme: 'https',
  },
};

export default config;
