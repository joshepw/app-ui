<template>
	<div>
		<overlay :show="mutableShow" :click="close"></overlay>
		<transition name="popup-modal">
			<div v-show="mutableShow" :class="'popup-modal ' + className + (full ? ' full' : '')">
				<!-- <header v-if="showTitleBar">
					<title v-html="title" />
					<a class="button button-link right" @click="close()">
						<i v-if="closeIcon" :class="'icon-' + closeIcon"></i>
						<span v-else v-html="closeButtonText" />
					</a>
				</header> -->
				<div class="modal-content">
					<slot></slot>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false,
			},
			title: {
				type: String,
				default: 'Popup Title',
			},
			showTitleBar: {
				type: Boolean,
				default: true,
			},
			closeButtonText: {
				type: String,
				default: 'Close',
			},
			full: {
				type: Boolean,
				default: false,
			},
			className: {
				type: String,
				default: '',
			},
			closeIcon: {
				type: String,
				default: '',
			},
		},
		data() {
			return {
				mutableShow: this.show,
			};
		},
		methods: {
			open() {
				this.mutableShow = true;
				this.$emit('open', this);
			},
			close() {
				this.mutableShow = false;
				this.$emit('close', this);
			},
		},
	};
</script>
