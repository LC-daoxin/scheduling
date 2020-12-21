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
					<view v-if="request.applyType === 1">
						<view class="request-item-content">请假类型：{{ request.leaveType }}</view>
						<view class="request-item-content">开始日期：{{ request.applyDate }}</view>
						<view class="request-item-content">结束日期：{{ request.applyEndDate }}</view>
					</view>
					<view v-if="request.applyType === 2">
						<view class="request-item-content">改班日期：{{ request.applyDate }}</view>
						<view class="request-item-content">原班种：{{ request.workspeciName }}</view>
						<view class="request-item-content"
							>新班种：{{ request.senderSpeciName }}</view
						>
					</view>
					<view v-if="request.applyType === 3">
						<view class="request-item-content">调换对象：{{ request.changer }}</view>
						<view class="request-item-content"
							>调换班种：{{ request.changeSpeciName }}</view
						>
						<view class="request-item-content">调换日期：{{ request.applyEndDate }}</view>
						<view class="request-item-content"
							>申请班种：{{ request.senderSpeciName }}</view
						>
						<view class="request-item-content">申请日期：{{ request.applyDate }}</view>
					</view>
					<view v-if="request.applyType === 4">
						<view class="request-item-content">申请日期：{{ request.applyDate }}</view>
						<view class="request-item-content">加班时长：{{ request.duration }}小时</view>
						<view class="request-item-content">申请理由：{{ request.account }}</view>
					</view>
				</request-item>
			</view>
		</view>
		<popup :title="popupTitle" ref="popup">
			<view class="request-detail">{{ requestDetail }}</view>
			<view class="button-group">
				<button class="button button--primary" @click="approval(0)">同意</button>
				<button class="button button--danger" @click="approval(1)">拒绝</button>
			</view>
		</popup>
	</view>
</template>

<script>
import { requestPost, requestGet } from '@/utils/request.js';
import LbPicker from '@/components/lb-picker';
import popup from '@/components/popup/popup.vue';
import RequestItem from '@/components/request-item/RequestItem.vue';
import dateList from './dateList.js';

export default {
	data() {
		return {
			curId: '',
			currentTabIndex: 0,
			popupTitle: '',
			requestDetail: '',
			filterType: '全部类型',
			filterDate: '全部日期',
			typeList: ['全部类型', '调班申请', '请假申请'],
			dateList,
			requestList: []
		};
	},
	methods: {
		isCurrentTab(index) {
			return this.currentTabIndex === index ? 'tab-header_item_active' : '';
		},
		switchTab(index) {
			this.currentTabIndex = index;
			this.getList();
		},
		verify(request) {
			this.popupTitle = request.title;
			this.curId = request.id;
			this.requestDetail = request.account;
			this.$refs.popup.open();
		},
		getList() {
			requestPost('/apply/approveList', { type: this.currentTabIndex }, res => {
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
		},
		approval(val) {
			val === 0 ? this.agree() : this.refuse();
		},
		agree() {
			requestGet('/apply/pass/' + this.curId, res => {
				const { code, msg, data } = res.data;
				if (code === 'success') {
					this.$refs.uToast.show({
						title: '操作成功',
						type: 'success'
					});
					this.$refs.popup.close();
					this.getList();
				} else {
					this.$refs.uToast.show({
						title: msg,
						type: 'error'
					});
				}
			});
		},
		refuse() {
			requestGet('/apply/refuse/' + this.curId, res => {
				const { code, msg, data } = res.data;
				if (code === 'success') {
					this.$refs.uToast.show({
						title: '操作成功',
						type: 'success'
					});
					this.$refs.popup.close();
					this.getList();
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
		padding: 0 1em 1em;
		background-color: $bg-color;
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
