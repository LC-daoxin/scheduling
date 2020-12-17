class RequestList {
	cconstructor() {
		this.status = ''
		this.requestTime = ''
	}
}

class OverTimeList extends RequestList {
	constructor(applyDate, duration) {
		super()
		this.applyDate = applyDate
		this.duration = duration
	}
}

class ShiftChangeList extends RequestList {
	constructor(applyDate, workspeciName, senderSpeciName, ) {
		super()
		this.applyDate = applyDate
		this.workspeciName = workspeciName
		this.senderSpeciName = senderSpeciName
	}
}

class AskFromLeaveList extends RequestList {
	constructor(leaveType, startDate, endDate, duration) {
		super()
		this.leaveType = leaveType
		this.startDate = startDate
		this.endDate = endDate
	}
}

class RequestAdjustList extends RequestList {
	constructor(changer, changeSpeciName, applyEndDate, senderSpeciName, applyDate) {
		super()
		this.changer = changer
		this.changeSpeciName = changeSpeciName
		this.applyEndDate = applyEndDate
		this.senderSpeciName = senderSpeciName
		this.applyDate = applyDate
	}
}

export const askFromLeave = new AskFromLeaveList('请假类型', '开始日期', '结束日期')
export const overTime = new OverTimeList('申请日期', '加班时长')
export const shiftChange = new ShiftChangeList('改班日期', '原班种', '新班种')
export const requestAdjust = new RequestAdjustList('调换对象', '调换班种', '调换日期', '申请班种', '申请日期')
