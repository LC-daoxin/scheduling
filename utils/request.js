const api = 'http://192.168.1.207:8088'
let authorization = ''

uni.getStorage({
	key: 'token',
	success: function(res) {
		authorization = res.data
	}
});

export const request = (url, method, data, success) => {
	return uni.request({
		url: api + url,
		method,
		data,
		success
	})
}

export const requestGet = (url, success) => {
	return uni.request({
		url: api + url,
		method: 'get',
		header: {
			'authorization': authorization || ''
		},
		success
	})
}

export const requestPost = (url, data, success) => {
	return uni.request({
		url: api + url,
		method: 'post',
		header: {
			'authorization': authorization || ''
		},
		data,
		success
	})
}
