<template>
	<li>
		<div :class="['item-inner', {'item-link': link}]">
			<div class="item-media" v-if="!!this.$slots['media']">
				<slot name="media"></slot>
			</div>
			<div class="item-content">
				<slot></slot>
			</div>
			<div class="link-arrow" v-if="link">
				<i class="icon-link"></i>
			</div>
		</div>
	</li>
</template>

<script>
	export default {
		props: {
			link: {
				type: Boolean,
				default: false
			}
		}
	}
</script>