import React from 'react'
import Pagination from '../pagination'
import './index.scss'

export default class extends React.Component {
	constructor(props) {
		super(props)
	}

	getItemTdList(itemData) {
		const tdList = []
		let index = 0
		for(let item in itemData) {
			if (index === this.props.columns.length) {
				break
			}
			const tdVal = itemData[this.props.columns[index].key]
			const render = this.props.columns[index].render
			tdList.push(<td key={index}>{render ? render(tdVal) : tdVal}</td>)
			index++	
		}
		return tdList
	}
  
	render() {
		const { dataSource, columns, total } = this.props
		if (!(dataSource && columns && dataSource.length && columns.length)) return null

		return (
			<table>
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