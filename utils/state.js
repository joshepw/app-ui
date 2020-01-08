export const store = {
	state: {
		uiMode: null,
		options: {}
	},

	setOptions(options) {
		this.state.options = options;
	},

	setUIDark() {
		this.state.uiMode = 'dark';
		this.setStatusbarDarkMode();
	},

	setUILight() {
		this.state.uiMode = 'light';
		this.setStatusbarLightMode();
	},

	setUIAuto() {
		this.state.uiMode = null;

		if (this.state.uiMode == 'dark') {
			this.setStatusbarDarkMode();
		} else {
			this.setStatusbarLightMode();
		}
	},

	setStatusbarDarkMode() {
		if (typeof window.StatusBar != 'undefined') {
			if(!this.state.options.statusbar.translucent) 
				window.StatusBar.backgroundColorByHexString(this.state.options.statusbar.dark);
			window.StatusBar.styleLightContent();
		}
	},

	setStatusbarLightMode() {
		if (typeof window.StatusBar != 'undefined') {
			if(!this.state.options.statusbar.translucent) 
				window.StatusBar.backgroundColorByHexString(this.state.options.statusbar.light);
			window.StatusBar.styleDefault();
		}
	}
};