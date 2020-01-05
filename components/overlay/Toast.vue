<template>
	<transition :enter-active-class="transition.enter" :leave-active-class="transition.leave">
		<div role="alert" v-show="isActive" class="toast" :class="[`toast-${type}`, `is-${position}`]" @click="onClick">
			<p class="toast-text">{{message}}</p>
		</div>
	</transition>
</template>

<script>
	export default {
		name: 'toast',
		props: {
			message: {
				type: String,
				required: true
			},
			type: {
				type: String,
				default: 'default'
			},
			position: {
				type: String,
				default: 'bottom',
			},
			duration: {
				type: Number,
				default: 3000
			},
			dismissible: {
				type: Boolean,
				default: true
			},
			onClose: {
				type: Function,
				default: () => {}
			},
			queue: Boolean,
			container: {
				type: [Object, Function, typeof window !== 'undefined' ? window.HTMLElement : Object],
				default: null
			},
		},
		data() {
			return {
				isActive: false,
				parentTop: null,
				parentBottom: null,
			}
		},
		beforeMount() {
			this.setupContainer()
		},
		mounted() {
			this.showNotice();
			this.$root.$on('toast.clear', this.close)
		},
		methods: {
			setupContainer() {
				this.parentTop = document.querySelector('.notices.is-top');
				this.parentBottom = document.querySelector('.notices.is-bottom');
				
				if (this.parentTop && this.parentBottom) return;
				if (!this.parentTop) {
					this.parentTop = document.createElement('div');
					this.parentTop.className = 'notices is-top';
				}
				if (!this.parentBottom) {
					this.parentBottom = document.createElement('div');
					this.parentBottom.className = 'notices is-bottom'
				}
				const container = this.container || document.body;
				container.appendChild(this.parentTop);
				container.appendChild(this.parentBottom);
				let containerParentClass = 'is-custom-parent';
				if (this.container) {
					this.parentTop.classList.add(containerParentClass);
					this.parentBottom.classList.add(containerParentClass)
				}
			},
			shouldQueue() {
				if (!this.queue) return false;
				return (
					this.parentTop.childElementCount > 0 ||
					this.parentBottom.childElementCount > 0
				)
			},
			close() {
				clearTimeout(this.timer);
				this.isActive = false;
				setTimeout(() => {
					this.$destroy();
					this._removeElement(this.$el)
				}, 150)
			},
			showNotice() {
				if (this.shouldQueue()) {
					setTimeout(() => this.showNotice(), 250);
					return
				}
				this.correctParent.insertAdjacentElement('afterbegin', this.$el);
				this.isActive = true;
				this.timer = setTimeout(() => this.close(), this.duration)
			},
			onClick() {
				if (!this.dismissible) return;
				this.onClose.apply(null, arguments);
				this.close()
			},

			_removeElement (el) {
				if (typeof el.remove !== 'undefined') {
					el.remove();
				} else {
					el.parentNode.removeChild(el);
				}
			}
		},
		computed: {
			correctParent() {
				switch (this.position) {
					case 'top':
						return this.parentTop;
					case 'bottom':
					default:
						return this.parentBottom;
				}
			},
			transition() {
				switch (this.position) {
					case 'top':
						return {
							enter: 'fadeInDown',
							leave: 'fadeOut'
						};

					case 'bottom':
					default:
						return {
							enter: 'fadeInUp',
							leave: 'fadeOut'
						}
				}
			},
		},
	}
</script>