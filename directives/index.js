// DIRECTIVES
import BackgroundImage from './backgroundImage';
import Swipe from './swipe';
import Ripple from './ripple';
import Mask from './mask';
import TransitionEnd from './transitionEnd';

export default {
	install(Vue, options) {
		Vue.directive('background', BackgroundImage);
		Vue.directive('swipe', Swipe);
		Vue.directive('ripple', Ripple);
		Vue.directive('mask', Mask);
		Vue.directive('transition-end', TransitionEnd);
	}
}