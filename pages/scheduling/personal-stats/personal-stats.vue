<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="selectTime">
			<view class="startTime">
				<picker mode="date" :start="startDate" :end="endDate" @change="bindStartDateChange">
					<text class="uni-input">{{ dateStart }}</text><text class="iconfont icon-xia1"></text>
				</picker>
			</view>
			<view>至</view>
			<view class="endTime">
				<picker mode="date" :start="startDate" :end="endDate" @change="bindEndDateChange">
					<text class="uni-input">{{ dateEnd }}</text><text class="iconfont icon-xia1"></text>
				</picker>
			</view>
		</view>
	</view>
</template>

<script>
	import { getCountDays } from '@/utils/index';
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
		onReady() {
			
		},
		methods: {
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				} else if (type === 'First') {
					let day = 1
					return `${year}-${month}-${day}`
				} else if (type === 'Last') {
					let LastDay = getCountDays()
					return `${year}-${month}-${LastDay}`
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			bindStartDateChange (e) {
				let changeDate = e.detail.value
				if (new Date(changeDate) > new Date(this.dateEnd)) {
					this.$refs.uTips.show({
						title: '开始时间不能大于结束时间',
						type: 'error',
						duration: '1200'
					})
				} else {
					this.dateStart = e.detail.value;
				}
			},
			bindEndDateChange (e) {
				let changeDate = e.detail.value
				if (new Date(changeDate) < new Date(this.dateStart)) {
					this.$refs.uTips.show({
						title: '结束时间不能小于开始时间',
						type: 'error',
						duration: '1200'
					})
				} else {
					this.dateEnd = e.detail.value;
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
		.selectTime {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80rpx;
			border-bottom: 1px solid $border-color;
			.startTime {
				margin-right: 20rpx;
			}
			.endTime {
				margin-left: 20rpx;
			}
			.iconfont {
				margin-left: 10rpx;
				font-size: 24rpx;
				color: $border-color;
			}
		}
	}
</style>
