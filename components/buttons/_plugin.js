import './_buttons.scss';

import Button from './Button';
import ButtonGroup from './ButtonGroup';
import FabButton from './FabButton';

export default {
	install(Vue, options) {
		Vue.component('btn', Button);
		Vue.component('btn-group', ButtonGroup);
		Vue.component('fab', FabButton);
	}
};