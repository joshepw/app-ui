export default {
	name: 'background',
	bind(el, binding) {
		if (binding.value) {
			el.style.backgroundImage = 'url(' + binding.value + ')';
		}
	},
	unbind(el) {
		el.style.backgroundImage = '';
	}
};
