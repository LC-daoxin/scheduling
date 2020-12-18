<template>
	<view class="detatl">
		<view class="detatl-content">
			<view class="info" @click="getDetail">
				<view class="info-title">
					<text class="title">{{ Info.userInfo.groupName }}</text>
					<view class="text-right">
						<text>详情</text>
						<text class="iconfont icon-xiangyou"></text>
					</view>
				</view>
				<view class="info-content">
					创建者：<text class="name">{{ userList[0].userName }}</text> 编号：<text>{{ userList[0].userId }}</text>
				</view>
			</view>
			<view class="user" @click="getUser">
				<view class="user-title">
					<text class="title">科室人员</text>
					<view class="text-right">
						<text>共{{ userList.length }}人</text>
						<text class="iconfont icon-xiangyou"></text>
					</view>
				</view>
				<view class="user-content">
					<view class="avatar-list">
						<text class="avatar" v-for="(item,index) in newList" :key="index">{{ item.userName.slice(0, 1) }}</text>
						<text class="avatar">{{ '+' + (userList.length - 5) }}</text>
					</view>
					<button open-type="share" :data-title="shareInfo.title" :data-imgurl="shareInfo.imgurl" :data-path="shareInfo.path" class="inviteBtn" size="mini" plain="true">邀请人员</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['Info'],
		data() {
			return {
				userList: [{
					userId: 201001,
					userName: '赵易'
				},{
					userId: 201002,
					userName: '钱尔'
				},{
					userId: 201003,
					userName: '孙时'
				},{
					userId: 201004,
					userName: '李思'
				},{
					userId: 201005,
					userName: '周梧'
				},{
					userId: 201006,
					userName: '吴柳'
				},{
					userId: 201007,
					userName: '王奇'
				}],
				newList: [], // 处理后的用户列表 5位
				showIcon: false,
				shareInfo: {}
			};
		},
		mounted () {
			this.userList = this.Info.groupInfo.groupUserList
			console.log(this.userList)
			if (this.userList && this.userList.length > 5) {
				this.showIcon = true;
				this.newList = this.userList.slice(0, 5);
			}
			this.shareInfo.title = `${this.Info.userInfo.nickName} 邀请您加入'${this.Info.userInfo.groupName}'，赶快点击加入吧！`
			this.shareInfo.imgurl = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-scheduling/7341daa0-2eeb-11eb-880a-0db19f4f74bb.png'
			this.shareInfo.path = `/pages/tabbar/home/home?userid=${this.Info.userInfo.id}&&userName=${this.Info.userInfo.name}&&groupId=${this.Info.userInfo.groupId}&&groupName=${this.Info.userInfo.groupName}`
		},
		methods: {
			// 获取科室详情
			getDetail () {
				uni.navigateTo({
				    url: '/pages/departments/base-info/base-info',
					success: function(res) {
						console.log(res)
					}
				});
			},
			// 获取科室人员
			getUser () {
				uni.navigateTo({
				    url: '/pages/departments/department-personnel/department-personnel',
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
	.detatl {
		padding: 5px;
		&-content {
			box-shadow: 0 2rpx 10rpx 0 rgba(0,0,0,0.12);
			// padding: 10rpx 10rpx;
			background-color: #fff;
			border-radius: 10px;
			.info {
				width: 100%;
				padding: 40rpx 40rpx 20rpx;
				font-size: 30rpx;
				.info-title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.title {
						font-size: 36rpx;
						font-weight: 600;
					}
					.text-right {
						color: $text-color;
						.icon-xiangyou {
							margin-left: 8rpx;
						}
					}
					
				}
				.info-content {
					display: block;
					padding: 20rpx 0 0;
					color: $text-color;
					.name {
						margin-right: 40rpx;
					}
				}
			}
			.user {
				width: 100%;
				padding: 20rpx 40rpx 40rpx;
				font-size: 30rpx;
				border-top: 1px solid #F1F1F1;
				.user-title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.title {
					}
					.text-right {
						color: $text-color;
						.icon-xiangyou {
							margin-left: 8rpx;
						}
					}
					
				}
				.user-content {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx 0 0;
					color: $text-color;
					.avatar-list {
						margin-top: 10rpx;
						.avatar {
							box-shadow: 0 0 0 1px #fff;
							margin-right: -20rpx !important;
							width: 70rpx;
							height: 70rpx;
							line-height: 70rpx;
							display: inline-block;
							background: #2ddcd3 no-repeat center/cover;
							position: relative;
							text-align: center;
							color: #fff;
							font-weight: 600;
							vertical-align: bottom;
							font-size: 36rpx;
							user-select: none;
							border-radius: 50%;
						}
					}
					.inviteBtn {
						border: 1px solid $base-color;
						color: $base-color;
						border-radius: 30rpx;
						margin: 0;
						padding: 0 14rpx;
					}
				}
			}
		}
	}
}
</style>
