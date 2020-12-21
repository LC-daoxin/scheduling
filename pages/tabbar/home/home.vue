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
import { request, requestPost } from '@/utils/request.js';
import { getUserInfo, getGroupInfo } from '@/utils/index.js';
import { getCountDays } from '@/utils/index';
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
			datelist: [
				{
					date: '2020-09-27',
					read: true,
					info: '',
					type: 'workday',
					data: {}
				},
				{
					date: '2020-10-01',
					read: true,
					info: '',
					type: 'holiday',
					data: {}
				},
				{
					date: '2020-10-02',
					read: true,
					info: '',
					type: 'holiday',
					data: {}
				},
				{
					date: '2020-10-03',
					read: true,
					info: '',
					type: 'holiday',
					data: {}
				},
				{
					date: '2020-10-04',
					read: true,
					info: '',
					type: 'holiday',
					data: {}
				},
				{
					date: '2020-10-05',
					read: true,
					info: '',
					type: 'holiday',
					data: {}
				},
				{
					date: '2020-10-06',
					read: true,
					info: '',
					type: 'holiday',
					data: {}
				},
				{
					date: '2020-10-07',
					read: true,
					info: '',
					type: 'holiday',
					data: {}
				},
				{
					date: '2020-10-08',
					read: true,
					info: '',
					type: 'holiday',
					data: {}
				},
				{
					date: '2020-10-10',
					read: true,
					info: '',
					type: 'workday',
					data: {}
				},
				{
					date: '2020-11-15',
					read: false,
					info: '晚班',
					type: '',
					data: {
						time: '15:00 - 23:00',
						type: '晚班'
					}
				},
				{
					date: '2020-11-16',
					read: false,
					info: '早班',
					type: '',
					data: {
						time: '7:00 - 15:00',
						type: '早班'
					}
				},
				{
					date: '2020-11-17',
					read: false,
					info: '早班',
					type: '',
					data: {
						time: '7:00 - 15:00',
						type: '早班'
					}
				},
				{
					date: '2020-11-20',
					read: false,
					info: '晚班',
					type: '',
					data: {
						time: '15:00 - 23:00',
						type: '晚班'
					}
				},
				{
					date: '2020-11-25',
					read: false,
					info: '晚班',
					type: '',
					data: {
						time: '15:00 - 23:00',
						type: '晚班'
					}
				}
			],
			list: [],
			current: 0,
			noticeList: [],
			colors: 'red',
			nowDate: {
				year: currentDate.getFullYear(),
				month: currentDate.getMonth() + 1,
				day: getCountDays()
			}
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
	},
	onLoad(option) {
		console.log(option)
	},
	mounted() {
		this.list = this.$store.state.vuex_tabbar;
	},
	methods: {
		change(e) {},
		swiperChange() {},
		changeHasInfo(show) {
			this.hasInfo = show;
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
													uni.hideLoading();
													console.log(res)
													let postData =  {
														'userId': data.id,
														'groupId': data.groupId,
														'startTime': `${this.nowDate.year}-${this.nowDate.month}-01`,
														'endTime': `${this.nowDate.year}-${this.nowDate.month}-${this.nowDate.day}`,
													}
													requestPost('/schedul/UserSchedulList', postData, res => {
														const {code, msg, data} = res.data;
														if (code === 'success') {
															console.log(res.data);
														} else {
															uni.showToast({
																title: '系统错误',
																content: msg,
																icon: 'none',
																duration: 1000
															})
														}
													})
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
