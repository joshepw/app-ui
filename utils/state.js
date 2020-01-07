export const store = {
	state: {
		uiMode: null
	},

	setUIDark() {
		this.state.uiMode = 'dark';
	},

	setUILight() {
		this.state.uiMode = 'light';
	},

	setUIAuto() {
		this.state.uiMode = null;
	}
};