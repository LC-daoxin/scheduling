import { requestGet, requestPost } from '@/utils/request.js';

const errorMsg = msg => {
	uni.showToast({
		title: '系统错误',
		content: msg,
		icon: 'none',
		duration: 1500
	});
};

// 根据日期获取当前是星期几
export function getWeek(day) {
	const weekArr = ['日', '一', '二', '三', '四', '五', '六'];
	return weekArr[day];
}

// 当前日期
export function getDate(type) {
	const date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (type === 'start') {
		year = year - 60;
	} else if (type === 'end') {
		year = year + 2;
	}
	month = month > 9 ? month : '0' + month;
	day = day > 9 ? day : '0' + day;
	return `${year}-${month}-${day}`;
}

// 当月总天数
export function getCountDays(Month) {
	// 传月份参数1-12就会传回对应月份的天数，不传的话就回传当月天数
	var curDate = new Date();
	/* 获取当前月份 */
	var curMonth = curDate.getMonth();
	/*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
	curDate.setMonth(Month || curMonth + 1);
	/* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
	curDate.setDate(0);
	/* 返回当月的天数 */
	return curDate.getDate();
}

export function dateFormat(fmt, date) {
	let ret;
	const opt = {
		'Y+': date.getFullYear().toString(), // 年
		'm+': (date.getMonth() + 1).toString(), // 月
		'd+': date.getDate().toString(), // 日
		'H+': date.getHours().toString(), // 时
		'M+': date.getMinutes().toString(), // 分
		'S+': date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp('(' + k + ')').exec(fmt);
		if (ret) {
			fmt = fmt.replace(
				ret[1],
				ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
			);
		}
	}
	return fmt;
}

export function getUserInfo() {
	requestGet('/user/detailUser', res => {
		const { code, msg, data } = res.data;
		if (code === 'success') {
			uni.setStorage({
				key: 'userInfo',
				data: data
			});
		} else {
			uni.showToast({
				title: '系统错误',
				content: msg,
				icon: 'none',
				duration: 1000
			});
		}
	});
}

export function formReqeust(data) {
	requestPost('/apply/apply', data, res => {
		const { code, msg } = res.data;
		if (code === 'success') {
			uni.navigateBack();
			uni.showToast({
				title: '申请成功',
				duration: 1500
			});
		} else {
			errorMsg(msg);
		}
	});
}

export function formRequestList(success) {
	requestPost('/apply/applyList', { applyType: '3' }, success);
}

export function getClassList(success) {
	requestGet('/schedul/getCreateUser', success);
}

export function getWorkList(success) {
	requestGet('/schedul/getWorkList/1', success);
};
