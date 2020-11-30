<template>
	<view class="request-page">
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-form-item uni-column">
				<view class="title">改班日期</view>
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
								<text class="selected">{{ date }}</text>
							</picker>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">原班种</view>
				<lb-picker class="lb-picker">
					<view class="selected" v-model="origin" :list="originList">
						{{ origin }}
						<text class="triangle"></text>
					</view>
				</lb-picker>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">新班种</view>
				<lb-picker class="lb-picker">
					<view class="selected" v-model="newer" :list="newerList">
						{{ newer }}
						<text class="triangle"></text>
					</view>
				</lb-picker>
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
			date: currentDate,
			hours: 1,
			origin: '请选择原班种',
			originList: [],
			newer: '请选择新班种',
			newerList: []
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
