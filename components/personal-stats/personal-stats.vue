<template>
	<view class="personal" @click="toPersonalStats">
		<u-toast ref="uToast" />
		<view class="personal-content">
			<view class="time">
				<text class="total-time">
					<text class="title">总工时</text>
					<text class="time">{{ total_time || 0 }} 小时</text>
				</text>
				<text class="owed-time">
					<text class="title">加班工时</text>
					<text class="time">{{ over_time || 0 }} 小时</text>
				</text>
			</view>
			<text class="iconfont icon-xiangyou"></text>
		</view>
	</view>
</template>

<script>
	import { requestPost } from '@/utils/request.js';
import { getDate, getCountDays } from '@/utils/index';
export default {
	data() {
		return {
			dateStart: this.getDate('First'),
			dateEnd: this.getDate('Last'),
			total_time: 0,
			over_time: 0
		};
	},
	methods: {
		getDate,
		toPersonalStats() {
			uni.navigateTo({
				url: `/pages/scheduling/personal-stats/personal-stats?startTime=${this.dateStart}&endTime=${this.dateEnd}`
			});
		},
		_getStatistics() {
			requestPost(
				'/schedul/totalTime',
				{ startTime: this.dateStart, endTime: this.dateEnd },
				res => {
					const { code, msg, data } = res.data;
					if (code === 'success') {
						this.total_time = data.totalTime;
						this.over_time = data.overTime;
					} else {
						this.$refs.uToast.show({
							title: msg,
							type: 'error'
						});
					}
				}
			);
		}
	},
	mounted() {
		this._getStatistics();
		let that = this;
		uni.$on('UserSchedulList',function(nowDate){
			that.dateStart = `${nowDate}-01`;
			that.dateEnd = `${nowDate}-${getCountDays(nowDate.substring(5,7))}`;
			that._getStatistics()
		})
	}
};
</script>

<style lang="scss" scoped>
@import '../../common/css/iconfont.css';
.personal {
	padding: 5px;
	&-content {
		display: flex;
		justify-content: space-between;
		height: 50px;
		font-size: 15px;
		line-height: 50px;
		padding: 0 20px;
		background-color: #fff;
		border-radius: 10px;
		.time {
			.total-time {
				margin-right: 30px;
				.title {
					margin-right: 10px;
				}
				.time {
					font-weight: 400;
					color: orange;
				}
			}
			.owed-time {
				.title {
					margin-right: 10px;
				}
				.time {
					font-weight: 400;
					color: orange;
				}
			}
		}
	}
}
</style>
