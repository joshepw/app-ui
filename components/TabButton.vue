<template>
	<router-link class="item" :to="url">
		<i :class="buttonIcon" @click="touchAction"></i>
		<span v-if="badge" class="badge" v-html="badge" />
		<label @click="touchAction" v-html="text" />
	</router-link>
</template>

<script>
	export default {
		props: {
			url: String,
			icon: String,
			text: String,
			badge: String,
		},
		computed: {
			buttonIcon() {
				return 'icon-' + (this.icon || 'default');
			},
		},
		methods: {
			touchAction() {
				window.navigator.vibrate([30, 30]);
			},
		},
	};
</script>