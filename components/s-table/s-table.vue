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
					姓名
				</view>
			</view>
			<!-- 固定列（除表头） -->
			<scroll-view class="table__fixed-others" scroll-y :throttle="false" :debounce="false" :scroll-top="scrollTop"
				:style="{
					minHeight: tableHeight - (minHeight[1] || minHeight[0]) + 'rpx'
				}"
			>
				<view class="table__fixed-item" v-for="(content, cindex) in contentsSort" :key="cindex"
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
		<scroll-view scroll-x scroll-y @scroll="scroll" :scroll-left="selectLeft">
			<view class="s-table-content"
				:style="{
					marginLeft: firstColWidth + 'px',
					height: tableHeight - (minHeight[1] || minHeight[0]) + 'rpx'
				}"
			>
				<view class="s-table-content-line" v-for="(content, cIndex) in contentsSort" :key="cIndex">
					<view :class="{'checkedview': checkedItem(cIndex, hIndex), 's-table-content-item': true}" v-for="(header, hIndex) in headers" :key="header.key"
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
							{{ item ? item : emptyString }}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<u-popup  v-if="Info.userInfo && Info.userInfo.groupRole !== 0" v-model="setPopupShow" zIndex="1" :maskShow="false" :customStyle="customStyle" :mask="false" mode="bottom" safe-area-inset-bottom>
			<view class="setBox">
				<view class="header">
					<view class="list">
						<!-- <view class="icon-box">
							<text class="iconfont icon-xin"></text>
							<text class="text">期望排班</text>
						</view> -->
						<view class="icon-box" @click="autoSchedul">
							<text class="iconfont icon-zidonghua"></text>
							<text class="text">自动排班</text>
						</view>
						<view class="icon-box" @click="cleanSchedul">
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
						<!-- <view class="left-box">
							<text class="iconfont icon-zuhe"></text>
							<text class="text">组合</text>
						</view> -->
						<view class="left-box" @click="deleteItem">
							<text class="iconfont icon-shanchu"></text>
							<text class="text">删除</text>
						</view>
					</view>
					<view class="right-content">
						<swiper class="class-swiper" :indicator-dots="indicatorDots" :autoplay="autoplay">
							<swiper-item v-for="(page, pIndex) in pages" :key="pIndex">
								<view class="swiper-page">
									<view class="swiper-page-item" v-for="(item, Index) in page" :key="Index" @click="selectClass(item.workName)">
										<view class="text" v-if="item.workName">{{ item.workName }}</view>
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
	import { getCountDays, getWorkList } from '@/utils/index';
	import { requestPost, requestGet } from '@/utils/request.js';
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
				classlist: [],
				deleteId: []
			};
		},
		props: {
			nowDate: {
				type: Object
			},
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
				default: ''
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
					let result = undefined;
					if (header.key[0] === '0') {
						key = header.key[1]
					} else {
						key = header.key
					}
					let keyStr = key <= 9 ? '0' + key : key;
					content.forEach((item,index) => {
						if (item.schedulDate.substring(item.schedulDate.length - 2) === keyStr.toString()) {
							result = content[index].workspeciName
						}
					})
					if (!result) {
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
				// this.classlist.push({type: 'Add'})
				this.classlist.forEach((item, index) => {
					const page = Math.floor(index / 8);
					if(!pages[page]) {
						pages[page] = [];
					}
					pages[page].push(item);
				})
				return pages
			},
			Info () {
			    return this.$store.state.Info
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
			getWorkList(this.getWorkListSucc, 1);
		},
		methods: {
			// 发布排班
			publish (id, remark) {
				let list = [];
				this.deleteId = []; // 清空删除id组
				this.contentsSort.forEach((item,index) => {
					if (item.content.length > 0) {
						item.content.forEach((cItem, i) => {
							if (cItem.workspeciName.length > 0 && cItem.workspeciName[0] !== '') {
								list.push({
									'groupId': item.groupId,
									'userId': item.userId,
									'userName': item.userName,
									'schedulDate': cItem.schedulDate,
									'works': cItem.workspeciName,
								})
							} else {
								this.deleteId.push(cItem.id)
							}
						})
					}
				})
				let months = `${this.nowDate.year}-${this.nowDate.month}`
				let postData = {
					'months': months,
					'remark': remark,
					'groupId': id,
					'schedullist': list
				}
				console.log('发布',postData)
				requestPost('/schedul/batchSchedul', postData, res => {
					const {code, msg, data} = res.data;
					console.log(res.data)
					if (code === 'success') {
						if (this.deleteId.length !== 0) {
							this.deleteInfoList(); // 删除item List
						}
						uni.showToast({
							title: '排班发布成功',
							duration: 1000
						})
						setTimeout(() => {
							uni.switchTab({
							    url: '/pages/tabbar/home/home'
							});
							uni.$emit('UserSchedulList', months);
						}, 1000)
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
			// 删除排班信息
			deleteInfoList () {
				console.log(this.deleteId)
				requestPost('/schedul/deleteSchedul', this.deleteId, res => {
					const {code, msg, data} = res.data;
					console.log(res.data)
					if (code === 'success') {
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
			// 删除单个记录
			deleteItem () {
				if (this.currentCIndex === null || this.currentHIndex === null) {
					uni.showToast({
					    title: '请先选择单元格',
						icon: 'none',
					    duration: 1500
					});
				} else if (this.currentHIndex < this.headers.length) {
					let content = this.contentsSort[this.currentCIndex].content;
					let hasItem = false // 是否存在该条记录
					let zIndex // hasItem为ture
					content.forEach((item,index) => {
						if (item.schedulDate.substring(item.schedulDate.length - 2) === this.headers[this.currentHIndex].key.toString()) {
							zIndex = index
						}
					})
					content[zIndex].workspeciName = []
				}
			},
			// 获取班种列表
			getWorkListSucc(res) {
				const { code, msg, data } = res.data;
				if (code === 'success') {
					this.classlist = data;
				} else {
					uni.showToast({
						title: '系统错误',
						content: msg,
						icon: 'none',
						duration: 1500
					});
				}
			},
			// 选择班种
			selectClass (className) {
				if (this.currentCIndex === null || this.currentHIndex === null) {
					uni.showToast({
					    title: '请先选择单元格',
						icon: 'none',
					    duration: 1500
					});
				} else if (this.currentHIndex < this.headers.length) {
					let content = this.contentsSort[this.currentCIndex].content;
					let hasItem = false // 是否存在该条记录
					let hasNextItem = false // 是否存在该条的下一个记录
					let zIndex // hasItem为ture
					let nIndex // hasNextItem为ture
					content.forEach((item,index) => {
						if (item.workspeciName[0] === '') {
							item.workspeciName.splice(0, 1)
						}
						if (item.schedulDate.substring(item.schedulDate.length - 2) === this.headers[this.currentHIndex].key.toString()) {
							hasItem = true
							zIndex = index
						} else if (this.currentHIndex < this.headers.length - 1 && item.schedulDate.substring(item.schedulDate.length - 2) === this.headers[this.currentHIndex + 1].key.toString() && item.workspeciName.length > 0 && item.workspeciName[0] !== '') {
							hasNextItem = true
							nIndex = index
						}
					})
					let currentItem = content[zIndex];
					let currentNextItem =content[nIndex];
					// 当前item是否存在记录
					if (hasItem) {
						// 处理当前记录
						if (currentItem.workspeciName.length >= 2) {
							currentItem.workspeciName = [className]
						} else if (currentItem.workspeciName.length === 1) {
							if (currentItem.workspeciName[0] !== className) {
								currentItem.workspeciName.push(className)
							} else {
								currentItem.workspeciName = []
							}
						} else if (currentItem.workspeciName.length === 0) {
							currentItem.workspeciName.push(className)
						}
						if (!(currentNextItem && nIndex <= getCountDays())) { // 如果下一条记录不存在的话，修改当前记录后，跳到下一个item
							let Date = currentItem.schedulDate;
							let day = parseInt(Date.substring(Date.length - 2)) + 1;
							this.addItem(day);
							this.moveItem();
						}
					} else {
						let currentDay = parseInt(this.headers[this.currentHIndex].key)
						this.addItem(currentDay, className)
						if (!(currentNextItem && nIndex <= getCountDays())) { // 如果下一条记录不存在的话，跳到下一个item
							this.moveItem();
						}
					}
				}
			},
			// 添加一条记录
			addItem (day, className) {
				day = day > 9 ? day : '0' + day;
				let addItem = {
					'schedulDate': `${this.nowDate.year}-${this.nowDate.month}-${day}`,
					'type': 0,
					'workspeciName': className ? [className] : []
				}
				this.contentsSort[this.currentCIndex].content.push(addItem);
			},
			// 记录显示，动态跳到下一个
			moveItem () {
				this.currentHIndex += 1;
				const res = uni.getSystemInfoSync();
				let windowWidth = res.windowWidth;
				const query = uni.createSelectorQuery().in(this);
				query.select('.checkedview').boundingClientRect(data => {
				  let center = this.defaultColWidth*2 + this.firstColWidth;
				  if (data.left >= center) {
				  	this.scrollLeft += this.defaultColWidth;
				  	this.selectLeft = this.scrollLeft;
				  }
				}).exec();
			},
			close () {
				this.setPopupShow = false;
			},
			// 清空排班
			cleanSchedul () {
				let that = this;
				uni.showModal({
				    title: '清空排班',
				    content: `是否清空排班数据？`,
				    success: function (res) {
				        if (res.confirm) {
							if (that.contents.length > 0) {
								that.contents.forEach(item => {
									if (item.content.length > 0) {
										item.content.forEach(v => {
											v.workspeciName = []
										})
									}
								})
							}
				        } else if (res.cancel) {
				        }
				    }
				});
			},
			// 自动排班
			autoSchedul () {
				uni.showToast({
					title: '开发中',
					icon: 'none',
					duration: 1500
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.s-table-box {
		background-color: #fff;
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
									white-space:nowrap;
									overflow:hidden;
									text-overflow:ellipsis;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
