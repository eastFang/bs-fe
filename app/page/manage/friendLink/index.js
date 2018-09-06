import React from 'react'
import { Table, Spin, Button, Message, Modal, Form, Input, Space } from 'aliasComponent'
import { TableFilter } from 'aliasPageCommon'
import ManageCommonPage from '../common/page'
import { formatDate, queryStrToObj } from 'aliasUtil'
import { fetchAdminFriendLinkList, adminCreateFriendLink, adminUpdateFriendLink } from 'aliasServer/friendLink'
import filterConfig from './tableFilterConfig'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dataSource: null,
			total: 0,
			isFetching: true,
			friendDetail: void 0,
		}
		this.columns = [{
			title: 'id',
			key: 'id'
		},{
			title: '链接地址',
			key: 'link',
			render: (link) => {
				return <a href={link} target='_blank'>{link}</a>
			}
		}, {
			title: '链接展示名',
			key: 'webName',
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
			key: 'visible',
			render: (visible) => {
				return visible ? '可见' : '不可见'
			}
		}, {
			title: '操作',
			render: (record) => {
				return this.renderOperation(record)
			}
		}]
		this._onSubmit = this._onSubmit.bind(this)
	}
	
	componentDidMount() {
		this.getUserLoginLogPaging(this.props.location.search)
	}

	componentWillReceiveProps(nextProps) {
		this.getUserLoginLogPaging(nextProps.location.search)
	}

	_onSubmit(evt, data) {
		evt.preventDefault()
		let friendDetailSubmit = null
		if (this.state.friendDetail) {
			friendDetailSubmit = adminUpdateFriendLink
			data = { ...this.state.friendDetail, ...data }
		} else {
			friendDetailSubmit = adminCreateFriendLink
			data.visible = false
		}
		friendDetailSubmit(data)
			.then(() => {
				Message.success('操作成功')
				location.href = '/manage/friendLink'
			})
	}

	_onToggle(record, visible) {
		record.visible = visible
		adminUpdateFriendLink(record)
			.then(() => {
				const { dataSource } = this.state
				for (let item of dataSource) {
					if (item.id === record.id) {
						item.visible = visible
						break
					}
				}
				this.setState({
					dataSource
				}, () => {
					Message.success('更新成功')
				})
			})
	}

	_onEditFriendLink(friendDetail) {
		this.setState({
			friendDetail,
		}, () => {
			this.refs.friendLinkModal.show()
		})
	}

	getUserLoginLogPaging(search) {
		const { pageNo = 1, pageSize = 10 } = queryStrToObj(search)
		fetchAdminFriendLinkList({ pageNo, pageSize })
			.then((res) => {
				this.setState({
					dataSource: res.datas,
					total: res.total,
					isFetching: false,
				})
			})
	}

	renderOperation(record) {
		const { visible } = record
		return (
			<React.Fragment>
				<a onClick={() => this._onToggle(record, !visible)}>{visible ? '隐藏' : '显示' }</a><br />
				<a onClick={() => this._onEditFriendLink(record)}>编辑</a>
			</React.Fragment>
		)
	}

	render() {
		const { dataSource, total, isFetching, friendDetail = {} } = this.state
		return (
			<ManageCommonPage>
				<Button type='primary' title='新建友情链接' onClick={() => this._onEditFriendLink()}/>
				<Space height={16}/>
				<TableFilter fields={filterConfig} />
				<Spin isFetching={isFetching}>
					<Table dataSource={dataSource} total={total} columns={this.columns} />
				</Spin>
				<Modal title={`${friendDetail ? '编辑链接' : '新建链接'}`} ref='friendLinkModal' onOK={(...args) => this.refs.form._onSubmit(...args)}>
					<Form onSubmit={this._onSubmit} ref='form'>
						<Form.Field label='链接地址' name='link' pattern='^https?:\/\/.*\..*' error='请输入正确的地址' required>
							<Input placeholder='链接地址' value={friendDetail.link}/>
						</Form.Field>
						<Form.Field label='链接展示' name='webName' required>
							<Input placeholder='链接展示' value={friendDetail.webName} />
						</Form.Field>
					</Form>
				</Modal>
			</ManageCommonPage>
		)
	}
}