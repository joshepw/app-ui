// COMPONENTS
import App from './components/App';
import Page from './components/Page';
import Content from './components/Content';
import Header from './components/Header';
import Footer from './components/Footer';
import Toolbar from './components/Toolbar';
import Title from './components/Title';
import List from './components/List';
import Item from './components/Item';
import FabButton from './components/FabButton';

import Button from './components/Button';
import ButtonGroup from './components/ButtonGroup';
import Modal from './components/Modal';
import Alert from './components/Alert';
import Confirm from './components/Confirm';
import Actions from './components/Actions';
import Popup from './components/Popup';
import SidePanel from './components/SidePanel';
import Overlay from './components/Overlay';
import Scroll from './components/Scroll';

import TransitionPage from './components/TransitionPage';

// DIRECTIVES
import BackgroundImage from './directives/backgroundImage';
import Swipe from './directives/swipe';
import Ripple from './directives/ripple';

import './styles/bootstrap.scss';

const AppUI = {
	install(Vue, options) {
		const defaultOptions = {
			darkModeSupport: true,
			osMode: 'auto',
			tabs: []
		};

		options = {...defaultOptions, ...options};

		Vue.prototype.$appui = options;

		Vue.component('app', App);
		Vue.component('page', Page);
		Vue.component('toolbar', Toolbar);
		Vue.component('toolbar-title', Title);
		Vue.component('page-content', Content );
		Vue.component('page-header', Header);
		Vue.component('page-footer', Footer);
		Vue.component('list', List);
		Vue.component('item', Item);
		Vue.component('fab', FabButton);

		Vue.component('transition-page', TransitionPage);
		Vue.component('btn', Button);
		Vue.component('btn-group', ButtonGroup);
		Vue.component('modal', Modal);
		Vue.component('alert', Alert);
		Vue.component('confirm', Confirm);
		Vue.component('actions', Actions);
		Vue.component('popup', Popup);
		Vue.component('side-panel', SidePanel);
		Vue.component('overlay', Overlay);
		Vue.component('scroll', Scroll);

		Vue.directive('background', BackgroundImage);
		Vue.directive('swipe', Swipe);
		Vue.directive('ripple', Ripple);
	}
};

export default AppUI;