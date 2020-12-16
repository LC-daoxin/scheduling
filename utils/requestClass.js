import { dateFormat, getDate } from '@/utils';
import { requestPost } from '@/utils/request.js';
import { getWorkList } from '@/utils/index.js';

const format = 'YYYY-mm-dd HH:MM:SS';
const msOfDay = 86400000;
const today = dateFormat(format, new Date());
const tomorrow = dateFormat(format, new Date(new Date().getTime() + msOfDay));
let classList = [];
let userInfo = {};

const errorMsg = msg => {
	uni.showToast({
		title: '系统错误',
		content: msg,
		icon: 'none',
		duration: 1500
	});
};

getWorkList(res => {
	const { code, msg, data } = res.data;
	if (code === 'success') {
		classList = data;
	} else {
		errorMsg(msg);
	}
});

uni.getStorage({
	key: 'userInfo',
	success: res => {
		userInfo = res.data;
	}
});

class Request {
	constructor(applyType) {
		// 请假:1, 改班:2, 调班:3, 加班:4
		this.applyType = applyType;
	}

	submit() {
		const postData = {
			applyType: this.applyType,
			...this.formData
		};
		requestPost(this.api, postData, res => {
			const { code, msg } = res.data;
			if (code === 'success') {
				uni.showToast({
					title: '申请成功',
					duration: 1500
				});
				uni.navigateBack();
			} else {
				errorMsg(msg);
			}
		});
	}
}
// 请假申请
class RequestForLeave extends Request {
	constructor() {
		super();
		this.applyType = '1';
		this.api = '/apply/applyLeave';
		this.optionList = [
			{
				label: '婚假',
				value: '1'
			},
			{
				label: '年假',
				value: '2'
			},
			{
				label: '事假',
				value: '3'
			},
			{
				label: '病假',
				value: '4'
			},
			{
				label: '丧假',
				value: '5'
			},
			{
				label: '产假',
				value: '6'
			},
			{
				label: '工伤假',
				value: '7'
			},
			{
				label: '探亲假',
				value: '8'
			},
			{
				label: '公假',
				value: '9'
			}
		];
		this.props = {
			label: 'label',
			value: 'value'
		};
		this.formData = {
			leaveType: '', // 请假类型
			applyDate: today, // 开始日期
			applyEndDate: tomorrow, // 结束日期
			account: '' // 申请理由
		};
	}
}
// 加班申请
class RequestOverTime extends Request {
	constructor() {
		super();
		this.applyType = '4';
		this.api = '/apply/apply';
		this.formData = {
			applyDate: getDate(), // 日期
			duration: '', // 时长
			account: '' // 申请理由
		};
	}
}
// 改班申请
class RequestShiftChange extends Request {
	constructor() {
		super();
		this.api = '/apply/apply';
		this.applyType = '2';
		this.optionList = classList;
		this.props = {
			label: 'workName',
			value: 'workName'
		};
		this.formData = {
			applyDate: getDate(), // 改班日期
			workspeciName: '', // 原班种
			senderSpeciName: '', // 新班种
			account: '' // 申请理由
		};
	}
}
// 反馈
class ReqeustFeedBack extends Request {
	constructor() {
		super();
		this.api = '/user/feedbackUser';
		this.formData = {
			title: '', // 标题
			advise: '' // 内容
		};
	}
}

export const form = {
	RequestForLeave,
	RequestOverTime,
	RequestShiftChange,
	ReqeustFeedBack
};

// 请假表单
const RequestForLeaveForm = [
	{ label: '请假类型', key: 'leaveType', type: 'select' },
	{ label: '开始日期', key: 'applyDate', type: 'date' },
	{ label: '结束日期', key: 'applyEndDate', type: 'date' },
	{ label: '申请理由', key: 'account', type: 'textarea' }
];
// 加班表单
const RequestOverTimeForm = [
	{ label: '日期', key: 'applyDate', type: 'date' },
	{ label: '时长', key: 'duration', type: 'numberInput' },
	{ label: '申请理由', key: 'account', type: 'textarea' }
];
// 改班表单
const RequestShiftChangeForm = [
	{ label: '改班日期', key: 'applyDate', type: 'date' },
	{ label: '原班种', key: 'workspeciName', type: 'select' },
	{ label: '新班种', key: 'senderSpeciName', type: 'select' },
	{ label: '申请理由', key: 'account', type: 'textarea' }
];
// 反馈表单
const ReqeustFeedBackForm = [
	{ label: '标题', key: 'title', type: 'input', placeholder: '请输入反馈标题' },
	{ label: '内容', key: 'advise', type: 'textarea', placeholder: '请输入反馈内容' }
];

export const formConfig = {
	RequestForLeaveForm,
	RequestOverTimeForm,
	RequestShiftChangeForm,
	ReqeustFeedBackForm
};
