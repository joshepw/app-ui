<template>
	<div>
		<overlay :show="mutableShow" :click="close"></overlay>
		<transition name="popup-modal">
			<div v-show="mutableShow" :class="['popup-modal', className, {'full': full}]">
				<slot name="header"></slot>
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
			full: {
				type: Boolean,
				default: false,
			},
			className: {
				type: String,
				default: '',
			}
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
