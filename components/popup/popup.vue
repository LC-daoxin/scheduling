<template>
	<uni-popup ref="popup" :type="position">
	  <view class="popup-inner">
			<view class="popup-inner_title">{{ title }}</view>
			<slot></slot>
	  </view>
	</uni-popup>
</template>

<script>
	export default {
		props: {
			title: String,
			position: {
				type: String,
				default: 'center'
			}
		},
		methods: {
			open() {
				this.$refs.popup.open();
			},
			close() {
				this.$refs.popup.close();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup-inner {
		width: 80vw;
		padding: 1em;
		font-size: 1.1em;
		background-color: #fff;
		border-radius: 0.8em;
		max-height: 90vh;
		overflow-y: auto;

		.popup-inner_title {
			color: #333;
			font-weight: bold;
			margin-bottom: 0.5em;
		}
			
		::v-deep button + button {
			margin-top: 0.4em;
		}

		::v-deep input {
			margin: 1em 0;
			padding: 0.4em;
			border: 1px solid #eee;
			border-radius: 0.4em;
		}
	}
</style>
