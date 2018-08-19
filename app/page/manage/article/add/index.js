import React from 'react'
import ManageCommonPage from '../../common/page'
import { Editor, Button, Form, Input, Space, Select } from 'aliasComponent'
import { flyUtil } from 'aliasUtil'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			categoryList: null,
		}
		this._onSubmit = this._onSubmit.bind(this)
	}
  
	_onSubmit(evt, data) {
		evt.preventDefault()
		console.log(data)
	}

	componentDidMount() {
		this.fetchCategoryList()
	}

	fetchCategoryList() {
		flyUtil({ url: '/api/category/list' })
			.then((res) => {
				this.setState({
					categoryList: res,
				})
			})
	}

	renderCategorySelect() {
		const { categoryList } = this.state
		if (!categoryList) {
			return null
		}
		return (
			<Select>
				{
					categoryList.map((category, index) => <Select.Option key={index} value={category.id}>{category.name}</Select.Option>)
				}
			</Select>
		)
	}

	render() {
		
		return (
			<ManageCommonPage>
				<Form onSubmit={this._onSubmit}>
					<Form.Field label='标题' name='title' empty='文章标题不得为空' required>
						<Input placeholder='文章标题' />
					</Form.Field>
					<Form.Field label='简介' name='synopsis' empty='文章简介不得为空' required>
						<Input placeholder='文章简介' />
					</Form.Field>
					<Form.Field label='分类' name='cagegoryId'>
						{this.renderCategorySelect()}	
					</Form.Field>
					<Editor ref='editor'/>
					<Button title='提交' type='primary' />
				</Form>
			</ManageCommonPage>
		)
	}
}