import { store } from './state';

export default {
	install(Vue, options) {
		store.setOptions(options);

		options.setUIDark = () => store.setUIDark();
		options.setUILight = () => store.setUILight();
		options.setUIAuto = () => store.setUIAuto();
		options.getUIMode = () => store.state.uiMode;

		Vue.prototype.ui = options;
	}
};