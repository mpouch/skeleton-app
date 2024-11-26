import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'skeleton-app',
  webDir: 'www',
  server: {
    androidScheme: 'http',
    cleartext: true,
    allowNavigation: [
      'http://10.0.2.2:3000/*',
      'http://10.0.2.2/*'
    ]
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
