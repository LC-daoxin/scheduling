<template>
	<div class="form-page">
		<form @submit="form.submit()" @reset="formReset">
			<u-cell-group>
				<view v-for="(item, itemIndex) of formConfig" :key="itemIndex">
					<u-cell-item
						v-if="item.type !== 'date' && item.type !== 'select'"
						:title="item.label"
						:value="form['formData'][item.key]"
						@click="open(item.label, item.key, item.type)"
					>
					</u-cell-item>
					<u-cell-item :title="item.label" v-if="item.type === 'date'">
						<date-picker v-model="form['formData'][item.key]"></date-picker>
					</u-cell-item>
					<u-cell-item :title="item.label" v-if="item.type === 'select'">
						<lb-picker class="lb-picker">
							<view :list="form.originList">
								{{ form['formData'][item.key] || '请选择' }}
							</view>
						</lb-picker>
					</u-cell-item>
				</view>
			</u-cell-group>
			<view class="uni-btn-v">
				<button form-type="submit" class="button button--primary">提交</button>
				<button form-type="reset" class="button">重置</button>
			</view>
		</form>
		<popup :title="editInfoTitle" ref="popup">
			<input v-if="inputType === 'input'" type="text" v-model="inputValue" />
			<input v-if="inputType === 'numberInput'" type="number" v-model="inputValue" />
			<view v-if="inputType === 'textarea'" class="uni-textarea">
				<textarea v-model="inputValue" />
			</view>
			<button class="button button--primary" @click="save">保存</button>
		</popup>
	</div>
</template>

<script>
import { form, formConfig } from '@/utils/requestClass.js';
import LbPicker from '@/components/lb-picker';
import DatePicker from '@/components/date-picker/DatePicker.vue';
import popup from '@/components/popup/popup.vue';

export default {
	props: {
		formTitle: String
	},
	data() {
		return {
			form: new form[this.formTitle](),
			formConfig: formConfig[this.formTitle + 'Form'],
			editInfoTitle: '',
			inputTarget: '',
			inputValue: '',
			inputType: ''
		};
	},
	methods: {
		formReset() {},
		open(title, key, type) {
			this.inputType = type;
			this.editInfoTitle = title;
			this.inputTarget = key;
			this.$refs.popup.open();
		},
		save() {
			this.form.formData[this.inputTarget] = this.inputValue;
			this.inputValue = '';
			this.$refs.popup.close();
		}
	},
	components: {
		LbPicker,
		DatePicker,
		popup
	}
};
</script>

<style lang="scss" scoped>
.form-page {
	height: calc(100vh - 44px);
	background-color: $bg-color;
	padding-top: 10px;

	.uni-btn-v {
		padding: 0 1em;
		margin-top: 1em;
	}

	.uni-btn-v .button + .button {
		margin-top: 0.5em;
	}

	uni-textarea {
		width: 100%;
		box-sizing: border-box;
		margin-bottom: 0.5em;
		padding: 0.2em 0.4em;
		border: 1px solid #eee;
		border-radius: 0.4em;
		background-color: #fff;
	}

	// .uni-form-item + .uni-form-item {
	// 	border-top: 1px solid $uni-border-color;
	// }

	// .uni-form-item {
	// 	display: flex;
	// 	align-items: center;
	// 	padding: 12px 15px;
	// 	background: #ffffff;

	// 	.title {
	// 		min-width: 4.4em;
	// 		margin-right: 0.5em;
	// 	}

	// 	.form-content {
	// 		flex: 1;
	// 	}

	// 	input,
	// 	.uni-textarea {
	// 		padding: 0.2em 0.4em;
	// 		border: 1px solid #eee;
	// 		border-radius: 0.4em;
	// 		background-color: #fff;
	// 	}
	// }
}
</style>
