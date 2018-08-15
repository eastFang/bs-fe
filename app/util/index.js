import fly from 'flyio'

/**
 * 
 * @param {一维数组} originArray 
 * @param {数组单个元素的最大长度} elemLength 
 */
const convert2ElemArray = (originArray, elemLength) => {
	const eleArray = []
	let index = 0
	eleArray[index] = []
	originArray.forEach((item) => {
		eleArray[index].push(item)
		if (eleArray[index].length === elemLength) {
			index++
			eleArray[index] = []
		}
	})
	return eleArray
}

/**
 * 关键在month和offsetDate
 * @param {*} year 
 * @param {*} month 
 * @param { >=1，第month + 1个月的第offsetDate天；<=0, 第month个月的倒数offsetDate} offsetDate 
 */
const getOffsetDateFullInfo = (year, month, offsetDate) => {
	if (month === 0) {
		year -= 1
		month = 12
	} else if (month === 13) {
		year += 1
		month = 1
	}
	const date = new Date(year, month, offsetDate).getDate()
	const fullYear = new Date(year, month, offsetDate).getFullYear()
	const fullMonth = new Date(year, month, offsetDate).getMonth()
	return { date, year: fullYear, month: fullMonth + 1 }
}

// const isJSON = (str) => {
// 	if (typeof str !== 'string') return false
// 	return str.match(/({)(.*)(:)/) && typeof JSON.parse(str) === 'object'
// }

const flyUtil = ({ url, params, method, ...others }) => {
	const opts = {
		method: (method || 'get').toLowerCase(),
		...others
	}
	return fly.request(url, params, opts).then((res) => {
		if (res.status === 200) {
			return res.data
		}
	}).catch((error) => {
		return Promise.reject(error.response.data)
	})
}

const formatDate = (timestamp) => {
	const dateO = new Date(timestamp)
	const year = dateO.getFullYear()
	const month = dateO.getMonth()
	const date = dateO.getDate()
	const hour = dateO.getHours()
	const minute = dateO.getMinutes()
	const second = dateO.getSeconds()
	return `${year}-${month}-${date} ${hour}:${minute}:${second}`
}

export {
	convert2ElemArray,
	getOffsetDateFullInfo,
	flyUtil,
	formatDate,
}
