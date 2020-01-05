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


<style lang="scss">
	// .item {
	// 	display: block;
	// 	contain: content;

	// 	padding: var(--padding-top),
	// 		var(--padding-end),
	// 		var(--padding-bottom),
	// 		var(--padding-start);

	// 	.item-block {
	// 		margin: 0;
	// 		padding: 0;
	// 		text-align: initial;
	// 		display: flex;
	// 		overflow: hidden;
	// 		align-items: center;
	// 		justify-content: space-between;
	// 		width: 100%;
	// 		min-height: 44px;
	// 		border: 0;
	// 		font-weight: 400;
	// 		line-height: normal;
	// 		text-decoration: none;
	// 		color: inherit;
	// 		color: #000;
	// 		background-color: var(--background-color, #fff);

	// 		.app.dark & {
	// 			background-color: var(--background-dark-color, #000);
	// 			color: #fff;
	// 		}

	// 		.app.clear & {
	// 			background-color: transparent;
	// 		}

	// 		.app.ios & {
	// 			padding-left: 16px;
	// 			padding-left: calc(constant(safe-area-inset-left) + 16px);
	// 			padding-left: calc(env(safe-area-inset-left) + 16px);
	// 			border-radius: 0;
	// 			position: relative;
	// 			font-size: 17px;
	// 			transition: background-color .2s linear;
	// 		}

	// 		.app.android & {
	// 			padding-left: 16px;
	// 			padding-right: 0;
	// 			position: relative;
	// 			font-size: 16px;
	// 			font-weight: 400;
	// 			text-transform: none;
	// 			box-shadow: none;
	// 			transition: background-color .3s cubic-bezier(.4, 0, .2, 1);
	// 		}

	// 		.item-inner {
	// 			margin: 0;
	// 			padding: 0;
	// 			display: flex;
	// 			overflow: hidden;
	// 			flex: 1;
	// 			flex-direction: inherit;
	// 			align-items: inherit;
	// 			align-self: stretch;
	// 			min-height: inherit;
	// 			border: 0;

	// 			border-bottom: .55px solid var(--border-color, rgba(0, 0, 0, 0.1));

	// 			.app.dark & {
	// 				border-bottom: .55px solid var(--border-color, rgba(255, 255, 255, 0.2));
	// 			}

	// 			padding: var(--inner-padding-top, 0px),
	// 			var(--inner-padding-end, 8px),
	// 			var(--inner-padding-bottom, 0px),
	// 			var(--inner-padding-start, 0px);

	// 			.item-wrapper {
	// 				display: flex;
	// 				overflow: hidden;
	// 				flex: 1;
	// 				flex-direction: inherit;
	// 				align-items: inherit;
	// 				align-self: stretch;
	// 				text-overflow: ellipsis;
	// 			}
	// 		}
	// 	}
	// }
</style>