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
			const tdVal = itemData[key]
			return <td key={index}>{render ? render(tdVal) : tdVal}</td>
		})
	}
  
	render() {
		const { dataSource, columns, total } = this.props
		if (!(dataSource && columns && dataSource.length && columns.length)) return null

		return (
			<table className='table'>
				<thead>
					<tr>
						{
							columns.map((item, index) => {
								const { title } = item
								return (
									<th key={index}>{title}</th>
								)
							})
						}
					</tr>
				</thead>
				<tbody>
					{
						dataSource.map((item, index) => {
							return (
								<tr key={index}>
									{this.getItemTdList(item)}
								</tr>
							)
						})
					}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={columns.length}>
							<Pagination total={total}/>
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