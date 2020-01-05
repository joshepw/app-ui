<template>
	<li>
		<div class="item-inner">
			<div class="item-media" v-if="!!this.$slots['media']">
				<slot name="media"></slot>
			</div>
			<div class="item-content">
				<div class="item-title label" v-html="label"></div>
				<div class="item-input">
					<slot></slot>
				</div>
			</div>
		</div>
	</li>
</template>

<script>
	export default {
		props: {
			label: {
				type: String,
				default: ''
			}
		}
	}
</script>
