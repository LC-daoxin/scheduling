<template>
	<view class="request-item">
		<div class="request-item-header">
				<view v-show="dataArr.title !== ''" class="title">{{ dataArr.title }}</view>
				<view :class="'request-status ' + setStatus">{{ checkStatus }}</view>
				<view class="time">{{ dataArr.requestTime }}</view>
		</div>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			dataArr: {
				type: Object,
				default: () => {
					return {
						title: '',
						status: '',
						requestTime: '',
						requestType: '',
						startTime: '',
						endTime: '',
						lengthOfTime: 0
					}
				}
			}
			
		},
		computed: {
			checkStatus() {
				switch(this.dataArr.status) {
					case 0:
						return '待审批';
					case 1:
						return '已同意';
					case 2:
						return '已拒绝';
					default:
						return '';
				}
			},
			setStatus() {
				switch(this.dataArr.status) {
					case 1:
						return 'request-status_pass';
					case 2:
						return 'request-status_refuse';
					default:
						return '';
				}
			}
		}
	}
</script>
