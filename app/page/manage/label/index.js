import React from 'react'
import { Table, Modal, Form, Input, Button, Space, Message } from 'aliasComponent'
import ManageCommonPage from '../common/page'
import { formatDate } from 'aliasUtil'
import { fetchLabelPaging, createLabel, showVisible, hideVisible } from 'aliasServer/label'

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
			title: '标签名称',
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
			},
		}, {
			title: '状态',
			key: 'visible',
			render: (visible) => {
				return visible ? '可见' : '不可见'
			},
		},  {
			title: '操作',
			render: (record) => {
				return this.renderOperation(record)
			}
		}]
		this._onSubmit = this._onSubmit.bind(this)
	}
  
	componentDidMount() {
		this.getLabelPaging()
	}

	getLabelPaging() {
		fetchLabelPaging()
			.then((res) => {
				const { total, datas } = res
				this.setState({
					total, dataSource: datas
				})
			})
	}
  
	_onSubmit(evt, data) {
		evt.preventDefault()
		data.visible = false
		createLabel(data)
			.then(() => {
				Message.success('创建成功')
				// 暂时用这个方法解决下...
				location.href = '/label'
			})
	}

	_onToggleItem(id, actionType) {
		(actionType === 'show' ? showVisible(id) : hideVisible(id))
			.then(() => {
				Message.success('设置成功')
				location.reload()
			})
	} 

	renderOperation(record) {
		return (
			<React.Fragment>
				{
					record.visible
						? <a onClick={() => this._onToggleItem(record.id, 'hide')}>隐藏</a>
						: <a onClick={() => this._onToggleItem(record.id, 'show')}>显示</a>
				}
			</React.Fragment>
		)
	}
  
	render() {
		const { dataSource, total } = this.state
		return (
			<ManageCommonPage>
				<Button type='primary' title='新建标签' onClick={() => this.refs.addLabel.show()} />
				<Space height={16} />
				<Table dataSource={dataSource} total={total} columns={this.columns} />
				<Modal title='新建标签' ref='addLabel' onOK={(...args) => this.refs.form._onSubmit(...args)}>
					<Form onSubmit={this._onSubmit} ref='form'>
						<Form.Field label='名称' name='name' required>
							<Input placeholder='标签名称' />
						</Form.Field>
					</Form>
				</Modal>
			</ManageCommonPage>
		)
	}
}