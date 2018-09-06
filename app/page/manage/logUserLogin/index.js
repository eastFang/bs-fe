import React from 'react'
import { Table, Spin } from 'aliasComponent'
import ManageCommonPage from '../common/page'
import { TableFilter } from 'aliasPageCommon'
import filterConfig from './tableFilterConfig'
import { formatDate, queryStrToObj } from 'aliasUtil'
import { fetchUserLoginLogPaging } from 'aliasServer/log'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dataSource: null,
			total: 0,
			isFetching: true,
		}
		this.columns = [{
			title: 'id',
			key: 'id'
		},{
			title: '用户ID',
			key: 'userId'
		}, {
			title: '用户名',
			key: 'name',
		}, {
			title: '昵称',
			key: 'nickName',
		}, {
			title: 'ip',
			key: 'ip'
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
		this.getUserLoginLogPaging(this.props.location.search)
	}

	componentWillReceiveProps(nextProps) {
		this.getUserLoginLogPaging(nextProps.location.search)
	}

	getUserLoginLogPaging(search) {
		const { pageNo = 1, pageSize = 10 } = queryStrToObj(search)
		fetchUserLoginLogPaging({ pageNo, pageSize })
			.then((res) => {
				this.setState({
					dataSource: res.datas,
					total: res.total,
					isFetching: false,
				})
			})
	}

	render() {
		const { dataSource, total, isFetching } = this.state
		return (
			<ManageCommonPage>
				<TableFilter fields={filterConfig} />
				<Spin isFetching={isFetching}>
					<Table dataSource={dataSource} total={total} columns={this.columns} />
				</Spin>
			</ManageCommonPage>
		)
	}
}