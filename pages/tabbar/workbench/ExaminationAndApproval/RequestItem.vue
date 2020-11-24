<template>
	<view class="request-item">
		<div class="request-item-header">
				<view class="title">{{ data.title }}</view>
				<view :class="'request-status ' + setStatus">{{ checkStatus }}</view>
				<view class="time">{{ data.requestTime }}</view>
		</div>
		<view class="request-item-content">请假类型：{{ data.requestType }}</view>
		<view class="request-item-content">开始日期：{{ data.startTime }}</view>
		<view class="request-item-content">结束日期：{{ data.endTime }}</view>
		<view class="request-item-content">请假时长：{{ data.lengthOfTime }}天</view>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
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
				switch(this.data.status) {
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
				switch(this.data.status) {
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

<style scoped>
	.request-item {
		position: relative;
		padding: 1em;
		background-color: #fff;
		border-radius: 0.4em;
	}
	
	.request-item-header {
		display: flex;
		align-items: center;
		margin-bottom: 0.5em;
	}
	
	.request-item-header .title {
		font-size: 0.85rem;
	}
	
	.request-item-header .time {
		position: absolute;
		right: 1em;
		color: #999;
	}
	
	.request-status {
		font-size: 0.5em;
		padding: 0.4em;
		border-radius: 0.4em;
		color: #fff;
		background-color: #2979ff;
		margin-left: 1em;
	}
	
	.request-status_pass {
		background-color: rgb(112, 191, 99);
	}
	
	.request-status_refuse {
		background-color: rgb(225, 78, 57);
	}
	
	.request-item-content {
		color: #666;
		letter-spacing: 0.07em;
	}
</style>
