<template>
		<request-list :label-config="askFromLeave" :list="requestList" :url="requestUrl"></request-list>
</template>

<script>
import RequestList from '@/components/RequestList.vue'
import {askFromLeave} from '@/utils/requestListConfig.js'

export default {
	name: 'Overtime',
	data() {
		return {
			askFromLeave,
			requestUrl: '/pages/tabbar/workbench/AskForLeave/AskForLeaveRequest',
			requestList: [
				{
					leaveType: '婚假',
					startDate: '2020-11-30',
					endDate: '2020-12-01',
					timeLen: '24',
					requestTime: '11-30 10:45',
					status: 0
				}
			]
		};
	},
	methods: {
		getList() {
			const postData = {
				gourpId: '',
				applyType: '1',
				status: ''
			};
			uni.request({
				url: t.$Url + '/apply/applyList',
				method: 'post', //请求方式
				data: postData,
				success: res => {
					console.log(res);
				},
				fail: error => {
					console.log(error);
				}
			});
		}
	},
	components: {
		RequestList
	}
};
</script>
