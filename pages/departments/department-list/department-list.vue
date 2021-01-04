<template>
	<view class="content">
		<uni-list class="list" v-if="list.length > 0">
		    <uni-list-item v-for="(item,index) in list" :key="index" :clickable="true" @click="listItemSeleted(item)">
				<template slot="header">
					<text>{{ item.groupName }}（{{ item.groupId }}）</text>
				</template>
				<template slot="footer">
					<text v-if="item.groupId === Info.groupInfo.id" class="iconfont icon-zhengque"></text>
				</template>
			</uni-list-item>
		</uni-list>
		<view class="text">暂无数据</view>
		<button class="bottomBtn" @click="createDepartment">创建科室</button>
	</view>
</template>

<script>
	import { requestGet, requestPost } from '@/utils/request.js';
	import { getGroupInfo, selectGroup } from '@/utils/index.js';
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
		onShow: function () {
			console.log('department-list onShow')
			uni.showLoading({
			    title: '加载中',
				mask: true
			});
			requestGet('/group/groupList', res => {
				const {code, data} = res.data
				if (code === 'success') {
					console.log('科室列表', data)
					this.list = data
					uni.hideLoading();
				} else {
					uni.showToast({
						title: '系统错误 /group/groupList ' + msg,
						icon: 'none',
						duration: 2000
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
								getGroupInfo(listItem.groupId).then(() => {
									let ulist = that.Info.groupInfo.groupUserList;
									let userId = that.Info.userInfo.id;
									let status;
									ulist.forEach(item => {
										if (userId === item.userId) {
											status = item.status
										}
									})
									selectGroup(listItem.groupId, listItem.groupName, status);
								})
					        }
					    }
					});
				}
			},
			// 创建科室
			createDepartment () {
				uni.navigateTo({
				    url: '/pages/departments/department-create/department-create'
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
		.text {
			margin-top: 20px;
			width: 100%;
			text-align: center;
			color: $light-color;
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
