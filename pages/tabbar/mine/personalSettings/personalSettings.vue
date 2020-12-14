<template>
	<view class="personal-settings">
		<text class="title">个人信息</text>
		<u-cell-group class="personal-info">
			<u-cell-item title="昵称" :value="info.nickName" @click="open('昵称', 'name')"></u-cell-item>
			<u-cell-item title="手机" :value="info.mobile" @click="open('手机', 'phone')"></u-cell-item>
			<u-cell-item title="邮箱" :value="info.email" @click="open('邮箱', 'email')"></u-cell-item>
		</u-cell-group>
		<text class="title">医院信息</text>
		<u-cell-group>
			<u-cell-item title="医院" :value="info.hospital" @click="open('医院', 'hospital')"></u-cell-item>
			<u-cell-item title="科室" :value="info.officce" @click="open('科室', 'departments')"></u-cell-item>
		</u-cell-group>
		<popup :title="editInfoTitle" ref="popup">
			<input type="text" v-model="inputValue" />
			<button class="button button--primary" @click="save">保存</button>
		</popup>
	</view>
</template>

<script>
	import popup from '@/components/popup/popup.vue';
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
					officce: ''
				}
			};
		},
		methods: {
			open(title, key) {
				this.editInfoTitle = title;
				this.inputTarget = key;
				this.$refs.popup.open();
			},
			save() {
				const postData = {
					[this.inputTarget]: this.inputValue
				}
				this.info[this.inputTarget] = this.inputValue;
				requestPost('/user/updateUser', postData, res => {
					const {
						code,
						msg,
						data
					} = res.data
					if (code === 'success') {
						this.inputValue = '';
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
			popup
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
