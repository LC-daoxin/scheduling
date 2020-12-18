<template>
	<view>
		<!-- <view class="list" :style="'height:'+height+'px'"> -->
		<view class="list">
			<scroll-view class="list-content" scroll-y>
				<uni-search-bar :radius="100" placeholder="若无医院信息,请输入所在医院信息查找" @confirm="search" @input="input" @cancel="cancel"></uni-search-bar>
				<uni-list>
				    <uni-list-item clickable v-for="(item,index) in list" :key="index" :title="item.name" @click="selected(item)"></uni-list-item>
				</uni-list>
			</scroll-view>
		</view>
		<button class="bottomBtn" @click="addHospital">没有我所在的医院，手动填写</button>
	</view>
</template>

<script>
	import {requestGet, requestPost} from '@/utils/request.js'
	export default {
		data() {
			return {
				list: [],
				height: 0,
				searchStatus: false, // 搜索状态
				status: null // 选择医院的用途 1: 选择医院 2: 更新医院
			};
		},
		mounted () {
			this.getHospitalList()
			// const query = uni.createSelectorQuery().in(this);
			// query.select('.bottomBtn').boundingClientRect(data => {
			//   console.log("得到布局位置信息", data);
			//   console.log("节点离页面顶部的距离为" + data.top);
			//   this.height =  data.top
			// }).exec();
		},
		onLoad: function(option){
			this.status = option.type
		},
		methods: {
			selected(item) {
				if (this.status === '1') {
					uni.$emit('getHospital', item)
					uni.navigateBack({})
				} else if (this.status === '2') {
					let postData = {
						'hospitalName': item.name,
						'hospitalId': item.id
					}
					requestPost('/group/updateGroup', postData, res => {
						const {code, msg, data} = res.data;
						if (code === 'success') {
							console.log(res.data);
						} else {
							uni.showToast({
								title: '系统错误',
								content: msg,
								icon: 'none',
								duration: 1000
							})
						}
						uni.navigateBack({});
					})
				}
			},
			// 获取医院列表
			getHospitalList() {
				requestGet('/dept/hospList', res => {
					const {code, msg, data} = res.data
					if (code === 'success') {
						this.list = data
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
			// 添加医院
			addHospital () {
				// uni.navigateTo({
				//     url: '/pages/departments/base-info/base-info',
				// 	success: function(res) {
				// 		console.log(res)
				// 	}
				// });
			}
		}
	}
</script>

<style lang="scss">
	page {
		.list {
			overflow: hidden;
			.list-content {
				height: 100%;
				overflow-y: hidden;
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
</style>
