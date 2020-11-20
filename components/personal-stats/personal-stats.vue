<template>
	<view class="personal">
		<view class="personal-content">
			<view class="time">
				<text class="total-time">
					<text class="title">总工时</text>
					<text class="time">{{ total_time }} 小时</text>
				</text>
				<text class="owed-time">
					<text class="title">实际存欠</text>
					<text class="time">{{ owed_time }} 小时</text>
				</text>
			</view>
			<text class="iconfont icon-xiangyou"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				total_time: 60,
				owed_time: 0
			};
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/css/iconfont.css';
	.personal {
		padding: 5px;
		&-content {
			display: flex;
			justify-content: space-between;
			height: 50px;
			font-size: 16px;
			line-height: 50px;
			padding: 0 20px;
			background-color: #fff;
			border-radius: 10px;
			.time {
				.total-time {
					margin-right: 30px;
					.title {
						margin-right: 10px;
					}
					.time {
						font-weight: 400;
						color: orange;
					}
				}
				.owed-time {
					.title {
						margin-right: 10px;
					}
					.time {
						font-weight: 400;
						color: orange;
					}
				}
			}
		}
	}
</style>
