import React from 'react'
import { Table, Spin, Button, Message, Modal, Form, Input, Space } from 'aliasComponent'
import ManageCommonPage from '../common/page'
import { formatDate, queryStrToObj } from 'aliasUtil'
import { fetchAdminFriendLinkList, adminCreateFriendLink } from 'aliasServer/friendLink'

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
		data.visible = false
		adminCreateFriendLink(data)
			.then(() => {
				Message.success('创建成功')
				location.href = '/manage/friendLink'
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
		return (
			<React.Fragment>
				{ record.visible ? <a>隐藏</a> : <a>显示</a> }
			</React.Fragment>
		)
	}

	render() {
		const { dataSource, total, isFetching } = this.state
		return (
			<ManageCommonPage>
				<Button type='primary' title='新建友情链接' onClick={() => this.refs.addFriendLink.show()}/>
				<Space height={16}/>
				<Spin isFetching={isFetching}>
					<Table dataSource={dataSource} total={total} columns={this.columns} />
				</Spin>
				<Modal title='新建友情链接' ref='addFriendLink' onOK={(...args) => this.refs.form._onSubmit(...args)}>
					<Form onSubmit={this._onSubmit} ref='form'>
						<Form.Field label='链接地址' name='link' pattern='^https?:\/\/.*\..*' error='请输入正确的地址' required>
							<Input placeholder='链接地址' />
						</Form.Field>
						<Form.Field label='链接展示' name='webName' required>
							<Input placeholder='链接展示' />
						</Form.Field>
					</Form>
				</Modal>
			</ManageCommonPage>
		)
	}
}