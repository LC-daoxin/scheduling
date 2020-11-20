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
						<!-- <view class="uni-calendar__header-btn-box" @click.stop="pre">
							<view class="uni-calendar__header-btn uni-calendar--left"></view>
						</view> -->
						<picker start="2000" mode="date" :value="date" fields="month" @change="bindDateChange">
							<text class="uni-calendar__header-text">{{ (nowDate.year||'') +'年'+( nowDate.month||'') +'月'}}</text>
							<text class="iconfont icon-xia1"></text>
						</picker>
						<!-- <view class="uni-calendar__header-btn-box" @click.stop="next">
							<view class="uni-calendar__header-btn uni-calendar--right"></view>
						</view> -->
					</view>
					<view class="uni-calendar__header_selectWeek">
						<view class="uni-calendar__header-btn-box" @click.stop="pre">
							<text class="iconfont icon-left-circle"></text>
						</view>
						<text class="selectWeek-text">{{ '第四'+ (nowDate.weeks||'') +'周'}}</text>
						<view class="uni-calendar__header-btn-box" @click.stop="next">
							<text class="iconfont icon-right-circle"></text>
						</view>
					</view>
					<view class="uni-calendar__header_selectTime"></view>
					<text class="uni-calendar__backtoday" @click="backtoday">回到今天</text>
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
							<text :class="{iconfont: true, 'icon-xiangxia': btnChange, 'icon-xiangshang': !btnChange}"></text>
						</view>
					</view>
				</view>
				<view class="current-plan">
					<view v-if="!calendar.extraInfo" class="no-plan">暂无排班</view>
					<view v-else class="plan">
						<view class="plan-title">{{ calendar.extraInfo.data.type }}</view>
						<view class="plan-time">{{ calendar.extraInfo.data.time }}</view>
						<text class="uni-calendar__scheduling">排班表</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Calendar from './util.js';
	import calendarItem from './uni-calendar-item.vue'
	/**
	 * Calendar 日历
	 * @description 日历组件可以查看日期，选择任意范围内的日期，打点操作。常用场景如：酒店日期预订、火车机票选择购买日期、上下班打卡等
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=56
	 * @property {String} date 自定义当前时间，默认为今天
	 * @property {Boolean} lunar 显示农历
	 * @property {String} startDate 日期选择范围-开始日期
	 * @property {String} endDate 日期选择范围-结束日期
	 * @property {Boolean} range 范围选择
	 * @property {Boolean} insert = [true|false] 插入模式,默认为false
	 * 	@value true 弹窗模式
	 * 	@value false 插入模式
	 * @property {Boolean} clearDate = [true|false] 弹窗模式是否清空上次选择内容
	 * @property {Array} selected 打点，期待格式[{date: '2019-06-27', info: '签到', data: { custom: '自定义信息', name: '自定义消息头',xxx:xxx... }}]
	 * @property {Boolean} showMonth 是否选择月份为背景
	 * @event {Function} change 日期改变，`insert :ture` 时生效
	 * @event {Function} confirm 确认选择`insert :false` 时生效
	 * @event {Function} monthSwitch 切换月份时触发
	 * @example <uni-calendar :insert="true":lunar="true" :start-date="'2019-3-2'":end-date="'2019-5-20'"@change="change" />
	 */
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
			// showMonth: {
			// 	type: Boolean,
			// 	default: false
			// },
			// showWeek: {
			// 	type: Boolean,
			// 	default: true
			// },
			clearDate: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				showMonth: false,
				showWeek: true,
				show: false,
				weeks: [],
				calendar: {},
				nowDate: '',
				aniMaskShow: false,
				btnChange: true // 图标 向上（week）向下 (month)
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
				this.weeks = this.cale.weeks
			}
		},
		created() {
			console.log(this.selected)
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
			this.init(this.cale.selectDate.fullDate)
			// this.setDay
		},
		methods: {
			// 取消穿透
			clean() {},
			bindDateChange(e) {
				const value = e.detail.value + '-1'
				console.log(this.cale.getDate(value));
				this.cale.setDate(value)
				this.init(value)
			},
			/**
			 * 初始化日期显示
			 * @param {Object} date
			 */
			init(date) {
				console.log(this.cale.weeks)
				this.currentWeek()
				this.nowDate = this.calendar = this.cale.getInfo(date)
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
				console.log(weeks)
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
			 * 回到今天
			 */
			backtoday() {
				this.showWeek = true
				this.showMonth = false
				let date = this.cale.getDate(new Date()).fullDate
				this.cale.setDate(date)
				this.init(date)
				this.change()
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
					this.btnChange = false
				} else {
					this.currentWeek()
					this.btnChange = true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/css/iconfont.css';
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

	.uni-calendar__backtoday {
		position: absolute;
		right: 0;
		top: 25rpx;
		padding: 0 5px;
		padding-left: 10px;
		height: 25px;
		line-height: 25px;
		font-size: 12px;
		border-top-left-radius: 25px;
		border-bottom-left-radius: 25px;
		color: $uni-text-color;
		background-color: $uni-bg-color-hover;
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
		height: 70px;
		.no-plan {
			text-align: center;
			font-size: 14px;
			color: #ccc;
		}
		.plan {
			text-align: left;
			padding-left: 20px;
			position: relative;
			.plan-title {
				font-size: 17px;
				font-weight: 400;
				margin-bottom: 5px;
			}
			.plan-time {
				font-size: 14px;
				color: #9ea1a1;
			}
			.uni-calendar__scheduling {
				position: absolute;
				right: 0;
				top: 20rpx;
				padding: 0 8px;
				padding-left: 10px;
				height: 25px;
				line-height: 25px;
				font-size: 12px;
				border-top-left-radius: 25px;
				border-bottom-left-radius: 25px;
				color: $uni-text-color;
				background-color: $uni-bg-color-hover;
			}
		}
	}
</style>
