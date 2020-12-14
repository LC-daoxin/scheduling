<template>
	<view class="content">
		<uni-search-bar class="search" :radius="100" placeholder="请输入科室名称" @confirm="search" @input="input" @cancel="cancel"></uni-search-bar>
		<view class="nav">
			<scroll-view class="nav-left" scroll-y>
				<view v-for="item of categoryList" @click="categoryClickMain(item, item.id)" :key="item.id" :class="{'nav-left-item': true, active: item.id===categoryActive}">
					{{ item[label] }}
				</view>
			</scroll-view>
			<scroll-view class="nav-right" scroll-y>
				<view class="nav-right-item" v-for="subItem of item.officeLists" :key="subItem.id" @click="categoryClickSub(subItem)">
					<view class="nav-right-item-content">{{ subItem[label] }}</view>
				</view>
			</scroll-view>
		</view>
		<!-- <button class="bottomBtn" @click="addDepartment">没有我所在的科室，手动填写</button> -->
	</view>
</template>

<script>
	export default {
		name: "category",
		data() {
			return {
				categoryActive: 0,
				searchStatus: false
			}
		},
		props: {
			//主分类激活索引
			defaultActive: {
				type: Number,
				default: 0
			},
			//主分类List
			categoryList: {
				type: Array,
				default: () => {
					return null;
				}
			},
			//侧边分类List
			subCategoryList: {
				type: Array,
				default: () => {
					return null;
				}
			},
			label: {
				type: String,
				default: 'name'
			},
			subCatePara: {
				type: String,
				default: 'officeLists'
			}
		},
		methods: {
			categoryClickMain(category, index) {
				this.$emit('categoryMainClick',category)
				this.categoryActive = index;
				// this.scrollTop = -this.scrollHeight * index;
			},
			categoryClickSub(category) {
				this.$emit('categorySubClick',category)
			},
			search (e) {
				console.log('search', e)
			},
			input (e) {
				console.log('input', e)
				if (e.value.trim() !== '') {
					this.searchStatus = true;
				}
			},
			cancel (e) {
				console.log('cancel', e)
			},
			// 添加科室
			addDepartment () {
				
			}
			
		},
		// mounted() {
			// const query = uni.createSelectorQuery().in(this);
			// let one = new Promise((resolve) => {query.select('.bottomBtn').boundingClientRect(data => {
			//   console.log("bottomBtn布局位置信息", data);
			//   resolve(data.top)
			// }).exec()})
			// let two = new Promise((resolve) => {query.select('.search').boundingClientRect(data => {
			//   console.log("search布局位置信息", data);
			//   resolve(data.height)
			// }).exec()})
			// Promise.all([one, two]).then((values) => {
			//   console.log(values);
			//   this.height = values[0] - values[1]
			// });
			// this.categoryActive = this.defaultActive
		// },
		// watch: {
		// 	subCategoryList(newValue, oldValue) {
				
		// 	}
		// },
	}
</script>

<style lang="scss">
	page {
		.content {
			background-color: #fff;
			.nav {
				height: 100%;
				display: flex;
				flex: 1;
				width: 100%;
				overflow: hidden;
				flex-direction: row;
				.nav-left {
					flex-shrink: 0;
					width: 30%;
					height: 100%;
					overflow-y: hidden;
					.nav-left-item {
						height: 50px;
						border-right: solid 1px #E0E0E0;
						// border-bottom: solid 1px #E0E0E0;
						font-size: 28rpx;
						color: #aaa;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					.active{
						font-size: 28rpx;
						color: $base-color;
						font-weight: 700;
						background-color: #fff;
						position: relative;
						
						&::before{
							content: '';
							position: absolute;
							left: 0;
							top: 30rpx;
							width: 6rpx;
							height: 30rpx;
							background-color: $base-color;
							border-radius: 0 4rpx 4rpx 0;
						}
					}
				}
				.nav-right {
					flex: 1;
					height: 100%;
					.nav-right-item {
						box-sizing: border-box;
						width: 100%;
						height: 100rpx;
						line-height: 100rpx;
						padding: 20rpx;
						margin-bottom: 20rpx;
						.nav-right-item-content {
							border-radius: 10rpx;
							background-color: #f7f7f7;
							text-align: center;
							font-size: 28rpx;
						}
					}
				}
			}
			.bottomBtn {
				padding-bottom: constant(safe-area-inset-bottom);/* 兼容 iOS < 11.2 */
				padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
				background-color: $base-color;
				border-radius: 0;
				color: #fff;
				font-weight: 500;
				width: 100%;
				position: fixed;
				bottom: 0;
			}
		}
		
		// .active {
		// 	color: #F24544;
		// }
		
		// .padding {
		// 	height: var(--status-bar-height);
		// 	width: 100%;
		// 	top: 0;
		// 	position: fixed;
		// 	background-color: #F24544;
		// }
	}
</style>
