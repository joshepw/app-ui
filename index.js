// COMMUN
import './styles/bootstrap.scss';
import defaultOptions from './options';
import Fragment from './utils/fragment';
import Directives from './directives';

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

// SERVICE
import SessionService from './utils/session';
import StorageService from './utils/storage';
import HttpService from './utils/http';
import UIService from './utils/ui';

// INSTALL
export default {
	install(Vue, options) {
		options = { ...defaultOptions, ...options };

		Vue.use(Fragment);
		Vue.use(Directives);

		Vue.use(AppContent, options);
		Vue.use(Modal, options);
		Vue.use(Buttons, options);
		Vue.use(Overlay, options);
		Vue.use(Lists, options);
		Vue.use(Toolbar, options);
		Vue.use(Form, options);
		Vue.use(Tabs, options);
		Vue.use(Media, options);

		Vue.use(SessionService, options);
		Vue.use(StorageService, options);
		Vue.use(HttpService, options);
		Vue.use(UIService, options);
	}
};