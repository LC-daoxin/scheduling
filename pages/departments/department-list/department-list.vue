<template>
	<view class="content">
		<uni-list class="list">
		    <uni-list-item v-for="(item,index) in list" :key="index" :clickable="true" @click="listItemSeleted(item)">
				<template slot="header">
					<text>{{ item.groupName }}（{{ item.groupId }}）</text>
				</template>
				<template slot="footer">
					<text v-if="item.groupId === Info.groupInfo.id" class="iconfont icon-zhengque"></text>
				</template>
			</uni-list-item>
		</uni-list>
		<button class="bottomBtn" @click="createDepartment">创建科室</button>
	</view>
</template>

<script>
	import { requestGet, requestPost } from '@/utils/request.js'
	export default {
		data() {
			return {
				list:[]
			}
		},
		computed: {
		    Info () {
		        return this.$store.state.Info
		    }
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			requestGet('/group/groupList', res => {
				const {code, msg, data} = res.data
				if (code === 'success') {
					console.log(data)
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
		methods: {
			listItemSeleted (listItem) {
				let that = this
				if (!listItem.selected) {
					uni.showModal({
					    title: '进入科室',
					    content: `是否切换到${listItem.groupName}`,
					    success: function (res) {
					        if (res.confirm) {
								let ulist = that.Info.groupInfo.groupUserList;
								let userId = that.Info.userInfo.id;
								let status;
								ulist.forEach(item => {
									if (userId === item.userId) {
										status = item.status
									}
								})
								let postData = {
									'groupId': listItem.groupId,
									'groupName': listItem.groupName,
									'groupRole': status,
								}
					            requestPost('/group/recordGroup', postData, res => {
					            	const {code, msg, data} = res.data;
					            	if (code === 'success') {
										uni.reLaunch({ // 关闭所有页面，打开到应用内的某个页面
										    url: `/pages/tabbar/home/home`
										});
					            	} else {
					            		uni.showToast({
					            			title: '系统错误',
					            			content: msg,
					            			icon: 'none',
					            			duration: 1000
					            		})
					            	}
					            })
					        } else if (res.cancel) {
								console.log('取消')
					        }
					    }
					});
				}
			},
			// 创建科室
			createDepartment () {
				uni.navigateTo({
				    url: '/pages/departments/department-create/department-create',
					success: function(res) {
						console.log(res)
					}
				});
			}
		}
	}
</script>

<style lang="scss">
page {
	background-color: $bg-color;
	.content {
		margin-top: 20rpx;
		.list {
			.icon-zhengque {
				font-size: 36rpx;
				color: $base-color;
			}
		}
		.bottomBtn {
			padding-bottom: constant(safe-area-inset-bottom);/* 兼容 iOS < 11.2 */
			padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
			background-color: #fff;
			border-radius: 0;
			color: $text-color;
			font-weight: 500;
			width: 100%;
			position: fixed;
			bottom: 0;
		}
	}
}
</style>
