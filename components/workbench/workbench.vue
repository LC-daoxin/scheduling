<template>
	<view class="workbench">
		<view class="workbench-body">
			<view class="workbench-title">{{ title }}</view>
			<view class="workbench-content">
				<u-row gutter="16">
					<u-col span="4">
						<view class="layout-box">
							<view class="box-content">
								<image src="../../static/image/paibantixing.png" class="icon"></image>
							</view>
							<text class="box-text">排班提醒</text>
						</view>
					</u-col>
					<u-col span="4">
						<view class="layout-box">
							<view class="box-content">
								<image src="../../static/image/jiaban.png" class="icon"></image>
							</view>
							<text class="box-text">加班申请</text>
						</view>
					</u-col>
					<u-col span="4">
						<view class="layout-box">
							<view class="box-content">
								<image src="../../static/image/tiaobanshenqing.png" class="icon"></image>
							</view>
							<text class="box-text">调班申请</text>
						</view>
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="4">
						<view class="layout-box">
							<view class="box-content">
								<image src="../../static/image/gaibanshenqing.png" class="icon"></image>
							</view>
							<text class="box-text">改班申请</text>
						</view>
					</u-col>
					<u-col span="4">
						<view class="layout-box">
							<view class="box-content">
								<image src="../../static/image/qingjiashenqing.png" class="icon"></image>
							</view>
							<text class="box-text">请假申请</text>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '排班服务'
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	@import '../../common/css/iconfont.css';
	.workbench {
		padding: 5px;
		&-body {
			font-size: 16px;
			padding: 10px 20px 10px;
			background-color: #fff;
			border-radius: 10px;
			.workbench-title {
				font-size: 18px;
				font-weight: 400;
			}
			.workbench-content {
				/* #ifdef MP-WEIXIN */
				u-row {
					display: block;
					margin: 40rpx 0;
				}
				/* #endif */
				/* #ifdef H5 */
				.u-row {
					margin: 40rpx 0;
				}
				/* #endif */
				.layout-box {
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					.box-content {
						height: 120rpx;
						width: 120rpx;
						background-color: #f5f5f5;
						border-radius: 50%;
						display: flex;
						justify-content: center;
						align-items: center;
						.icon {
							height: 70rpx;
							width: 70rpx;
						}
					}
					.box-text {
						margin-top: 5px;
						font-size: 16px;
					}
				}
			}
		}
	}
</style>
