<template>
	<uni-popup ref="popup" type="bottom">
	  <view class="popup-inner">
			<view class="popup-inner_title">{{ title }}</view>
	    <slot></slot>
	  </view>
	</uni-popup>
</template>

<script>
	export default {
		props: {
			title: String
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
		padding-bottom: constant(safe-area-inset-bottom);/* 兼容 iOS < 11.2 */
		padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
    padding: 1em;
    font-size: 1.1em;
    font-weight: bold;
    background-color: #fff;
    border-radius: 0.8em 0.8em 0 0;

    .popup-inner_title {
      margin-bottom: 0.5em;
    }

    ::v-deep button {
      font-size: inherit;
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
