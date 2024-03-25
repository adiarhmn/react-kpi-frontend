import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tpaz.abude.outlet',
  appName: 'Abude Outlet',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    hostname: 'outlet.abudegroup.t-paz.com',
    androidScheme: 'https',
    iosScheme: 'https',
  }
};

export default config;
