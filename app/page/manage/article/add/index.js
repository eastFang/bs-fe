import React from 'react'
import { Editor, Button, Form, Input, Select, Message } from 'aliasComponent'
import { withCeiling } from 'aliasPageCommon'
import { flyUtil } from 'aliasUtil'
import { createArticle } from 'aliasServer/article'
import './index.scss'

class ArticleAdd extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			categoryList: null,
		}
		this._onSubmit = this._onSubmit.bind(this)
	}
  
	_onSubmit(evt, data) {
		evt.preventDefault()
		const params = {
			article: { title: data.title, categoryId: data.categoryId, visible: false },
			detail: { content: data.content, isMarkdown: false }
		}
		createArticle(params)
			.then(() => {
				Message.success('创建成功')
			})
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
			<div className='page-article-add-body'>
				<Form onSubmit={this._onSubmit}>
					<Form.Field label='标题' name='title' empty='文章标题不得为空' required>
						<Input placeholder='文章标题' />
					</Form.Field>
					<Form.Field label='分类' name='categoryId'>
						{this.renderCategorySelect()}	
					</Form.Field>
					<Form.Field label='内容' name='content' required>
						<Editor />
					</Form.Field>
					<Form.Field label='&nbsp;'>
						<Button title='提交' type='primary' />
					</Form.Field>
				</Form>
			</div>
		)
	}
}

export default withCeiling('page-article-add')(ArticleAdd)