<template>
	<view class="message-item">
		<view :class="{ imgHead: true, no_read: !msg.status, read: msg.status === 1 }" v-for="(msg, msgIndex) in list" :key="msgIndex" @click="msgDetail(msg)">
			<!-- 用户头像 -->
			<view class="imgBox">
				<u-avatar v-if="msg.avatarUrl" class="head_img" :src="msg.avatarUrl" mode="circle" size="90"></u-avatar>
				<view v-else class="text">{{ msg.sender }}</view>
			</view>
			<!-- 消息内容 -->
			<view class="contentBox">
				<view class="contentBoxHead">
					<view class="contentBoxHead_title">#{{ msg.groupName }}</view>
					<view class="contentBoxHead_time">{{ msg.createTime }}</view>
				</view>
				<view class="contentBoxTitle">{{ msg.title }}</view>
				<view class="contentBoxText">{{ msg.content }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { requestGet } from '@/utils/request.js';

export default {
	name: 'MessageItem',
	props: {
		list: Array
	},
	methods: {
		msgDetail(msg) {
			this.isRead(msg.id);
			uni.setStorage({
				key: 'notice',
				data: msg
			})
			uni.navigateTo({
				url: '/pages/tabbar/notice/noticeDetail/noticeDetail'
			});
		},
    isRead(id) {
      requestGet('/schedul/read/' + id, res => {
        const { code, msg, data } = res.data;
				if (code !== 'success') {
					uni.showToast({
						title: '系统错误',
						content: msg,
						icon: 'none',
						duration: 1500
					});
				}
      })
    }
	}
};
</script>

<style lang="scss" scoped>
.message-item {
	background: $uni-bg-color;

	.no_read {
		color: #333;
	}

	.read {
		color: #ccc;
	}

	.imgHead {
		display: flex;
		align-items: center;
		flex-direction: row;

		.imgBox {
			width: 75px;
			height: 70px;
			display: flex;
			justify-content: center;
			align-items: center;

			.text {
				width: 40px;
				height: 40px;
				border-radius: 50%;
				color: #fff;
				background-color: $base-color;
				font-weight: 500;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.contentBox {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			padding: 8px 10px 0 0;
			height: 70px;
			width: calc(100% - 75px);
			border-bottom: 1px solid #dbdfdf;

			.contentBoxHead {
				display: flex;
				align-items: center;
				flex-direction: row;
				justify-content: space-between;
				width: 100%;
				font-size: 12px;
			}

			.contentBoxTitle {
				font-size: 14px;
			}

			.contentBoxText {
				font-size: 12px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 90%;
			}
		}
	}
}
</style>
