import React from 'react'
import { Table, Modal, Form, Input, Button, Space } from 'aliasComponent'
import ManageCommonPage from '../common/page'
import { formatDate } from 'aliasUtil'
import { fetchLabelPaging, createLabel } from 'aliasServer/manage'

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
				return visible === 0 ? '不可见' : '可见'
			}
		}]
		this._onSubmit = this._onSubmit.bind(this)
	}
  
	componentDidMount() {
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
				alert('创建成功')
				this.refs.addLabel.close()
			})
	}
  
	render() {
		const { dataSource, total } = this.state
		return (
			<ManageCommonPage>
				<Button type='primary' title='新建标签' onClick={() => this.refs.addLabel.show()} />
				<Space height={16} />
				<Table dataSource={dataSource} total={total} columns={this.columns} />
				<Modal title='新建标签' ref='addLabel' noFooter>
					<Form onSubmit={this._onSubmit}>
						<Form.Field label='名称' name='name' required>
							<Input placeholder='标签名称' />
						</Form.Field>
						<Button className='pull-right' type='primary' title='提交' />
					</Form>
				</Modal>
			</ManageCommonPage>
		)
	}
}