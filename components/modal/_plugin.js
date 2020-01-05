import './_modal.scss';

import Alert from './Alert';
import Confirm from './Confirm';
import Modal from './Modal';

export default {
	install(Vue, options) {
		Vue.component('modal', Modal);
		Vue.component('alert', Alert);
		Vue.component('confirm', Confirm);
	}
};