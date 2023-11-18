import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.repet.app',
  appName: 'rePET',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
