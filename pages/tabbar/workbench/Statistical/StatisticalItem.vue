<template>
	<view class="statistical-item">
		<u-card
			v-for="(item, index) of list"
			:key="index"
			:title="item.userName"
			:border="false"
		>
			<view slot="body">
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
			</view>
		</u-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [{ userName: '熊' }]
		};
	}
};
</script>

<style lang="scss" scoped>
.statistical-item {
	padding: 1em;

	::v-deep .u-card {
		margin: 0 !important;
	}
}
</style>
