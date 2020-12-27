<template>
	<view class="mine">
		<department-detail ref="detail"></department-detail>
		<member-management></member-management>
		<workbench title='成员申请'></workbench>
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
			this.$refs.detail.initInfo(this.Info)
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $bg-color;
	}
</style>
