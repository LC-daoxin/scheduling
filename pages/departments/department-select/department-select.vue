<template>
	<view>
		<department-category ref="departmentCategory" :categoryList="categoryList" :status='status' :subCategoryList="subCategoryList" @categoryMainClick="categoryMainClick" @categorySubClick="categorySubClick"></department-category>
	</view>
</template>

<script>
	import { requestGet } from '@/utils/request.js'
	export default {
		data() {
			return {
				categoryList:[], // 科类分类列表
				subCategoryList:[],
				status: null
			};
		},
		onReady() {
			this.getList();
		},
		onLoad: function(option){
			this.status = option.type
		},
		methods: {
			categoryMainClick(category){
				this.subCategoryList = category.subCategoryList;
			},
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
						this.categoryList = data
						this.$refs.departmentCategory.setActiveMain(data[0])
						this.subCategoryList = this.categoryList[0].subCategoryList;
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
