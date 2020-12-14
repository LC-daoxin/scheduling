<template>
	<request-list :label-config="overTime" :list="requestList" :url="requestUrl"></request-list>
</template>

<script>
	import RequestList from '@/components/RequestList.vue'
	import {
		overTime
	} from '@/utils/requestListConfig.js'

	export default {
		name: 'Overtime',
		data() {
			return {
				overTime,
				requestUrl: '/pages/tabbar/workbench/Overtime/OvertimeRequest',
				requestList: [{
					status: 0,
					requestTime: '11-30 10:45',
					timeLen: '2小时',
					requestStart: '2020-12-01',
					requestEnd: '2020-12-02'
				}]
			};
		},
		components: {
			RequestList
		}
	};
</script>
