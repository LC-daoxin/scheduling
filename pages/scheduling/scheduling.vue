<template>
	<view>
		<view class="head">
			<view class="year">
				<picker start="2000" mode="date" fields="month" @change="bindDateChange">
					<text class="uni-calendar__header-text">{{ nowDate.year | showYear }}年</text>
					<text class="iconfont icon-xia1"></text>
				</picker>
			</view>
			<view class="selectMonth">
				<view class="select-btn-box" @click="pre">
					<text class="iconfont icon-xiangzuoyuanjiantouzuojiantouxiangzuomianxing"></text>
				</view>
				<text class="selectMonth-text">{{ currentStartDate + ' 至 ' + currentEndDate}}</text>
				<view class="select-btn-box" @click="next">
					<text class="iconfont icon-xiangzuoyuanjiantouzuojiantouxiangzuomianxing1"></text>
				</view>
			</view>
			<view class="publish">
				<view class="publishBtn" @click="publish">发布</view>
			</view>
		</view>
		<s-table ref="table" v-if="contents.length > 0" :headers="headers" :contents="contents" :nowDate="nowDate"></s-table>
		<view class="remark" @click="toRemark">
			<view class="remark-title">
				<text class="title">排班备注</text>
			</view>
			<view class="info-content">
				<text class="text">{{ remark }}</text>
				<view class="text-right">
					<text class="iconfont icon-xiangyou"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getWeek, getCountDays } from '@/utils/index';
	import { requestPost } from '@/utils/request.js';
	export default {
	    data() {
	        return {
				emptyString: '',
	            headers: [],
				contents: [],
				contents1: [
					{
						"userId": 2,
						"userName": "李雷",
						"gourpId": 1,
						"remark": "",
						"content": [{
							"schedulDate": "2020-12-01",
							"type": 1,
							"workspeciName": ["白班"]
						},{
							"schedulDate": "2020-12-03",
							"type": 1,
							"workspeciName": ["晚班","舞蹈"]
						},{
							"schedulDate": "2020-12-04",
							"type": 1,
							"workspeciName": ["晚班","白班"]
						},{
							"schedulDate": "2020-12-05",
							"type": 1,
							"workspeciName": ["唱歌","白班"]
						},{
							"schedulDate": "2020-12-06",
							"type": 1,
							"workspeciName": ["晚班","白班"]
						},{
							"schedulDate": "2020-12-07",
							"type": 1,
							"workspeciName": ["晚班","白班"]
						},{
							"schedulDate": "2020-12-08",
							"type": 1,
							"workspeciName": ["白班"]
						},{
							"schedulDate": "2020-12-12",
							"type": 1,
							"workspeciName": ["白班"]
						}]
					},{
						"userId": 2,
						"userName": "李雷",
						"gourpId": 1,
						"remark": "",
						"content": [{
							"schedulDate": "2020-12-01",
							"type": 1,
							"workspeciName": ["白班"]
						},{
							"schedulDate": "2020-12-03",
							"type": 1,
							"workspeciName": ["白班3"]
						},{
							"schedulDate": "2020-12-02",
							"type": 1,
							"workspeciName": ["晚班2"]
						},{
							"schedulDate": "2020-12-06",
							"type": 1,
							"workspeciName": ["培训"]
						},{
							"schedulDate": "2020-12-04",
							"type": 1,
							"workspeciName": ["晚班","舞蹈"]
						},{
							"schedulDate": "2020-12-10",
							"type": 1,
							"workspeciName": ["晚班"]
						},{
							"schedulDate": "2020-12-31",
							"type": 1,
							"workspeciName": ["晚班","舞蹈"]
						}]
					}
				],
				ColWidth: 50,
				firstColWidth: 60,
				nowDate: {
					year: '',
					month: '',
					day: ''
				},
				remark: '',
				currentStartDate: '',
				currentEndDate: ''
	        }
	    },
		filters: {
			showYear: function(val) {
				if (!val) return '';
				return val.toString().substring(2,4);
			}
		},
		computed: {
		    Info () {
		        return this.$store.state.Info
		    }
		},
		onShow() {
			this.initHeaders();
			this.initDate();
			this.getSchedulList();
			this.getRemark();
		},
		methods: {
			getSchedulList () {
				let postData = {
					'groupId': this.Info.groupInfo.id,
					'startTime': `${this.nowDate.year}-${this.nowDate.month}-01`,
					'endTime': `${this.nowDate.year}-${this.nowDate.month}-${this.nowDate.day}`,
				}
				requestPost('/schedul/SchedulList', postData, res => {
					const {code, msg, data} = res.data;
					if (code === 'success') {
						console.log(data)
						this.contents = data;
					} else {
						uni.showToast({
							title: '系统错误',
							content: msg,
							icon: 'none',
							duration: 1000
						})
					}
				})
			},
			getRemark () {
				let postData = {
					'months': `${this.nowDate.year}-${this.nowDate.month}`
				}
				requestPost('/schedul/getremark', postData, res => {
					const {code, msg, data} = res.data;
					if (code === 'success') {
						this.remark = data.remark;
					} else {
						uni.showToast({
							title: '系统错误',
							content: msg,
							icon: 'none',
							duration: 1000
						})
					}
				})
			},
			toRemark () {
				uni.navigateTo({
					url: '/pages/scheduling/remark/remark?year=' + this.nowDate.year + '&month=' + this.nowDate.month + '&remark=' + encodeURIComponent(JSON.stringify(this.remark))
				});
			},
			// 表头初始化-当月每日星期
			initHeaders() {
				let Info = uni.getSystemInfoSync();
				let screenWidth = Info.screenWidth;
				this.ColWidth = (screenWidth - this.firstColWidth)/7;
				let currentMonthNum = getCountDays(); // 一个月多少天
				console.log(currentMonthNum)
				for (let i = 1; i <= currentMonthNum; i++) {
					let week = getWeek(new Date('2020/11/' + i).getDay())
					let Day = i.toString().length === 1 ? '0' + i : i;
					this.headers.push({
						label: [week, i],
						key: Day
					})
				}
			},
			// 时间初始化
			initDate() {
				let currentDate = new Date;
				this.nowDate.year = currentDate.getFullYear();
				this.nowDate.month = currentDate.getMonth() + 1;
				this.nowDate.day = getCountDays();
				this.currentStartDate = `${this.nowDate.month}-01`;
				this.currentEndDate = `${this.nowDate.month}-${this.nowDate.day}`;
			},
			bindDateChange () {},
			pre() {},
			next() {},
			publish () {
				let that = this;
				uni.showModal({
				    title: '发布排班表',
				    content: `第一次发布会通知所有排班人员，后续发布仅通知排班变动的成员。`,
					cancelText: '保存',
					confirmText: '发布',
					confirmColor: '#5098ff',
				    success: function (res) {
				        if (res.confirm) {
							that.$refs.table.publish(that.Info.groupInfo.id, that.remark);
				        } else if (res.cancel) {
							console.log('保存')
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.head {
		height: 45px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		background-color: #fff;
		border-bottom: 1px solid $border-color;
		.year {
			display: flex;
			align-items: center;
			height: 45px;
			line-height: 45px;
			width: 20%;
			padding-left: 10px;
			font-size: 30rpx;
			font-weight: 500;
			.icon-xia1 {
				color: $light-color;
				font-size: 12px;
				margin-left: 5px;
			}
		}
		.selectMonth {
			display: flex;
			justify-content: center;
			align-items: center;
			.selectMonth-text {
				display: inline-block;
				height: 50px;
				line-height: 50px;
				font-size: 16px;
				font-weight: 400;
				margin: 0 20rpx;
			}
			.iconfont {
				color: #dee0e2;
				font-size: 22px;
			}
		}
		.publish {
			width: 20%;
			display: flex;
			flex-direction: row-reverse;
			.publishBtn {
				padding: 0 20rpx 0 30rpx;
				background-color: $base-color;
				color: #fff;
				height: 25px;
				line-height: 25px;
				border-top-left-radius: 25px;
				border-bottom-left-radius: 25px;
				font-size: 26rpx;
			}
		}
	}
	.table {
		position: fixed;
		top: 100rpx;
		left: 0;
	}
	.remark {
		width: 100%;
		padding: 20rpx 20rpx 26rpx;
		background-color: #fff;
		margin-top: 16rpx;
		.remark-title {
			display: flex;
			align-items: center;
			.title {
				font-size: 28rpx;
				font-weight: 400;
			}
		}
		.info-content {
			display: flex;
			flex-direction: space-between;
			padding: 24rpx 0 0;
			color: $half-text-color;
			font-size: 26rpx;
			.text {
				flex: 1;
			}
			.text-right {
				width: 20px;
				color: $light-color;
				.icon-xiangyou {
					color: $light-color;
				}
			}
		}
	}
</style>
