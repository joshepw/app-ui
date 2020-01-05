import './_lists.scss';

import List from './List';
import Item from './Item';

export default {
	install(Vue, options) {
		Vue.component('list', List);
		Vue.component('item', Item);
	}
};