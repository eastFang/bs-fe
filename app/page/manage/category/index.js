import React from 'react'
import { Table, Modal, Form, Input, Button, Space, Message } from 'aliasComponent'
import ManageCommonPage from '../common/page'
import { formatDate } from 'aliasUtil'
import { fetchCategoryPaging, createCategory } from 'aliasServer/manage'

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
		this._onSubmit = this._onSubmit.bind(this)
	}
	
	componentDidMount() {
		fetchCategoryPaging().then((res) => {
			const { total, datas } = res
			this.setState({
				total, dataSource: datas
			})
		})
	}

	_onSubmit(evt, data) {
		evt.preventDefault()
		createCategory(data)
			.then(() => {
				Message.success('创建成功')
				location.href = '/label'
			})
	}

	render() {
		const { dataSource, total } = this.state
		return (
			<ManageCommonPage>
				<Button type='primary' title='新建类目' onClick={() => this.refs.addCategory.show()}/>
				<Space height={16}/>
				<Table dataSource={dataSource} total={total} columns={this.columns} />
				<Modal title='新建类目' ref='addCategory' onOK={(...args) => this.refs.form._onSubmit(...args)}>
					<Form onSubmit={this._onSubmit} ref='form'>
						<Form.Field label='名称' name='name' required>
							<Input placeholder='类目名称' />
						</Form.Field>
					</Form>
				</Modal>
			</ManageCommonPage>
		)
	}
}