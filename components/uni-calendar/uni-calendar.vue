<template>
	<view class="uni-calendar-body">
		<view class="uni-calendar">
			<view v-if="!insert&&show" class="uni-calendar__mask" :class="{'uni-calendar--mask-show':aniMaskShow}" @click="clean"></view>
			<view v-if="insert || show" class="uni-calendar__content" :class="{'uni-calendar--fixed':!insert,'uni-calendar--ani-show':aniMaskShow}">
				<view v-if="!insert" class="uni-calendar__header uni-calendar--fixed-top">
					<view class="uni-calendar__header-btn-box" @click="close">
						<text class="uni-calendar__header-text uni-calendar--fixed-width">取消</text>
					</view>
					<view class="uni-calendar__header-btn-box" @click="confirm">
						<text class="uni-calendar__header-text uni-calendar--fixed-width">确定</text>
					</view>
				</view>
				<view class="uni-calendar__header">
					<view class="uni-calendar__header_selectTime">
						<picker start="2000" mode="date" :value="date" fields="month" @change="bindDateChange">
							<text class="uni-calendar__header-text">{{ (nowDate.year||'') +'年'+( nowDate.month||'') +'月'}}</text>
							<text class="iconfont icon-xia1"></text>
						</picker>
					</view>
					<view class="uni-calendar__header_selectTime"></view>
					<view v-if="Info.userInfo && Info.userInfo.groupRole !== 0" class="uni-calendar__toScheduling" @click="toScheduling">排班管理</view>
				</view>
				<view class="uni-calendar__box">
					<view v-if="showMonth" class="uni-calendar__box-bg">
						<text class="uni-calendar__box-bg-text uni-calendar__Month">{{nowDate.month}}</text>
					</view>
					<view v-if="showWeek" class="uni-calendar__box-bg">
						<text class="uni-calendar__box-bg-text uni-calendar__Week">{{nowDate.date}}</text>
					</view>
					<view class="uni-calendar__weeks">
						<view class="uni-calendar__weeks-day">
							<text class="uni-calendar__weeks-day-text">日</text>
						</view>
						<view class="uni-calendar__weeks-day">
							<text class="uni-calendar__weeks-day-text">一</text>
						</view>
						<view class="uni-calendar__weeks-day">
							<text class="uni-calendar__weeks-day-text">二</text>
						</view>
						<view class="uni-calendar__weeks-day">
							<text class="uni-calendar__weeks-day-text">三</text>
						</view>
						<view class="uni-calendar__weeks-day">
							<text class="uni-calendar__weeks-day-text">四</text>
						</view>
						<view class="uni-calendar__weeks-day">
							<text class="uni-calendar__weeks-day-text">五</text>
						</view>
						<view class="uni-calendar__weeks-day">
							<text class="uni-calendar__weeks-day-text">六</text>
						</view>
					</view>
					<view class="uni-calendar__weeks" v-for="(item,weekIndex) in weeks" :key="weekIndex">
						<view class="uni-calendar__weeks-item" v-for="(weeks,weeksIndex) in item" :key="weeksIndex">
							<calendar-item :weeks="weeks" :calendar="calendar" :selected="selected" :lunar="lunar" @change="choiceDate"></calendar-item>
						</view>
					</view>
					<view class="line-box">
						<view class="line-circle" @click="changeMonthWeek">
							<text :class="{iconfont: true, 'icon-xiangxia': !showMonth, 'icon-xiangshang': showMonth}"></text>
						</view>
					</view>
				</view>
				<view class="current-plan">
					<view v-if="!calendar.extraInfo" class="no-plan">暂无排班</view>
					<view v-else class="plan" v-for='item in calendar.extraInfo.data'>
						<view class="plan-title">{{ item.type }}</view>
						<view class="plan-time">{{ item.time }}</view>
					</view>
					<text v-if="Info.userInfo" class="uni-calendar__scheduling uni-calendar__Btn" @click="toScheduling">全科排班表</text>
					<text v-if="Info.userInfo" class="uni-calendar__remark uni-calendar__Btn" @click="openRemark">排班备注</text>
				</view>
			</view>
		</view>
		<u-popup class="remark-popup" v-model="showRemark" mode="bottom" height="260px" :closeable="true">
			<view class="header">
				排班备注
			</view>
			<textarea class="remark" v-model="remark" placeholder="无" :maxlength="500"/>
		</u-popup>
	</view>
</template>

<script>
	import Calendar from './util.js';
	import calendarItem from './uni-calendar-item.vue'
	import { requestPost } from '@/utils/request';
	export default {
		components: {
			calendarItem
		},
		props: {
			date: {
				type: String,
				default: ''
			},
			selected: {
				type: Array,
				default () {
					return []
				}
			},
			lunar: {
				type: Boolean,
				default: false
			},
			startDate: {
				type: String,
				default: ''
			},
			endDate: {
				type: String,
				default: ''
			},
			range: {
				type: Boolean,
				default: false
			},
			insert: {
				type: Boolean,
				default: true
			},
			clearDate: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				showMonth: true,
				showWeek: false,
				show: false,
				weeks: [],
				calendar: {},
				nowDate: '',
				aniMaskShow: false,
				showRemark: false, // 显示排班备注
				remark: ''
			}
		},
		computed: {
		    Info () {
		        return this.$store.state.Info
		    }
		},
		watch: {
			date(newVal) {
				this.cale.setDate(newVal)
				this.init(this.cale.selectDate.fullDate)
			},
			startDate(val){
				this.cale.resetSatrtDate(val)
			},
			endDate(val){
				this.cale.resetEndDate(val)
			},
			selected(newVal) {
				this.cale.setSelectInfo(this.nowDate.fullDate, newVal)
				this.hideLast()
				// this.weeks = this.cale.weeks
			}
		},
		created() {
			// 获取日历方法实例
			this.cale = new Calendar({
				// date: new Date(),
				selected: this.selected,
				startDate: this.startDate,
				endDate: this.endDate,
				range: this.range,
			})
			// 选中某一天
			this.cale.setDate(this.date)
			// setDay
			this.init(this.cale.selectDate.fullDate)
		},
		methods: {
			// 跳转到排班管理
			toScheduling () {
				uni.navigateTo({
				    url: '/pages/scheduling/scheduling'
				});
			},
			// 打开排班备注
			openRemark () {
				this.showRemark = true;
				let postData = {
					'months': this.nowDate.fullDate.substring(0,7)
				}
				requestPost('/schedul/getremark', postData, res => {
					const {code, msg, data} = res.data;
					if (code === 'success' && data) {
						if (data && data.remark) {
							this.remark = data.remark;
						}
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
			// 取消穿透
			clean() {},
			bindDateChange(e) {
				const value = e.detail.value + '-1';
				this.cale.setDate(value)
				this.init(value)
				let date =  this.cale.getDate(value);
				let months = date.year + '-' + date.month
				uni.$emit('UserSchedulList', months);
			},
			/**
			 * 初始化日期显示
			 * @param {Object} date
			 */
			init(date) {
				this.nowDate = this.calendar = this.cale.getInfo(date)
				this.hideLast()
				// this.currentWeek()
			},
			// 刷新日历，并隐藏最后无用的一行
			hideLast () {
				if (this.cale.weeks[Object.getOwnPropertyNames(this.cale.weeks).length - 1][0].disable) {
					delete this.cale.weeks[Object.getOwnPropertyNames(this.cale.weeks).length - 1]
					this.weeks = this.cale.weeks
				} else {
					this.weeks = this.cale.weeks // 刷新了日历
				}
			},
			/**
			 * 打开日历弹窗
			 */
			open() {
				// 弹窗模式并且清理数据
				if (this.clearDate && !this.insert) {
					this.cale.cleanMultipleStatus()
					this.cale.setDate(this.date)
					this.init(this.cale.selectDate.fullDate)
				}
				this.show = true
				this.$nextTick(() => {
					setTimeout(() => {
						this.aniMaskShow = true
					}, 50)
				})
			},
			/**
			 * 关闭日历弹窗
			 */
			close() {
				this.aniMaskShow = false
				this.$nextTick(() => {
					setTimeout(() => {
						this.show = false
						this.$emit('close')
					}, 300)
				})
			},
			/**
			 * 确认按钮
			 */
			confirm() {
				this.setEmit('confirm')
				this.close()
			},
			/**
			 * 变化触发
			 */
			change() {
				if (!this.insert) return
				this.setEmit('change')
			},
			/**
			 * 选择月份触发
			 */
			monthSwitch() {
				let {
					year,
					month
				} = this.nowDate
				this.$emit('monthSwitch', {
					year,
					month: Number(month)
				})
			},
			/**
			 * 派发事件
			 * @param {Object} name
			 */
			setEmit(name) {
				let {
					year,
					month,
					date,
					fullDate,
					lunar,
					extraInfo
				} = this.calendar
				this.$emit(name, {
					range: this.cale.multipleStatus,
					year,
					month,
					date,
					fulldate: fullDate,
					lunar,
					extraInfo: extraInfo || {}
				})
			},
			/**
			 * 选择天触发
			 * @param {Object} weeks
			 */
			choiceDate(weeks) {
				if (weeks.disable) return
				this.calendar = weeks
				// 设置多选
				this.cale.setMultiple(this.calendar.fullDate)
				if (this.showWeek) {
					this.currentWeek()
				} else if (this.showMonth) {
					this.weeks = this.cale.weeks
				}
				this.change()
			},
			/**
			 * 计算当前周
			 */
			currentWeek () {
				let CurretWeekNum = 0
				for (var i in this.cale.weeks) {
					for (var j = 0; j < this.cale.weeks[i].length; j++) {
						if (this.cale.weeks[i][j].isDay) {
							CurretWeekNum = i
							break;
						}
					}
				}
				this.weeks = [this.cale.weeks[CurretWeekNum]]
			},
			/**
			 * 上个月
			 */
			pre() {
				const preDate = this.cale.getDate(this.nowDate.fullDate, -1, 'month').fullDate
				this.setDate(preDate)
				this.monthSwitch()
			},
			/**
			 * 下个月
			 */
			next() {
				const nextDate = this.cale.getDate(this.nowDate.fullDate, +1, 'month').fullDate
				this.setDate(nextDate)
				this.monthSwitch()
			},
			/**
			 * 设置日期
			 * @param {Object} date
			 */
			setDate(date) {
				this.cale.setDate(date)
				this.weeks = this.cale.weeks
				this.nowDate = this.cale.getInfo(date)
			},
			/**
			 * 改变周模式-月模式
			 */
			changeMonthWeek () {
				this.showWeek = !this.showWeek
				this.showMonth = !this.showMonth
				if (this.showMonth) {
					this.weeks = this.cale.weeks
				} else {
					this.currentWeek()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/css/iconfont.css';
	@import '../../uni.scss';
	.uni-calendar-body {
		padding: 5px;
	}
	.uni-calendar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}
	.uni-calendar__mask {
		position: fixed;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		background-color: $uni-bg-color-mask;
		transition-property: opacity;
		transition-duration: 0.3s;
		opacity: 0;
		/* #ifndef APP-NVUE */
		z-index: 99;
		/* #endif */
	}

	.uni-calendar--mask-show {
		opacity: 1
	}

	.uni-calendar--fixed {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		transition-property: transform;
		transition-duration: 0.3s;
		transform: translateY(460px);
		/* #ifndef APP-NVUE */
		z-index: 99;
		/* #endif */
	}

	.uni-calendar--ani-show {
		transform: translateY(0);
	}

	.uni-calendar__content {
		background-color: #fff;
		border-radius: 10px;
	}

	.uni-calendar__header {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 50px;
		border-bottom-color: $uni-border-color;
		border-bottom-style: solid;
		border-bottom-width: 1px;
		.uni-calendar__header_selectTime {
			min-width: 115px;
			margin-left: 10px;
			display: flex;
			justify-content: center;
			align-items: center;
			.icon-xia1 {
				color: #ccc;
				font-size: 12px;
				margin-left: 5px;
			}
		}
	}
	.uni-calendar__header_selectWeek {
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		.selectWeek-text {
			display: inline-block;
			height: 50px;
			line-height: 50px;
			font-size: 16px;
			font-weight: 400;
		}
		.iconfont {
			color: #ccc;
			font-size: 22px;
		}
	}
	.uni-calendar--fixed-top {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		border-top-color: $uni-border-color;
		border-top-style: solid;
		border-top-width: 1px;
	}

	.uni-calendar--fixed-width {
		width: 50px;
		// padding: 0 15px;
	}

	.uni-calendar__toScheduling {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		right: 20rpx;
		top: 25rpx;
		padding: 5px 10px;
		height: 25px;
		font-size: 12px;
		color: $base-color;
		border: 1px solid $base-color;
		border-radius: 25px;
		background-color: #fff;
	}

	.uni-calendar__header-text {
		text-align: center;
		width: 100px;
		// font-size: $uni-font-size-base;
		font-size: 18px;
		font-weight: 400;
		color: $uni-text-color;
	}

	.uni-calendar__header-btn-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 50px;
	}

	.uni-calendar__header-btn {
		width: 10px;
		height: 10px;
		border-left-color: $uni-text-color-placeholder;
		border-left-style: solid;
		border-left-width: 2px;
		border-top-color: $uni-color-subtitle;
		border-top-style: solid;
		border-top-width: 2px;
	}

	.uni-calendar--left {
		transform: rotate(-45deg);
	}

	.uni-calendar--right {
		transform: rotate(135deg);
	}


	.uni-calendar__weeks {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.uni-calendar__weeks-item {
		flex: 1;
	}

	.uni-calendar__weeks-day {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 45px;
		// border-bottom-color: #F5F5F5;
		// border-bottom-style: solid;
		// border-bottom-width: 1px;
	}

	.uni-calendar__weeks-day-text {
		font-size: 14px;
		color: #7f8285;
	}

	.uni-calendar__box {
		position: relative;
	}

	.uni-calendar__box-bg {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.uni-calendar__box-bg-text {
		font-weight: bold;
		color: $uni-text-color-grey;
		opacity: 0.1;
		text-align: center;
		/* #ifndef APP-NVUE */
		line-height: 1;
		/* #endif */
	}
	.uni-calendar__Month {
		font-size: 200px;
	}
	.uni-calendar__Week {
		font-size: 100px;
	}
	.line-box {
	    position: relative;
	    text-align: center;
	    overflow: hidden;
		height: 50px;
	    font-size: 14px;
	    color: #999;
		.line-circle {
			position: relative;
			.iconfont {
				position: absolute;
				font-weight: bold;
				transform: translateX(-50%) translateY(120%);
			}
		}
		.line-circle::before{
			content: '';
			width: 30px;
			height: 15px;
			position: absolute;
			border: 1px solid #ccc;
			border-radius: 0 0 30px 30px;
			border-top: 1px solid transparent;
			top: 25px;
			left: calc(50% - 16px);
		}
	}
	.line-box::before,.line-box::after{
	    content: '';
	    display: inline-block;
	    width: 100%;
	    height: 1px;
	    position: absolute;
	    background: #ccc;
	    top: 50%;
	}
	.line-box::after {
		transform: scaleY(0.5);
	}
	.line-box::before {
	    margin-left: -15px;
	    transform: translateX(-100%) scaleY(0.5);
	}
	.line-box::after{
	    margin-left: 15px;
	}
	.current-plan {
		min-height: 70px;
		position: relative;
		padding-bottom: 20rpx;
		.no-plan {
			text-align: center;
			font-size: 14px;
			color: #ccc;
		}
		.plan {
			&:nth-child(2) {
				margin-top: 10rpx;
			}
			text-align: left;
			padding-left: 20px;
			position: relative;
			.plan-title {
				font-size: 32rpx;
				font-weight: 400;
			}
			.plan-time {
				font-size: 14px;
				color: #9ea1a1;
			}
		}
		.uni-calendar__scheduling {
			top: -15rpx;
		}
		.uni-calendar__remark {
			top: 55rpx;
		}
		.uni-calendar__Btn {
			position: absolute;
			right: 0;
			width: 85px;
			box-sizing: border-box;
			text-align: center;
			padding: 0 8px;
			height: 25px;
			line-height: 25px;
			font-size: 12px;
			border-top-left-radius: 25px;
			border-bottom-left-radius: 25px;
			color: $uni-text-color;
			background-color: $uni-bg-color-hover;
		}
	}
	.remark-popup {
		.header {
			width: 100%;
			height: 50px;
			display: flex;
			align-items: center;
			background-color: #f7f7f7;
			padding-left: 25rpx;
			font-size: 30rpx;
			color: $half-text-color;
		}
		.remark {
			width: 100%;
			height: 210px;
			background-color: #fff;
			box-sizing: border-box;
			padding: 30rpx;
			color: $text-color;
		}
	}
</style>
