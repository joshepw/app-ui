import './_overlay.scss';

import Actions from './Actions';
import Popup from './Popup';
import SidePanel from './SidePanel';
import Overlay from './Overlay';

export default {
	install(Vue, options) {
		Vue.component('actions', Actions);
		Vue.component('popup', Popup);
		Vue.component('side-panel', SidePanel);
		Vue.component('overlay', Overlay);
	}
};