import React, { Component } from 'react'
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
			day,
			year,
			month,
			date
		}
		this.state = {
			time: {
				year,
				month,
				date,
			},
			showDateListBox: false,
			inputShowTime: '',
		}
		this._onSelectToday = this._onSelectToday.bind(this)
	}

	/**
	 * 
	 * @param { time: { year, month, date } } dateObj 
	 */
	_onChangeDate(dateObj) {
		const { time: { year, month, date } } = dateObj
		this.setState({
			...this.state,
			...dateObj,
			inputShowTime: `${year}-${month}-${date}`,
			showDateListBox: false,
		})
	}

	/**
	 * 今天
	 */
	_onSelectToday() {
		const { year, month, date } = this.initParams
		const todayObj = {
			year,
			month,
			date
		}
		this._onChangeDate({ time: todayObj })
	}

	/**
	 * 
	 * @param {enum} type 
	 */
	_onSelectWillDate(type) {
		const { time: { year, month, date } } = this.state
		const currentDate = new Date(`${year}-${month}-${date}`)
		switch(type) {
		case 'preYear':
			currentDate.setFullYear(year - 1)
			break
		case 'preMonth':
			month === 1 ? currentDate.setFullYear(year - 1) : currentDate.setMonth(month - 2)
			break
		case 'nextMonth':
			month === 12 ? currentDate.setFullYear(year + 1) : currentDate.setMonth(month)
			break
		case 'nextYear':
			currentDate.setFullYear(year + 1)
			break
		}
		const willYear = currentDate.getFullYear()
		const willMonth = currentDate.getMonth() + 1
		const willDate = currentDate.getDate()
		this._onChangeDate({ time: { year: willYear, month: willMonth, date: willDate } })
	}

	getDateList() {
		const { time: { year, month } } = this.state
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

	/**
	 * show: 显示, hide: 隐藏
	 * @param {enum} type 
	 */
	toggleDateListBox(type) {
		this.setState({
			...this.state,
			showDateListBox: type === 'show'
		})
	}

	renderTimeDisplay() {
		return (
			<span className='bs-datepicker-input-wrapper' onClick={() => this.toggleDateListBox('show')}>
				<input className='bs-datepicker-input' placeholder='请选择时间' value={this.state.inputShowTime} readOnly/>
				<i className='iconfont icon-calendar'></i>
			</span>
		)
	}

	renderDateList() {
		const { time: { year, month, date } } = this.state
		const dataList = this.getDateList()
		const weekdayList = ['一', '二', '三', '四', '五', '六', '日']
		return (
			<div className='bs-datepicker'>
				<div className='header'>
					<a className='left-area'>
						<i className='iconfont icon-double-left' onClick={() => this._onSelectWillDate('preYear')}></i>
						<i className='iconfont icon-left' onClick={() => this._onSelectWillDate('preMonth')}></i>
					</a>
					{`${year}年${month}月`}
					<a className='right-area'>
						<i className='iconfont icon-right' onClick={() => this._onSelectWillDate('nextMonth')}></i>
						<i className='iconfont icon-double-right' onClick={() => this._onSelectWillDate('nextYear')}></i>
					</a>
				</div>
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
													const cellDateObj = { year: itemYear, month: itemMonth, date: itemDate }
													const isActive = `${year}-${month}-${date}` === Object.values(cellDateObj).join('-')
													return <td key={innerIndex} onClick={() => this._onChangeDate({ time: cellDateObj })}><div className={this.getTdClassName({ isPreOrNextMonth, isActive })}>{itemDate}</div></td>
												})
											}
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
				<div className='footer' onClick={this._onSelectToday}>今天</div>
			</div>
		)
	}

	render() {
		if (this.state.showDateListBox) {
			return this.renderDateList()
		}
		return this.renderTimeDisplay()
	}
}