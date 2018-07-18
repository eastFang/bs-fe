import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './index.scss'

/**
 * 分页控制器
 */
class Pagination extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currentPageNo: 1
		}
		this.initParams = {
			pageSize: props.pageSize,
			maxDisplayLength : 7
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

	getPageNoItemClass(isCurrent) {
		return classNames(
			'pageno-item',
			{
				active: isCurrent
			}
		)
	}

	getPreOrNextPageNoClass(type) {
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

	_onElliChange(type) {
		const { currentPageNo } = this.state
		const { total, pageSize } = this.props
		const pageCount = Math.ceil(total / pageSize)
		const { maxDisplayLength } = this.initParams

		let pageNo
		if (type === 'pre') {
			pageNo = Math.max(currentPageNo - (maxDisplayLength - 2), 1)
		} else {
			pageNo = Math.min(currentPageNo + (maxDisplayLength - 2), pageCount)
		}
		this._onChange(pageNo)
	}

	/**
	 * 上一页
	 */
	_prePage() {
		const type = 'pre'
		if (!this.checkShouldChangePageNo(type)) return
		this._onChange(this.state.currentPageNo - 1)
	}

	/**
	 * 下一页
	 */
	_nextPage() {
		const type = 'next'
		if (!this.checkShouldChangePageNo(type)) return
		this._onChange(this.state.currentPageNo + 1)
	}

	getItemPageNoDom(itemPageNo) {
		return <li className={this.getPageNoItemClass(itemPageNo === this.state.currentPageNo)} key={itemPageNo} onClick={() => this._onChange(itemPageNo)}>{itemPageNo}</li>
	}

	getElliItemPageNoDom(preOrNext) {
		return <li className={this.getPageNoItemClass()} key={preOrNext} onClick={() => this._onElliChange(preOrNext)}>{preOrNext}</li>
	}

	getPageNoList() {
		const {
			total,
			pageSize = this.initParams.pageSize,
			maxDisplayLength = this.initParams.maxDisplayLength
		} = this.props
		const { currentPageNo } = this.state
		const pageCount = Math.ceil(total / pageSize)
		const pageNoList = []
		const displayLength = Math.min(maxDisplayLength, pageCount)
		let start = currentPageNo - Math.floor((displayLength - 2) / 2)
		pageNoList.push(this.getItemPageNoDom(1))
		if (start > 2 && pageCount > displayLength) {
			pageNoList.push(this.getElliItemPageNoDom('pre'))
		} else {
			start = 2
		}
		const end = start + displayLength - 2
		end > pageCount ? start -= (end - pageCount) : null
		for (let index = start; index < Math.min(end, pageCount); index ++) {
			pageNoList.push(this.getItemPageNoDom(index))
		}
		if (end < pageCount) {
			pageNoList.push(this.getElliItemPageNoDom('next'))
		}
		if (pageCount > 1) {
			pageNoList.push(this.getItemPageNoDom(pageCount))
		}
		// for(let index = 0; index < pageCount; index++) {
		// 	const itemPageNo = index + 1
		// 	const isCurrent = itemPageNo === currentPageNo
		// 	pageNoList.push(<li className={this.getPageNoItemClass(isCurrent)} key={index} onClick={() => this._onChange(itemPageNo)}>{itemPageNo}</li>)
		// }
		return pageNoList
	}

	render() {
		if (!this.props.total) return null

		return (
			<ul className='bs-pagination'>
				<li className={this.getPreOrNextPageNoClass('pre')} onClick={this._prePage}>上一页</li>
				{this.getPageNoList()}
				<li className={this.getPreOrNextPageNoClass('next')} onClick={this._nextPage}>下一页</li>
			</ul>
		)
	}
}

Pagination.propTypes = {
	total: PropTypes.number,
	pageSize: PropTypes.number,
}

Pagination.defaultProps = {
	pageSize: 10,
}

export default Pagination