<template>
	<div :class="['toolbar', {'bottom': bottom}]">
		<div class="toolbar-background"></div>
		<div class="toolbar-inner">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			bottom: Boolean
		}
	}
</script>