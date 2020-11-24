<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<!-- 状态栏 +  -->
		<home-navbar :nav="setNav" :show="hasInfo" @hasInfo="changeHasInfo"></home-navbar>
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
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	export default {
		components: {
		    uniCalendar
		},
		data() {
			return {
				// 自定义导航栏对象
				setNav:{
					'departmentsName': '心血管内科'
				},
				hasInfo: false,
				datelist: [
					{date: '2020-09-27', read: true, info: '', type: 'workday', data: {}},
					{date: '2020-10-01', read: true, info: '', type: 'holiday', data: {}},
					{date: '2020-10-02', read: true, info: '', type: 'holiday', data: {}},
					{date: '2020-10-03', read: true, info: '', type: 'holiday', data: {}},
					{date: '2020-10-04', read: true, info: '', type: 'holiday', data: {}},
					{date: '2020-10-05', read: true, info: '', type: 'holiday', data: {}},
					{date: '2020-10-06', read: true, info: '', type: 'holiday', data: {}},
					{date: '2020-10-07', read: true, info: '', type: 'holiday', data: {}},
					{date: '2020-10-08', read: true, info: '', type: 'holiday', data: {}},
					{date: '2020-10-10', read: true, info: '', type: 'workday', data: {}},
					{date: '2020-11-15', read: false, info: '晚班', type: '', data: { time: '15:00 - 23:00', type: '晚班'}},
					{date: '2020-11-16', read: false, info: '早班', type: '', data: { time: '7:00 - 15:00', type: '早班'}},
					{date: '2020-11-17', read: false, info: '早班', type: '', data: { time: '7:00 - 15:00', type: '早班'}},
					{date: '2020-11-20', read: false, info: '晚班', type: '', data: { time: '15:00 - 23:00', type: '晚班'}},
					{date: '2020-11-25', read: false, info: '晚班', type: '', data: { time: '15:00 - 23:00', type: '晚班'}},
				],
				list: [],
				current: 0,
				noticeList: [{
						id: 1,
						title: '十月排班计划最新安排，请相关值班同事及时关注！'
					},
					{
						id: 2,
						title: '前端，后台及测试同事10-11月培训安排'
					}
				],
				colors: 'red'
			};
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log('App onLoad：', option); //打印出上个页面传递的参数。
			if (option.departmentsName) {
				this.setNav.departmentsName = option.departmentsName;
			}
		},
		onShow () {
			let that = this
			uni.getUserInfo({
				success(res) {
					console.log(res)
					if (res.errMsg === "getUserInfo:ok") {
						that.hasInfo = true
					}
				},
				fail(res) {
					console.log(res)
					if (res) {
						that.hasInfo = false
					}
				}
			})
		},
		mounted () {
			this.list = this.$store.state.vuex_tabbar
		},
		methods: {
			change(e) {
			},
			swiperChange () {
			},
			changeHasInfo (show) {
				this.hasInfo = show
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $bg-color;
	}
</style>
