export default {
	props: {
		container: {
			type: [Object, Function, typeof window !== 'undefined' ? window.HTMLElement : Object],
			default: null
		},
		done: {
			type: Function,
			default: () => {}
		}
	},
	beforeMount() {
		this.setupContainer()
	},
	mounted() {
		this.open();
		this.$on('close', this._finish);
	},
	data() {
		return {
			modals: null
		}
	},
	methods: {
		setupContainer() {
			this.modals = document.querySelector('.modals');
			
			if (this.modals) {
				return;
			}

			if (!this.modals) {
				this.modals = document.createElement('div');
				this.modals.className = 'modals';
			}

			const container = this.container || document.querySelector('#app');
			container.appendChild(this.modals);
			let containerParentClass = 'is-custom-parent';
			
			if (this.container) {
				this.modals.classList.add(containerParentClass);
			}
		},
		openModal() {
			this.modals.insertAdjacentElement('afterbegin', this.$el)
			this.mutableShow = true;
			this.$emit('open', this);
		},
		_finish() {
			setTimeout(() => {
				this.$destroy();
				this._removeElement(this.$el)
			}, 150)
		},
		_removeElement (el) {
			if (typeof el.remove !== 'undefined') {
				el.remove();
			} else {
				el.parentNode.removeChild(el);
			}
		}
	},
};