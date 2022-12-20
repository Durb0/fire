import App from './components/App.svelte';
//import { SplashScreen } from '@capacitor/splash-screen';


export const app = new App({
	target: document.body
});

document.body.style.padding = '0';
