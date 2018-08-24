import React from 'react'
import Pagination from '../pagination'
import PropTypes from 'prop-types'
import './index.scss'

class Table extends React.Component {
	constructor(props) {
		super(props)
	}

	getItemTdList(itemData) {
		return this.props.columns.map(({ key, render }, index) => {
			if (!key) {
				return <td key={`operation${index}`}>{render(itemData)}</td>
			}

			let tdVal = ''
			const keyList = key.replace(/\[/g, '.').replace(/\]/g, '').split('.')
			let tempCel = itemData
			keyList.forEach((item) => {
				tdVal = tempCel[item]
				tempCel = tdVal
			})
			return <td key={index}>{render ? render(tdVal) : tdVal}</td>
		})
	}

	renderTbody() {
		const { dataSource } = this.props
		if (!Array.isArray(dataSource)) {
			return null
		}

		if (this.props.dataSource.length === 0) {
			return (
				<tr>
					<td className='center-text' colSpan={this.props.columns.length}>暂无可展示信息</td>
				</tr>
			)
		}

		return (
			dataSource.map((item, index) => {
				return (
					<tr key={index}>
						{this.getItemTdList(item)}
					</tr>
				)
			})
		)
	}
  
	render() {
		const { columns, total } = this.props

		return (
			<table className='table'>
				<thead>
					<tr>
						{
							columns.map((item, index) => {
								const { title, width } = item
								return (
									<th key={index} width={width}>{title}</th>
								)
							})
						}
					</tr>
				</thead>
				<tbody>
					{this.renderTbody()}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={columns.length}>
							<Pagination total={total} />
						</td>
					</tr>
				</tfoot>
			</table>
		)
	}
}

Table.propTypes = {
	columns: PropTypes.array,
	dataSource: PropTypes.array,
	total: PropTypes.number
}

const defaultColumns = [
	{
		key: 'index1',
		title: '列1',
	},
	{
		key: 'index2',
		title: '列2',
	}
]

const defaultDataSource = [{
	index1: '列1数据',
	index2: '列2数据'
}]

Table.defaultProps = {
	columns: defaultColumns,
	dataSource: defaultDataSource,
	total: 2
}

export default Table