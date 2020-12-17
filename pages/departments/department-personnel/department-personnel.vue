<template>
  <view class="wrap">
    <view class="tab-bar">
      <view class="tab-header">
		<view :class="'tab-header_item ' + isCurrentTab(0)" @click="switchTab(0)">人员</view>
		<view :class="'tab-header_item ' + isCurrentTab(1)" @click="switchTab(1)">统计</view>
      </view>
      <view class="tab-inner">
        <view v-show="currentTabIndex === 0" class="tab-inner_item">
			<u-alert-tips type="warning" :show-icon="true">
				<view class="desc">
					科室中有<text class='text_number'>5</text>人无法接收到排班发布通知。 <text class='text_go'>去查看</text>
				</view>
			</u-alert-tips>
			<mine-card></mine-card>
			<uni-list class="userlist">
			    <uni-list-item v-for="(item,index) in userList" :key="index" :clickable="true" @click="goInfo(item)">
					<template slot="header">
						<text class="name">{{ item.name }}</text>
						<text class="professionalTitle">{{ item.professionalTitle }}</text>
					</template>
					<template class="footer" slot="footer">
						<view v-if="item.permission !== '用户'" class="permission">{{ item.permission }}</view>
					</template>
				</uni-list-item>
			</uni-list>
			<button class="bottomBtn"  open-type="share" :data-title="shareInfo.title" :data-imgurl="shareInfo.imgurl" :data-path="shareInfo.path">邀请成员</button>
        </view>
		<view v-show="currentTabIndex === 1" class="tab-inner_item">
			<u-alert-tips type="warning" :show-icon="true" :description="notice"></u-alert-tips>
		</view>
      </view>
    </view>
  </view>
</template>

<script>
	import mineCard from './mine-card.vue'
	import { getStorageInfo } from '@/utils/index.js'
	export default {
		components: {
			mineCard
		},
		data() {
			return {
				userList: [{
					name: '赵易',
					id: 201001,
					phoneNumber: '15201367242',
					professionalTitle: '主任护师',
					tier: 'N4',
					seniority: 8,
					permission: '创建者'
				},{
					name: '钱尔',
					id: 201002,
					phoneNumber: '15201367242',
					professionalTitle: '副主任护师',
					tier: 'N4',
					seniority: 8,
					permission: '管理员'
				},{
					name: '孙时',
					id: 201003,
					phoneNumber: '15201367242',
					professionalTitle: '副主任护师',
					tier: 'N4',
					seniority: 8,
					permission: '管理员'
				},{
					name: '李思',
					id: 201004,
					phoneNumber: '15201367242',
					professionalTitle: '护士',
					tier: 'N4',
					seniority: 8,
					permission: '用户'
				},{
					name: '周梧',
					id: 201005,
					phoneNumber: '15201367242',
					professionalTitle: '护士',
					tier: 'N4',
					seniority: 8,
					permission: '用户'
				},{
					name: '吴柳',
					id: 201006,
					phoneNumber: '15201367242',
					professionalTitle: '护士',
					tier: 'N4',
					seniority: 8,
					permission: '用户'
				},{
					name: '王奇',
					id: 201007,
					phoneNumber: '15201367242',
					professionalTitle: '护士',
					tier: 'N4',
					seniority: 8,
					permission: '用户'
				}],
				currentTabIndex: 0,
				notice: '如统计数据有误，请先维护人员信息',
				shareInfo: {}
			};
		},
		onShareAppMessage(data) {
			console.log(data)
		    let dataset = data.target.dataset  
		    return {  
		        title: dataset.title,  
		        imageUrl: dataset.imgurl,  
		        path: dataset.path  
		    }  
		},
		onReady() {
			let Info = getStorageInfo();
			this.shareInfo.title = `${Info.userInfo.nickName} 邀请您加入'${Info.userInfo.groupName}'，赶快点击加入吧！`
			this.shareInfo.imgurl = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-scheduling/7341daa0-2eeb-11eb-880a-0db19f4f74bb.png'
			this.shareInfo.path = `/pages/tabbar/home/home?userid=${Info.userInfo.id}&&userName=${Info.userInfo.name}&&groupId=${Info.userInfo.groupId}&&groupName=${Info.userInfo.groupName}`
		},
		methods: {
			isCurrentTab(index) {
				return this.currentTabIndex === index ? 'tab-header_item_active' : '';
			},
			switchTab(index) {
				this.currentTabIndex = index;
			},
			goInfo () {
				uni.navigateTo({
				    url: '/pages/personnel/personnel-info/personnel-info',
					success: function(res) {
						console.log(res)
					}
				});
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
