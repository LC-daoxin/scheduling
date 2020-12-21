<template>
	<view>
		<department-detail ref="detail"></department-detail>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		computed: {
		    Info () {
		        return this.$store.state.Info
		    }
		},
		onShow() {
			uni.setNavigationBarTitle({
			    title: this.Info.groupInfo.groupName
			});
			this.$refs.detail.initInfo(this.Info)
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
