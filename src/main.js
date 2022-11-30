import App from './components/App.svelte';
//import { SplashScreen } from '@capacitor/splash-screen';


export const app = new App({
	target: document.body
});

/*await SplashScreen.show({
	showDuration: 2000,
	autoHide: true,
});*/

document.body.style.padding = '0';
