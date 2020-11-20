<template>
	<view class="mine">
		<department-detail :info="info"></department-detail>
		<member-management></member-management>
		<workbench title='成员申请'></workbench>
		<!-- <u-tabbar v-model="current" height="56px" :list="list" inactive-color="#7A7E83" active-color="#5098ff" :mid-button="true"></u-tabbar> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					departmentsName: '心血管内科'
				}, // 科室信息
				list: [],
				current: 1
			};
		},
		mounted () {
			this.list = this.$store.state.vuex_tabbar
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $bg-color;
	}
</style>
