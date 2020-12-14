<template>
	<popup title="选择医院" ref="popup">
		<department-category :categoryList="categoryList" @categoryMainClick="categoryMainClick" @categorySubClick="categorySubClick"></department-category>
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
				categoryList: []
			};
		},
		methods: {
			categorySubClick(category) {
				this.$emit('change', category)
			},
			getList() {
				requestGet('/dept/officeList', res => {
					const {
						code,
						msg,
						data
					} = res.data
					if (code === 'success') {
						this.categoryList = data
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
			}
		},
		mounted() {
			this.getList()
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		.icon-zhengque {
			font-size: 36rpx;
			color: $base-color;
		}
	}
</style>
