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

export {
	convert2ElemArray,
	getOffsetDateFullInfo,
}