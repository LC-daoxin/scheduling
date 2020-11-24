<template>
	<view class="message-item">
		<view :class="{ imgHead: true, no_read: !msg.readStatus, read: msg.readStatus }" v-for="(msg, msgIndex) in notice.msgList" :key="msgIndex" @click="msgDetail">
			<!-- 用户头像 -->
			<view class="imgBox">
				<view v-if="msg.userImgUrl === null" :style="{ background: msg.color }" class="text">{{ msg.userName }}</view>
				<image v-else src="msg.userImgUrl"></image>
			</view>
			<!-- 消息内容 -->
			<view class="contentBox">
				<view class="contentBoxHead">
					<view class="contentBoxHead_title">#{{ msg.groupName }}</view>
					<view class="contentBoxHead_time">{{ msg.sendTime }}</view>
				</view>
				<view class="contentBoxTitle">{{ msg.Title }}</view>
				<view class="contentBoxText">{{ msg.content }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'MessageItem',
	props: {
		notice: Object
	},
	methods: {
		msgDetail() {
			uni.navigateTo({
				url: '/pages/tabbar/notice/noticeDetail/noticeDetail'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.message-item {
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
			padding: 8px 10px 0;
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
