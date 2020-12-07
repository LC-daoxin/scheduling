import { dateFormat, getDate } from '@/utils';

const format = 'YYYY-mm-dd HH:MM:SS';
const msOfDay = 86400000;
const today = dateFormat(format, new Date());
const tomorrow = dateFormat(format, new Date(new Date().getTime() + msOfDay));

class Request {
	constructor(applyType, gourpId, senderId, sender) {
		// 请假:1, 改班:2, 调班:3, 加班:4
		this.applyType = applyType;
		this.gourpId = gourpId;
		this.senderId = senderId;
		this.sender = sender;
	}

	submit() {
		return uni.request({
			url: t.$Url + this.api,
			method: 'post',
			data: {
				applyType: this.applyType,
				gourpId: this.gourpId,
				senderId: this.senderId,
				sender: this.sender,
				...this.formData
			}
		});
	}
}
// 请假申请
class RequestForLeave extends Request {
	constructor() {
		super();
		this.applyType = '1'
		this.api = '/apply/applyLeave';
		this.typeList = [];
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
		this.applyType = '4'
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
		this.applyType = '2'
		this.originList = [];
		this.formData = {
			applyDate: getDate(), // 改班日期
			workspeciName: '', // 原班种
			senderSpeciName: '', // 新班种
			account: '' // 申请理由
		};
	}
}
// 调班申请
class RequestAdjust extends Request {
	constructor() {
		super();
		this.api = '/apply/apply';
		this.applyType = '3',
		this.formData = {
			applyDate: getDate(), // 调班日期
			senderSpeciName: '', // 申请班种
			changer: '', // 调班对象
			changeSpeciName: '', // 调换班种
			account: '' // 申请理由
		}
	}
}
// 反馈
class ReqeustFeedBack extends Request {
	constructor() {
		super();
		this.api = '/user/feedbackUser';
		this.formData = {
			title: '', // 标题
			advise: '', // 内容
			createUser: this.sender,
			createId: this.senderId
		};
	}
}

export const form = {
	RequestForLeave,
	RequestOverTime,
	RequestShiftChange,
	RequestAdjust,
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
// 调班表单
const RequestAdjustForm = [
	{label: '调班日期', key: 'applyDate', type: 'date'},
	{label: '申请班种', key: 'senderSpeciName', type: 'select'},
	{label: '调班对象', key: 'changer', type: 'select'},
	{label: '调换班种', key: 'changeSpeciName', type: 'select'},
	{label: '申请理由', key: 'account', type: 'textarea'}
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
	ReqeustFeedBackForm,
	RequestAdjustForm
};
