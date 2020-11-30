<template>
	<div class="overtime">
		<navigator
			:url="requestUrl"
			v-for="(item, index) of requestList"
			class="nav-item"
			:key="index"
		>
			<request-item :dataArr="item">
				<view class="request-item-content">请假类型：{{ item.type }}</view>
				<view class="request-item-content">开始日期：{{ item.start }}</view>
				<view class="request-item-content">结束日期：{{ item.end }}</view>
				<view class="request-item-content">请假时长：{{ item.hours }}</view>
			</request-item>
		</navigator>
		<div class="button-container">
			<navigator :url="requestUrl">
				<button class="button button--primary">申请</button>
			</navigator>
		</div>
	</div>
</template>

<script>
import RequestItem from '@/components/request-item/RequestItem.vue';

export default {
	name: 'Overtime',
	data() {
		return {
      requestUrl: '/pages/tabbar/workbench/AskForLeave/AskForLeaveRequest',
			requestList: [
				{
          type: '婚假',
          start: '2020-11-30',
          end: '2020-12-01',
					hours: '24',
					requestTime: '11-30 10:45',
					status: 0
				}
			]
		};
	},
	components: {
		RequestItem
	}
};
</script>

<style lang="scss" scoped>
.overtime {
	height: calc(100vh - 10rem);
	padding: 1em 1em 2em;
	overflow: hidden auto;

	.button-container {
		position: absolute;
		width: calc(100vw - 2rem);
		bottom: 1rem;
	}

	.nav-item + .nav-item {
		margin-top: 0.5rem;
	}
}

::v-deep .request-status {
	margin-left: 0;
}
</style>
