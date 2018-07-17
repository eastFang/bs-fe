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
			pageSize: props.pageSize
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

	render() {
		const {
			total,
			pageSize = this.initParams.pageSize,
		} = this.props
		if (!total) return null
		const pageCount = Math.ceil(total / pageSize)

		return (
			<ul className='bs-pagination'>
				<li className={this.getPreOrNextPageNoClass('pre')} onClick={this._prePage}>上一页</li>
				{
					_.times(pageCount, (index) => {
						const itemPageNo = index + 1
						const isCurrent = itemPageNo === this.state.currentPageNo
						return <li className={this.getPageNoItemClass(isCurrent)} key={index} onClick={() => this._onChange(itemPageNo)}>{itemPageNo}</li>
					})
				}
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