<template>
	<modal :show='show' ref="modal">
		<div slot="title" v-html="title" />
		<div slot="content" v-html="content" />
		<div slot="buttons" class="modal-buttons">
			<span class="modal-button modal-button-cancel" v-on:click="_onCancel()" v-html="cancelText"></span>
			<span class="modal-button" @click="_onOk()" v-html="okText" />
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
				default: '',
			},
			content: {
				type: String,
				default: '',
			},
			okText: {
				type: String,
				default: 'OK',
			},
			cancelText: {
				type: String,
				default: 'Cancel',
			},
			onOk: {
				type: Function,
				default: () => {}
			},
			onCancel: {
				type: Function,
				default: () => {}
			},
		},
		methods: {
			open() {
				if(typeof this.openModal == 'function'){
					this.openModal.apply(null);
				}

				this.$refs.modal.open();
				this.$emit('open', this);
			},
			close() {
				this.$refs.modal.close();
				this.$emit('close', this);
			},
			_onOk() {
				if(typeof this.onOk == 'function'){
					this.onOk.apply(null);
				}

				this.$emit('ok', this);
				this.close();
			},
			_onCancel() {
				if(typeof this.onCancel == 'function'){
					this.onCancel.apply(null);
				}

				this.$emit('cancel', this);
				this.close();
			},
		},
	};
</script>
