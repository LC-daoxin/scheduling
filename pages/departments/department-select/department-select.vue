<template>
	<view>
		<department-category :categoryList="categoryList" :subCategoryList="subCategoryList" @categoryMainClick="categoryMainClick" @categorySubClick="categorySubClick"></department-category>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categoryList:[{ // 科类分类列表
					name: '内科',
					subCategoryList: [{
						name: '内科'
					},{
						name: '普通内科'
					},{
						name: '呼吸内科'
					},{
						name: '消化内科'
					},{
						name: '神经内科'
					},{
						name: '心血管内科'
					},{
						name: '肾内科'
					},{
						name: '血液透析科'
					},{
						name: '血液内科'
					},{
						name: '免疫科'
					},{
						name: '内分泌科'
					}]
				},{
					name: '外科',
					subCategoryList: [{
						name: '外科'
					},{
						name: '普通外科'
					},{
						name: '神经外科'
					},{
						name: '心胸外科'
					},{
						name: '泌尿外科'
					},{
						name: '心血管外科'
					},{
						name: '乳腺外科'
					}]
				},{
					name: '妇产科',
					subCategoryList: [{
						name: '妇产科'
					},{
						name: '妇科'
					},{
						name: '产科'
					},{
						name: '计划生育'
					},{
						name: '妇幼保健'
					}]
				},{
					name: '男科',
					subCategoryList: [{
						name: '男科'
					}]
				},{
					name: '儿科',
					subCategoryList: [{
						name: '儿科'
					}]
				},{
					name: '老年科',
					subCategoryList: [{
						name: '老年科'
					}]
				},{
					name: '五官科',
					subCategoryList: [{
						name: '五官科'
					}]
				},{
					name: '肿瘤科',
					subCategoryList: [{
						name: '肿瘤科'
					}]
				},{
					name: '皮肤性病科',
					subCategoryList: [{
						name: '皮肤性病科'
					}]
				},{
					name: '中医科',
					subCategoryList: [{
						name: '中医科'
					}]
				},{
					name: '传染科',
					subCategoryList: [{
						name: '传染科'
					}]
				},{
					name: '精神心理科',
					subCategoryList: [{
						name: '精神心理科'
					}]
				},{
					name: '整形美容科',
					subCategoryList: [{
						name: '整形美容科'
					}]
				},{
					name: '营养科',
					subCategoryList: [{
						name: '营养科'
					}]
				},{
					name: '生殖中心',
					subCategoryList: [{
						name: '生殖中心'
					}]
				},{
					name: '麻醉医学科',
					subCategoryList: [{
						name: '麻醉医学科'
					}]
				},{
					name: '医学影像科',
					subCategoryList: [{
						name: '医学影像科'
					}]
				},{
					name: '其他科室',
					subCategoryList: [{
						name: '其他科室'
					}]
				}],
				subCategoryList:[]
			};
		},
		methods: {
			categoryMainClick(category){
				this.subCategoryList = category.subCategoryList;
			},
			categorySubClick(category){
				this.$emit('change', category)
			}
		},
		mounted() {
			this.subCategoryList = this.categoryList[0].subCategoryList;
		}
	}
</script>

<style lang="scss">

</style>
