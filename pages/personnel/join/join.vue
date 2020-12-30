<template>
	<view class="join">
		<view v-if="hasUser" class="title">您已经是{{ inviteInfo.groupName }}的成员</view>
		<view v-else class="title">{{ inviteInfo.userName }}邀请您加入{{ inviteInfo.groupName }}</view>
		<view  v-if="!hasUser" class="input-box"><input class="input" v-model="userName" :maxlength="10" placeholder="请输入姓名(不超过10个字)"/></view>
		<button v-if="hasUser" class="joinBtn" @click="enterGroup">直接进入</button>
		<button v-if="!hasUser && !hasAuthorize" class="joinBtn" open-type="getUserInfo" @getuserinfo="getuserinfo">直接加入</button>
		<button v-if="!hasUser && hasAuthorize" class="joinBtn" @click="joinGroup">直接加入1</button>
	</view>
</template>

<script>
	import { requestPost, requestGet } from '@/utils/request';
	import { getGroupInfo, selectGroup } from '@/utils/index';
	export default {
		data() {
			return {
				inviteInfo: {
					userName: '',
					groupName: '',
					groupId: '',
					userid: ''
				},
				userName: '',
				hasUser: false, // 当前组存在此用户
				hasAuthorize: false // 当前用户是否授权用户信息
			};
		},
		computed: {
		    Info () {
		        return this.$store.state.Info
		    }
		},
		watch: {
		    '$store.state.Info.userInfo': function (newVal, oldVal) {
				if (newVal) this.joinGroup();
		    }
		},
		onLoad(option) {
			console.log(option)
			let that = this;
			uni.getSetting({
				success: res => {
					if (res.authSetting['scope.userInfo']) { // 已经授权用户信息
						that.hasAuthorize = true;
					} else { // 未授权用户信息
						that.hasAuthorize = false;
					}
				}
			});
			this.inviteInfo.userName = option.userName;
			this.inviteInfo.groupName = option.groupName;
			this.inviteInfo.groupId = option.groupId;
			this.inviteInfo.userid = option.userid;
			this.getGroup(option.groupId);
		},
		methods: {
			getGroup (id) {
				if (this.Info.userInfo !== null) {
					requestGet(`/group/${id}`, res => {
						const {code, msg, data} = res.data;
						if (code === 'success') {
							if (data.groupUserList.length > 0) {
								data.groupUserList.forEach(item => {
									if (item.userId === this.Info.userInfo.id) {
										this.hasUser = true;
									}
								})
							}
						} else {
							uni.showToast({
								title: '系统错误 /group/${id}',
								icon: 'none',
								duration: 2000
							})
						}
					})
				}
			},
			getuserinfo (res) {
				if (res.detail.userInfo) {
					uni.$emit('getAppUserInfo', true);
				}
			},
			joinGroup () {
				let groupId = this.inviteInfo.groupId;
				let groupName = this.inviteInfo.groupName;
				let postData = [{
					'groupId': groupId,
					'groupName': groupName,
					'userId': 	this.Info.userInfo.id,
					'userName': 	this.userName || this.Info.userInfo.nickName
				}]
				console.log(postData)
				requestPost('/group/batchGroupUser', postData, res => {
					const {code, msg, data} = res.data;
					console.log(res)
					if (code === 'success') {
						selectGroup(groupId, groupName, 0);
						uni.showToast({
							title: '成功加入',
							duration: 1000
						})
						setTimeout(() => {
							uni.switchTab({
							    url: '/pages/tabbar/home/home'
							});
							uni.$emit('getHomeInfo');
						}, 1000)
					} else {
						uni.showToast({
							title: '系统错误 /group/batchGroupUser ' + msg,
							icon: 'none',
							duration: 1000
						})
					}
				})
			},
			enterGroup () {
				uni.switchTab({
				    url: '/pages/tabbar/home/home'
				});
				uni.$emit('getHomeInfo');
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		.join {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 0 50rpx 70rpx;
			height: 100%;
			.title {
				font-size: 32rpx;
				font-weight: 500;
				margin-bottom: 50rpx;
			}
			.input-box {
				width: 100%;
				.input {
					height: 60rpx;
					font-size: 34rpx;
					padding: 0 20rpx;
				}
			}
			.joinBtn {
				width: 100%;
				font-size: 32rpx;
				font-weight: 500;
				color: #fff;
				background-color: $base-color;
				margin-top: 50rpx;
			}
		}
	}
</style>
