import './_media.scss';

import Image from './Image';
import Background from './Background';

export default {
	install (Vue, options) {
		Vue.component('lazy-img', Image);
		Vue.component('laxy-background', Background);
	}
};