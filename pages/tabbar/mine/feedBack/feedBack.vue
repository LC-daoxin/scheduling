<template>
	<view class="feed-back">
		<view class="feed-back-item">
			<p>反馈标题</p>
			<input v-model="formData.title" type="text" />
		</view>
		<view class="feed-back-item">
			<p>反馈内容</p>
			<textarea v-model="formData.advise" />
			</view>
		<button class="button button--primary" @click="submit()">提交</button>
	</view>
</template>

<script>
	import FormPage from '@/components/FormPage.vue'
	import { requestPost } from '@/utils/request.js'

	export default {
		data() {
			return {
				formData: {
					title: '',
					advise: ''
				}
			}
		},
		methods: {
			submit() {
				requestPost('/user/feedbackUser', this.formData, res => {
					const { code, msg, data } = res.data
					if (code === 'success') {
						this.formData.title = ''
						this.formData.advise = ''
						
						uni.showToast({
							title: '反馈成功',
							duration: 1000
						})
						
						uni.navigateBack()
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
		},
		components: {
			FormPage
		}
	};
</script>

<style lang="scss" scoped>
	.feed-back {
		padding: 1em;

			.feed-back-item {
				padding: 1em;
				border-radius: 0.5em;
				background-color: #ffffff;
				
				p {
					margin-bottom: 0.5em;
				}

				input,
				textarea {
					padding: 0.2em 0.4em;
					border: 1px solid #eee;
					border-radius: 0.4em;
					background-color: #fff;
				}
			}	

			.feed-back-item + .feed-back-item {
				margin-top: 0.5em;
			}
			
			.button {
				margin-top: 0.5em;
			}
	}
</style>
