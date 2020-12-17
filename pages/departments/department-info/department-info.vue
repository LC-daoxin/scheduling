<template>
	<view>
		<department-detail :Info="Info"></department-detail>
	</view>
</template>

<script>
	import { getStorageInfo } from '@/utils/index.js'
	export default {
		data() {
			return {
				Info: {}, // Storage信息
			};
		},
		onLoad: function(option){
			console.log('App onLoad：', option); //打印出上个页面传递的参数。
			this.info = option
			uni.setNavigationBarTitle({
			    title: `${option.departmentsName}`
			});
			this.Info = getStorageInfo()
		},
		onShareAppMessage(data) {
			console.log('onShareAppMessage', data)
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
