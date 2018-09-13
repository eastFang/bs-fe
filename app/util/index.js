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
		return Promise.reject(error.message, error)
	})
}

const formatDate = (timestamp) => {
	const dateO = new Date(timestamp)
	const year = dateO.getFullYear()
	const month = dateO.getMonth() + 1
	const date = dateO.getDate()
	const hour = dateO.getHours()
	const minute = dateO.getMinutes()
	const second = dateO.getSeconds()
	const withPrefix = value => value < 10 ? `0${value}` : value
	return `${year}-${withPrefix(month)}-${withPrefix(date)} ${withPrefix(hour)}:${withPrefix(minute)}:${withPrefix(second)}`
}

const queryStrToObj = (str) => {
	str = str.replace(/\?/, '')
	const paramList = str ? str.split('&') : []
	const queryObj = {}
	paramList.forEach((item) => {
		const kvList = item.split('=')
		queryObj[kvList[0]] = kvList[1]
	})
	return queryObj
}

const replaceQueryParamInSearch = (str, paramObj) => {
	const newParamObj = { ...queryStrToObj(str), ...paramObj }
	let queryStr = '?'
	const newParamList = []
	for (let key in newParamObj) {
		newParamList.push(`${key}=${newParamObj[key]}`)
	}
	return `${queryStr}${newParamList.join('&')}`
}

const randomStr = (len) => {
	const collection = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
	let str = ''
	const maxLen = collection.length
	for(let i = 0; i < len; i++) {
		str += collection.charAt(Math.floor(Math.random() * maxLen))
	}
	return str
}

const ENUM_TYPE = {
	ARTICLE: 1,
}

export {
	convert2ElemArray,
	getOffsetDateFullInfo,
	flyUtil,
	formatDate,
	queryStrToObj,
	replaceQueryParamInSearch,
	randomStr,
	ENUM_TYPE,
}