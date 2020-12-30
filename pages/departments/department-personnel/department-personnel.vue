<template>
  <view class="wrap">
	<u-alert-tips type="warning" :show-icon="true">
		<view class="desc">
			科室中有<text class='text_number'>{{ Info.groupInfo.groupUserList.length }}</text>人无法接收到排班发布通知。 <!-- <text class='text_go'>去查看</text> -->
		</view>
	</u-alert-tips>
	<mine-card></mine-card>
	<uni-list class="userlist">
	    <uni-list-item v-for="(item,index) in userList" :key="index" :clickable="true" @click="goInfo(item)">
			<template slot="header">
				<text class="name">{{ item.info.nickName || item.userName }}</text>
				<text class="professionalTitle">{{ item.info.positional ? item.info.positional : '无' }}</text>
			</template>
			<template class="footer" slot="footer">
				<view v-if="item.status !== 0" class="permission">{{ item.status === 1 ? '管理员' : '创建者' }}</view>
			</template>
		</uni-list-item>
	</uni-list>
	<button class="bottomBtn"  open-type="share" :data-title="shareInfo.title" :data-imgurl="shareInfo.imgurl" :data-path="shareInfo.path">邀请成员</button>
  </view>
</template>

<script>
	import mineCard from './mine-card.vue'
	import { getStorageInfo } from '@/utils/index.js'
	import { requestGet } from '@/utils/request.js';
	export default {
		components: {
			mineCard
		},
		data() {
			return {
				userList: [],
				shareInfo: {}
			};
		},
		computed: {
		    Info () {
		        return this.$store.state.Info
		    }
		},
		onShareAppMessage(data) {
		    let dataset = data.target.dataset  
		    return {  
		        title: dataset.title,  
		        imageUrl: dataset.imgurl,  
		        path: dataset.path  
		    }  
		},
		onShow() {
			uni.showLoading({
			    title: '加载中',
				mask: true
			});
			this.shareInfo.title = `${this.Info.userInfo.nickName} 邀请您加入'${this.Info.groupInfo.groupName}'，赶快点击加入吧！`
			this.shareInfo.imgurl = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-scheduling/7341daa0-2eeb-11eb-880a-0db19f4f74bb.png'
			this.shareInfo.path = `/pages/personnel/join/join?userid=${this.Info.userInfo.id}&&userName=${this.Info.userInfo.name}&&groupId=${this.Info.groupInfo.id}&&groupName=${this.Info.groupInfo.groupName}`
			this.userList = this.Info.groupInfo.groupUserList;
			if (this.userList.length > 0) {
				this.userList.forEach((item, i) => {
					this.getUserInfo(item.userId, i)
				})
			}
		},
		methods: {
			goInfo (item) {
				uni.navigateTo({
				    url: `/pages/personnel/personnel-info/personnel-info?info=${encodeURIComponent(JSON.stringify(item))}&type=1`
				});
			},
			getUserInfo (Id, i) {
				requestGet(`/user/detail/${Id}`,res => {
					const {code, msg, data} = res.data;
					if (code === 'success') {
						console.log(data)
						this.userList[i].info = data;
						this.$forceUpdate();
						setTimeout(() => {
							uni.hideLoading();
						}, 1000)
					} else {
						uni.showToast({
							title: '系统错误',
							content: msg,
							icon: 'none',
							duration: 1000
						})
					}
				})
			}
		}
	};
</script>

<style lang="scss">
	@import "@/components/tab-bar/tab-bar.scss";
	.tab-inner {
		padding: 0 !important;
		height: 100% !important;
		overflow-y: auto !important;
	}
	.desc {
		font-size: 26rpx;
		text-align: left;
		color: #606266;
		.text_number {
			margin: 0 6rpx;
			font-weight: 500;
			color: $warning-color;
		}
		.text_go {
			font-weight: 500;
			text-decoration: underline;
			color: $warning-color;
		}
	}
	.bottomBtn {
		padding-bottom: constant(safe-area-inset-bottom);/* 兼容 iOS < 11.2 */
		padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
		background-color: $base-color;
		border-radius: 0;
		color: #fff;
		font-weight: 500;
		width: 100%;
		position: fixed;
		bottom: 0;
	}
	.userlist {
		margin-top: 30rpx;
		display: block;
		.name {
			font-size: 32rpx;
			display: block;
		}
		.professionalTitle {
			font-size: 28rpx;
			color: $half-text-color;
		}
		.footer {
			display: flex;
			align-items: center;
			.permission {
				padding: 6rpx 12rpx;
				color: #fff;
				background-color: #6faaff;
				-webkit-border-radius: 10rpx;
				border-radius: 30rpx;
				font-size: 26rpx;
			}
		}
	}
</style>
