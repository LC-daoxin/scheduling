<template>
	<view class="request-page">
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-form-item uni-column">
				<view class="title">日期</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-db">
							<picker
								mode="date"
								:value="date"
								:start="startDate"
								:end="endDate"
								@change="bindDateChange"
							>
								<text class="selected-date">{{ date }}</text>
							</picker>
						</view>
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
import { getDate } from '@/utils/index.js';

export default {
	name: 'OvertimeRequest',
	data() {
		const currentDate = this.getDate({
			format: true
		});

		return {
			date: currentDate,
			hours: 1
		};
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
			this.date = e.target.value;
		}
	}
};
</script>
