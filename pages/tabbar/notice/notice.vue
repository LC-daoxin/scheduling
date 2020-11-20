<template>
	<view class="wrap">
		<u-notice-bar class="notice" mode="horizontal" :list="notice" :more-icon="true"></u-notice-bar>
		<view class="uTabs">
			<u-tabs-swiper ref="uTabs" :list="tabslist" :current="currentTabs" @change="tabsChange" :is-scroll="false"
			 swiperWidth="750"></u-tabs-swiper>
			 <u-line color="#dbdfdf"></u-line>
		</view>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" :style="{height: clientHeight + 'px'}">
			<swiper-item class="swiper-item" v-for="(tabsitem, index) in tabsContent" :key="index">
				<scroll-view scroll-y @scrolltolower="onreachBottom">
					<view :class="{'imgHead': true, 'no_read': !item.readStatus, 'read': item.readStatus}" v-for="(item, index) in tabsitem.msgList">
						<view class="imgBox">
							<view :style="{background:item.color}" v-if="item.userImgUrl === null" class="text">{{ item.userName }}</view>
							<image v-else src="item.userImgUrl"></image>
						</view>
						<view class="contentBox">
							<view class="contentBoxHead">
								<view class="contentBoxHead_title">#{{ item.groupName }}</view>
								<view class="contentBoxHead_time">{{ item.sendTime }}</view>
							</view>
							<view class="contentBoxTitle">
								{{ item.Title }}
							</view>
							<view class="contentBoxText">
								{{ item.content }}
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- <u-tabbar v-model="current" height="56px" :list="list" inactive-color="#7A7E83" active-color="#5098ff" :mid-button="true"></u-tabbar> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				current: 3,
				notice: [
					'本月由于工程项目任务急项目截止时间紧，需要全体成员每天8点上班，晚上10点下班！'
				],
				tabsContent: [{
					Type: '全部',
					msgList: [
						{
							userImgUrl: null,
							userName: '晓峰',
							color: '#19BE6B',
							groupName: '统一工作流PaaS化项目组',
							readStatus: false,
							sendTime: '2020-10-11 16:45:31',
							startTime: '2020-10-12 00:00:00',
							endTime: '2020-10-30 18:00:00',
							Title: '十一加班通知',
							content: '本月由于工程项目任务急项目截止时间紧，需要全体成员每天8点上班，晚上10点下班',
							msgNumber: 12
						},
						{
							userImgUrl: null,
							userName: '熊飞',
							color: '#2B85E4',
							groupName: '统一工作流PaaS化项目组',
							readStatus: true,
							sendTime: '2020-10-11 16:45:31',
							startTime: '2020-10-12 00:00:00',
							endTime: '2020-10-30 18:00:00',
							Title: '十一加班通知',
							content: '本月由于工程项目任务急项目截止时间紧，需要全体成员每天8点上班，晚上10点下班',
							msgNumber: 12
						},
						{
							userImgUrl: null,
							userName: '熊飞',
							color: '#2B85E4',
							groupName: '统一工作流PaaS化项目组',
							readStatus: true,
							sendTime: '2020-10-11 16:45:31',
							startTime: '2020-10-12 00:00:00',
							endTime: '2020-10-30 18:00:00',
							Title: '十一加班通知',
							content: '本月由于工程项目任务急项目截止时间紧，需要全体成员每天8点上班，晚上10点下班',
							msgNumber: 12
						},
						{
							userImgUrl: null,
							userName: '熊飞',
							color: '#2B85E4',
							groupName: '统一工作流PaaS化项目组',
							readStatus: true,
							sendTime: '2020-10-11 16:45:31',
							startTime: '2020-10-12 00:00:00',
							endTime: '2020-10-30 18:00:00',
							Title: '十一加班通知',
							content: '本月由于工程项目任务急项目截止时间紧，需要全体成员每天8点上班，晚上10点下班',
							msgNumber: 12
						},
						{
							userImgUrl: null,
							userName: '亚垚',
							color: '#b8620a',
							groupName: '统一工作流PaaS化项目组',
							readStatus: true,
							sendTime: '2020-10-11 16:45:31',
							startTime: '2020-10-12 00:00:00',
							endTime: '2020-10-30 18:00:00',
							Title: '十一加班通知',
							content: '本月由于工程项目任务急项目截止时间紧，需要全体成员每天8点上班，晚上10点下班',
							msgNumber: 12
						}
					]
				}, {
					Type: '已读',
					msgList: [
						{
							userImgUrl: null,
							userName: '晓峰',
							color: '#19BE6B',
							groupName: '统一工作流PaaS化项目组',
							readStatus: false,
							sendTime: '2020-10-11 16:45:31',
							startTime: '2020-10-12 00:00:00',
							endTime: '2020-10-30 18:00:00',
							Title: '十一加班通知',
							content: '本月由于工程项目任务急项目截止时间紧，需要全体成员每天8点上班，晚上10点下班',
							msgNumber: 12
						}
					]
				}, {
					Type: '待处理',
					msgList: [
						{
							userImgUrl: null,
							userName: '晓峰',
							color: '#19BE6B',
							groupName: '统一工作流PaaS化项目组',
							readStatus: true,
							sendTime: '2020-10-11 16:45:31',
							startTime: '2020-10-12 00:00:00',
							endTime: '2020-10-30 18:00:00',
							Title: '十一加班通知',
							content: '本月由于工程项目任务急项目截止时间紧，需要全体成员每天8点上班，晚上10点下班',
							msgNumber: 12
						},
						{
							userImgUrl: null,
							userName: '熊飞',
							color: '#2B85E4',
							groupName: '统一工作流PaaS化项目组',
							readStatus: true,
							sendTime: '2020-10-11 16:45:31',
							startTime: '2020-10-12 00:00:00',
							endTime: '2020-10-30 18:00:00',
							Title: '十一加班通知',
							content: '本月由于工程项目任务急项目截止时间紧，需要全体成员每天8点上班，晚上10点下班',
							msgNumber: 12
						}
					]
				}],
				tabslist: [{
					name: '全部'
				}, {
					name: '未读'
				}, {
					name: '待处理'
				}],
				currentTabs: 0,
				swiperCurrent: 0,
				clientHeight: 0
			};
		},
		mounted () {
			this.list = this.$store.state.vuex_tabbar
		},
		onReady () {
			let that = this
			const systemRes = uni.getSystemInfoSync();
			let h1, h2;
			uni.createSelectorQuery().in(this).select('.uTabs').boundingClientRect(result => {
				h1 = result.height
		　　 }).exec()
			uni.createSelectorQuery().in(this).select('.notice').boundingClientRect(result => {
				h2 = result.height
				this.clientHeight = systemRes.screenHeight - h1 - h2
		　　 }).exec()
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
			}
		}
	}
</script>

<style lang="scss">
	.wrap {
		height: calc(100vh - var(--window-top));
		.swiper-item {
			height: 500px;
			.no_read {
				color: #333;
			}
			.read {
				color: #ccc;
			}
			.imgHead {
				display: flex;
				align-items: center;
				flex-direction: row;
				.imgBox {
					width: 75px;
					height: 70px;
					display: flex;
					justify-content: center;
					align-items: center;
					.text {
						width: 40px;
						height: 40px;
						border-radius: 50%;
						color: #FFF;
						font-weight: 500;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
				.contentBox {
					display: flex;
					flex-direction: column;
					box-sizing: border-box;
					padding: 8px 10px 0;
					height: 70px;
					width: calc(100% - 75px);
					border-bottom: 1px solid #dbdfdf;
					.contentBoxHead {
						display: flex;
						align-items: center;
						flex-direction: row;
						justify-content: space-between;
						width: 100%;
						font-size: 12px;
					}
					.contentBoxTitle {
						font-size: 14px;
					}
					.contentBoxText {
						font-size: 12px;
						overflow: hidden;    
						text-overflow:ellipsis;    
						white-space: nowrap;
						width: 90%;
					}
				}
			}
		}
	}
</style>
