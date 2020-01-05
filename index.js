import './styles/bootstrap.scss';
import defaultOptions from './options';

// COMPONENTS
import AppContent from './components/app-content/_plugin';
import Modal from './components/modal/_plugin';
import Buttons from './components/buttons/_plugin';
import Overlay from './components/overlay/_plugin';
import Lists from './components/lists/_plugin';
import Toolbar from  './components/toolbar/_plugin';
import Slider from './components/slider/_plugin';
import Form from './components/form/_plugin';
import Tabs from './components/tabs/_plugin';

// DIRECTIVES
import BackgroundImage from './directives/backgroundImage';
import Swipe from './directives/swipe';
import Ripple from './directives/ripple';
import Mask from './directives/mask';
import TransitionEnd from './directives/transitionEnd';

// HELPERS
import SessionDriver from './utils/session';
import StorageDriver from './utils/storage';
import HttpDriver from './utils/http';

export default {
	install(Vue, options) {
		options = { ...defaultOptions, ...options };

		const sessionInstance = new SessionDriver();
		const storageInstance = new StorageDriver(options);

		Vue.prototype.$appui = options;
		Vue.prototype.session = sessionInstance;
		Vue.prototype.storage = storageInstance;
		Vue.prototype.http = HttpDriver.prepare(Vue, options);

		Vue.use(AppContent);
		Vue.use(Modal);
		Vue.use(Buttons);
		Vue.use(Overlay);
		Vue.use(Lists);
		Vue.use(Toolbar);
		Vue.use(Slider);
		Vue.use(Form);
		Vue.use(Tabs);

		Vue.directive('background', BackgroundImage);
		Vue.directive('swipe', Swipe);
		Vue.directive('ripple', Ripple);
		Vue.directive('mask', Mask);
		Vue.directive('transition-end', TransitionEnd);
	}
};