<template>
	<div :class="['progressive-background', customClass]">
		<div v-if="cached" :style="wrapperStyle">
			<div class="progressive-background-image" :style="imageStyle"></div>
			<div class="progressive-background-slot">
				<slot name="content" />
			</div>
		</div>
		<span v-else>
			<div v-if="!shouldImageRender">
				<canvas width="1" height="1" class="progressive-background-canvas" ref="canvas">
				</canvas>
				<img ref="main" :src="image" hidden>
			</div>
			<div :style="wrapperStyle">
				<transition enter-class="progressive-background-enter"
					enter-active-class="progressive-background-before">
					<div v-if="shouldImageRender" class="progressive-background-image" :style="imageStyle"></div>
				</transition>
				<div class="progressive-background-slot">
					<slot name="content" :visible="!shouldImageRender" />
				</div>
				<transition enter-class="progressive-background-enter"
					enter-active-class="progressive-background-before">
					<div v-if="shouldPlaceholderRender" class="progressive-background-placeholder"
						:style="placeholderStyle">
					</div>
				</transition>
			</div>
		</span>
	</div>
</template>

<script>
	import Mixin from './_mixin';

	export default {
		name: 'progressive-background',

		props: {
			noRatio: {
				type: Boolean,
				required: false
			}
		},

		mixins: [
			Mixin
		],

		data() {
			return {
				applyRatio: !this.noRatio
			}
		},

		computed: {
			imageStyle() {
				return {
					backgroundImage: `url(${this.image})`
				}
			},

			placeholderStyle() {
				return {
					...this.blurStyle,
					backgroundImage: `url(${this.placeholderImage})`
				}
			}
		}
	}
</script>