<template>
	<view>
		<department-detail ref="detail"></department-detail>
	</view>
</template>

<script>
	import { getGroupInfo } from '@/utils/index.js';
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
			getGroupInfo(this.Info.userInfo.groupId).then(() => {
				this.$refs.detail.initInfo(this.Info)
			});
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
