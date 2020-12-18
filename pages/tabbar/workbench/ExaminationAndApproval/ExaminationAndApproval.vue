<template>
	<view class="tab-bar">
		<u-toast ref="uToast" />
		<view class="tab-header">
			<view :class="'tab-header_item ' + isCurrentTab(0)" @click="switchTab(0)"
				>待审批</view
			>
			<view :class="'tab-header_item ' + isCurrentTab(1)" @click="switchTab(1)"
				>已审批</view
			>
		</view>
		<view class="filter">
			<lb-picker class="lb-picker" v-model="filterType" :list="typeList">
				<view class="picker-text">
					{{ filterType }}
					<text class="triangle"></text>
				</view>
			</lb-picker>
			<lb-picker class="lb-picker" v-model="filterDate" :list="dateList">
				<view class="picker-text">
					{{ filterDate }}
					<text class="triangle"></text>
				</view>
			</lb-picker>
		</view>
		<view class="tab-inner">
			<view class="tab-inner_item">
				<request-item
					v-for="(request, requestIndex) of requestList"
					:key="requestIndex"
					:dataArr="request"
					@click.native="verify(request)"
				>
					<view class="request-item-content">请假类型：{{ request.requestType }}</view>
					<view class="request-item-content">开始日期：{{ request.startTime }}</view>
					<view class="request-item-content">结束日期：{{ request.endTime }}</view>
					<view class="request-item-content">请假时长：{{ request.lengthOfTime }}天</view>
				</request-item>
			</view>
			<!-- <view class="tab-inner_item" v-show="currentTabIndex === 1">
				<request-item
					v-for="(verified, verifiedIndex) of verifiedList"
					:key="verifiedIndex"
					:dataArr="verified"
				>
					<view class="request-item-content">请假类型：{{ verified.requestType }}</view>
					<view class="request-item-content">开始日期：{{ verified.startTime }}</view>
					<view class="request-item-content">结束日期：{{ verified.endTime }}</view>
					<view class="request-item-content"
						>请假时长：{{ verified.lengthOfTime }}天</view
					>
				</request-item>
			</view> -->
		</view>
		<popup :title="popupTitle" ref="popup">
			<view class="request-detail">{{ requestDetail }}</view>
			<view class="button-group">
				<button class="button button--primary" @click="save">同意</button>
				<button class="button button--danger" @click="save">拒绝</button>
			</view>
		</popup>
	</view>
</template>

<script>
import { requestPost } from '@/utils/request.js';
import LbPicker from '@/components/lb-picker';
import popup from '@/components/popup/popup.vue';
import RequestItem from '@/components/request-item/RequestItem.vue';
import dateList from './dateList.js';
import verifiedList from './verifiedList.js';

export default {
	data() {
		return {
			currentTabIndex: 0,
			popupTitle: '',
			requestDetail:
				'我把衣服放进微波炉里烘干，结果衣服着火了。我需要请假一天，在家救火。',
			filterType: '全部类型',
			filterDate: '全部日期',
			typeList: ['全部类型', '调班申请', '请假申请'],
			dateList,
			requestList: [],
			verifiedList
		};
	},
	methods: {
		isCurrentTab(index) {
			return this.currentTabIndex === index ? 'tab-header_item_active' : '';
		},
		switchTab(index) {
			this.currentTabIndex = index;
		},
		verify(request) {
			this.popupTitle = request.title;
			this.$refs.popup.open();
		},
		getList() {
			requestPost('/apply/approveList', { status: 0 }, res => {
				const { code, msg, data } = res.data;
				if (code === 'success') {
					this.requestList = data;
				} else {
					this.$refs.uToast.show({
						title: msg,
						type: 'error'
					});
				}
			});
		}
	},
	mounted() {
		this.getList();
	},
	components: {
		LbPicker,
		popup,
		RequestItem
	}
};
</script>

<style lang="scss" scoped>
@import '@/components/tab-bar/tab-bar.scss';

.tab-bar {
	.tab-inner {
		height: calc(100vh - 9.25em);
		background-color: $bg-color;

		.tab-inner_item {
			.request-item + .request-item {
				margin-top: 0.8em;
			}
		}
	}

	.tab-header {
		border-bottom: 0;
	}
}

.filter {
	display: flex;
	background-color: rgb(248, 248, 248);

	.lb-picker {
		flex: 1;
		text-align: center;
	}

	.picker-text {
		padding: 1em 0;
	}
}

.request-detail {
	color: #666;
	margin: 0.7em 0;
	line-height: 1.3;
	letter-spacing: 0.05em;
	text-indent: 1rem;
}
</style>
