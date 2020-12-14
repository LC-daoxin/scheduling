<template>
  <view class="wrap">
    <view class="tab-bar">
      <view class="tab-header">
		<view :class="'tab-header_item ' + isCurrentTab(0)" @click="switchTab(0)">正在使用的组</view>
		<view :class="'tab-header_item ' + isCurrentTab(1)" @click="switchTab(1)">全部组</view>
      </view>
      <view class="tab-inner">
        <view v-show="currentTabIndex === 0" class="tab-inner_item">
			<view class="header">默认组</view>
			<uni-list class="classlist">
			    <uni-list-item v-for="(item,index) in classlist" :key="index" :clickable="true" @click="goInfo(item)">
					<template slot="header">
						<view class="className"><text>{{ item.name }}</text><text class="hour">{{ item.hour }}</text></view>
						<text class="time" v-for="time in item.timeList">{{time.startTime + '-' + time.endTime}}</text>
					</template>
				</uni-list-item>
			</uni-list>
			<button class="bottomBtn">添加班种</button>
        </view>
		<view v-show="currentTabIndex === 1" class="tab-inner_item">
			<button class="bottomBtn">添加组</button>
		</view>
      </view>
    </view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				classlist: [{
					name: '白班',
					id: 201001,
					hour: '7小时',
					timeList: [{
						startTime: '7:30',
						endTime: '14:30'
					}]
				},{
					name: '晚班',
					id: 201002,
					hour: '7小时',
					timeList: [{
						startTime: '16:30',
						endTime: '20:30'
					}]
				},{
					name: '夜班',
					id: 201003,
					hour: '7小时',
					timeList: [{
						startTime: '20:30',
						endTime: '4:30'
					}]
				},{
					name: '休息',
					id: 201004,
					hour: '7小时',
					timeList: [{
						startTime: '0:00',
						endTime: '24:00'
					}]
				},{
					name: '行政',
					id: 201005,
					hour: '7小时',
					timeList: [{
						startTime: '7:30',
						endTime: '12:00'
					},{
						startTime: '14:30',
						endTime: '18:00'
					}]
				}],
				currentTabIndex: 0
			};
		},
		methods: {
			isCurrentTab(index) {
				return this.currentTabIndex === index ? 'tab-header_item_active' : '';
			},
			switchTab(index) {
				this.currentTabIndex = index;
			},
			goInfo () {
				// uni.navigateTo({
				//     url: '/pages/personnel/personnel-info/personnel-info',
				// 	success: function(res) {
				// 		console.log(res)
				// 	}
				// });
			}
		}
	};
</script>

<style lang="scss">
	@import "@/components/tab-bar/tab-bar.scss";
	.tab-inner {
		padding: 0 !important;
		height: 100% !important;
		overflow-y: auto !important;
		.header {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			padding-left: 30rpx;
			color: $half-text-color;
			background-color: $border-color;
		}
		.classlist {
			display: block;
			.className {
				font-size: 32rpx;
				line-height: 32rpx;
				display: block;
				.hour {
					font-size: 24rpx;
					margin-left: 30rpx;
					color: $base-color;
					padding: 4rpx 16rpx;
					border-radius: 24rpx;
					background-color: $bg-color;
				}
			}
			.time {
				margin-right: 20rpx;
				font-size: 28rpx;
				color: $half-text-color;
			}
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
