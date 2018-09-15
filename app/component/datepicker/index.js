import React, { Component } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import classnames from 'classnames'
import { formatDate, getOffsetDateFullInfo, convert2ElemArray, withPrefixDate } from 'aliasUtil'
import './index.scss'

const datepickerRoot = document.getElementById('datepicker')
export default class extends Component {
	constructor(props) {
		super(props)
		this.params = {
			today: formatDate(Date.now(), 'yyyy-mm-dd')
		}
		this.state = {
			value: this.params.today, // 已选中日期
			guideValue: this.params.today, // 日期选择面板当前选中日期
			isOpen: false,
		}
		this.showAreaRef = React.createRef()
	}

	componentDidMount() {
		const { top, left, height } = findDOMNode(this.showAreaRef.current).getBoundingClientRect()
		const { scrollTop } = document.documentElement
		this.showAreaDomStyle = {
			position: 'absolute',
			top: `${scrollTop + top + height + 5}px`,
			left: `${left}px`,
		}
	}

	onSelectDate(dateItem) {
		this.setState({
			value: dateItem,
			isOpen: false,
		})
	}

	_onSelectToday() {
		this.setState({
			value: this.params.today
		})
	}

	/**
	 * 切换月、年，方便选日期
	 * @param {String} type Enum preYear | preMonth | nextMonth | nextYear 
	 */
	onChangeGuideValue(type) {
		let guideDateInstance = new Date(this.state.guideValue)
		let timestamp
		switch (type) {
		case 'preYear':
			timestamp = guideDateInstance.setFullYear(guideDateInstance.getFullYear() - 1)
			break
		case 'preMonth':
			timestamp = guideDateInstance.setMonth(guideDateInstance.getMonth() - 1)
			break
		case 'nextMonth':
			timestamp = guideDateInstance.setMonth(guideDateInstance.getMonth() + 1)
			break
		case 'nextYear':
			timestamp = guideDateInstance.setFullYear(guideDateInstance.getFullYear() + 1)
			break
		}
		this.setState({
			guideValue: formatDate(timestamp, 'yyyy-mm-dd')
		})
	}

	getDateList() {
		const guideArr = this.state.guideValue.split('-')
		const guideYear = guideArr[0]
		const guideMonth = guideArr[1]
		const { day: guideMonthFirstDay } = getOffsetDateFullInfo(guideYear, guideMonth - 1, 1)
		const { date: guideMonthLastDate, day: guideMonthLastDay } = getOffsetDateFullInfo(guideYear, guideMonth, 0)
		const dateList = []
		// guide 上月末几天
		for(let index = 0; index < guideMonthFirstDay; index++) {
			const { date, year, month } = getOffsetDateFullInfo(guideYear, guideMonth - 1, -index)
			dateList.unshift(`${year}-${month}-${date}`)
		}
		// guide月有多少天
		for(let index = 0; index < guideMonthLastDate; index++) {
			dateList.push(`${guideYear}-${guideMonth}-${withPrefixDate(index + 1)}`)
		}
		// guide 下月几天
		for(let index=0; index < 6 - guideMonthLastDay; index ++) {
			const { date, year, month } = getOffsetDateFullInfo(guideYear, guideMonth, index + 1)
			dateList.push(`${year}-${month}-${date}`)
		}
		return convert2ElemArray(dateList, 7)
	}

	/**
	 * 可选日期列表
	 */
	renderDateList() {
		const weekdayList = ['日', '一', '二', '三', '四', '五', '六']
		const guideValue = this.state.guideValue.split('-')
		const dateList = this.getDateList()
		return (
			<div className='bs-datepicker' style={this.showAreaDomStyle}>
				<div className='header'>
					<a className='left-area'>
						<i className='iconfont icon-double-left' onClick={() => this.onChangeGuideValue('preYear')}></i>
						<i className='iconfont icon-left' onClick={() => this.onChangeGuideValue('preMonth')}></i>
					</a>
					{`${guideValue[0]}年${guideValue[1]}月`}
					<a className='right-area'>
						<i className='iconfont icon-right' onClick={() => this.onChangeGuideValue('nextMonth')}></i>
						<i className='iconfont icon-double-right' onClick={() => this.onChangeGuideValue('nextYear')}></i>
					</a>
				</div>
				<div className='content'>
					<table>
						<thead>
							<tr>
								{weekdayList.map((item, index) => <th key={index}>{item}</th>)}
							</tr>
						</thead>
						<tbody>
							{
								dateList && dateList.map((dateItemWrap, indexWrap) => {
									return (
										<tr key={indexWrap}>
											{
												dateItemWrap.map((dateItem, index) => {
													const className = classnames('bs-datepicker-td', {
														active: this.state.value === dateItem,
														'not-current': dateItem.split('-')[1] !== this.state.guideValue.split('-')[1]
													})
													return (
														<td key={index} onClick={() => this.onSelectDate(dateItem)}>
															<div className={className}>
																{dateItem.split('-').pop()}
															</div>
														</td>
													)
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
		return (
			<React.Fragment>
				<span className='bs-datepicker-input-wrapper' ref={this.showAreaRef} onClick={() => this.setState({ isOpen: !this.state.isOpen })}>
					<input className='bs-datepicker-input' placeholder='请选择时间' value={this.state.value} readOnly/>
					<i className='iconfont icon-calendar'></i>
				</span>
				{this.state.isOpen
					? ReactDOM.createPortal(this.renderDateList(), datepickerRoot)
					: null}
			</React.Fragment>
		)
	}
}