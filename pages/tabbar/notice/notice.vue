<template>
	<view class="wrap">
		<u-notice-bar
			class="notice"
			mode="horizontal"
			:list="notice"
			:more-icon="true"
		></u-notice-bar>
		<view class="tab-bar">
			<view class="tab-header">
				<view :class="'tab-header_item ' + isActiveTab(0)" @click="switchTab(0)">
					<text>全部</text>
				</view>
				<view :class="'tab-header_item ' + isActiveTab(1)" @click="switchTab(1)">
					<text>已读</text>
				</view>
				<view :class="'tab-header_item ' + isActiveTab(2)" @click="switchTab(2)">
					<text>待处理</text>
				</view>
			</view>
			<view class="tab-inner">
				<view class="tab-inner_item">
					<message-item :list="list"></message-item>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import MessageItem from './MessageItem';
import tabsContent from './tabsContent.js';
import { requestGet } from '@/utils/request.js';

export default {
	data() {
		return {
			list: [],
			current: 3,
			currentTabIndex: 0,
			notice: [
				'本月由于工程项目任务急项目截止时间紧，需要全体成员每天8点上班，晚上10点下班！'
			],
			tabsContent,
			currentTabs: 0,
			swiperCurrent: 0,
			clientHeight: 0
		};
	},
	methods: {
		switchTab(index) {
			this.currentTabIndex = index;
		},
		isActiveTab(index) {
			return this.currentTabIndex === index ? 'tab-header_item_active' : '';
		},
		// tabs通知swiper切换
		tabsChange(index) {
			this.swiperCurrent = index;
		},
		getNoticeList() {
			requestGet('/schedul/notifyList', res => {
				const { code, msg, data } = res.data;
				if (code === 'success') {
					this.list = data;
				} else {
					uni.showToast({
						title: '系统错误',
						content: msg,
						icon: 'none',
						duration: 1500
					});
				}
			});
    }
	},
	onShow() {
		this.getNoticeList();
	},
	components: {
		MessageItem
	}
};
</script>

<style lang="scss" scoped>
@import '../../../components/tab-bar/tab-bar.scss';

.wrap {
	height: calc(100vh - var(--window-top) - 50px);
}
</style>
