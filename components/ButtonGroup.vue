<template>
	<div :class="buttonGroupClasses">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			size: {
				type: String,
				default: 'medium',
			},
			round: {
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
			buttonGroupClasses() {
				return [
					'buttons-group',
					'button-' + this.size,
					{
						'button-round': this.round,
						'button-bordered': this.bordered,
					},
				];
			},
		},
	};
</script>
