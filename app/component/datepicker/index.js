import React, { Component, Fragment } from 'react'
import classnames from 'classnames'
import { convert2ElemArray, getOffsetDateFullInfo } from 'aliasUtil'
import './index.scss'

export default class extends Component {
	constructor(props) {
		super(props)
		const todayDate = new Date()
		const year = todayDate.getFullYear()
		const month = todayDate.getMonth() + 1
		const date = todayDate.getDate()
		const day = todayDate.getDay()
		this.initParams = {
			day
		}
		this.state = {
			year,
			month,
			date,
		}
	}

	getDateList() {
		const { year, month } = this.state
		const dateList = []
		const firstDay = new Date(year, month - 1, 1).getDay() || 7
		for(let i = 0,j = 0; i < firstDay - 1; i ++, j--) {
			dateList.unshift({ ...getOffsetDateFullInfo(year, month - 1, j), isPreMonth: true })
		}
		for(let i = 1; i <= getOffsetDateFullInfo(year, month, 0).date; i++) {
			dateList.push(getOffsetDateFullInfo(year, month - 1, i))
		}
		const tempDateLength = dateList.length
		for(let i = 1; i <= 42 - tempDateLength; i ++) {
			dateList.push({ ...getOffsetDateFullInfo(year, month, i), isNextMonth: true })
		}
		return convert2ElemArray(dateList, 7)
	}
  
	getTdClassName({ isPreOrNextMonth, isActive }) {
		return classnames(
			'bs-datepicker-td',
			{
				'not-current': isPreOrNextMonth,
				active: isActive
			}
		)
	}

	render() {
		const { year, month, date } = this.state
		const dataList = this.getDateList()
		const weekdayList = ['一', '二', '三', '四', '五', '六', '日']
		return (
			<div className='bs-datepicker'>
				<div className='header'>{`${year}年${month}月`}</div>
				<div className='content'>
					<table>
						<thead>
							<tr>
								{
									weekdayList.map((item, index) => {
										return <th key={index}>{item}</th>
									})
								}
							</tr>
						</thead>
						<tbody>
							{
								dataList.map((item, indexWrap) => {
									return (
										<tr key={indexWrap}>
											{
												item.map((innerItem, innerIndex) => {
													const { isPreMonth, isNextMonth, date: itemDate, month: itemMonth, year: itemYear } = innerItem
													const isPreOrNextMonth = isPreMonth || isNextMonth
													console.log(`${itemYear}-${itemMonth}-${itemDate}`)
													const isActive = `${year}-${month}-${date}` === `${itemYear}-${itemMonth}-${itemDate}`
													return <td key={innerIndex}><div className={this.getTdClassName({ isPreOrNextMonth, isActive })}>{itemDate}</div></td>
												})
											}
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
				<div className='footer'></div>
			</div>
		)
	}
}