<template>
	<request-list
		:label-config="requestAdjust"
		:list="list"
		:url="requestUrl"
	></request-list>
</template>

<script>
import RequestList from '@/components/RequestList.vue';
import { requestAdjust } from '@/utils/requestListConfig.js';
import { formRequestList } from '@/utils/index.js';

export default {
	name: 'Overtime',
	data() {
		return {
			requestAdjust,
			requestUrl: '/pages/tabbar/workbench/RequestAdjust/RequestAdjustRequest',
			list: []
		};
	},
	methods: {
		getListSuccess(res) {
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
		}
	},
	onShow() {
		formRequestList(this.getListSuccess);
	},
	components: {
		RequestList
	}
};
</script>

<style lang="scss" scoped>
::v-deep .request-list {
	height: calc(100vh - 5.5em) !important;
}
</style>
