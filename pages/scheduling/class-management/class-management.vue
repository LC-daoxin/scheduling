<template>
  <view class="wrap">
	<view class="header">默认班种</view>
	<uni-list class="classlist">
		<uni-list-item v-for="(item,index) in classlist" :key="index" :clickable="true" @click="goWorkItem(item)">
			<template slot="header">
				<view class="className"><text>{{ item.workName }}</text><text class="hour">{{ item.duration }}小时</text></view>
				<text class="time" v-for="time in item.timeInterval">{{ time }}</text>
			</template>
			<template slot="footer">
				<view class="footer-box">
					<view v-if="item.status === 1" class="openBtn">未启用</view>
				</view>
			</template>
		</uni-list-item>
	</uni-list>
	<navigator  url="/pages/scheduling/add-class/add-class?type=1">
		<button class="bottomBtn">添加班种</button>
	</navigator>
  </view>
</template>

<script>
	import { getWorkList } from '@/utils/index'
	export default {
		data() {
			return {
				classlist: []
			};
		},
		onShow() {
			getWorkList(this.getWorkListSucc, 2);
		},
		methods: {
			getWorkListSucc(res) {
				const { code, msg, data } = res.data;
				if (code === 'success') {
					if (data.length > 0) {
						data.forEach(item => {
							item.timeInterval = item.timeInterval.split(',')
						})
					}
					console.log(data)
					this.classlist = data;
				} else {
					uni.showToast({
						title: '系统错误',
						content: msg,
						icon: 'none',
						duration: 1500
					});
				}
			},
			goWorkItem (item) {
				console.log(item)
				uni.navigateTo({
				    url: `/pages/scheduling/add-class/add-class?pageType=2&id=${item.id}&duration=${item.duration}&workName=${item.workName}&workName=${item.workName}&timeInterval=${item.timeInterval}&status=${item.status}&type=${item.type}`
				});
			}
		}
	};
</script>

<style lang="scss">
	@import "@/components/tab-bar/tab-bar.scss";
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
			margin-top: 8rpx;
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
			display: inline-block;
			margin-right: 20rpx;
			font-size: 28rpx;
			color: $half-text-color;
		}
		.footer-box {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.openBtn {
				color: $half-text-color;
				border: 1px solid $half-text-color;
				padding: 5rpx 20rpx;
				height: 60rpx;
				border-radius: 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26rpx;
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
