<template>
	<view class="msg_detail">
		<view class="msg_title">十一加班通知</view>
		<view class="sender">
			<view class="avatar">
				<image v-if="avatar" src="" class="img_avatar"></image>
				<view v-else class="text_avatar">J</view>
			</view>
			<view class="info">
				<view class="userName">Julie Andrews Stein</view>
				<view class="sendTime">2020-10-20 18:00</view>
			</view>
		</view>
		<div class="msg_content">
			本月由于工程项目任务急项目截止时间紧，需要全体成员每天8点上班，晚上10点下班。
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			avatar: ''
		};
	},
	methods: {}
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
				background-color: #eee;
				color: #fff;
				border-radius: 50%;
			}
			
			.userName {
				color: #333;
			}
			
			.sendTime {
				color: #2B85E4;
			}
		}
		
		.msg_content {
			line-height: 1.8;
			letter-spacing: 0.1em;
		}
	}
</style>
