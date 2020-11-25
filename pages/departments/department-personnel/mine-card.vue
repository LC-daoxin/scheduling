<template>
	<view class="box">
		<view class="box-content">
			<view class="info">
				<view class="name">{{ info.name }}</view>
				<view class="info-content">
					<view class="phone-number">{{ info.phoneNumber }}</view>
					<view class="row-text">层级：<text class="tier">{{ info.tier }}</text> 年资：<text class="seniority">{{ info.seniority }}</text></view>
				</view>
			</view>
			<view class="head-box">
				<view class="head">
					<text>{{ info.professionalTitle }}</text>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					name: '姚骁然',
					phoneNumber: '15201367242',
					professionalTitle: '副主任护师',
					tier: 'N4',
					seniority: 8
				},
				userSrc: null
			};
		},
		methods: {
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
					color: #7b7c7c;
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
