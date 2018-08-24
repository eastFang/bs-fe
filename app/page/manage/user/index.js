import React from 'react'
import { Table, Modal, Form } from 'aliasComponent'
import ManageCommonPage from '../common/page'
import { formatDate, queryStrToObj } from 'aliasUtil'
import { fetchUserDetail, fetchUserPaging } from 'aliasServer/adminUser'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dataSource: null,
			detailItem: null,
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
		}, {
			title: '查看详情',
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

	getUserList(search) {
		const { pageNo = 1, pageSize = 10 } = queryStrToObj(search)
		fetchUserPaging({ pageNo, pageSize })
			.then((res) => {
				this.setState({
					dataSource: res.datas,
					total: res.total
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
				<Form.Field label='用户名'>
					<span>{name}</span>
				</Form.Field>
				<Form.Field label='昵称'>
					<span>{nickName}</span>
				</Form.Field>
				<Form.Field label='手机号'>
					<span>{mobile}</span>
				</Form.Field>
				<Form.Field label='真实姓名'>
					<span>{realName}</span>
				</Form.Field>
				<Form.Field label='所在地区'>
					<span>{country} {province} {city}</span>
				</Form.Field>
				<Form.Field label='创建时间'>
					<span>{formatDate(createdAt)}</span>
				</Form.Field>
				<Form.Field label='更新时间'>
					<span>{formatDate(updatedAt)}</span>
				</Form.Field>
			</Form>
		)
	}

	renderOperation(record) {
		return (
			<React.Fragment>
				<a onClick={() => this._onDetail(record.id)}>查看详情</a>
			</React.Fragment>
		)
	}

	render() {
		const { dataSource, total } = this.state
		return (
			<ManageCommonPage>
				<Table dataSource={dataSource} total={total} columns={this.columns} />
				<Modal title='用户详情' ref='detailModal'>
					{this.renderModalContent()}
				</Modal>
			</ManageCommonPage>
		)
	}
}