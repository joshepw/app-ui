import './_form.scss';

import Form from './Form';
import Item from './Item';
import Switch from  './Switch';

export default {
	install(Vue, options) {
		Vue.component('form-list', Form);
		Vue.component('form-item', Item);
		Vue.component('switcher', Switch);
	}
};