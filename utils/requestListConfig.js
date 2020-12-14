class RequestList {
	cconstructor() {
		this.status = ''
		this.requestTime = ''
	}
}

class OverTimeList extends RequestList {
	constructor(requestStart, requestEnd, timeLen) {
		super()
		this.requestStart = requestStart
		this.requestEnd = requestEnd
		this.timeLen = timeLen
	}
}

class ShiftChangeList extends RequestList {
	constructor(sourceClass, newClass, changeDate, ) {
		super()
		this.sourceClass = sourceClass
		this.newClass = newClass
		this.changeDate = changeDate
	}
}

class AskFromLeaveList extends RequestList {
	constructor(leaveType, startDate, endDate, timeLen) {
		super()
		this.leaveType = leaveType
		this.startDate = startDate
		this.endDate = endDate
		this.timeLen = timeLen
	}
}

class RequestAdjustList extends RequestList {
	constructor(lenOfTime, startDate, endDate) {
		super()
		this.lenOfTime = lenOfTime
		this.startDate = startDate
		this.endDate = endDate
	}
}

export const askFromLeave = new AskFromLeaveList('请假类型', '开始日期', '结束日期', '请假时长')
export const overTime = new OverTimeList('开始日期', '结束日期', '时长')
export const shiftChange = new ShiftChangeList('原班种', '新班种', '申请日期')
export const requestAdjust = new RequestAdjustList('申请时长', '开始日期', '结束日期')
