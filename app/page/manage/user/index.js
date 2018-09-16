import React from 'react'
import { Table, Modal, Form, Spin, Message } from 'aliasComponent'
import ManageCommonPage from '../common/page'
import { TableFilter } from 'aliasPageCommon'
import { formatDate, queryStrToObj } from 'aliasUtil'
import { fetchUserDetail, fetchUserPaging, adminFrozenUser, adminUnFrozenUser } from 'aliasServer/user'
import filterConfig from './tableFilterConfig'
import { UserEnum } from '../enum'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dataSource: null,
			detailItem: null,
			total: 0,
			isFetching: true,
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
		}, {
			title: '状态',
			key: 'status',
			render: status => UserEnum.DisplayText[status]
		}, {
			title: '操作',
			render: (record) => {
				return this.renderOperation(record)
			}
		}]
	}
	
	componentDidMount() {
		this.getUserList(this.props.location.search)
	}

	componentWillReceiveProps(nextProps) {
		this.getUserList(nextProps.location.search)
	}

	_onDetail(id) {
		fetchUserDetail(id)
			.then((res) => {
				this.setState({
					detailItem: res
				})
				this.refs.detailModal.show()
			})
	}

	onToggleUser(id, status) {
		const adminFrozenOrUnFrozenUser = {
			1: adminUnFrozenUser,
			'-1': adminFrozenUser
		}
		adminFrozenOrUnFrozenUser[status](id)
			.then(() => {
				const { dataSource } = this.state
				for(let item of dataSource) {
					if (item.id === id) {
						item.status = status
						break
					}
				}
				this.setState({
					dataSource
				}, () => Message.success('操作成功'))
			})
	}

	getUserList(search) {
		const params = { ...{ pageNo: 1, pageSize: 10 }, ...queryStrToObj(search) }
		fetchUserPaging(params)
			.then((res) => {
				this.setState({
					dataSource: res.datas,
					total: res.total,
					isFetching: false
				})
			})
	}

	renderModalContent() {
		if (!this.state.detailItem) {
			return null
		}
		const { name, nickName, mobile, realName, country, province, city, createdAt, updatedAt } = this.state.detailItem
		return (
			<Form>
				<Form.Field label='用户名:'>
					<span>{name}</span>
				</Form.Field>
				<Form.Field label='昵称:'>
					<span>{nickName}</span>
				</Form.Field>
				<Form.Field label='手机号:'>
					<span>{mobile}</span>
				</Form.Field>
				<Form.Field label='真实姓名:'>
					<span>{realName}</span>
				</Form.Field>
				<Form.Field label='所在地区:'>
					<span>{country} {province} {city}</span>
				</Form.Field>
				<Form.Field label='创建时间:'>
					<span>{formatDate(createdAt)}</span>
				</Form.Field>
				<Form.Field label='更新时间:'>
					<span>{formatDate(updatedAt)}</span>
				</Form.Field>
			</Form>
		)
	}

	renderOperation(record) {
		const { id, status } = record
		const operationList = UserEnum.Operation[status]
		
		if (!operationList || !operationList.length) {
			return null
		}
		return (
			<React.Fragment>
				{
					operationList.map(({ value, text }, index) => {
						if (!value) {
							return <div key='detail'><a onClick={() => this._onDetail(id)}>查看详情</a></div>
						}
						return <div key={index}><a key={index} onClick={() => this.onToggleUser(id, value)}>{text}</a></div>
					})
				}
			</React.Fragment>
		)
	}

	render() {
		const { dataSource, total, isFetching } = this.state
		return (
			<ManageCommonPage>
				<TableFilter fields={filterConfig}/>
				<Spin isFetching={isFetching}>
					<Table dataSource={dataSource} total={total} columns={this.columns} />
				</Spin>
				<Modal title='用户详情' ref='detailModal'>
					{this.renderModalContent()}
				</Modal>
			</ManageCommonPage>
		)
	}
}