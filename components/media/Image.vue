<template>
	<div ref="image" :class="['progressive-image', customClass]" :style="componentStyle">
		<div v-if="cached" class="progressive-image-wrapper" :style="wrapperStyle">
			<img :class="['progressive-image-main', imageCustomClass]" :src="image" :alt="alt" />
		</div>
		<span v-else>
			<canvas v-if="!shouldImageRender" width="1" height="1" class="progressive-image-canvas" ref="canvas">
			</canvas>
			<div class="progressive-image-wrapper" :style="wrapperStyle">
				<transition enter-class="progressive-image-enter" enter-active-class="progressive-image-before-enter">
					<img v-show="shouldImageRender" :class="['progressive-image-main', imageCustomClass]" ref="main"
						:src="image" :alt="alt" />
				</transition>
				<transition enter-class="progressive-image-enter" enter-active-class="progressive-image-before-enter">
					<div v-if="shouldPlaceholderRender" class="progressive-image-placeholder"
						:class="{ 'progressive-image-placeholder-out': shouldImageRender }" :style="placeholderStyle">
					</div>
				</transition>
			</div>
		</span>
	</div>
</template>

<script>
	import Mixin from './_mixin';

	export default {
		name: 'lazy-img',

		props: {
			imageCustomClass: {
				type: String
			}
		},

		mixins: [
			Mixin
		],

		computed: {
			placeholderStyle() {
				return {
					...this.blurStyle,
					'background-image': `url(${this.placeholder || this.options.placeholder})`
				}
			}
		}
	}
</script>