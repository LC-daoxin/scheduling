<template>
	<view class="form-page">
		<u-toast ref="uToast" />
		<form @submit="formReqeust">
			<u-cell-group>
				<u-cell-item title="请假类型">
					<lb-picker class="lb-picker" :list="typeList" v-model="formData.leaveType">
						<view>
							{{ formData.leaveType || '请选择' }}
						</view>
					</lb-picker>
				</u-cell-item>
				<u-cell-item title="开始日期">
					<date-picker v-model="formData.applyDate"></date-picker>
				</u-cell-item>
				<u-cell-item title="结束日期">
					<date-picker v-model="formData.applyEndDate"></date-picker>
				</u-cell-item>
				<u-cell-item
					title="申请理由"
					:value="formData.account"
					@click="$refs.popup.open()"
				></u-cell-item>
			</u-cell-group>
			<view class="uni-btn-v">
				<button form-type="submit" class="button button--primary">提交</button>
			</view>
		</form>
		<popup title="申请理由" ref="popup">
			<view class="uni-textarea">
				<textarea v-model="formData.account" />
			</view>
		</popup>
	</view>
</template>

<script>
import { requestPost } from '@/utils/request.js';
import LbPicker from '@/components/lb-picker';
import DatePicker from '@/components/date-picker/DatePicker.vue';

export default {
	name: 'ShiftChangeRequest',
	data() {
		return {
			formData: {
				applyType: '1',
				leaveType: '婚假', // 请假类型
				applyDate: '2020-12-06', // 开始日期
				applyEndDate: '2020-12-07', // 结束日期
				account: '123' // 申请理由
			},
			typeProps: {
				label: 'label',
				value: 'value'
			},
			typeList: [
				{
					label: '婚假',
					value: '婚假'
				},
				{
					label: '年假',
					value: '年假'
				},
				{
					label: '事假',
					value: '事假'
				},
				{
					label: '病假',
					value: '病假'
				},
				{
					label: '丧假',
					value: '丧假'
				},
				{
					label: '产假',
					value: '产假'
				},
				{
					label: '工伤假',
					value: '工伤假'
				},
				{
					label: '探亲假',
					value: '探亲假'
				},
				{
					label: '公假',
					value: '公假'
				}
			]
		};
	},
	methods: {
		formReqeust() {
			requestPost('/apply/applyLeave', this.formData, res => {
				const { code, msg, data } = res.data;
				if (code === 'success') {
					this.$refs.uToast.show({
						title: msg,
						type: 'success',
						url: '/pages/tabbar/workbench/AskForLeave/AskForLeave'
					});
				} else {
					this.$refs.uToast.show({
						title: msg,
						type: 'error'
					});
				}
			});
		}
	},
	components: {
		LbPicker,
		DatePicker
	}
};
</script>

<style lang="scss" scoped>
.uni-btn-v {
	padding: 0 1em;

	.button {
		margin-top: 0.5em;
	}
}
</style>
