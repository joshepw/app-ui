// COMMUN
import './styles/bootstrap.scss';
import defaultOptions from './options';

// COMPONENTS
import AppContent from './components/app-content/_plugin';
import Modal from './components/modal/_plugin';
import Buttons from './components/buttons/_plugin';
import Overlay from './components/overlay/_plugin';
import Lists from './components/lists/_plugin';
import Toolbar from  './components/toolbar/_plugin';
import Form from './components/form/_plugin';
import Tabs from './components/tabs/_plugin';
import Media from './components/media/_plugin';

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
import Fragment from './utils/fragment';
import UI from './utils/ui';

// INSTALL
export default {
	install(Vue, options) {
		options = { ...defaultOptions, ...options };

		const sessionInstance = new SessionDriver();
		const storageInstance = new StorageDriver(options);

		Vue.prototype.session = sessionInstance;
		Vue.prototype.storage = storageInstance;
		Vue.prototype.http = HttpDriver.prepare(Vue, options);

		Vue.use(Fragment);

		Vue.use(AppContent, options);
		Vue.use(Modal, options);
		Vue.use(Buttons, options);
		Vue.use(Overlay, options);
		Vue.use(Lists, options);
		Vue.use(Toolbar, options);
		Vue.use(Form, options);
		Vue.use(Tabs, options);
		Vue.use(Media, options);

		Vue.use(UI, options);

		Vue.directive('background', BackgroundImage);
		Vue.directive('swipe', Swipe);
		Vue.directive('ripple', Ripple);
		Vue.directive('mask', Mask);
		Vue.directive('transition-end', TransitionEnd);
	}
};