<template>
	<modal :show='show' ref="modal">
		<div slot="title" v-html="title" />
		<div slot="content" v-html="content" />
		<div slot="buttons" class="modal-buttons">
			<span class="modal-button" @click="_onClick()" v-html="okText" />
		</div>
	</modal>
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
				default: 'Alert',
			},
			content: {
				type: String,
				default: '',
			},
			okText: {
				type: String,
				default: 'OK',
			},
			onOk: {
				type: Function,
			},
		},
		methods: {
			open() {
				this.$refs.modal.open();
				this.$emit('open', this);
			},
			close() {
				this.$refs.modal.close();
				this.$emit('close', this);
			},
			_onClick() {
				if (this.onOk) {
					this.onOk();
				}

				this.$emit('ok', this);
				this.close();
			},
		},
	};
</script>
