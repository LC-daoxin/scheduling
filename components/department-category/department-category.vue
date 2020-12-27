<template>
	<view class="content">
		<uni-search-bar class="search" :radius="100" placeholder="请输入科室名称" @confirm="search" @input="input" @cancel="cancel"></uni-search-bar>
		<view class="nav">
			<scroll-view class="nav-left" scroll-y>
				<view v-for="item of categoryList" @click="setActiveMain(item)" :key="item.id" :class="{'nav-left-item': true, active: item.id===categoryActive}">
					{{ item[label] }}
				</view>
			</scroll-view>
			<scroll-view class="nav-right" scroll-y>
				<view class="nav-right-item" v-for="subItem of activeMain.officeLists" :key="subItem.id" @click="categoryClickSub(subItem)">
					<view class="nav-right-item-content">{{ subItem[label] }}</view>
				</view>
			</scroll-view>
		</view>
		<!-- <button class="bottomBtn" @click="addDepartment">没有我所在的科室，手动填写</button> -->
	</view>
</template>

<script>
	import { requestGet, requestPost } from '@/utils/request.js'
	export default {
		name: "category",
		data() {
			return {
				categoryActive: 0,
				activeMain: [],
				timeout: null //定义一个变量存放定时器
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
			// 第一次全部搜索的复制
			categoryListSort: {
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
			},
			status: {
				type: String // 选择科室的用途 1: 选择科室 2: 更新科室
			}
		},
		methods: {
			categoryClickMain(category, index) {
				this.categoryActive = index;
				// this.scrollTop = -this.scrollHeight * index;
			},
			categoryClickSub(category) {
				this.$emit('categorySubClick',category)
				if (this.status === '1') {
					uni.$emit('getOffice', category)
					uni.navigateBack({})
				} else if (this.status === '2') {
					let postData = {
						'officeName': category.name,
						'officeId': category.id
					}
					requestPost('/group/updateGroup', postData, res => {
						const {code, msg, data} = res.data;
						if (code === 'success') {
							uni.navigateBack({});
						} else {
							uni.showToast({
								title: '系统错误',
								content: msg,
								icon: 'none',
								duration: 1000
							})
						}
					})
				}
			},
			setActiveMain(item) {
				if (item) {
					this.activeMain = item;
					this.categoryActive = item.id;
				} else {
					this.activeMain = [];
				}
			},
			// 判断是否已经存在
			isArr(arr,id) {
				for(var i=0;i<arr.length;i++){
					if(id === arr[i].id){
						return true;
					}
				}
				return false;
			},
			search (e) {
				if (e.value.trim() !== '') {
					requestGet(`/dept/${e.value}`,res => {
						const {code, msg, data} = res.data;
						if (code === 'success') {
							let Array = [];
							if (data.length > 0) {
								data.forEach((item, i) => {
									this.categoryListSort.forEach(c => {
										if (item.parentId === c.id && !this.isArr(Array, c.id)) {
											Array.push({
												id: c.id,
												name: c.name,
												officeLists: [],
												parentId: 0
											})
										}
									})
								})
								Array.forEach(item => {
									data.forEach(v => {
										if (item.id === v.parentId) {
											item.officeLists.push({
												id: v.id,
												name: v.name,
												parentId: v.parentId
											})
										}
									})
								})
								uni.$emit('deptSearch', Array);
							} else {
								uni.$emit('cleanList');
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
				} else {
					uni.$emit('refreshSearch');
				}
			},
			input (e) {
				if (e.value.trim() !== '') {
					this.debounce(this.search(e), 2000)
				} else {
					uni.$emit('refreshSearch');
				}
			},
			debounce (func, wait) {
				if (this.timeout) clearTimeout(this.timeout)
				this.timeout = setTimeout(() => {
					func
				}, wait)
			},
			cancel (e) {
				uni.$emit('refreshSearch');
			},
			// 添加科室
			addDepartment () {}
		}
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
					padding-bottom: 20rpx;
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
	}
</style>
