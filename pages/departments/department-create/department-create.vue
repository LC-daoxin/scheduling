<template>
	<view>
		<uni-list>
		    <uni-list-item link to="/pages/departments/hospitalList/hospitalList?type=1"  :rightText="info.hospitalName">
				<template slot="header">
					<text class="title">所属医院</text><text class="red">*</text>
				</template>
			</uni-list-item>
		    <uni-list-item link to="/pages/departments/department-select/department-select?type=1"  :rightText="info.officeName">
				<template slot="header">
					<text class="title">所属科室</text><text class="red">*</text>
				</template>
			</uni-list-item>
		    <uni-list-item>
				<template slot="header">
					<text class="title">科室名称</text><text class="red">*</text>
				</template>
				<template slot="footer">
					<input class="uni-input" placeholder-style="text-align: right" placeholder="输入科室名称" v-model="info.groupName"/>
				</template>
			</uni-list-item>
		    <!-- <uni-list-item>
				<template slot="header">
					<text class="title">您的姓名</text><text class="red">*</text>
				</template>
				<template slot="footer">
					<input class="uni-input" placeholder-style="text-align: right" placeholder="输入您的姓名" v-model="info.createUser"/>
				</template>
			</uni-list-item> -->
		</uni-list>
		<button class="createBtn" @click="create">创建科室</button>
	</view>
</template>

<script>
	import { requestPost } from '@/utils/request.js'
	import { getUserInfo } from '@/utils/index.js'
	export default {
		data() {
			return {
				info: {
					groupName: null,
					hospitalId: null,
					hospitalName: null,
					officeId: null,
					officeName: null
					// createUser: null
				}
			};
		},
		onLoad() {
			let that = this
			uni.$on('getHospital',function(item){
				console.log('getHospital', item)
				that.info.hospitalId = item.id;
				that.info.hospitalName = item.name;
			})
			uni.$on('getOffice',function(item){
				console.log('getOffice', item)
				that.info.officeId = item.id;
				that.info.officeName = item.name;
				if (!that.info.groupName) {
					that.info.groupName = item.name
				}
			})
		},
		methods: {
			create () {
				const postData = {
					'groupName' : this.info.groupName,
					'hospitalName' : this.info.hospitalName,
					'hospitalId' : this.info.hospitalId,
					'officeName' : this.info.officeName,
					'officeId' : this.info.officeId
				}
				requestPost('/group/addGroup', postData, res => {
					const { code, msg, data } = res.data;
					if (code === 'success') {
						uni.showToast({
							title: '排班组创建成功！',
							content: msg,
							duration: 1000
						})
						getUserInfo(); // 更新的用户信息
						setTimeout(() => {
							uni.switchTab({
							    url: '/pages/tabbar/home/home'
							});
						}, 900)
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
	.uni-input {
		text-align: right;
	}
	.title {
		font-size: 28rpx;
	}
	.red {
		display: inline-block;
		color: red;
		vertical-align: top;
	}
	.createBtn {
		width: 90%;
		margin-top: 30rpx;
		background-color: $base-color;
		color: #fff;
	}
</style>
