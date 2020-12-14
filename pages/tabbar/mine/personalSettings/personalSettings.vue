<template>
	<view class="personal-settings">
		<text class="title">个人信息</text>
		<u-cell-group class="personal-info">
			<u-cell-item title="昵称" :value="info.nickName" @click="open('昵称', 'nickName')"></u-cell-item>
			<u-cell-item title="手机" :value="info.mobile" @click="open('手机', 'mobile')"></u-cell-item>
			<u-cell-item title="邮箱" :value="info.email" @click="open('邮箱', 'email')"></u-cell-item>
		</u-cell-group>
		<text class="title">医院信息</text>
		<u-cell-group>
			<u-cell-item title="医院" :value="info.hospital" @click="open('医院', 'hospital')"></u-cell-item>
			<u-cell-item title="科室" :value="info.office" @click="open('科室', 'office')"></u-cell-item>
		</u-cell-group>
		<hospital-list ref="hospitalList" @change="hospitalChange"></hospital-list>
		<department-list ref="departmentList" @change="departmentChange"></department-list>
		<popup :title="editInfoTitle" ref="popup">
			<input type="text" v-model="inputValue" />
			<button class="button button--primary" @click="save">保存</button>
		</popup>
	</view>
</template>

<script>
	import popup from '@/components/popup/popup.vue';
	import HospitalList from '@/components/HospitalList.vue'
	import DepartmentList from '@/components/DepartmentList.vue'

	import {
		requestPost
	} from '@/utils/request.js'

	export default {
		data() {
			return {
				editInfoTitle: '',
				inputTarget: '',
				inputValue: '',
				info: {
					nickName: '',
					mobile: '',
					email: '',
					hospital: '',
					office: ''
				}
			};
		},
		methods: {
			open(title, key) {
				this.editInfoTitle = title;
				this.inputTarget = key;
				if (title === '医院') {
					this.$refs.hospitalList.open()
					return
				}
				if (title === '科室') {
					this.$refs.departmentList.open()
					return
				}
				this.$refs.popup.open();
			},
			hospitalChange(item) {
				this.inputValue = item.name
				this.$refs.hospitalList.close()
				this.save()
			},
			departmentChange(item) {
				this.inputValue = item.name
				this.$refs.departmentList.close()
				this.save()
			},
			save() {
				const postData = {
					[this.inputTarget]: this.inputValue
				}
				requestPost('/user/updateUser', postData, res => {
					const {
						code,
						msg,
						data
					} = res.data
					if (code === 'success') {
						this.info[this.inputTarget] = this.inputValue;
						this.inputValue = '';

						uni.showToast({
							title: '保存成功',
							duration: 1000
						})

						this.$refs.popup.close();
					} else {
						console.log(msg)
					}
				})
			}
		},
		mounted() {
			uni.getStorage({
				key: 'userInfo',
				success: res => {
					Object.assign(this.info, res.data)
				}
			})
		},
		components: {
			popup,
			HospitalList,
			DepartmentList
		}
	};
</script>

<style lang="scss" scoped>
	@import '../custom-style.scss';

	.personal-settings {
		height: calc(100vh - 44px);
		padding: 1em 1em 0;
		background-color: rgb(248, 248, 248);

		.title {
			font-size: 1.3em;
			line-height: 2;
			font-weight: bold;
		}

		.personal-info {
			margin-bottom: 1em;
		}
	}
</style>
