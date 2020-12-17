<template>
	<view class="msg_detail">
		<view class="msg_title">{{ noticeDetail.title }}</view>
		<view class="sender">
			<view class="avatar">
				<u-avatar  v-if="noticeDetail.avatarUrl" class="head_img" :src="noticeDetail.avatarUrl" mode="circle" size="90"></u-avatar>
				<view v-else class="text_avatar">{{ noticeDetail.sender }}</view>
			</view>
			<view class="info">
				<view class="userName">{{ noticeDetail.sender }}</view>
				<view class="sendTime">{{ noticeDetail.createTime }}</view>
			</view>
		</view>
		<div class="msg_content">
			{{ noticeDetail.content }}
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			noticeDetail: {
				title: '',
				content: '',
				createTime: '',
				sender: '',
				groupName: '',
				avatarUrl: ''
			}
		};
	},
	methods: {},
	onShow() {
		uni.getStorage({
			key: 'notice',
			success: res => {
				Object.assign(this.noticeDetail, res.data);
			}
		});
	}
};
</script>

<style lang="scss" scoped>
.msg_detail {
	padding: 1em;

	.msg_title {
		font-size: 1.5rem;
		font-weight: bold;
	}

	.sender {
		display: flex;
		align-items: center;
		margin: 1.5em 0;

		.avatar {
			width: 2.5em;
			height: 2.5em;
			margin-right: 1em;
			line-height: 2.5em;
			text-align: center;
			font-size: 1.2em;
			background-color: $base-color;
			color: #fff;
			border-radius: 50%;
		}

		.userName {
			color: #333;
		}

		.sendTime {
			color: #2b85e4;
		}
	}

	.msg_content {
		line-height: 1.8;
		letter-spacing: 0.1em;
	}
}
</style>
