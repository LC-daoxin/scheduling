<template>
	<request-list
		:label-config="askFromLeave"
		:list="requestList"
		:url="requestUrl"
	></request-list>
</template>

<script>
import RequestList from '@/components/RequestList.vue';
import { askFromLeave } from '@/utils/requestListConfig.js';
import { requestPost } from '@/utils/request.js';

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
			const postData = {
				applyType: '1'
			};

			requestPost('/apply/applyLeave', postData, res => {
				const { code, msg, data } = res.data;
				if (code === 'success') {
					this.requestList = data;
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
	mounted() {
		this.getList()
	},
	components: {
		RequestList
	}
};
</script>
