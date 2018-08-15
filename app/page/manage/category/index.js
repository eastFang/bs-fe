import React from 'react'
import { PageCommon, Table } from 'aliasComponent'
import Menu from '../menu'
import { flyUtil, formatDate } from 'aliasUtil'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dataSource: null,
			total: 0,
		}
		this.columns = [{
			title: 'id',
			key: 'id'
		}, {
			title: '分类名称',
			key: 'name',
		}, {
			title: '创建时间',
			key: 'createdAt',
			render: (createdAt) => {
				return formatDate(createdAt)
			}
		}, {
			title: '更新时间',
			key: 'updatedAt',
			render: (updatedAt) => {
				return formatDate(updatedAt)
			}
		}]
	}
	
	componentDidMount() {
		this.fetchCategoryList()
	}

	fetchCategoryList() {
		flyUtil({ url: '/api/category/paging' })
			.then((res) => {
				const { total, datas } = res
				this.setState({
					total, dataSource: datas
				})
			})
	}

	render() {
		const { dataSource, total } = this.state
		return (
			<React.Fragment>
				<PageCommon.Ceiling />
				<Menu />
				<Table dataSource={dataSource} total={total} columns={this.columns} />
			</React.Fragment>
		)
	}
}