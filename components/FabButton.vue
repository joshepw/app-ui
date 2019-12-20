<template>
	<button class="fab-button" @click="$emit('click')">
		<slot></slot>
	</button>
</template>

<script>
	export default {
		
	}
</script>