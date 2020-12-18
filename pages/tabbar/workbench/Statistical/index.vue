<template>
	<view class="page">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="selectTime">
			<view class="startTime">
				<picker
					mode="date"
					:start="startDate"
					:end="endDate"
					@change="bindStartDateChange"
				>
					<text class="uni-input">{{ dateStart }}</text
					><text class="iconfont icon-xia1"></text>
				</picker>
			</view>
			<view>至</view>
			<view class="endTime">
				<picker mode="date" :start="startDate" :end="endDate" @change="bindEndDateChange">
					<text class="uni-input">{{ dateEnd }}</text
					><text class="iconfont icon-xia1"></text>
				</picker>
			</view>
		</view>
		<statistical-item></statistical-item>
	</view>
</template>

<script>
import { getCountDays, getDate } from '@/utils/index';
import StatisticalItem from './StatisticalItem.vue';

export default {
	data() {
		return {
			dateStart: this.getDate('First'),
			dateEnd: this.getDate('Last')
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	methods: {
		getDate,
		bindStartDateChange(e) {
			let changeDate = e.detail.value;
			if (new Date(changeDate) > new Date(this.dateEnd)) {
				this.$refs.uTips.show({
					title: '开始时间不能大于结束时间',
					type: 'error',
					duration: '1200'
				});
			} else {
				this.dateStart = e.detail.value;
			}
		},
		bindEndDateChange(e) {
			let changeDate = e.detail.value;
			if (new Date(changeDate) < new Date(this.dateStart)) {
				this.$refs.uTips.show({
					title: '结束时间不能小于开始时间',
					type: 'error',
					duration: '1200'
				});
			} else {
				this.dateEnd = e.detail.value;
			}
		}
	},
	components: {
		StatisticalItem
	}
};
</script>

<style lang="scss">
.selectTime {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80rpx;
	border-bottom: 1px solid $border-color;
	background-color: hsl(0, 0%, 97.25%);

	.startTime {
		margin-right: 20rpx;
	}
	.endTime {
		margin-left: 20rpx;
	}
	.iconfont {
		margin-left: 20rpx;
		font-size: 24rpx;
		color: $light-color;
	}
}
.content {
	padding: 30rpx;
	.statistics {
		margin: 20rpx 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		& .statistics-item:not(:first-child) {
			border-left: 1px solid $border-color;
		}
		.statistics-item {
			width: 33.33%;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.name {
				font-size: 28rpx;
				color: $half-text-color;
			}
			.time {
				margin-top: 10rpx;
				font-size: 36rpx;
				font-weight: 400;
				color: orange;
			}
		}
	}
	.table {
		margin-top: 40rpx;
	}
}
</style>
