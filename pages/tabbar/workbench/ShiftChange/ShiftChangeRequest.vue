<template>
	<view class="shift-change-request">
		<form @submit="formReqeust(formData)" @reset="formReset">
			<u-cell-group>
				<u-cell-item title="改班日期">
					<lb-picker
						class="lb-picker"
						:list="dateList"
						:props="dateListProps"
						@change="dateListChange"
						v-model="formData.applyDate"
					>
						<view>
							{{ formData.applyDate || '请选择' }}
						</view>
					</lb-picker>
				</u-cell-item>
				<u-cell-item title="原班种">
					<lb-picker
						class="lb-picker"
						:list="classList"
						:props="classProps"
						v-model="formData.workspeciName"
					>
						<view>
							{{ formData.workspeciName || '请选择改班日期' }}
						</view>
					</lb-picker>
				</u-cell-item>
				<u-cell-item title="新班种">
					<lb-picker
						class="lb-picker"
						:list="newClassList"
						:props="classProps"
						@change="newClassChange"
						v-model="formData.senderSpeciName"
					>
						<view>
							{{ formData.senderSpeciName || '请选择' }}
						</view>
					</lb-picker>
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
import { formReqeust, getClassList, getWorkList } from '@/utils/index.js';
import popup from '@/components/popup/popup.vue';
import LbPicker from '@/components/lb-picker';

export default {
	name: 'ShiftChangeRequest',
	data() {
		return {
			dateList: [],
			classList: [],
			newClassList: [],
			dateListProps: {
				label: 'schedulDate',
				value: 'schedulDate'
			},
			classProps: {
				label: 'workName',
				value: 'workName'
			},
			formData: {
				applyType: '2',
				applyDate: '', // 改班日期
				workspeciName: '', // 原班种
				senderSpeciName: '', // 新班种
				account: '' // 申请理由
			}
		};
	},
	methods: {
		formReqeust,
		getClassList,
		getWorkList,
		dateListChange({ item }) {
			this.classList = item.workspeciName;
		},
		newClassChange({ item }) {
			console.log(item);
		},
		getClassListSucc(res) {
			const { code, msg, data } = res.data;
			if (code === 'success') {
				this.dateList = data[0].content;
			} else {
				uni.showToast({
					title: '系统错误',
					content: msg,
					icon: 'none',
					duration: 1500
				});
			}
		},
		getWorkListSucc(res) {
			const { code, msg, data } = res.data;
			if (code === 'success') {
				this.newClassList = data;
			} else {
				uni.showToast({
					title: '系统错误',
					content: msg,
					icon: 'none',
					duration: 1500
				});
			}
		},
		formReset() {}
	},
	mounted() {
		this.getClassList(this.getClassListSucc);
		this.getWorkList(this.getWorkListSucc);
	},
	components: {
		popup,
		LbPicker
	}
};
</script>
