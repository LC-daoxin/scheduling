<template>
	<view class="s-table-box">
		<view class="table__fixed-columns">
			<view class="table__fixed-common"
				:style="{
					display: 'flex',
					width: firstColWidth + 'px',
					height: (minHeight[1] || minHeight[0]) + 'rpx',
					textAlign: textAlign,
					justifyContent: textAlign === 'center' ? textAlign : (textAlign === 'left' ? 'flex-start' : 'flex-end'),
					alignItems: 'center',
					color: headerFtColor,
					backgroundColor: headerBgColor,
					borderBottom: showBorder ? '1px solid' + borderColor : 'none'
				}"
			>
				<view class="table__fixed-text">
					已发布
				</view>
			</view>
			<!-- 固定列（除表头） -->
			<scroll-view class="table__fixed-others" scroll-y :throttle="false" :debounce="false" :scroll-top="scrollTop"
				:style="{
					height: tableHeight - (minHeight[1] || minHeight[0]) + 'rpx'
				}"
			>
				<view class="table__fixed-item" v-for="(content, cindex) in contents" :key="cindex"
					:style="{
						display: 'flex',
						width: firstColWidth + 'px',
						minHeight: minHeight[0] + 'rpx',
						textAlign: textAlign,
						justifyContent: textAlign === 'center' ? textAlign : (textAlign === 'left' ? 'flex-start' : 'flex-end'),
						alignItems: 'center',
						backgroundColor: firstColBgColor,
						borderBottom: showBorder ? '1px solid' + borderColor : 'none'
					}"
				>
					{{ content.userName }}
				</view>
			</scroll-view>
			<!-- 固定列（除表头） -->
		</view>
		<scroll-view scroll-x scroll-y :throttle="false" :debounce="false" :scroll-left="scrollLeft" @touchmove.stop.prevent>
			<view class="s-table-header"
				:style="{
					marginLeft: firstColWidth + 'px'
				}"
			>
				<view class="s-table-header-item" v-for="(item, index) in headers" :key="item.key"
					:style="{
						display: 'flex',
						flexDirection: 'column',
						width: defaultColWidth + 'px',
						minHeight: (minHeight[1] || minHeight[0]) + 'rpx',
						textAlign: textAlign,
						justifyContent: textAlign === 'center' ? textAlign : (textAlign === 'left' ? 'flex-start' : 'flex-end'),
						alignItems: 'center',
						color: headerFtColor,
						backgroundColor: headerBgColor,
						borderBottom: showBorder ? '1px solid' + borderColor : 'none'
					}"
				>
					<view class="week"
						:style="{
							color: '#6a6a6a',
							width: defaultColWidth + 'px',
							height: (minHeight[1] || minHeight[0])/2*0.8 + 'rpx',
							lineHeight: (minHeight[1] || minHeight[0])/2*0.8 + 'rpx'
						}"
					>{{item.label[0]}}</view>
					<view class="day"
						:style="{
							color: (item.label[0] === '六' || item.label[0] === '日') ? 'red' : headerFtColor,
							width: defaultColWidth + 'px',
							height: (minHeight[1] || minHeight[0])/2*0.8 + 'rpx',
							lineHeight: (minHeight[1] || minHeight[0])/2*0.8 + 'rpx'
						}"
					>
						{{ item.label[1]}}
					</view>
				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-x scroll-y @scroll="scroll"  :scroll-left="selectLeft">
			<view class="s-table-content"
				:style="{
					marginLeft: firstColWidth + 'px',
					height: tableHeight - (minHeight[1] || minHeight[0]) + 'rpx'
				}"
			>
				<view class="s-table-content-line" v-for="(content, cIndex) in contents" :key="cIndex">
					<view class="s-table-content-item" v-for="(header, hIndex) in headers" :key="header.key"
						:style="{
							minWidth: defaultColWidth + 'px',
							maxWidth: defaultColWidth + 'px',
							minHeight: minHeight[0] + 'rpx',
							textAlign: textAlign,
							justifyContent: textAlign === 'center' ? textAlign : (textAlign === 'left' ? 'flex-start' : 'flex-end'),
							color: autoContentColor(cIndex, hIndex),
							backgroundColor: autoContentBgColor(cIndex, hIndex),
							borderTop: checkedItem(cIndex, hIndex) ? '1px solid' + checkedColor : 'none',
							borderLeft: checkedItem(cIndex, hIndex) ? '1px solid' + checkedColor : 'none',
							borderBottom: showBorder && !checkedItem(cIndex, hIndex) ?  '1px solid' + borderColor : (checkedItem(cIndex, hIndex) ? '1px solid' + checkedColor : 'none'),
							borderRight: showBorder && !checkedItem(cIndex, hIndex) ?  '1px solid' + borderColor : (checkedItem(cIndex, hIndex) ? '1px solid' + checkedColor : 'none')
						}"
						@click="handleTableItem(cIndex, hIndex)"
					>
						<view class="s-table-content-item-text" v-for="item in autoContentItem(cIndex, hIndex)">
							{{ item }}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<u-popup v-model="setPopupShow" zIndex="1" :maskShow="false" :customStyle="customStyle" :mask="false" mode="bottom" safe-area-inset-bottom>
			<view class="setBox">
				<view class="header">
					<view class="list">
						<view class="icon-box">
							<text class="iconfont icon-xin"></text>
							<text class="text">期望排班</text>
						</view>
						<view class="icon-box">
							<text class="iconfont icon-zidonghua"></text>
							<text class="text">自动排班</text>
						</view>
						<view class="icon-box">
							<text class="iconfont icon-qingkong"></text>
							<text class="text">清空排班</text>
						</view>
					</view>
					<view class="downBtn" @click="close">
						<text class="iconfont icon-xiangxia"></text>
					</view>
				</view>
				<view class="content">
					<view class="left-content">
						<view class="left-box">
							<text class="iconfont icon-zuhe"></text>
							<text class="text">组合</text>
						</view>
						<view class="left-box">
							<text class="iconfont icon-shanchu"></text>
							<text class="text">删除</text>
						</view>
					</view>
					<view class="right-content">
						<swiper class="class-swiper" :indicator-dots="indicatorDots" :autoplay="autoplay">
							<swiper-item v-for="(page, pIndex) in pages" :key="pIndex">
								<view class="swiper-page">
									<view class="swiper-page-item" v-for="(item, Index) in page" :key="Index" @click="selectClass">
										<view class="text" v-if="item.name">{{ item.name }}</view>
										<view class="text" v-else><text class="iconfont icon-jia"></text></view>
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollLeft: 0,
				selectLeft: 0,
				scrollTop: 0,
				contentsSort: this.contents.slice(),
				setPopupShow: true, // 控制面板显示
				currentCIndex: null,
				currentHIndex: null,
				customStyle: { // popup自定义样式
					top: 0
				},
				indicatorDots: true,
				autoplay: false,
				classList: [{
					name: '夜班',
					time: [{
						startTime: '24:00',
						endTime: '06:00'
					}]
				},{
					name: '白班',
					time: [{
						startTime: '08:00',
						endTime: '16:00'
					}]
				},{
					name: '晚班',
					time: [{
						startTime: '16:00',
						endTime: '24:00'
					}]
				},{
					name: '行政',
					time: [{
						startTime: '08:00',
						endTime: '12:00'
					},{
						startTime: '14:00',
						endTime: '18:00'
					}]
				},{
					name: '休息',
					time: [{
						startTime: '00:00',
						endTime: '24:00'
					}]
				},{
					name: '培训',
					time: [{
						startTime: '14:00',
						endTime: '16:00'
					}]
				},{
					name: '管床',
					time: [{
						startTime: '12:00',
						endTime: '18:00'
					}]
				},{
					name: '外出',
					time: [{
						startTime: '08:00',
						endTime: '18:00'
					}]
				},{
					name: '外出2',
					time: [{
						startTime: '08:00',
						endTime: '18:00'
					}]
				}]
			};
		},
		props: {
			tableHeight: {
				type: Number,
				default: 600
			},
			headers: {
				type: Array
			},
			contents: {
				type: Array,
				default: []
			},
			emptyString: {
				type: String,
				default: '-'
			},
			firstColWidth: {
				type: Number,
				default: 75
			},
			defaultColWidth: {
				type: Number,
				default: 50
			},
			minHeight: {
				type: Array,
				default() {
					return [100, 120]
				}
			},
			textAlign: {
				type: String,
				default: 'center'
			},
			headerBgColor: {
				type: String,
				default: '#fff'
			},
			contentBgColor: {
				type: String,
				default: '#fff'
			},
			firstColBgColor: {
				type: String,
				default: '#f9f9f9'
			},
			headerFtColor: {
				type: String,
				default: '#3e3e3e'
			},
			contentFtColor: {
				type: String,
				default: '#3e3e3e'
			},
			showBorder: {
				type: Boolean,
				default: true
			},
			borderColor: {
				type: String,
				default: '#f1f1f1'
			},
			checkedColor: {
				type: String,
				default: '#1cb7f1'
			}
		},
		computed: {
			// 自动设置单独项的背景颜色
			autoContentBgColor() {
				return function(cIndex, hIndex) {
					let result = this.contentBgColor
					let content = this.contentsSort[cIndex]
					let header = this.headers[hIndex]
					return result
				}
			},
			autoContentColor() {
				return function(cIndex, hIndex) {
					let result = this.contentFtColor
					let content = this.contentsSort[cIndex]
					let header = this.headers[hIndex]
					return result
				}
			},
			// 处理排班表 Data
			autoContentItem() {
				return function(cIndex, hIndex) {
					let content = this.contentsSort[cIndex].content
					let header = this.headers[hIndex]
					let key;
					let result = '';
					if (header.key[0] === '0') {
						key = header.key[1]
					} else {
						key = header.key
					}
					if (content[key - 1]) {
						result = content[key - 1].workspeciName
					} else {
						result = this.emptyString
					}
					return result
				}
			},
			screenWidth() {
				return `${uni.getSystemInfoSync()['screenWidth']}px`
			},
			// 点击选中的Item
			checkedItem() {
				let that = this
				return function(cIndex, hIndex) {
					if (cIndex === that.currentCIndex && hIndex === that.currentHIndex) {
						return true
					} else {
						return false
					}
				}
			},
			pages() {
				const pages = [];
				this.classList.push({type: 'Add'})
				this.classList.forEach((item, index) => {
					const page = Math.floor(index / 8);
					if(!pages[page]) {
						pages[page] = [];
					}
					pages[page].push(item);
				})
				return pages
			}
		},
		mounted () {
			let Info = uni.getSystemInfoSync();
			//#ifdef MP-WEIXIN
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			let titleBarHeight = menuButtonInfo.bottom - Info.statusBarHeight + (menuButtonInfo.top - Info.statusBarHeight); // 胶囊按钮高度
			this.customStyle.top = Info.safeArea.height - titleBarHeight - 150 - 4 + 'px';
			//#endif
			//#ifdef H5
			this.customStyle.top = Info.screenHeight - 150 + 'px'
			//#endif
		},
		methods: {
			scroll (e) {
				const scrollLeft = e.detail.scrollLeft;
				const scrollTop = e.detail.scrollTop;
				this.scrollLeft = scrollLeft;
				this.scrollTop = scrollTop;
			},
			// 点击单人单个排班Item
			handleTableItem (cIndex, hIndex) {
				if (!this.setPopupShow) {
					this.setPopupShow = true;
				}
				this.currentCIndex = cIndex;
				this.currentHIndex = hIndex;
				let content = this.contentsSort[cIndex];
				let header = this.headers[hIndex];
				let result = '';
				if (header.key === 'name') {
					result = content[header.key];
				} else if (content[header.key]) {
					result = content[header.key].category;
				} else {
					result = this.emptyString;
				}
			},
			// 选择班种
			selectClass () {
				if (!this.currentCIndex || !this.currentHIndex) {
					uni.showToast({
					    title: '请先选择单元格',
						icon: 'none',
					    duration: 1500
					});
				} else if (this.currentHIndex < this.headers.length) {
					this.currentHIndex += 1;
					this.scrollLeft += this.defaultColWidth;
					this.selectLeft = this.scrollLeft;
				}
			},
			close () {
				this.setPopupShow = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.s-table-box {
		position: relative;
		overflow: hidden;
		.table__fixed-columns {
			position: absolute;
			left: 0;
			background-color: #fff;
			z-index: 100;
			pointer-events: none; // 固定列不接受触摸，相当于滚动表格本身
			.table__fixed-common {
			}
			.table__fixed-others {
				.table__fixed-item {
					box-sizing: border-box;
				}
			}
			
		}
		.s-table-header {
			display: grid;
			grid-auto-flow: column;
			width: max-content;
			.s-table-header-item {
				flex: 1;
				box-sizing: border-box;
				.week {}
				.day {}
			}
		}
		.s-table-content {
			.s-table-content-line {
				display: grid;
				grid-auto-flow: column;
				width: max-content;
				position: relative;
				.s-table-content-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					box-sizing: border-box;
					.s-table-content-item-text {
						font-size: 24rpx;
					}
				}
			}
		}
		.setBox {
			display: flex;
			flex-direction: column;
			.header {
				height: 50px;
				display: flex;
				justify-content: space-between;
				width: 100%;
				border-bottom: 1px solid $border-color;
				.list {
					display: flex;
					align-items: center;
					width: 100%;
					.icon-box {
						width: 20%;
						height: 45px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						.iconfont {
							font-size: 32rpx;
							color: $text-color;
						}
						.text {
							font-size: 24rpx;
							color: $half-text-color;
						}
					}
				}
				.downBtn {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100rpx;
					margin: 10rpx 0;
					border-left: 1px solid $border-color;
					.icon-xiangxia {
						font-size: 40rpx;
						font-weight: 500;
						color: $half-text-color;
					}
				}
			}
			.content {
				width: 100%;
				min-height: 100px;
				display: flex;
				.left-content {
					background-color: #f9f9f9;
					width: calc((100% - 50px)/5);
					border-right: 1px solid $border-color;
					.left-box {
						width: 100%;
						height: 50px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						.iconfont {
							font-size: 32rpx;
							color: $text-color;
						}
						.text {
							font-size: 24rpx;
							color: $half-text-color;
						}
					}
				}
				.right-content {
					width: 100%;
					height: 100px;
					.class-swiper {
						height: 100%;
						.swiper-page {
							display: flex;
							flex-wrap:wrap;
							padding: 8rpx;
							height: 80px;
							.swiper-page-item {
								display: flex;
								justify-content: center;
								align-items: center;
								width: 25%;
								height: 34px;
								padding: 15rpx;
								.text {
									width: 100%;
									box-sizing: border-box;
									color: $text-color;
									border: 1px solid $border-color;
									border-radius: 5px;
									font-size: 24rpx;
									font-weight: 500;
									padding: 10rpx 30rpx;
									display: flex;
									justify-content: center;
									align-items: center;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
