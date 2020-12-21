<template>
	<view class="request-item">
		<view class="request-item-header">
			<view v-show="dataArr.title !== ''" class="title">{{ dataArr.title }}</view>
			<view :class="'request-status ' + setStatus">{{ checkStatus }}</view>
			<view class="time">{{ dataArr.createTime }}</view>
		</view>
		<slot></slot>
		<view class="tag tag__base" :class="typeStyle">{{ checkType }}</view>
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
					createTime: '',
					requestType: '',
					startTime: '',
					endTime: '',
					lengthOfTime: 0
				};
			}
		}
	},
	computed: {
		checkStatus() {
			switch (this.dataArr.status) {
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
		checkType() {
			switch (this.dataArr.applyType) {
				case 1:
					return '请假';
				case 2:
					return '改班';
				case 3:
					return '调班';
				case 4:
					return '加班';
			}
		},
		typeStyle() {
			switch (this.dataArr.applyType) {
				case 1:
					return 'tag__base';
				case 2:
					return 'tag__success';
				case 3:
					return 'tag__warning';
				case 4:
					return 'tag__error';
			}
		},
		setStatus() {
			switch (this.dataArr.status) {
				case 1:
					return 'request-status_pass';
				case 2:
					return 'request-status_refuse';
				default:
					return '';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.request-item {
	position: relative;
	margin-top: 1em;
	overflow: hidden;

	.tag {
		position: absolute;
		right: -1.6em;
		bottom: -0.3em;
		width: 5em;
		padding: 0.5em;
		color: #fff;
		transform: rotate(-45deg);
		text-align: center;
		vertical-align: top;
		box-shadow: 0 0.2em 0.2em hsl(0, 0, 20%);
	}

	.tag__base {
		background-color: $base-color;
	}

	.tag__success {
		background-color: $uni-color-success;
	}

	.tag__warning {
		background-color: $uni-color-warning;
	}

	.tag__error {
		background-color: $uni-color-error;
	}
}
</style>
