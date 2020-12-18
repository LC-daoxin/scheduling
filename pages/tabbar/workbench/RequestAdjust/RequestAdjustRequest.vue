<template>
	<view class="form-page">
		<form @submit="formReqeust(formData)" @reset="formReset">
			<u-cell-group>
				<u-cell-item title="调班对象">
					<lb-picker
						class="lb-picker"
						:list="changerList"
						:props="changerProps"
						@change="changerChange"
						v-model="formData.changerId"
					>
						<view>
							{{ formData.changer || '请选择' }}
						</view>
					</lb-picker>
				</u-cell-item>
				<u-cell-item title="调班日期">
					<lb-picker
						class="lb-picker"
						:list="changerDateList"
						:props="changerDateProps"
						@change="changerDateChange"
						v-model="formData.applyEndDate"
					>
						<view>
							{{ formData.applyEndDate || '请选择调班对象' }}
						</view>
					</lb-picker>
				</u-cell-item>
				<u-cell-item title="调班班种">
					<lb-picker
						class="lb-picker"
						:list="changerClassList"
						:props="classProps"
						v-model="formData.changeSpeciName"
					>
						<view>
							{{ formData.changeSpeciName || '请选择调班日期' }}
						</view>
					</lb-picker>
				</u-cell-item>
				<u-cell-item title="申请日期">
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
				<u-cell-item title="申请班种">
					<lb-picker
						class="lb-picker"
						:list="classList"
						:props="classProps"
						v-model="formData.senderSpeciName"
					>
						<view>
							{{ formData.senderSpeciName || '请选择申请日期' }}
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
import LbPicker from '@/components/lb-picker';
import popup from '@/components/popup/popup.vue';
import { getDate, formReqeust, getClassList } from '@/utils/index.js';
import { requestGet } from '@/utils/request.js';

export default {
	data() {
		return {
			changerList: [], // 调换人列表
			changerDateList: [], // 调换日期列表
			changerClassList: [], // 调换班种列表
			changerProps: {
				label: 'userName',
				value: 'userId'
			},
			changerDateProps: {
				label: 'schedulDate',
				value: 'schedulDate'
			},
			dateList: [],
			classList: [],
			classProps: {
				label: 'workName',
				value: 'workName'
			},
			dateListProps: {
				label: 'schedulDate',
				value: 'schedulDate'
			},
			formData: {
				applyType: '3', // 申请类型
				changer: '', // 调班对象
				changerId: '',
				applyEndDate: '', // 调班日期
				changeSpeciName: '', // 调换班种
				applyDate: '', // 申请日期
				senderSpeciName: '', // 申请班种
				account: '' // 申请理由
			}
		};
	},
	methods: {
		formReqeust,
		changerChange({ item }) {
			this.formData.changer = item.userName;
			this.changerDateList = item.content;
		},
		changerDateChange({ item }) {
			this.changerClassList = item.workspeciName;
		},
		dateListChange({ item }) {
			this.classList = item.workspeciName;
		},
		getChanger() {
			requestGet('/schedul/getChanger', res => {
				const { code, msg, data } = res.data;
				if (code === 'success') {
					this.changerList = data;
				} else {
					errorMsg(msg);
				}
			});
		},
		getDateList() {
			getClassList(res => {
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
			});
		},
		formReset() {}
	},
	mounted() {
		this.getChanger();
		this.getDateList();
	},
	components: {
		LbPicker,
		popup
	}
};
</script>
