<template>
	<transition :name="transitionName" :mode="transitionMode" :enter-active-class="transitionEnterActiveClass">
		<slot />
	</transition>
</template>

<script>
	const DEFAULT_TRANSITION = 'slide';
	const DEFAULT_TRANSITION_MODE = 'out-in';
	const FADE_ON_SAME_DEPTH = false;

	export default {
		name: 'TransitionPage',
		data() {
			return {
				prevHeight: 0,
				transitionName: DEFAULT_TRANSITION,
				transitionMode: DEFAULT_TRANSITION_MODE,
				transitionEnterActiveClass: '',
			};
		},
		created() {
			this.$router.beforeEach((to, from, next) => {
				let transitionName = to.meta.transitionName || from.meta.transitionName || DEFAULT_TRANSITION;

				if (transitionName === 'slide') {
					const toDepth = to.path.split('/').length;
					const fromDepth = from.path.split('/').length;
					transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';

					if (FADE_ON_SAME_DEPTH && toDepth === fromDepth) {
						transitionName = 'fade';
					}
				}

				this.transitionMode = DEFAULT_TRANSITION_MODE;
				this.transitionEnterActiveClass = `${transitionName}-enter-active`;

				if (to.meta.transitionName === 'zoom') {
					this.transitionMode = 'in-out';
					this.transitionEnterActiveClass = 'zoom-enter-active';
					document.body.style.overflow = 'hidden';
				}

				if (from.meta.transitionName === 'zoom') {
					this.transitionMode = null;
					this.transitionEnterActiveClass = null;
					document.body.style.overflow = null;
				}

				this.transitionName = transitionName;

				next();
			});
		}
	};
</script>

<style>
	.fade-enter-active,
	.fade-leave-active {
		transition-duration: 0.15s;
		transition-property: height, opacity;
		transition-timing-function: ease;
		overflow: hidden;
	}

	.fade-enter,
	.fade-leave-active {
		opacity: 0
	}

	.slide-left-enter-active,
	.slide-left-leave-active,
	.slide-right-enter-active,
	.slide-right-leave-active {
		transition-duration: 0.15s;
		transition-property: opacity, transform;
		transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
		overflow: hidden;
	}

	.slide-left-enter,
	.slide-right-leave-active {
		opacity: 0;
		transform: translate(1rem, 0);
	}

	.slide-left-leave-active,
	.slide-right-enter {
		opacity: 0;
		transform: translate(-1rem, 0);
	}
</style>