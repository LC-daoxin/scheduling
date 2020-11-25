<template>
  <view class="wrap">
    <view class="tab-bar">
      <view class="tab-header">
		<view :class="'tab-header_item ' + isCurrentTab(0)" @click="switchTab(0)">人员</view>
		<view :class="'tab-header_item ' + isCurrentTab(1)" @click="switchTab(1)">统计</view>
      </view>
      <view class="tab-inner">
        <view v-show="currentTabIndex === 0" class="tab-inner_item">
			<u-alert-tips type="warning" :show-icon="true">
				<view class="desc">
					科室中有<text class='text_number'>5</text>人无法接收到排班发布通知。 <text class='text_go'>去查看</text>
				</view>
			</u-alert-tips>
        </view>
		<view v-show="currentTabIndex === 1" class="tab-inner_item">
			<u-alert-tips type="warning" :show-icon="true" :description="notice"></u-alert-tips>
		</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			currentTabIndex: 0,
			notice: '如统计数据有误，请先维护人员信息'
		};
	},
	mounted() {
		this.list = this.$store.state.vuex_tabbar;
	},
	methods: {
		isCurrentTab(index) {
			return this.currentTabIndex === index ? 'tab-header_item_active' : '';
		},
		switchTab(index) {
			this.currentTabIndex = index;
		}
	}
};
</script>

<style lang="scss">
	@import "../../../components/tab-bar/tab-bar.scss";
	.desc {
		font-size: 26rpx;
		text-align: left;
		color: #606266;
		.text_number {
			margin: 0 6rpx;
			font-weight: 500;
			color: $warning-color;
		}
		.text_go {
			font-weight: 500;
			text-decoration: underline;
			color: $warning-color;
		}
	}
</style>
