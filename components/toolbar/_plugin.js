import './_toolbar.scss';

import Toolbar from './Toolbar';
import Title from './Title';

export default {
	install(Vue, options) {
		Vue.component('toolbar', Toolbar);
		Vue.component('toolbar-title', Title);
	}
};