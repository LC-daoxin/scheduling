<template>
	<div class="form-page">
		<form @submit="form.submit()" @reset="formReset">
			<view
				v-for="(item, itemIndex) of formConfig"
				:key="itemIndex"
				class="uni-form-item uni-column"
			>
				<view class="title">{{ item.label }}</view>
				<input
					v-if="item.type === 'input'"
					v-model="form['formData'][item.key]"
					:placeholder="item.placeholder"
					class="uni-input"
					name="input"
				/>
				<input
					v-if="item.type === 'numberInput'"
					v-model="form['formData'][item.key]"
					type="number"
					class="uni-input"
					name="input"
				/>
				<date-picker
					v-if="item.type === 'date'"
					v-model="form['formData'][item.key]"
				></date-picker>
				<lb-picker v-if="item.type === 'select'" class="lb-picker">
					<view class="selected" v-model="form['formData'][item.key]" :list="form.originList">
						{{ form['formData'][item.key] }}
						<text class="triangle"></text>
					</view>
				</lb-picker>
				<view v-if="item.type === 'textarea'" class="uni-textarea">
					<textarea
						v-model="form['formData'][item.key]"
						:placeholder="item.placeholder"
					/>
				</view>
			</view>
			<view class="uni-btn-v">
				<button form-type="submit" class="button button--primary">提交</button>
				<button form-type="reset" class="button">重制</button>
			</view>
		</form>
	</div>
</template>

<script>
import { form, formConfig } from '@/utils/requestClass.js';
import LbPicker from '@/components/lb-picker';
import DatePicker from '@/components/date-picker/DatePicker.vue';

export default {
	props: {
		formTitle: String
	},
	data() {
		return {
			form: new form[this.formTitle](),
			formConfig: formConfig[this.formTitle + 'Form']
		};
	},
	methods: {
		formReset() {}
	},
	components: {
		LbPicker,
		DatePicker
	}
};
</script>

<style lang="scss" scoped>
.form-page {
	height: calc(100vh - 44px);
	background-color: #f8f8f8;
	padding: 1em 1em 0;

	.uni-btn-v .button + .button {
		margin-top: 0.5em;
	}

	.uni-form-item {
		margin-bottom: 1em;

		.title {
			font-size: 1.2em;
			font-weight: bold;
			padding: 20rpx 0;
		}

		input,
		.uni-textarea {
			padding: 0.4em;
			border: 1px solid #eee;
			border-radius: 0.4em;
			background-color: #fff;
		}
	}

	/deep/ .selected {
		display: block;
		font-size: 0.9rem;
		padding: 0.4em;
		border: 1px solid #eee;
		border-radius: 0.4em;
		background-color: #fff;
	}
}
</style>
