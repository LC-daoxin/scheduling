<template>
	<view>
		<view class="header">
			<view class="month">{{ year }}年{{ month }}月</view>
		</view>
		<textarea :disabled="Info.userInfo.groupRole === 0" class="remark" v-model="newRemark" placeholder="请输入排班备注(不超过500字)"  :maxlength="500"/>
		<button v-if="Info.userInfo && Info.userInfo.groupRole !== 0" class="bottomBtn" @click="saveRemark">保存</button>
	</view>
</template>

<script>
	import { requestPost } from '@/utils/request.js';
	export default {
		data() {
			return {
				newRemark: '',
				year: '',
				month: ''
			};
		},
		onLoad(option) {
			console.log(option)
			this.year = option.year;
			this.month = option.month;
			this.newRemark = JSON.parse(decodeURIComponent(option.remark));
		},
		computed: {
		    Info () {
		        return this.$store.state.Info
		    }
		},
		methods: {
			saveRemark () {
				let postData = {
					'remark': this.newRemark,
					'months': `${this.year}-${this.month}`,
				}
				console.log(postData);
				requestPost('/schedul/updateRemark', postData, res => {
					const {code, msg, data} = res.data;
					console.log(res)
					if (code === 'success') {
						uni.navigateBack({})
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
	}
</script>

<style lang="scss">
	.header {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #fff;
		font-size: 34rpx;
		font-weight: 400;
		padding: 0 30rpx;
	}
	.remark {
		width: 100%;
		height: calc(80vh);
		background-color: #fff;
		padding: 20rpx;
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
</style>
