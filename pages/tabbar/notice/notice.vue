<template>
	<view class="wrap">
		<u-notice-bar
			class="notice"
			mode="vertical"
			no-list-hidden="暂无科室公告"
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
			notice: [],
			tabsContent,
			currentTabs: 0,
			swiperCurrent: 0,
			clientHeight: 0
		};
	},
	computed: {
	    Info () {
	        return this.$store.state.Info
	    }
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
		},
		setNoticeList() {
			uni.getStorage({
				key: 'notice',
				success: res => {
					this.notice = res.data.officeList;
					console.log(this.notice)
				}
			});
		}
	},
	onShow() {
		if (!this.Info.userInfo.groupId) {
			uni.reLaunch({
			    url: '/pages/departments/department-list/department-list'
			});
		} else {
			this.getNoticeList();
			this.setNoticeList();
		}
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
