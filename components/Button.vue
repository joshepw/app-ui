<template>
	<a href="javascript:;" :class="buttonClasses" @click="$emit('click')">
		<slot></slot>
	</a>
</template>

<script>
	export default {
		props: {
			type: {
				type: String,
				default: 'primary',
			},
			size: {
				type: String,
				default: 'medium',
			},
			round: {
				type: Boolean,
				default: false,
			},
			active: {
				type: Boolean,
				default: false,
			},
			disabled: {
				type: Boolean,
				default: false,
			},
			bordered: {
				type: Boolean,
				default: false,
			},
		},
		computed: {
			buttonClasses() {
				return [
					'button',
					'button-' + this.type,
					'button-' + this.size,
					{
						'button-round': this.round,
						'button-bordered': this.bordered,
						'active': this.active,
						'disabled': this.disabled,
					},
				];
			},
		},
	};
</script>
