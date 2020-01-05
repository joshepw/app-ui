<template>
	<list class="form-list">
		<div slot="title">
			<slot name="title"></slot>
			<span v-html="title" v-if="title"></span>
		</div>
		<slot></slot>
		<div slot="append">
			<slot name="append"></slot>
		</div>
	</list>
</template>

<script>
	export default {
		props: {
			title: String
		}
	}
</script>
