import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import './index.scss'

/**
 * 分页控制器
 */
export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currentPageNo: 1
		}
		this.initParams = {
			pageSize: 10
		}
		this._prePage = this._prePage.bind(this)
		this._nextPage = this._nextPage.bind(this)
	}

	/**
	 * 检验是否能切换页码
	 */
	checkShouldChangePageNo(type) {
		const { currentPageNo } = this.state
		const { total } = this.props
		if ((type === 'pre' && currentPageNo === 1)
		|| type === 'next' && currentPageNo === Math.ceil(total / this.initParams.pageSize)) {
			return false
		}
		return true
	}

	getJumpPageNoClass(isActive) {
		return classNames(
			'pageno-item',
			{
				active: isActive
			}
		)
	}

	getSiblingPageNoClass(type) {
		const { currentPageNo } = this.state
		const { total } = this.props
		if ((type === 'pre' && currentPageNo === 1)
		|| (type === 'next') && currentPageNo === Math.ceil(total / this.initParams.pageSize)) {
			return 'disabled'
		}
	}

	/**
	 * 切换页码
	 * @param {页码} pageNo 
	 */
	_onChange(pageNo) {
		this.setState({
			currentPageNo: pageNo
		})
		this.props.onChange && this.props.onChange(pageNo)
	}

	/**
	 * 上一页
	 */
	_prePage() {
		if (!this.checkShouldChangePageNo('pre')) return
		this._onChange(this.state.currentPageNo - 1)
	}

	/**
	 * 下一页
	 */
	_nextPage() {
		if (!this.checkShouldChangePageNo('next')) return
		this._onChange(this.state.currentPageNo + 1)
	}

	render() {
		const {
			total,
			pageSize = this.initParams.pageSize,
		} = this.props

		if (!total) return null
		return (
			<ul className='pagination'>
				<li className={this.getSiblingPageNoClass('pre')} onClick={this._prePage}>上一页</li>
				{
					_.times(Math.ceil(total / pageSize), (index) => {
						const itemPageNo = index + 1
						const isActive = itemPageNo === this.state.currentPageNo
						return <li className={this.getJumpPageNoClass(isActive)} key={index} onClick={() => this._onChange(itemPageNo)}>{itemPageNo}</li>
					})
				}
				<li className={this.getSiblingPageNoClass('next')} onClick={this._nextPage}>下一页</li>
			</ul>
		)
	}
}