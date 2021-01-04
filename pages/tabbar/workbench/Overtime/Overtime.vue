<template>
	<request-list :label-config="overTime" :list="requestList" :url="requestUrl"></request-list>
</template>

<script>
	import RequestList from '@/components/RequestList.vue'
	import {
		overTime
	} from '@/utils/requestListConfig.js'
	import { requestPost } from '@/utils/request.js'

	export default {
		name: 'Overtime',
		data() {
			return {
				overTime,
				requestUrl: '/pages/tabbar/workbench/Overtime/OvertimeRequest',
				requestList: []
			};
		},
		methods: {
			getList() {
				requestPost('/apply/applyList', { applyType: '4' }, res => {
					const {code, msg, data} = res.data
					if (code === 'success') {
						this.requestList = data
					} else {
						uni.showToast({
							title: '系统错误',
							content: msg,
							icon: 'none',
							duration: 1000
						})
					}
				})
			}
		},
		onShow() {
			this.getList()
		},
		components: {
			RequestList
		}
	};
</script>
