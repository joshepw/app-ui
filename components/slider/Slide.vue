<template>
	<div class="slide">
		<slot v-if="show"></slot>
	</div>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: true
			}
		}
	}
</script>
