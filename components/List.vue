<template>
	<div class="list">
		<slot></slot>
	</div>
</template>

<script>
	export default {

	}
</script>

<style lang="scss">
	.list {
		margin: 0;
		padding: 0;
		display: block;
		contain: content;
		list-style-type: none;

		.app.ios & {
			margin: -1px 0 32px;
		}

		.app.android & {
			margin: -1px 0 16px;
		}
	}
</style>