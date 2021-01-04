<template>
	<view class="box">
		<view class="box-content" @click="goInfo">
			<view class="info">
				<view class="name">{{ Info.userInfo.nickName ? Info.userInfo.nickName : '无' }}</view>
				<view class="info-content">
					<view class="phone-number">{{ Info.userInfo.mobile ? Info.userInfo.mobile : '无' }}</view>
					<view class="row-text">层级：<text class="tier">{{ Info.userInfo.rank ? Info.userInfo.rank : '无' }}</text> 年资：<text class="seniority">{{ Info.userInfo.seniority ? Info.userInfo.seniority : '无' }}</text></view>
				</view>
			</view>
			<view class="head-box">
				<view class="head">
					<text>{{ Info.userInfo.positional ? Info.userInfo.positional : '无' }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				userSrc: null
			};
		},
		computed: {
		    Info () {
		        return this.$store.state.Info
		    }
		},
		methods: {
			goInfo () { // currentUserPage = 2 为当前操作人进入个人信息 允许修改
				uni.navigateTo({
					url: `/pages/personnel/personnel-info/personnel-info?currentUserPage=2`
				});
			}
		}
	};
</script>

<style lang="scss">
	.box {
		padding: 5px;
		&-content {
			height: 200rpx;
			padding: 20rpx 30rpx;
			box-shadow: 0 2rpx 10rpx 0 rgba(0,0,0,0.12);
			background-color: #fff;
			border-radius: 10px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.info {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.name {
					color: #333;
					font-size: 36rpx;
					font-weight: 400;
				}
				.info-content {
					color: $half-text-color;
					.phone-number {
						margin-bottom: 10rpx;
					}
					.row-text {
						.tier {
							margin-right: 20rpx;
						}
					}
				}
			}
			.head-box {
				width: 130rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				.head {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 120rpx;
					height: 120rpx;
					background-color: $base-color;
					border-radius: 50%;
					text {
						text-align: center;
						width: 100rpx;
						color: #fff;
						font-weight: 500;
					}
				}
			}
			
		}
	}
</style>
