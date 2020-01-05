import './_overlay.scss';

import Actions from './Actions';
import Popup from './Popup';
import SidePanel from './SidePanel';
import Overlay from './Overlay';
import Toast from './Toast';

const ToastStandalone = (Vue, globalOptions = {}) => {
	return {
		open(options) {
			let message;

			if (typeof options === 'string') {
				message = options
			}

			const defaultOptions = {
				message
			};

			const propsData = Object.assign({}, defaultOptions, globalOptions, options);

			return new (Vue.extend(Toast))({
				el: document.createElement('div'),
				propsData
			})
		},
		clear() {
			Vue.$emit('toast.clear');
		},
		success(message, options = {}) {
			return this.open(Object.assign({}, {
				message,
				type: 'success'
			}, options))
		},
		error(message, options = {}) {
			return this.open(Object.assign({}, {
				message,
				type: 'danger'
			}, options))
		},
		warning(message, options = {}) {
			return this.open(Object.assign({}, {
				message,
				type: 'warning'
			}, options))
		}
	}
};

export default {
	install(Vue, options) {
		Vue.component('actions', Actions);
		Vue.component('popup', Popup);
		Vue.component('side-panel', SidePanel);
		Vue.component('overlay', Overlay);
		Vue.component('toast', Toast);

		const toast = ToastStandalone(Vue, options);

		Vue.toast = toast;
		Vue.prototype.toast = toast;
	}
};