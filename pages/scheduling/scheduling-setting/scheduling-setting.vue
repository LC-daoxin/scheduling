<template>
	<view>
		<view class="info">
			<uni-list>
			    <uni-list-item title="排班模式" link :rightText="info.model"></uni-list-item>
			    <uni-list-item title="工时单位" link :rightText="info.unit"></uni-list-item>
			    <uni-list-item title="假期类型" link></uni-list-item>
			    <uni-list-item title="班种组合" link></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					model: '月排班',
					unit: '小时'
				}
			};
		}
	}
</script>

<style lang="scss">

</style>
