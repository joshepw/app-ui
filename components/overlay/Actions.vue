<template>
	<popup :show="show" :show-title-bar="false" class-name="actions-modal" ref="popup">
		<slot></slot>
		<div class="action-group" v-if="showCancelButton">
			<div class="action-button color-gray" @click="close()" v-html="cancelText"></div>
		</div>
	</popup>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false,
			},
			showCancelButton: {
				type: Boolean,
				default: true,
			},
			cancelText: {
				type: String,
				default: 'Cancel',
			},
		},
		methods: {
			open() {
				this.$refs.popup.open();
				this.$emit('open', this);
			},
			close() {
				this.$refs.popup.close();
				this.$emit('close', this);
			},
		},
	};
</script>
