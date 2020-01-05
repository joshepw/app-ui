<template>
	<div class="tab-container">
		<div class="tabs-navigation">
			<a href="javascript:;" :class="{'active': index === mutableActive}" v-for="(item, index) in items"
				:key="item.id" v-html="item.title" @click="onClick(index)"></a>
		</div>
		<div class="tabs">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			active: {
				type: Number,
				default: 0
			},
			style: {
				type: String,
				default: 'default'
			}
		},
		data() {
			return {
				mutableActive: this.active,
				items: []
			}
		},
		methods: {
			onClick(active) {
				this.mutableActive = active;

				this.$children.forEach((c) => {
					c.setShow && c.setShow(false)
				});

				this.$children[this.mutableActive].setShow(true);
			}
		}
	}
</script>