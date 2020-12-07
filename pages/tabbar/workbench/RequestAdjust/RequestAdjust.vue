<template>
	<div class="overtime">
		<navigator
			url="/pages/tabbar/workbench/RequestAdjust/RequestAdjustRequest"
			v-for="(item, index) of requestList"
			class="nav-item"
			:key="index"
		>
			<request-item :dataArr="item">
				<view class="request-item-content">日期：{{ item.overtimeDate }}</view>
				<view class="request-item-content">时长：{{ item.lenOfTime }}</view>
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
			requestUrl: '/pages/tabbar/workbench/Overtime/OvertimeRequest',
			requestList: [
				{
					status: 0,
					requestTime: '11-30 10:45',
					lenOfTime: '2小时',
					overtimeDate: '2020-12-01 至 2020-12-02'
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
