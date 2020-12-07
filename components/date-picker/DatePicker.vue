<template>
	<view class="uni-list-cell-db">
		<picker
			mode="date"
			:value="value"
			:start="startDate"
			:end="endDate"
			@change="bindDateChange"
		>
			<text class="selected">{{ value }}</text>
		</picker>
	</view>
</template>

<script>
import { getDate } from '@/utils/index.js';

export default {
	props: {
		value: {
			type: String,
			default: getDate({
				format: true
			})
		}
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	methods: {
		getDate,
		bindDateChange: function (e) {
			this.$emit('input', e.target.value);
		}
	}
};
</script>
