import React from 'react'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { replaceQueryParamInSearch, queryStrToObj } from 'aliasUtil'
import './index.scss'

/**
 * 分页控制器
 */
class Pagination extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currentPageNo: Number(queryStrToObj(props.location.search).pageNo || 1)
		}
		this.initParams = {
			pageSize: props.pageSize,
			maxDisplayLength : 7
		}
		this._prePage = this._prePage.bind(this)
		this._nextPage = this._nextPage.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		const thisPageNo = Number(queryStrToObj(this.props.location.search).pageNo || 1)
		const nextPageNo = Number(queryStrToObj(nextProps.location.search).pageNo || 1)
		if (thisPageNo !== nextPageNo) {
			// 这里不调用this._onChange 因为_onChange 里面有history.push 的方法；会重复push
			this.setState({
				currentPageNo: nextPageNo
			})
		}
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

	getPageNoItemClass({ isCurrent, preOrNext }) {
		return classNames(
			'pageno-item',
			{
				active: isCurrent,
				pre: preOrNext === 'pre',
				next: preOrNext === 'next',
				'elli-pageno': !!preOrNext
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
		if (pageNo == this.state.currentPageNo) {
			return
		}
		this.setState({
			currentPageNo: pageNo
		})
		if (this.props.onChange) {
			this.props.onChange(pageNo, this.initParams.pageSize)
		} else  {
			const { location: { pathname, search }, history } = this.props
			history.push(`${pathname}${replaceQueryParamInSearch(search, { pageNo, pageSize: this.initParams.pageSize })}`)
		}
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
		const isCurrent = itemPageNo === this.state.currentPageNo
		return <li className={this.getPageNoItemClass({ isCurrent })} key={itemPageNo} onClick={() => this._onChange(itemPageNo)}>{itemPageNo}</li>
	}

	getElliItemPageNoDom(preOrNext) {
		return <li className={this.getPageNoItemClass({ preOrNext })} key={preOrNext} onClick={() => this._onElliChange(preOrNext)}></li>
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
		// 当前页往前推一半，推导起始页码(非序号)
		let start = currentPageNo - Math.floor((displayLength - 2) / 2)
		// 第一页一定有
		pageNoList.push(this.getItemPageNoDom(1))
		// 如果起始页大于2且总页数大于最大展示页码，将elliPre推进去
		if (start > 2 && pageCount > displayLength) {
			pageNoList.push(this.getElliItemPageNoDom('pre'))
		} else {
			start = 2
		}
		// 结束页往后推
		const end = start + displayLength - 2
		// 如果结束页超出最大页码，start则往前再推
		end > pageCount ? start -= (end - pageCount) : null
		for (let index = start; index < Math.min(end, pageCount); index ++) {
			pageNoList.push(this.getItemPageNoDom(index))
		}
		// 如果结束页码小于最大页码，将elliNext推进去
		if (end < pageCount) {
			pageNoList.push(this.getElliItemPageNoDom('next'))
		}
		// 页码大于一，将最后一个页码推进去
		if (pageCount > 1) {
			pageNoList.push(this.getItemPageNoDom(pageCount))
		}
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

export default withRouter(Pagination)