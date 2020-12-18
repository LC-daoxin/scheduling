<template>
	<view>
		<view :style="{'height':statusBarHeight}"></view>
		<button v-if="!show" class="loginBtn" open-type="getUserInfo" @getuserinfo="getUserInfo">请登录<text class="iconfont icon-xiangyou"></text></button>
		<view v-else class="header" :style="{'height':titleBarHeight}">
			<u-button class="switchBtn" shape="circle" :custom-style="switchBtn" size="mini" @click="toList">切换</u-button>
			<navigator url="/pages/departments/department-info/department-info">
				<view class="departments">
					<text>{{ Info.groupInfo.groupName }}</text>
					<text class="iconfont icon-xiangyou"></text>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		props:["show"],
		data() {
			return {
				statusBarHeight: 0, // 状态栏高度
				titleBarHeight: 0, // 胶囊按钮高度
				switchBtn: {
					backgroundColor: '#e4fdff',
					padding: '1rpx 20rpx',
					fontWeight: '500'
				}
			}
		},
		computed: {
		    Info () {
		        return this.$store.state.Info
		    }
		},
		created() {
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			let Info = uni.getSystemInfoSync();
			this.statusBarHeight = Info.statusBarHeight  + 'px'; // 状态栏高度
			this.titleBarHeight = (menuButtonInfo.bottom - Info.statusBarHeight) + (menuButtonInfo.top - Info.statusBarHeight)  + 'px';
		},
		methods: {
			getUserInfo () {
				let that =this
				uni.getUserInfo({
					success(res) {
						console.log(res)
						that.$emit('hasInfo', true);
					},
					fail(res) {
						console.log(res)
					}
				})
			},
			toList() {
				uni.navigateTo({
					url: '/pages/departments/department-list/department-list'
				});
			}
		}
	}
</script>

<style lang="scss">
	.loginBtn {
		display: flex;
		align-items: center;
		background-color: $bg-color;
		border: none;
		text-align: left;
		&::after {
			border: none;
		}
	}
	.header {
		display: flex;
		align-items: center;
		.switchBtn {
			margin-left: 18rpx;
		}
		.departments {
			margin-left: 16rpx;
			display: flex;
			align-items: center;
			.icon-xiangyou {
				margin-left: 4rpx;
				font-size: 24rpx;
			}
		}
	}
</style>
