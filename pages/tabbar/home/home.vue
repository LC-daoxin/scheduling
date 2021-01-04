<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<!-- 状态栏 +  -->
		<home-navbar :show="hasInfo" @hasInfo="changeHasInfo"></home-navbar>
		<!-- #endif -->
		<!-- 公告 -->
		<notice v-if="noticeShow" :colors="colors" :noticeList="noticeList" ></notice>
		<!-- 公告 -->
		<uni-calendar
			ref="calendar"
			:insert="true"
			:lunar="false"
			:start-date="'2000-1-1'"
			:selected="datelist"
			@change="change"
		/>
		<personal-stats v-if="Info.userInfo"></personal-stats>
		<activity></activity>
		<navigator url="/pages/personnel/join/join?userid=1&&userName=林策&&groupId=31&&groupName=消化内科1组"><button>to</button></navigator>
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
			hasInfo: false,
			noticeShow: true,
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
		console.log('home onShow')
		getWorkList(this.getWorkListSucc, 1);
		this.showPageInfo();
		this.getUserSchedulList();
	},
	computed: {
	    Info () {
	        return this.$store.state.Info
	    }
	},
	mounted() {
		let that = this;
		this.list = this.$store.state.vuex_tabbar;
		uni.$on('UserSchedulList',function(months){
			that.getUserSchedulList(months);
		})
	},
	methods: {
		// 页面数据显示
		showPageInfo () {
			console.log('showPageInfo页面数据显示')
			let that = this;
			wx.getStorage({
				key: 'userInfo',
				success: function (res){
					if (res.data) {
						that.hasInfo = true;
					}
				}
			})
			wx.getStorage({
				key: 'groupInfo',
				success: function (res){
					if (!res.data) {
						uni.navigateTo({
							url: '/pages/departments/department-list/department-list'
						});
					}
				}
			})
			wx.getStorage({
				key: 'notice',
				success: function (res){
					if (res.data.hospList.length > 0) {
						that.noticeShow = true;
						that.noticeList = res.data.hospList;
					} else {
						that.noticeShow = false;
					}
				},
				fail: function (err){
					that.noticeShow = false;
					that.noticeList = [];
				}
			})
		},
		change(e) {},
		changeHasInfo(show) {
			this.hasInfo = show;
		},
		// 获取个人排班表-日历显示
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
			this.datelist = []; //清空
			requestPost('/schedul/UserSchedulList', postData, res => {
				const {code, msg, data} = res.data;
				console.log('日历', data)
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
						})
					} else {
						this.datelist = []
					}
				} else {
					uni.showToast({
						title: '系统错误 /schedul/UserSchedulList',
						icon: 'none',
						duration: 2000
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
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: $bg-color;
}
</style>
