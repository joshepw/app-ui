import './_tabs.scss';

import Tab from  './Tab';
import TabItem from './TabItem';

export default {
	install(Vue, options) {
		Vue.component('tabs', Tab);
		Vue.component('tab', TabItem);
	}
};