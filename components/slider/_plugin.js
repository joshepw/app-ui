import './_slider.scss';

import Slider from './Slider';
import Slide from './Slide';

export default {
	install(Vue, options) {
		Vue.component('slider', Slider);
		Vue.component('slide', Slide);
	}
};