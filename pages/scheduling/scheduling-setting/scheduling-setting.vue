<template>
	<view>
		<view class="info">
			<uni-list>
			    <uni-list-item title="排班模式" :rightText="info.model">
					<template class="footer" slot="footer">
						<picker class="picker" @change="changeType" :value="typeIndex" :range="typeArray">
							<view class="text"><text class="iconfont icon-xiangyou"></text>{{ typeArray[typeIndex] }}</view>
						</picker>
					</template>
				</uni-list-item>
			    <uni-list-item title="工时单位" :rightText="info.unit">
					<template class="footer" slot="footer">
						<picker class="picker" @change="changeUnit" :value="unitIndex" :range="unitArray">
							<view class="text"><text class="iconfont icon-xiangyou"></text>{{ unitArray[unitIndex] }}</view>
						</picker>
					</template>
				</uni-list-item>
			    <!-- <uni-list-item title="假期类型" link></uni-list-item> -->
			    <!-- <uni-list-item title="班种组合" link></uni-list-item> -->
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
				},
				typeIndex: 0,
				unitIndex: 0,
				typeArray: ['月排班'],
				unitArray: ['小时'],
			};
		},
		methods: {
			changeType (e) {
				this.info.model = this.typeIndex = e.detail.value;
			},
			changeUnit (e) {
				this.info.unit = this.unitIndex = e.detail.value;
			}
		}
	}
</script>

<style lang="scss">
	.footer {
		.text {
			font-size: 28rpx;
			color: #999;
			position: absolute;
			right: 0;
			left: 0;
			top: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			flex-direction: row-reverse;
			.iconfont {
				padding: 0 10px;
				color: #999;
			}
		}
	}
</style>
