<template>
	<view class="statistical-item">
		<view class="card__container" v-for="(item, index) of list" :key="index">
			<u-card :border="false">
				<u-collapse slot="body">
					<u-collapse-item :title="item.userName">
						<u-grid :col="3">
							<u-grid-item>
								<view class="grid-text">总工时</view>
								<view class="grid-text">745小时</view>
							</u-grid-item>
							<u-grid-item>
								<view class="grid-text">加班</view>
								<view class="grid-text">745小时</view>
							</u-grid-item>
							<u-grid-item>
								<view class="grid-text">请假</view>
								<view class="grid-text">745小时</view>
							</u-grid-item>
						</u-grid>
						<u-table>
							<u-tr>
								<u-th>班种</u-th>
								<u-th>个数</u-th>
								<u-th>工作(小时)</u-th>
							</u-tr>
							<u-tr>
								<u-td>白班</u-td>
								<u-td>1</u-td>
								<u-td>1</u-td>
							</u-tr>
							<u-tr>
								<u-td>夜班</u-td>
								<u-td>1</u-td>
								<u-td>1</u-td>
							</u-tr>
							<u-tr>
								<u-td>晚班</u-td>
								<u-td>1</u-td>
								<u-td>1</u-td>
							</u-tr>
							<u-tr>
								<u-td>行政</u-td>
								<u-td>1</u-td>
								<u-td>1</u-td>
							</u-tr>
						</u-table>
					</u-collapse-item>
				</u-collapse>
			</u-card>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{ userName: '熊' },
				{ userName: '林策' },
				{ userName: '晓峰' },
				{ userName: '亚垚' }
			]
		};
	}
};
</script>

<style lang="scss" scoped>
.statistical-item {
	padding: 1em;

	.card__container + .card__container {
		margin-top: 1em;
	}

	::v-deep .u-card__head {
		display: none;
	}

	::v-deep .u-card {
		margin: 0 !important;
	}
}
</style>
