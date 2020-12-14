<template>
	<request-list :label-config="requestAdjust" :list="requestList" :url="requestUrl"></request-list>
</template>

<script>
import RequestList from '@/components/RequestList.vue'
import {
	requestAdjust
} from '@/utils/requestListConfig.js'

export default {
	name: 'Overtime',
	data() {
		return {
			requestAdjust,
			requestUrl: '/pages/tabbar/workbench/RequestAdjust/RequestAdjustRequest',
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
		RequestList
	}
};
</script>
