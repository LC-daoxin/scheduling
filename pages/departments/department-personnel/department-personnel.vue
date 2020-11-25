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
			<mine-card></mine-card>
			<button class="bottomBtn"  open-type="share" :data-title="shareInfo.title" :data-imgurl="shareInfo.imgurl" :data-path="shareInfo.path">邀请成员</button>
        </view>
		<view v-show="currentTabIndex === 1" class="tab-inner_item">
			<u-alert-tips type="warning" :show-icon="true" :description="notice"></u-alert-tips>
		</view>
      </view>
    </view>
  </view>
</template>

<script>
	import mineCard from './mine-card.vue'
	export default {
		data() {
			return {
				list: [],
				currentTabIndex: 0,
				notice: '如统计数据有误，请先维护人员信息',
				shareInfo: {
					title: `超级排班邀请您加入'内科一组'，赶快点击加入吧！`,
					imgurl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-scheduling/7341daa0-2eeb-11eb-880a-0db19f4f74bb.png',
					path: '/pages/tabbar/home/home?user=123'
				}
			};
		},
		onShareAppMessage(data) {
			console.log(data)
		    let dataset = data.target.dataset  
		    return {  
		        title: dataset.title,  
		        imageUrl: dataset.imgurl,  
		        path: dataset.path  
		    }  
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
		},
		components: {
			mineCard
		}
	};
</script>

<style lang="scss">
	@import "../../../components/tab-bar/tab-bar.scss";
	.tab-inner {
		padding: 0 !important;
	}
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
	.bottomBtn {
		padding-bottom: constant(safe-area-inset-bottom);/* 兼容 iOS < 11.2 */
		padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
		background-color: $base-color;
		border-radius: 0;
		color: #fff;
		font-weight: 500;
		width: 100%;
		position: fixed;
		bottom: 0;
	}
</style>
