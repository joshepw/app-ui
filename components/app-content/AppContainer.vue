<template>
	<div id="app" :class="['app', os, uiMode, orientationDevice, {'virtual-home': virtualHomeButton, 'ready' : deviceReady}]">
		<transition-page v-if="router">
			<router-view></router-view>
		</transition-page>

		<slot></slot>
	</div>
</template>

<script>
	const StatusBar = StatusBar || window.StatusBar;

	export default {
		props: {
			router: Boolean,
		},
		mounted() {
			window.addEventListener("orientationchange", this.onOrientationChange);
			document.addEventListener("deviceready", this.onDeviceReady, false);
		},
		beforeDestroy() {
			window.removeEventListener('orientationchange', this.onOrientationChange);
		},
		data() {
			return {
				orientationDevice: screen.orientation.angle == 0 ? 'portrait' : 'landscape',
				deviceReady: false
			}
		},
		methods: {
			onOrientationChange() {
				this.orientationDevice = screen.orientation.angle == 0 ? 'portrait' : 'landscape';
			},
			onDeviceReady() {
				this.deviceReady = true;
			}
		},
		computed: {
			os() {
				if (this.$appui.osMode != 'auto') {
					return this.appui.osMode;
				}

				const userAgent = navigator.userAgent || navigator.vendor;

				if (/android/i.test(userAgent)) {
					return "android";
				}

				return "ios";
			},
			uiMode() {
				if (!this.$appui.darkModeSupport) {
					return 'light';
				}

				if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
					return 'dark';
				}

				return 'light';
			},
			virtualHomeButton() {
				if (navigator.userAgent.match(/(iPhone)/)) {
					if ((screen.availHeight == 812) && (screen.availWidth == 375)) {
						return (window.innerHeight == "375") && (window.innerWidth == "812");
					}
				}

				return false;
			}
		}
	}
</script>