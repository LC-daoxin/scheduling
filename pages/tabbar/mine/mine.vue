<template>
	<view class="userbox">
		<view class="user_header">
			<view class="head_box">
				<u-avatar class="head_img" :src="userInfo.avatarUrl" mode="circle" size="130"></u-avatar>
				<view class="info">
					<view class="head_name">{{ userInfo.nickName }}</view>
					<view class="departments">{{ userInfo.office || '暂无科室' }}</view>
				</view>
			</view>
			<image class="user_bg" src="../../../static/image/user-bg.png"></image>
		</view>
		<view class="user_menu">
			<image class="arc" src="../../../static/image/arc.png"></image>
			<!-- 	<view class="my_box">
				<view class="top_nav">
					<text class="iconfont icon-paiban"></text>
					<text class="name">我的排班</text>
				</view>
				<u-line color="#c8ccdb"></u-line>
			</view> -->
			<view class="server_box">
				<u-cell-group>
					<u-cell-item title="个人设置" @click="naviTo('setting')"><text slot="icon" class="iconfont icon-shezhi"></text></u-cell-item>
					<u-cell-item title="反馈意见" @click="naviTo('feedBack')"><text slot="icon" class="iconfont icon-shenpi"></text></u-cell-item>
				</u-cell-group>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		requestGet
	} from '@/utils/request.js'
	export default {
		data() {
			return {
				list: [],
				current: 4,
				BarHeight: 0, // 胶囊按钮高度 + 状态栏高度
				userInfo: {}
			};
		},
		methods: {
			naviTo(page) {
				switch (page) {
					case 'setting':
						uni.navigateTo({
							url: '/pages/tabbar/mine/personalSettings/personalSettings'
						});
						break;
					case 'feedBack':
						uni.navigateTo({
							url: '/pages/tabbar/mine/feedBack/feedBack'
						});
						break;
					case 'scheduling':
						uni.navigateTo({
							url: '/pages/scheduling/scheduling'
						});
				}
			},
			getUserInfo() {
				uni.getStorage({
					key: 'userInfo',
					success: res => {
						Object.assign(this.userInfo, res.data)
					}
				})
			}
		},
		created() {
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			let Info = uni.getSystemInfoSync();
			let statusBarHeight = Info.statusBarHeight; // 状态栏高度
			let titleBarHeight =
				menuButtonInfo.bottom -
				Info.statusBarHeight +
				(menuButtonInfo.top - Info.statusBarHeight); // 胶囊按钮高度
			this.BarHeight = statusBarHeight + titleBarHeight + 'px';
		},
		onShow() {
			this.list = this.$store.state.vuex_tabbar;
			this.getUserInfo()
		}
	};
</script>

<style lang="scss">
	@import '../../../common/css/iconfont.css';
	@import './custom-style.scss';

	page {
		background: #f8f8f8;

		.userbox {
			.user_header {
				background: #5198ff;
				height: 287px;
				width: 100vw;
				position: relative;
				padding: 0 4%;

				.head_box {
					display: flex;
					align-items: center;
					padding: 4.5em 0 0 0.5em;
					color: #fff;

					.head_img {
						margin-right: 20px;
					}

					.head_name {
						font-size: 1.5em;
						font-weight: 500;
					}

					.departments {
						font-size: 1.1em;
					}
				}

				.user_bg {
					height: 100%;
					width: 100%;
					display: block;
					position: absolute;
					top: 0;
					left: 0;
				}

				img {
					width: 100%;
				}
			}

			.user_menu {
				margin-top: -87px;
				padding: 0 4%;
				position: relative;
				background-color: #f8f8f8;
				padding-bottom: 5px;

				.arc {
					width: 100%;
					height: 19px;
					position: absolute;
					top: -18px;
					left: 0;
				}

				.my_box {
					background-color: #fff;
					margin-bottom: 11px;
					border-radius: 0.8em;

					.top_nav {
						line-height: 33px;
						padding: 9px 16px 5px;
						display: flex;
						align-items: center;
						position: relative;

						.iconfont {
							color: #5198ff;
							font-size: 18px;
						}

						.name {
							margin-top: 2px;
							font-size: 16px;
							margin-left: 10px;
						}
					}

					.menu_btnbox {
						display: flex;
						align-items: center;

						.menu_btns {
							text-align: center;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							flex: 1;
							margin: 16px 0;
							font-size: 13px;
							color: #75787d;
							line-height: 22px;

							.p1 {
								font-size: 16px;
								font-weight: bold;
							}
						}
					}
				}

				.server_box {
					background-color: #fff;
					margin-bottom: 11px;
					border-radius: 5px;
					height: 100px;

					.iconfont {
						margin-right: 8px;
					}

					.u-cell-item {
						border: 1px solid #eee;
					}
				}
			}
		}
	}
</style>
