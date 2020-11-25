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
		},
		onShareAppMessage(data) {
			console.log(data)
		    let dataset = data.target.dataset  
		    return {  
		        title: dataset.title,  
		        imageUrl: dataset.imgurl,  
		        path: dataset.path  
		    }  
		}
	}
</script>

<style lang="scss">
</style>
