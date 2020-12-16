<template>
	<view class="management">
		<view class="management-body">
			<view class="management-title">
				排班管理
				<text class="text">仅管理员可见</text>
			</view>
			<view class="management-content">
				<u-row gutter="20">
					<u-col span="6" class="box_1">
						<view class="management-box" @click="goScheduling">
							<text class="iconfont icon-paiban"></text>
							<text class="box-text">排班表</text>
						</view>
					</u-col>
					<u-col span="6" class="box_2">
						<navigator url="/pages/scheduling/class-management/class-management">
							<view class="management-box">
								<text class="iconfont icon-caidanguanli"></text>
								<text class="box-text">班种管理</text>
							</view>
						</navigator>
						<navigator url="/pages/scheduling/scheduling-setting/scheduling-setting">
							<view class="management-box">
								<text class="iconfont icon-shezhi"></text>
								<text class="box-text">排班管理</text>
							</view>
						</navigator>
					</u-col>
					<u-col span="4">
						<view class="management-box_2" @click="examinationAndApproval">
							<text class="color_1 iconfont icon-shenpi"></text>
							<text class="box-text">审批</text>
						</view>
					</u-col>
					<u-col span="4">
						<view class="management-box_2">
							<text class="color_2 iconfont icon-ziyuan"></text>
							<text class="box-text">统计</text>
						</view>
					</u-col>
					<u-col span="4">
						<view class="management-box_2">
							<text class="color_3 iconfont icon-daochu"></text>
							<text class="box-text">导出</text>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isManager: false
		};
	},
	methods: {
		examinationAndApproval() {
			if (this.isManager) {
				uni.navigateTo({
					url: '/pages/tabbar/workbench/ExaminationAndApproval/ExaminationAndApproval'
				});
			} else {
				uni.showToast({
					title: '您不是小组管理员，无法进行审批',
					icon: 'none',
					duration: 1500
				})
			}
		},
		goScheduling() {
			uni.navigateTo({
				url: '/pages/scheduling/scheduling'
			});
		},
		getUserInfo() {
			uni.getStorage({
				key: 'userInfo',
				success: res => {
					const role = res.data.groupRole;
					role === 0 ? (this.isManager = false) : (this.isManager = true);
				}
			});
		}
		// 跳转到班种管理
		// toManagement () {
		// 	uni.navigateTo({
		// 	    url: '/pages/scheduling/class-management/class-management',
		// 		success: function(res) {
		// 			console.log(res)
		// 		}
		// 	});
		// }
	},
	mounted() {
		this.getUserInfo()
	}
};
</script>

<style lang="scss">
@import '../../common/css/iconfont.css';
.management {
	padding: 5px;
	&-body {
		font-size: 16px;
		padding: 10px 20px 3px;
		background-color: #fff;
		border-radius: 10px;
		.management-title {
			font-size: 18px;
			font-weight: 400;
			display: flex;
			align-items: center;
			.text {
				margin-left: 10px;
				font-size: 12px;
				color: #a7acaf;
			}
		}
		.management-content {
			/* #ifdef MP-WEIXIN */
			u-row {
				display: block;
				margin: 20rpx 0;
			}
			/* #endif */
			/* #ifdef H5 */
			.u-row {
				margin: 20rpx 0;
			}
			/* #endif */
			.management-box {
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 5px;
				width: 100%;
				.iconfont {
					margin-top: 1px;
					color: #fff;
					font-size: 16px;
				}
				.box-text {
					margin-left: 6px;
					color: #fff;
					font-size: 16px;
				}
			}
			.box_1 {
				.management-box {
					height: 120px;
					background-image: linear-gradient(-150deg, #4aa0fe 0%, #55cbf9 100%);
				}
			}
			.box_2 {
				// display: flex;
				flex-direction: column;
				.management-box {
					&:first-child {
						margin-bottom: 10px;
						background-color: #4aa0fe;
					}
					&:last-child {
						background-color: #55cbf9;
					}
					height: 55px;
					background-color: #007aff;
				}
			}
			.management-box_2 {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 10px;
				width: 100%;
				height: 50px;
				background-color: #f5f6f8;
				border-radius: 5px;
				.color_1 {
					color: #51e9c8;
				}
				.color_2 {
					color: #8d85f4;
				}
				.color_3 {
					color: #5ecaa2;
				}
				.box-text {
					margin-left: 6px;
					font-size: 16px;
				}
			}
		}
	}
}
</style>
