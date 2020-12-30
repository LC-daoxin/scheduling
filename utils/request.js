// 局域网
const api = 'http://192.168.1.207:8088'
// 公网
// const api = 'http://49.235.137.137:8088'
// const api = 'http://scheduling.lcdaoxin.com:8088'

export const request = (url, method, data, success) => {
	return uni.request({
		url: api + url,
		method,
		data,
		success
	})
}

export const requestGet = (url, success) => {
	uni.getStorage({
		key: 'token',
		success: function(res) {
			return uni.request({
				url: api + url,
				method: 'get',
				header: {
					'authorization': res.data || ''
				},
				success
			})
		}
	});
	
}

export const requestPost = (url, data, success) => {
	uni.getStorage({
		key: 'token',
		success: function(res) {
			return uni.request({
				url: api + url,
				method: 'post',
				header: {
					'authorization': res.data || ''
				},
				data,
				success
			})
		}
	});
}

export const requestDelete = (url, success) => {
	uni.getStorage({
		key: 'token',
		success: function(res) {
			return uni.request({
				url: api + url,
				method: 'DELETE',
				header: {
					'authorization': res.data || ''
				},
				success
			})
		}
	});
}
