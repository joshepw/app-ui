<template>
	<div>
		<overlay :show="mutableShow" :click="overlayClick"></overlay>
		<transition name="modal">
			<div class="modal" v-if="mutableShow">
				<div class="modal-component" v-if="component">
					<component :is="component" v-bind="componentProps"></component>
				</div>
				<div class="modal-content" v-else-if="content" v-html="content"></div>
				<div class="modal-inner" v-else>
					<div class="modal-title">
						<slot name="title" v-html="confirmText"></slot>
					</div>
					<div class="modal-text">
						<slot name="content"></slot>
					</div>
				</div>
				<slot name="buttons">
				</slot>
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
			content: String,
			component: String,
			componentProps: {
				type: Object,
				default: () => {}
			},
			overlayClose: {
				type: Boolean,
				default: false,
			},
			confirmText: {
				type: String,
				default: 'Confirm',
			},
		},
		data() {
			return {
				mutableShow: this.show,
			};
		},
		methods: {
			open() {
				if(typeof this.openModal == 'function'){
					this.openModal.apply(null);
				}

				this.mutableShow = true;
				this.$emit('open', this);
			},
			close() {
				this.mutableShow = false;
				this.$emit('close', this);
			},
			overlayClick() {
				this.mutableShow = false;
			},
		},
	};
</script>
