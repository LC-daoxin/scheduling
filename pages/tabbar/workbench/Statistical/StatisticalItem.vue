<template>
	<view class="statistical-item">
		<view class="card__container" v-for="item of data" :key="item.userId">
			<u-card :border="false" :show-head="false">
				<u-collapse slot="body">
					<u-collapse-item :title="item.userName">
						<view class="content-container">
							<u-grid :col="3">
								<u-grid-item>
									<view class="grid-text">总工时</view>
									<view class="grid-text">{{ item.totalTime || 0 }}小时</view>
								</u-grid-item>
								<u-grid-item>
									<view class="grid-text">加班</view>
									<view class="grid-text">{{ item.overTime || 0 }}小时</view>
								</u-grid-item>
								<u-grid-item>
									<view class="grid-text">请假</view>
									<view class="grid-text">{{ item.leaveDays || 0 }}天</view>
								</u-grid-item>
							</u-grid>
							<u-table>
								<u-tr>
									<u-th>班种</u-th>
									<u-th>个数</u-th>
									<u-th>工作(小时)</u-th>
								</u-tr>
								<u-tr v-for="(work, workIndex) of item.workList" :key="workIndex">
									<u-td>{{ work.schedulName }}</u-td>
									<u-td>{{ work.num }}</u-td>
									<u-td>{{ work.totalduration }}</u-td>
								</u-tr>
							</u-table>
						</view>
					</u-collapse-item>
				</u-collapse>
			</u-card>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		data: Array
	}
};
</script>

<style lang="scss" scoped>
.statistical-item {
	.card__container + .card__container {
		margin-top: 1em;
	}

	::v-deep .u-card {
		margin: 0 !important;
	}

	.content-container {
		height: 10rem;
		overflow-y: scroll;
	}
}
</style>
