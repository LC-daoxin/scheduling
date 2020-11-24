<template>
	<view class="wrap">
		<u-notice-bar class="notice" mode="horizontal" :list="notice" :more-icon="true"></u-notice-bar>
		<view class="tab">
			<view class="tab-header">
				<view :class="`tab-header_item ${isActiveTab(0)}`" @click="toogleTab(0)"><p>全部</p></view>
				<view :class="`tab-header_item ${isActiveTab(1)}`" @click="toogleTab(1)"><p>未读</p></view>
				<view :class="`tab-header_item ${isActiveTab(2)}`" @click="toogleTab(2)"><p>待处理</p></view>
			</view>
			<view class="tab-inner">
				<view class="tab-inner_item" v-for="(tabsitem, index) in tabsContent" :key="index" v-show="currentTabIndex === index">
					<view class="swiper-item" @click="msgDetail()">
						<view :class="{ imgHead: true, no_read: !item.readStatus, read: item.readStatus }" v-for="(item, index) in tabsitem.msgList">
							<view class="imgBox">
								<view :style="{ background: item.color }" v-if="item.userImgUrl === null" class="text">{{ item.userName }}</view>
								<image v-else src="item.userImgUrl"></image>
							</view>
							<view class="contentBox">
								<view class="contentBoxHead">
									<view class="contentBoxHead_title">#{{ item.groupName }}</view>
									<view class="contentBoxHead_time">{{ item.sendTime }}</view>
								</view>
								<view class="contentBoxTitle">{{ item.Title }}</view>
								<view class="contentBoxText">{{ item.content }}</view>
							</view>
						</view>
					</view>
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
			current: 3,
			notice: ['本月由于工程项目任务急项目截止时间紧，需要全体成员每天8点上班，晚上10点下班！'],
			tabsContent: [
				{
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
				},
				{
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
				},
				{
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
				}
			],
			tabslist: [
				{
					name: '全部'
				},
				{
					name: '未读'
				},
				{
					name: '待处理'
				}
			],
			currentTabs: 0,
			swiperCurrent: 0,
			clientHeight: 0
		};
	},
	mounted() {
		this.list = this.$store.state.vuex_tabbar;
	},
	methods: {
		msgDetail() {
			uni.navigateTo({
				url: '/pages/tabbar/notice/noticeDetail/noticeDetail'
			})
		},
		toogleTab(index) {
			this.currentTabIndex = index;
		},
		isActiveTab(index) {
			return this.currentTabIndex === index ? 'tab-header_item_active' : '';
		},
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
		onreachBottom() {}
	}
};
</script>

<style lang="scss">
.wrap {
	height: calc(100vh - var(--window-top) - 50px);

	.tab {
		.tab-header {
			display: flex;
			border-bottom: 1px solid #e6e6e6;

			.tab-header_item {
				flex: 1;
				font-size: 0.8rem;
				color: rgb(48, 49, 51);
				padding: 0.5em 0 0.6em 0;
				text-align: center;
				cursor: pointer;
			}
			.tab-header_item_active {
				position: relative;
				color: rgb(41, 121, 255);
				font-weight: bold;
			}
			.tab-header_item_active:after {
				content: '';
				position: absolute;
				left: 50%;
				bottom: 0.1em;
				width: 1.5em;
				height: 0.2em;
				border-radius: 2em;
				background-color: rgb(41, 121, 255);
				transform: translateX(-50%);
			}
		}
		.tab-inner {
			display: flex;
			height: calc(100vh - 12em);
			overflow: hidden auto;

			.tab-inner_item {
				width: 100vw;
			}
		}
	}

	.swiper-item {
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
					color: #fff;
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
					text-overflow: ellipsis;
					white-space: nowrap;
					width: 90%;
				}
			}
		}
	}
}
</style>
