import './styles/bootstrap.scss';

import axios from 'axios';

// COMPONENTS
import AppContent from './components/app-content/_plugin';
import Modal from './components/modal/_plugin';
import Buttons from './components/buttons/_plugin';
import Overlay from './components/overlay/_plugin';
import Lists from './components/lists/_plugin';
import Toolbar from  './components/toolbar/_plugin';
import Slider from './components/slider/_plugin';
import Form from './components/form/_plugin';

// DIRECTIVES
import BackgroundImage from './directives/backgroundImage';
import Swipe from './directives/swipe';
import Ripple from './directives/ripple';
import Mask from './directives/mask';
import TransitionEnd from './directives/transitionEnd';

// HELPERS
import SessionDriver from './utils/session';
import StorageDriver from './utils/storage';

export default {
	install(Vue, options) {
		const defaultOptions = {
			secret: 'Xsa5uK2lRz9Zt5yi',
			authTokenName: 'user_auth_token',
			darkModeSupport: true,
			osMode: 'auto',
			http: {
				endpoint: '',
				timeout: 5000,
				authHeader: 'X-Auth-Token',
				formData: false,
				headers: {
					'responseType' : 'json',
					'Content-Type' : 'application/json'
				}
			}
		};

		options = { ...defaultOptions, ...options };

		const sessionInstance = new SessionDriver();
		const storageInstance = new StorageDriver(options.secret);

		const httpInstance = axios.create({
			baseURL: options.http.endpoint,
			timeout: options.http.timeout,
			headers: options.http.headers
		});

		httpInstance.interceptors.request.use(function (config) {
			if(storageInstance.get(options.authTokenName)) {
				config.headers[options.http.authHeader] = storageInstance.get(options.authTokenName);
			}

			if(typeof config.data === 'object' && options.http.formData) {
				const formData = new FormData();
				Object.keys(config.data).forEach(key => formData.append(key, config.data[key]));
				config.data = formData;

				config.headers['Content-Type'] = 'multipart/form-data';
			}


			return config;
		}, function (error) {
			return Promise.reject(error);
		});

		httpInstance.interceptors.response.use(function (response) {
			return response;
		}, function (error) {
			if(typeof error.response.headers['X-Toast-Message'] != 'undefined') {
				if(typeof Vue.toast != 'undefined') {
					Vue.toast.open({
						message: error.response.headers['X-Toast-Message'],
						type: error.response.headers['X-Toast-Message-Type'] || 'danger'
					});
				}
			}

			return Promise.reject(error);
		});

		Vue.prototype.$appui = options;
		Vue.prototype.session = sessionInstance;
		Vue.prototype.storage = storageInstance;
		Vue.prototype.http = httpInstance;

		Vue.use(AppContent);
		Vue.use(Modal);
		Vue.use(Buttons);
		Vue.use(Overlay);
		Vue.use(Lists);
		Vue.use(Toolbar);
		Vue.use(Slider);
		Vue.use(Form);

		Vue.directive('background', BackgroundImage);
		Vue.directive('swipe', Swipe);
		Vue.directive('ripple', Ripple);
		Vue.directive('mask', Mask);
		Vue.directive('transition-end', TransitionEnd);
	}
};