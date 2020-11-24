<template>
	<view>
		<department-detail :info="info"></department-detail>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: null // 科室信息
			};
		},
		onLoad: function(option){
			console.log('App onLoad：', option); //打印出上个页面传递的参数。
			this.info = option
			uni.setNavigationBarTitle({
			    title: `${option.departmentsName}`
			});
		}
	}
</script>

<style lang="scss">
</style>
