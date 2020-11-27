<template>
	<view>
		<wyb-table
			ref="table"
			first-line-fixed
			:emptyString="emptyString"
			:headers="headers"
			:contents="contents"
			height="600rpx"
			:url-col="urlCol"
			/>
	</view>
</template>

<script>
	import { getWeek } from '@/utils/index';
	export default {
	    data() {
	        const theUrl = '/pages/demos/noticeBar-demo/more' // 本地的某个页面
	        const httpUrl = 'https://ext.dcloud.net.cn/plugin?id=2667' // 某个网址
	        return {
				emptyString: '',
	            headers: [{
	                label: '姓名',
	                key: 'name'
	            }],
	            contents: [{
	                name: '赵易',
	                1: '白班',
	                2: '夜班',
	                3: '晚班',
	                5: '夜班',
	                6: '休息'
	            }, {
	                name: '钱尔',
	                1: '白班',
					4: '夜班',
					5: '夜班',
					6: '休息'
	            }, {
	                name: '孙时',
	                1: '白班',
					2: '夜班',
					5: '夜班'
	            }, {
	                name: '李思',
	                1: '白班'
	            }, {
	                name: '周梧',
	                1: '白班'
	            }, {
	                name: '吴柳',
	                1: '白班'
	            }, {
	                name: '王奇',
	                1: '白班'
	            }, {
	                name: '林巴',
	                1: '白班'
	            }],
	            urlCol: [{
	                type: 'route',
	                key: 'url'
	            }, {
	                type: 'http',
	                key: 'link'
	            }]
	        }
	    },
		mounted () {
			let currentMonthNum = this.getCountDays();
			console.log(currentMonthNum)
			console.log(getWeek(new Date('2020/11/26').getDay()))
			for (let i = 1; i <= currentMonthNum; i++) {
				let week = getWeek(new Date('2020/11/' + i).getDay())
				this.headers.push({
					label: [week, i],
					key: i
				})
			}
		},
		methods: {
			getCountDays() {
				var curDate = new Date();
				/* 获取当前月份 */
				var curMonth = curDate.getMonth();
				/*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
				curDate.setMonth(curMonth + 1);
				/* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
				curDate.setDate(0);
				/* 返回当月的天数 */
				return curDate.getDate();
			}
		}
	}
</script>

<style lang="scss">

</style>
