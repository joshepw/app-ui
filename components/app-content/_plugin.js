import './_content.scss';

import AppContainer from './AppContainer';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import Page from './Page';
import View from './View';
import Scroll from './Scroll';
import TransitionPage from './TransitionPage';
 
export default {
	install(Vue, options) {
		Vue.component('app-container', AppContainer);
		Vue.component('app-view', View);
		Vue.component('page', Page);
		Vue.component('page-content', Content);
		Vue.component('page-header', Header);
		Vue.component('page-footer', Footer);
		Vue.component('scroll', Scroll);
		Vue.component('transition-page', TransitionPage);

		Vue.cordova = Vue.cordova || {
			deviceready: false
		};

		Vue.cordova.on = (eventName, cb) => {
			document.addEventListener(eventName, cb, false)
		};

		document.addEventListener('deviceready', () => {
			Vue.cordova.deviceready = true;
			console.log('[Cordova Device Ready]');
		}, false);
	}
};