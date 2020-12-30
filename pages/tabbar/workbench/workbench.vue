<template>
	<view class="mine">
		<department-detail v-if="Info.userInfo" ref="detail"></department-detail>
		<member-management v-if="Info.userInfo && Info.userInfo.groupRole !== 0"></member-management>
		<workbench v-if="Info.userInfo" title='成员申请'></workbench>
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
			if (this.Info.userInfo) {
				if (!this.Info.userInfo.groupId) {
					uni.reLaunch({
					    url: '/pages/departments/department-list/department-list'
					});
				} else {
					this.$refs.detail.initInfo(this.Info)
				}
			} else {
				uni.reLaunch({
				    url: '/pages/departments/department-list/department-list'
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $bg-color;
		.loginBtn {
			margin: 20px;
			background-color: $base-color;
			color: #fff;
		}
	}
</style>
