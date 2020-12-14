<template>
	<popup title="选择医院" ref="popup">
		<view class="hospital-list">
			<p class="hospital-item" v-for="item of list" :key="item.id" @click="selected(item)">{{ item.name }}</p>
		</view>
	</popup>
</template>

<script>
	import popup from '@/components/popup/popup.vue';
	import {
		requestGet
	} from '@/utils/request.js'

	export default {
		data() {
			return {
				list: []
			}
		},
		methods: {
			getList() {
				requestGet('/dept/hospList', res => {
					const {
						code,
						msg,
						data
					} = res.data
					if (code === 'success') {
						this.list = data
					} else {
						uni.showToast({
							title: '系统错误',
							content: msg,
							icon: 'none',
							duration: 1000
						})
					}
				})
			},
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			selected(item) {
				this.$emit('change', item)
			}
		},
		mounted() {
			this.getList()
		}
	}
</script>

<style lang="scss" scoped>
	.hospital-list {
		margin-top: 2em;
		
		.hospital-item + .hospital-item {
			border-top: 1px solid #eee;
		}
	}
</style>