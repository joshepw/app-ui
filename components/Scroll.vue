<template>
	<div class="scroll" :class="scrollClasses" @touchstart="touchStart($event)" @touchmove="touchMove($event)"
		@touchend="touchEnd($event)" @scroll="(onInfinite || infiniteLoading) ? onScroll($event) : undefined">
		<div class="scroll-inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
			<div class="pull-to-refresh-layer" v-if="!!onRefresh">
				<slot name="refresh">
					<div v-if="state === 2" class="preloader"></div>
					<div v-else class="pull-to-refresh-arrow"></div>
					<span class="label-down" v-html="labelDown" />
					<span class="label-up" v-html="labelUp" />
					<span class="label-refresh" v-html="labelRefresh" />
				</slot>
			</div>
			<slot></slot>
			<div class="infinite-layer" v-if="enableInfinite">
				<slot name="infinite">
					<div class="infinite-preloader"></div>
					<div v-html="labelLoading" />
				</slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			offset: {
				type: Number,
				default: 44,
			},
			enableInfinite: {
				type: Boolean,
				default: true,
			},
			enableRefresh: {
				type: Boolean,
				default: true,
			},
			onRefresh: {
				type: Function,
				default: undefined,
				required: false,
			},
			onInfinite: {
				type: Function,
				default: undefined,
				require: false,
			},
			labelUp: {
				type: String,
				default: 'Release to Refresh',
			},
			labelDown: {
				type: String,
				default: 'Pull Down to Refresh',
			},
			labelRefresh: {
				type: String,
				default: 'Refreshing...',
			},
			labelLoading: {
				type: String,
				default: 'Loading...',
			},
		},
		data() {
			return {
				top: 0,
				state: 0, // 0:down, 1: up, 2: refreshing
				startY: 0,
				touching: false,
				infiniteLoading: false,
			};
		},
		methods: {
			touchStart(e) {
				this.startY = e.targetTouches[0].pageY;
				this.startScroll = this.$el.scrollTop || 0;
				this.touching = true;
			},
			touchMove(e) {
				if (!this.enableRefresh || this.$el.scrollTop > 0 || !this.touching) {
					return;
				}

				const diff = e.targetTouches[0].pageY - this.startY - this.startScroll;

				if (diff > 0) {
					e.preventDefault();
				}

				this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0);

				if (this.state === 2) {
					// in refreshing
					return;
				}

				if (this.top >= this.offset) {
					this.state = 1;
				} else {
					this.state = 0;
				}
			},
			touchEnd(e) {
				if (!this.enableRefresh) {
					return;
				}

				this.touching = false;

				if (this.state === 2) {
					// in refreshing
					this.state = 2;
					this.top = this.offset;

					return;
				}

				if (this.top >= this.offset) {
					// do refresh
					this.refresh();
				} else {
					// cancel refresh
					this.state = 0;
					this.top = 0;
				}
			},
			refresh() {
				this.state = 2;
				this.top = this.offset;

				if (this.onRefresh) {
					this.onRefresh(this.refreshDone);
				}

				this.$emit('refresh', this.refreshDone);
			},
			refreshDone() {
				this.state = 0;
				this.top = 0;
			},

			infinite() {
				this.infiniteLoading = true;

				if (this.onInfinite) {
					this.onInfinite(this.infiniteDone);
				}

				this.$emit('infinite', this.infiniteDone);
			},

			infiniteDone() {
				this.infiniteLoading = false;
			},

			onScroll(e) {
				if (!this.enableInfinite || this.infiniteLoading) {
					return;
				}

				const outerHeight = this.$el.clientHeight;
				const innerHeight = this.$el.querySelector('.scroll-inner').clientHeight;
				const scrollTop = this.$el.scrollTop;
				const ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-to-refresh-layer').clientHeight : 0;
				const infiniteHeight = this.$el.querySelector('.infinite-layer').clientHeight;
				const bottom = innerHeight - outerHeight - scrollTop - ptrHeight;

				if (bottom < infiniteHeight) {
					this.infinite();
				}
			},
		},
		computed: {
			scrollClasses() {
				return {
					'pull-down': (this.state === 0),
					'pull-up': (this.state === 1),
					'refreshing': (this.state === 2),
					'touching': this.touching,
				};
			},
		},
	};
</script>
