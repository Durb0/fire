import { CapacitorConfig } from '@capacitor/cli';


// 

const config: CapacitorConfig = {
  appId: 'com.example.fireapp',
  appName: 'F!RE',
  webDir: 'public',
  bundledWebRuntime: false,
  //setup splash screen
  plugins: {
    SplashScreen: {
      showSpinner: true,
      androidScaleType: 'CENTER_CROP',
      launchAutoHide: true,
      backgroundColor: '#ffffff',
      splashFullScreen: true,
      splashImmersive: true,
      splashShowOnlyFirstTime: false
    },
  }
};

export default config;
