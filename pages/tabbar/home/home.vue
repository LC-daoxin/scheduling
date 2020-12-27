<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<!-- 状态栏 +  -->
		<home-navbar :show="hasInfo" @hasInfo="changeHasInfo"></home-navbar>
		<!-- #endif -->
		<!-- 公告 -->
		<notice :colors="colors" :noticeList="noticeList"></notice>
		<!-- 公告 -->
		<uni-calendar
			ref="calendar"
			:insert="true"
			:lunar="false"
			:start-date="'2000-1-1'"
			:selected="datelist"
			@change="change"
		/>
		<personal-stats></personal-stats>
		<activity></activity>
	</view>
</template>

<script>
import uniCalendar from '@/components/uni-calendar/uni-calendar.vue';
import { request, requestPost, requestGet } from '@/utils/request.js';
import { getUserInfo, getGroupInfo } from '@/utils/index.js';
import { getCountDays, getWorkList } from '@/utils/index';
export default {
	components: {
		uniCalendar
	},
	data() {
		let currentDate = new Date;
		return {
			// 自定义导航栏对象
			setNav: {
				departmentsName: '心血管内科'
			},
			hasInfo: false,
			datelist: [],
			list: [],
			current: 0,
			noticeList: [],
			colors: 'red',
			nowDate: {
				year: currentDate.getFullYear(),
				month: currentDate.getMonth() + 1,
				day: getCountDays()
			},
			classlist: [] // 班种列表
		};
	},
	onShow() {
		uni.showLoading({
		    title: '加载中',
			mask: true
		});
		setTimeout(()=>{
			uni.hideLoading();
		}, 10000)
		uni.getUserInfo({
			success: res => {
				if (res.errMsg === 'getUserInfo:ok') {
					this.hasInfo = true;
					this.authorize();
				}
			},
			fail: res => {
				if (res) {
					this.hasInfo = false;
				}
			}
		});
		getWorkList(this.getWorkListSucc, 1);
	},
	mounted() {
		let that = this;
		this.list = this.$store.state.vuex_tabbar;
		uni.$on('UserSchedulList',function(months){
			that.getUserSchedulList(months);
		})
	},
	methods: {
		change(e) {},
		changeHasInfo(show) {
			this.hasInfo = show;
		},
		getUserSchedulList (months) {
			let postData;
			if (months) {
				postData = {
					'startTime': `${months}-01`,
					'endTime': `${months}-${getCountDays(months.substring(5,7))}`
				}
			} else {
				postData = {
					'startTime': `${this.nowDate.year}-${this.nowDate.month}-01`,
					'endTime': `${this.nowDate.year}-${this.nowDate.month}-${this.nowDate.day}`
				}
			}
			this.datelist = []; // 清空list
			requestPost('/schedul/UserSchedulList', postData, res => {
				const {code, msg, data} = res.data;
				if (code === 'success') {
					if (data.length > 0 && data[0].content.length > 0) {
						data[0].content.forEach(item => {
							let data = [];
							item.workspeciName.forEach(v => {
								this.classlist.forEach(item => {
									if (item.workName === v) {
										data.push({
											'time': item.timeInterval.replace(',',' '),
											'type': v
										})
									}
								})
							})
							this.datelist.push({
								'date': item.schedulDate,
								'read': true,
								'info': item.workspeciName,
								'type': '',
								'data': data
							})
							uni.hideLoading();
						})
					} else {
						this.datelist = []
					}
				} else {
					uni.showToast({
						title: '系统错误',
						content: msg,
						icon: 'none',
						duration: 1000
					})
				}
			})
		},
		// 获取班种列表
		getWorkListSucc(res) {
			const { code, msg, data } = res.data;
			if (code === 'success') {
				this.classlist = data;
			} else {
				uni.showToast({
					title: '系统错误',
					content: msg,
					icon: 'none',
					duration: 1500
				});
			}
		},
		login(userInfo) {
			wx.login({
				success: res => {
					if (res.code) {
						request(
							'/user/addUser',
							'post',
							{
								code: res.code,
								...userInfo
							},
							res => {
								const { code, msg, data } = res.data;
								if (code === 'success') {
									uni.setStorage({
										key: 'token',
										data: data
									})
									getUserInfo().then(()=>{
										uni.getStorage({
											key: 'userInfo',
											success: res => {
												let data = res.data
												getGroupInfo(data.groupId).then(()=>{
													this.getUserSchedulList();
												})
											}
										})
									})
								}
							})
						}
					}
				})
			},
			authorize() {
				wx.getSetting({
					success: res => {
						if (res.authSetting['scope.userInfo']) {
							wx.getUserInfo({
								success: res => {
									this.login(res.userInfo);
									getUserInfo();
									this.setNoticeList();
								}
							}
						);
					}
				}
			});
		},
		setNoticeList() {
			uni.getStorage({
				key: 'notice',
				success: res => {
					this.noticeList = res.data.hospList;
				}
			});
		},
		authorize() {
			wx.getSetting({
				success: res => {
					if (res.authSetting['scope.userInfo']) {
						wx.getUserInfo({
							success: res => {
								this.login(res.userInfo);
							}
						});
					}
				}
			});
		},
		getSetting() {
			success: res => {
				if (res.authSetting['scope.userInfo']) {
					wx.getUserInfo({
						success: res => {
							this.login(res.userInfo);
						}
					});
				}
			};
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: $bg-color;
}
</style>
