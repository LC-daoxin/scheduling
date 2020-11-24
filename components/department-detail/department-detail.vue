<template>
	<view class="detatl">
		<view class="detatl-content">
			<view class="info" @click="getDetail()">
				<view class="info-title">
					<text class="title">{{ info.departmentsName }}</text>
					<view class="text-right">
						<text>详情</text>
						<text class="iconfont icon-xiangyou"></text>
					</view>
				</view>
				<view class="info-content">
					创建者：<text class="name">{{ userList[0].name }}</text> 编号：<text>{{ userList[0].id }}</text>
				</view>
			</view>
			<view class="user" @click="getDetail()">
				<view class="user-title">
					<text class="title">科室人员</text>
					<view class="text-right">
						<text>共{{ userList.length }}人</text>
						<text class="iconfont icon-xiangyou"></text>
					</view>
				</view>
				<view class="user-content">
					<view class="avatar-list">
						<text class="avatar" v-for="(item,index) in newList" :key="index">{{ item.name.slice(0, 1) }}</text>
						<text class="avatar">{{ '+' + (userList.length - 5) }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['info'],
		data() {
			return {
				userList: [{
					id: 201001,
					name: '赵易'
				},{
					id: 201002,
					name: '钱尔'
				},{
					id: 201003,
					name: '孙时'
				},{
					id: 201004,
					name: '李思'
				},{
					id: 201005,
					name: '周梧'
				},{
					id: 201006,
					name: '吴柳'
				},{
					id: 201007,
					name: '王奇'
				}],
				newList: [], // 处理后的用户列表 5位
				showIcon: false
			};
		},
		mounted () {
			console.log(this.newList)
			if (this.userList.length > 5) {
				this.showIcon = true;
				this.newList = this.userList.slice(0, 5);
				console.log(this.newList)
			}
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
				
			}
		}
	}
</script>

<style lang="scss">
page {
	background-color: $bg-color;
	$text-color: #666;
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
					display: block;
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
				}
			}
		}
	}
}
</style>
