import './_modal.scss';

import Alert from './Alert';
import Confirm from './Confirm';
import Modal from './Modal';

import Mixin from './_mixin';

const createStandaloneComponent = (Vue, Component) => {
	return {
		open(options) {
			let content;

			if (typeof options === 'string') {
				content = options
			}

			const defaultOptions = {
				content
			};

			const propsData = Object.assign({}, defaultOptions, options);

			return new (Vue.extend(Component))({
				el: document.createElement('div'),
				propsData,
				mixins: [Mixin]
			})
		}
	};
};

export default {
	install(Vue, options) {
		Vue.component('modal', Modal);
		Vue.component('alert', Alert);
		Vue.component('confirm', Confirm);

		Vue.prototype.alert = createStandaloneComponent(Vue, Alert);
		Vue.prototype.confirm = createStandaloneComponent(Vue, Confirm);
		Vue.prototype.modal = createStandaloneComponent(Vue, Modal);
	}
};