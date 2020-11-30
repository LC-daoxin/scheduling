<template>
	<view class="request-page">
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-form-item uni-column">
				<view class="title">日期</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<date-picker v-model="date"></date-picker>
					</view>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">时长</view>
				<input
					v-model.number="hours"
					class="uni-input"
					name="input"
					placeholder="请输入加班时长"
				/>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">申请理由</view>
				<view class="uni-textarea">
					<textarea placeholder="请输入申请理由" />
				</view>
			</view>
			<view class="uni-btn-v">
				<button form-type="submit" class="button button--primary">提交</button>
				<button class="button" form-type="reset">重置</button>
			</view>
		</form>
	</view>
</template>

<script>
import DatePicker from '@/components/date-picker/DatePicker.vue';

export default {
	name: 'OvertimeRequest',
	data() {
		return {
			date: '2020-10-31',
			hours: 1
		};
	},
	components: {
		DatePicker
	}
};
</script>
