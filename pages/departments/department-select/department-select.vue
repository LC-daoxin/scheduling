<template>
	<view>
		<department-category ref="departmentCategory" :categoryList="categoryList" :categoryListSort="categoryListSort" :status='status' @categorySubClick="categorySubClick"></department-category>
	</view>
</template>

<script>
	import { requestGet } from '@/utils/request.js'
	export default {
		data() {
			return {
				categoryList:[], // 科类分类列表
				status: null,
				categoryListSort: []
			};
		},
		onReady() {
			this.getList();
			uni.$on('deptSearch', searchList => {
				this.categoryList = searchList;
				this.$refs.departmentCategory.setActiveMain(searchList[0]);
			})
			uni.$on('refreshSearch', () => {
				this.getList();
			})
			uni.$on('cleanList', () => {
				this.categoryList = [];
				this.$refs.departmentCategory.setActiveMain();
			})
		},
		onLoad: function(option){
			this.status = option.type
		},
		methods: {
			categorySubClick(category){
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
						this.categoryList = data;
						this.categoryListSort = data;
						this.$refs.departmentCategory.setActiveMain(data[0]);
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

</style>
