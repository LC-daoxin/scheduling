// 根据日期获取当前是星期几
export function getWeek(day) {
	const weekArr = ['日', '一', '二', '三', '四', '五', '六'];
	return weekArr[day];
}

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
