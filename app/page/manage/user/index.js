import React from 'react'
import { Table } from 'aliasComponent'
import ManageCommonPage from '../common/page'
import { formatDate } from 'aliasUtil'
import { fetchUserList } from 'aliasServer/manage'

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
			title: '用户名',
			key: 'name',
		}, {
			title: '昵称',
			key: 'nickName',
		}, {
			title: '手机号',
			key: 'mobile'
		}, {
			title: '邮箱',
			key: 'email'
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
		fetchUserList()
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
			<ManageCommonPage>
				<Table dataSource={dataSource} total={total} columns={this.columns} />
			</ManageCommonPage>
		)
	}
}