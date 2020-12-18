<template>
	<view>
		<u-toast ref="uToast" />
		<request-list
			:label-config="askFromLeave"
			:list="requestList"
			:url="requestUrl"
		></request-list>
	</view>
</template>

<script>
import RequestList from '@/components/RequestList.vue';
import { askFromLeave } from '@/utils/requestListConfig.js';
import { formRequestList } from '@/utils/index.js';

export default {
	name: 'Overtime',
	data() {
		return {
			askFromLeave,
			requestUrl: '/pages/tabbar/workbench/AskForLeave/AskForLeaveRequest',
			requestList: []
		};
	},
	methods: {
		getList() {
			formRequestList('1', res => {
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
		this.getList()
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