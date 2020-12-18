<template>
 <view class="notice">
    <view class="left_icon">
      <text class="iconfont icon-laba" :style="'color: ' + colors + ';'"></text>
    </view>
    <view class="center_notice">
      <swiper class="notice_swiper" vertical easing-function="easeInOutCubic" autoplay interval="3000">
        <swiper-item v-for="(item,index) in noticeList" :key="index" class="sw_item">
		   <text class="sw_text">{{item.content}}</text>
        </swiper-item>
      </swiper>
    </view>
	<view class="right_icon">
	  <text class="iconfont icon-sanjiaoright"></text>
	</view>
</view>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},
  props: {
    colors: {
      type: String
    },
	noticeList:{
	  type:Array
	}
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
	@import '../../common/css/iconfont.css';
	.notice {
	  height: 80upx;
	  line-height: 80upx;
	  margin: 0 3%;
	  margin-top: 10upx;
	  padding: 0 10upx;
	  box-shadow: 0upx 0upx 10upx #eee;
	  border-radius: 8upx;
	  display: flex;
	  justify-content: space-between;
	}
	.left_icon {
	  height: 100%;
	  width: 10%;
	  // float: left;
	  padding-top: 3upx;
	}
	.left_icon .iconfont {
	  display: inline-block;
	  font-size: 44upx;
	}
	.center_notice {
	  // float: left;
	  // width: 80%;
	  flex-grow: 1;
	}
	.center_notice .notice_swiper{
	  height: 80upx;
	}
	.right_icon {
	  margin-top: 4upx;
	  width: 30upx;
	}
	.notice_swiper .sw_item {
	  height: 80upx;
	}
	.notice_swiper .sw_item .sw_text {
	  margin-top: 4upx;
	  font-size: 26upx;
	  color: #333;
	  display: inline-block;
	}
	.notice_swiper .sw_image {
	  width: 40upx;
	  height: 40upx;
	  float: right;
	  margin-top: 20upx;
	}
</style>