<template>
	<view class="wyb-table-box">
		<view v-if="loading" class="wyb-table-loading-box" :style="{
			width: width === 'auto' ? screenWidth : width,
			height: height === 'auto' ? '300rpx' : height,
			backgroundColor: loaderBgColor,
			borderTop: '1px solid' + borderColor,
			borderBottom: '1px solid' + borderColor,
			borderLeft: showLeftAndRightBorder ? '1px solid' + borderColor : 'none',
			borderRight: showLeftAndRightBorder ? '1px solid' + borderColor : 'none'}">
			<view class="loader-one" :style="{
				 width: loaderSize + 'rpx',
				 height: loaderSize + 'rpx',
				 borderTop: '3px solid ' + loadingColor.top,
				 borderRight: '3px solid ' + loadingColor.right,
				 borderBottom: '3px solid ' + loadingColor.bottom,
				 borderLeft: '3px solid ' + loadingColor.left}" />
		</view>
		<view v-if="!loading" class="wyb-table-scroll-view" :style="{
			width: width,
			height: height,
			borderTop: '1px solid' + borderColor,
			borderLeft: showLeftAndRightBorder ? '1px solid' + borderColor : 'none',
			borderRight: showLeftAndRightBorder ? '1px solid' + borderColor : 'none'}">
			<view class="wyb-table-header" :style="{borderBottom: '1px solid' + borderColor}">
				<view ref="iosBug" class="wyb-table-header-item" v-for="(item, index) in headers" :key="item.key"
				 :style="{
					 display: 'flex',
					 flexDirection: index === 0 ? false : 'column',
					 minWidth: index === 0 ? firstColWidth + 'px' : (item.width || defaultColWidth) + 'px',
					 maxWidth: index === 0 ? firstColWidth + 'px' : (item.width || defaultColWidth) + 'px',
					 minHeight: minHeight[0] + 'rpx',
					 textAlign: textAlign,
					 justifyContent: textAlign === 'center' ? textAlign : (textAlign === 'left' ? 'flex-start' : 'flex-end'),
					 fontSize: fontSize[0] + 'rpx',
					 fontWeight: headerWeight ? 'bold' : 'normal',
					 color: headerFtColor,
					 padding: index === 0 ? 0 : padding[0] + 'rpx ' + (padding[1] || padding[0]) + 'rpx',
					 backgroundColor: headerBgColor,
					 zIndex: index === 0 ? 20 : 0,
					 left: index === 0 && firstLineFixed ? 0 : 'auto',
					 position: index === 0 ? 'sticky' : 'static'}">
					 <view v-if="index !== 0" class="week">{{item.label[0] || emptyString}}</view>
					 <view v-if="index !== 0" class="day">
						 {{item.label[1] || emptyString}}
					 </view>
					 <view v-else>{{ item.label }}</view>
					 <!-- <view 
						v-else
						class="firstItem"
						:style="{
							display: 'flex',
							backgroundColor: headerBgColor,
							position: 'fixed',
							left: 0,
							flexDirection: index === 0 ? false : 'column',
							minWidth: index === 0 ? firstColWidth + 'px' : (item.width || defaultColWidth) + 'px',
							maxWidth: index === 0 ? firstColWidth + 'px' : (item.width || defaultColWidth) + 'px',
							minHeight: minHeight[0] + 'rpx',
							textAlign: textAlign,
							justifyContent: textAlign === 'center' ? textAlign : (textAlign === 'left' ? 'flex-start' : 'flex-end'),
							alignItems: textAlign === 'center' ? textAlign : (textAlign === 'left' ? 'flex-start' : 'flex-end'),
						 }">{{ item.label }}</view> -->
				</view>
			</view>
			<view class="wyb-table-content">
				<view class="wyb-table-content-line" v-for="(content, cIndex) in contentsSort" :key="contentLineKey(content, cIndex)"
				 :style="{borderTop: cIndex === 0 ? 'none' : '1px solid' + borderColor}">
					<view
						class="wyb-table-content-item" 
						v-for="(header, hIndex) in headers"
						:key="contentItemKey(header, hIndex)"
						@click="handleTableItem(cIndex, hIndex)"
						:style="{
							minWidth: hIndex === 0 ? firstColWidth + 'px' : (header.width || defaultColWidth) + 'px',
							maxWidth: hIndex === 0 ? firstColWidth + 'px' : (header.width || defaultColWidth) + 'px',
							textAlign: textAlign,
							justifyContent: textAlign === 'center' ? textAlign : (textAlign === 'left' ? 'flex-start' : 'flex-end'),
							fontSize: hIndex === 0 ? fontSize[0] + 'rpx' : fontSize[1] + 'rpx',
							color: autoContentColor(cIndex, hIndex),
							backgroundColor: autoContentBgColor(cIndex, hIndex),
							minHeight: (minHeight[1] || minHeight[0]) + 'rpx',
							padding: padding[0] + 'rpx ' + (padding[1] || padding[0]) + 'rpx',
							borderBottom: cIndex === contents.length - 1 ? '1px solid' + borderColor : 'none',
							borderRight: hIndex === headers.length - 1 || (!showVertBorder && hIndex !== 0) ? 'none' : '1px solid' + borderColor,
							zIndex: hIndex === 0 ? 20 : 0,
							left: 0,
							position: hIndex === 0 && firstLineFixed ? 'sticky' : 'static'}"
					>
						<view v-if="hIndex === 0">{{ autoContentItem(cIndex, hIndex) }}</view>
						<view v-else v-for="item in autoContentItem(cIndex, hIndex)">
							{{ item }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-popup v-model="setPopupShow" mode="bottom" safe-area-inset-bottom>
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
						
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {isEqual} from './js/objEqual.js'
	export default {
		data() {
			return {
				bottomComputed: [],
				colorList: [],
				bgColorList: [],
				contentsSort: this.contents.slice(),
				oContentsSort: [],
				sortWay: 0,
				sortKeys: [],
				sortActiveKey: '',
				sortIsNumbers: [],
				onload: true,
				event: {
					data: []
				},
				chars: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
				setPopupShow: false
			}
		},
		computed: {
			loadingColor() {
				let color = this.loaderColor.slice()
				let rgbList = this.hexToRgb(color)
				let top = 'rgba(' + rgbList[0] + ',' + rgbList[1] + ',' + rgbList[2] + ', 0.3)'
				let bottom = 'rgba(' + rgbList[0] + ',' + rgbList[1] + ',' + rgbList[2] + ', 0.3)'
				let right = 'rgba(' + rgbList[0] + ',' + rgbList[1] + ',' + rgbList[2] + ', 0.3)'
				let left = 'rgb(' + rgbList[0] + ',' + rgbList[1] + ',' + rgbList[2] + ')'
				return {
					top,
					bottom,
					right,
					left
				}
			},
			contentLineKey() {
				return function(content, cIndex) {
					return this.randomString(32, this.chars)
				} 
			},
			contentItemKey() {
				return function(header, hIndex) {
					return this.randomString(16, this.chars)
				}
			},
			// 处理排班表 Data
			autoContentItem() {
				return function(cIndex, hIndex) {
					let content = this.contentsSort[cIndex].content
					let header = this.headers[hIndex]
					let result = ''
					if (header.key === 'name') {
						result = this.contentsSort[cIndex].userName
					} else if (content[header.key - 1]) {
						result = content[header.key - 1].workspeciName
					} else {
						result = this.emptyString
					}
					return result
				}
			},
			// 自动设置单独项的背景颜色
			autoContentBgColor() {
				return function(cIndex, hIndex) {
					let result = this.contentBgColor
					let content = this.contentsSort[cIndex]
					let header = this.headers[hIndex]
					// 先判断是不是首列，设置基础样式
					if (hIndex === 0) {
						result = this.firstColBgColor
					}
					// console.log(content)
					// console.log(content[header.key])
					// console.log(header.key)
					// // 再判断班次类型
					// if (header.key === 'name') {
					// 	result = this.firstColBgColor
					// } else if (content[header.key] && (content[header.key].type === 'workday' || content[header.key].type === 'rest')) {
					// 	result = '#fff'
					// } else if (content[header.key] && content[header.key].type === 'vacation') {
					// 	result = this.firstColBgColor
					// } else {
					// 	result = '#fff'
					// }
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
			screenWidth() {
				return `${uni.getSystemInfoSync()['screenWidth']}px`
			}
		},
		props: {
			headers: {
				type: Array,
				default() {
					return [{
						key: 'name',
						label: '姓名'
					}]
				}
			},
			contents: {
				type: Array,
				default() {
					return []
				}
			},
			emptyString: {
				type: String,
				default: '-'
			},
			width: {
				type: String,
				default: `${uni.getSystemInfoSync().screenWidth}px`
			},
			height: {
				type: String,
				default: 'auto'
			},
			fontSize: {
				type: Array,
				default() {
					return [30, 24]
				}
			},
			firstColWidth: {
				type: Number,
				default: 60
			},
			defaultColWidth: {
				type: Number,
				default: 50
			},
			headerWeight: {
				type: Boolean,
				default: true
			},
			minHeight: {
				type: Array,
				default() {
					return [100, 100]
				}
			},
			headerBgColor: {
				type: String,
				default: '#f1f1f1'
			},
			contentBgColor: {
				type: String,
				default: '#fff'
			},
			headerFtColor: {
				type: String,
				default: '#3e3e3e'
			},
			contentFtColor: {
				type: String,
				default: '#3e3e3e'
			},
			linkColor: {
				type: String,
				default: '#0024c8'
			},
			firstColBgColor: {
				type: String,
				default: '#f1f1f1'
			},
			firstLineFixed: {
				type: Boolean,
				default: false
			},
			textAlign: {
				type: String,
				default: 'center'
			},
			padding: {
				type: Array,
				default() {
					return [5, 10]
				}
			},
			borderColor: {
				type: String,
				default: '#e1e1e1'
			},
			urlCol: {
				type: Array,
				default() {
					return []
				}
			},
			valueFormat: {
				type: Array,
				default() {
					return []
				}
			},
			formatCol: {
				type: Array,
				default() {
					return []
				}
			},
			showLeftAndRightBorder: {
				type: Boolean,
				default: false
			},
			showVertBorder: {
				type: Boolean,
				default: true
			},
			loading: {
				type: Boolean,
				default: false
			},
			loaderSize: {
				type: [String, Number],
				default: 50
			},
			loaderColor: {
				type: String,
				default: '#a3a3a3'
			},
			loaderBgColor: {
				type: String,
				default: '#f8f8f8'
			}
		},
		watch: {
			headers(val) {
				this.$forceUpdate()
			},
			contents(val) {
				this.contentsSort = val.slice()
				if (this.onload) {
					this.oContentsSort = this.contentsSort.slice()
					this.onload = false
				}
				this.$forceUpdate()
			}
		},
		mounted() {
			this.oContentsSort = this.contentsSort.slice();
		},
		methods: {
			// 点击单人单个排班Item
			handleTableItem (cIndex, hIndex) {
				if (!this.setPopupShow) {
					this.setPopupShow = true;
				}
				let content = this.contentsSort[cIndex]
				let header = this.headers[hIndex]
				let result = ''
				if (header.key === 'name') {
					result = content[header.key]
				} else if (content[header.key]) {
					result = content[header.key].category
				} else {
					result = this.emptyString
				}
			},
			close () {
				this.setPopupShow = false;
			},
			getAverage(key) {
				let numList = []
				this.contentsSort.forEach(content => {
					numList.push(parseFloat(content[key]) || 0)
				})
				return numList.reduce((a, b) => a + b) / numList.length
			},
			hexToRgb(color) {
				if (color.length === 4) {
					let arr = color.split('')
					color = '#' + arr[1] + arr[1] + arr[2] + arr[2] + arr[3] + arr[3]
				}
				let color16List = [color.substring(1, 3), color.substring(3, 5), color.substring(5, 7)]
				let r = parseInt(color16List[0], 16)
				let g = parseInt(color16List[1], 16)
				let b = parseInt(color16List[2], 16)
				return [r, g, b]
			},
			randomString(length, chars) {
			    var result = ''
			    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
			    return result
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-Y {
		height: 300rpx;
		width: 100%;
	}
	.scroll-view-item {
		width: 900rpx;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}
	@import './css/iconfont.css';
	@import './css/loader.css';
	$border-color: #f0f0f0;
	$half-text-color: #999;
	.wyb-table-box {
	}
	.ios-header-bug {
		height: 0;
		width: 1px;
		opacity: 0;
	}
	
	.wyb-table-scroll-view {
		overflow: scroll;
		-webkit-overflow-scrolling: touch;
	}
	
	.wyb-table-scroll-view::-webkit-scrollbar {
		display: none;
		/* #ifdef MP-WEIXIN */
		width: 0;
		height: 0;
		/* #endif */
	}
	
	.wyb-table-loading-box {
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 500;
	}
	
	.wyb-table-header {
		position: sticky;
		top: 0;
		display: grid;
		grid-auto-flow: column;
		width: max-content;
		z-index: 25;
	}
	
	.wyb-table-header-item {
		flex: 1;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		position: relative;
	}
	
	.wyb-table-header-icon {
		display: flex;
		flex-direction: column;
	}
	
	.wyb-table-content-line {
		display: grid;
		grid-auto-flow: column;
		width: max-content;
		position: relative;
	}
	
	.wyb-table-content-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
	}
	.week {
		width: 100%;
	}
	.day {
		width: 100%;
	}
	.setBox {
		display: flex;
		flex-direction: column;
		.header {
			height: 100rpx;
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
					height: 90rpx;
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
			min-height: 200rpx;
			display: flex;
			.left-content {
				background-color: #f9f9f9;
				width: calc((100% - 100rpx)/5);
				border-right: 1px solid $border-color;
				.left-box {
					width: 100%;
					height: 100rpx;
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
				flex: 1;
			}
		}
	}
</style>
