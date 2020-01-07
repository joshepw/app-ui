<template>
	<div id="app" :class="['app', os, uiMode, orientationDevice, {'virtual-home': virtualHomeButton, 'ready' : deviceReady}]">
		<app-view>
			<slot name="header"></slot>

			<transition-page v-if="router">
				<router-view></router-view>
			</transition-page>

			<slot></slot>
		</app-view>
	</div>
</template>

<script>
	import { store } from '../../utils/state';

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
				deviceReady: false,
				storeState: store.state
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
				if (this.ui.osMode != 'auto') {
					return this.appui.osMode;
				}

				const userAgent = navigator.userAgent || navigator.vendor;

				if (/android/i.test(userAgent)) {
					return "android";
				}

				return "ios";
			},
			uiMode() {
				if (!this.ui.darkModeSupport) {
					store.setUILight();
					return 'light';
				}

				if(this.storeState.uiMode != null) {
					return this.storeState.uiMode;
				}

				if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
					store.setUIDark();
					return 'dark';
				}

				store.setUILight();
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