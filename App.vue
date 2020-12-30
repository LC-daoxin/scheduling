<script>
	import { request, requestPost } from '@/utils/request.js';
	import { getUserInfo, getGroupInfo } from '@/utils/index.js';
	import store from '@/store'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			let that = this;
			uni.$on('getAppUserInfo',function(val){
				console.log(val)
				console.log('getAppUserInfo')
				that.authorize();
			})
		},
		onShow: function() {
			console.log('App Show')
			this.authorize();
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			authorize() {
				let that = this;
				// 获取用户的当前设置
				uni.getSetting({
					success: res => {
						console.log('获取用户的当前设置', res)
						if (res.authSetting['scope.userInfo']) { // 已经授权用户信息
							that.authSettingUser(true);
							that.login();
						} else { // 未授权用户信息
							uni.hideLoading();
							that.authSettingUser(false)
							that.getNoAuthInfo();
						}
					}
				});
			},
			// 保存用户是否授权
			authSettingUser (val) {
				uni.setStorage({
					key: 'authSetUser',
					data: val
				})
			},
			// 未授权的情况下 根据Storage 获取信息
			getNoAuthInfo () {
				uni.getStorage({
					key: 'userInfo',
					success(res){
						// 首页数据获取
						uni.$emit('getHomeInfo');
						store.commit('updateUserInfo', res.data)
						uni.hideLoading();
					}
				})
				uni.getStorage({
					key: 'groupInfo',
					success(res){
						store.commit('updateGroupInfo', res.data)
					}
				})
			},
			login() {
				uni.showLoading({
				    title: '加载中',
					mask: true
				});
				setTimeout(()=>{
					uni.hideLoading();
				}, 10000)
				uni.getUserInfo({
					success: res => {
						let userInfo = res.userInfo;
						uni.login({
							success: res => {
								if (res.code) {
									let postData = {
										code: res.code,
										...userInfo
									}
									request('/user/addUser', 'post', postData,
										res => {
											const { code, msg, data } = res.data;
											if (code === 'success') {
												// 获取token
												uni.setStorage({
													key: 'token',
													data: data
												})
												getUserInfo().then(()=>{
													uni.getStorage({
														key: 'userInfo',
														success: res => {
															let data = res.data;
															uni.hideLoading();
															if (data.groupId) {
																getGroupInfo(data.groupId).then(() => {
																	uni.$emit('getHomeInfo')
																})
															} else {
																uni.removeStorageSync('groupInfo');
															}
														}
													})
												})
											}
										}
									)
								}
							}
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";

	page {
		background-color: $bg-color;
		$text-color: #666;
	}
</style>
