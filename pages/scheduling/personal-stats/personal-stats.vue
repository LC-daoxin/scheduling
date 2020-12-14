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
		<view class="content">
			<view class="statistics">
				<view class="statistics-item">
					<view class="name">总工时</view>
					<view class="time">745小时</view>
				</view>
				<view class="statistics-item">
					<view class="name">加班</view>
					<view class="time">108小时</view>
				</view>
				<view class="statistics-item">
					<view class="name">请假</view>
					<view class="time">50小时</view>
				</view>
			</view>
			<view class="table">
				<t-table>
					<t-tr>
						<t-th>班种</t-th>
						<t-th>个数</t-th>
						<t-th>工作(小时)</t-th>
					</t-tr>
					<t-tr v-for="item in tableList" :key="item.id">
						<t-td>{{ item.class }}</t-td>
						<t-td>{{ item.num }}</t-td>
						<t-td>{{ item.time }}</t-td>
					</t-tr>
				</t-table>
			</view>
		</view>
	</view>
</template>

<script>
	import { getCountDays } from '@/utils/index';
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	export default {
		components: {
			tTable,
			tTh,
			tTr,
			tTd
		},
		data() {
			return {
				dateStart: this.getDate('First'),
				dateEnd: this.getDate('Last'),
				tableList: [{
						id: 0,
						class: '白班',
						num: '15',
						time: '109'
					},
					{
						id: 1,
						class: '夜班',
						num: '21',
						time: '241'
					},
					{
						id: 2,
						class: '晚班',
						num: '29',
						time: '304'
					},
					{
						id: 3,
						class: '行政',
						num: '8',
						time: '64'
					}
				]
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
		
	}
</style>
