<template>
	<view class="request-page">
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-form-item uni-column">
				<view class="title">请假类型</view>
				<lb-picker class="lb-picker">
					<view class="selected" v-model="type" :list="typeList">
						{{ type }}
						<text class="triangle"></text>
					</view>
				</lb-picker>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">开始日期</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-db">
							<picker
								mode="date"
								:value="start"
								:start="startDate"
								:end="endDate"
								@change="bindDateChange"
							>
								<text class="selected">{{ start }}</text>
							</picker>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">结束日期</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-db">
							<picker
								mode="date"
								:value="end"
								:start="startDate"
								:end="endDate"
								@change="bindDateChange"
							>
								<text class="selected">{{ end }}</text>
							</picker>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">请假时长</view>
				<input
					v-model.number="hours"
					class="uni-input"
					name="input"
					placeholder="请输入请假时长"
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
import LbPicker from '@/components/lb-picker';

export default {
	name: 'ShiftChangeRequest',
	data() {
		const currentDate = this.getDate({
			format: true
		});

		return {
			hours: 1,
			start: '2020-11-30',
			end: '2020-11-31',
			type: '',
			typeList: [],
			date: ''
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
	},
	components: {
		LbPicker
	}
};
</script>
