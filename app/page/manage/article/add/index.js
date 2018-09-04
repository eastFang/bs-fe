import React from 'react'
import ReactDOM from 'react-dom'
import { Editor, Button, Input, Message, Row, Col } from 'aliasComponent'
import { createArticle } from 'aliasServer/article'
import Category from './category'
import './index.scss'

class ArticleAdd extends React.Component {
	constructor(props) {
		super(props)
		this._onSubmitArticle = this._onSubmitArticle.bind(this)
	}

	/**
	 * 发布文章
	 */
	_onSubmitArticle() {
		const categoryId = this.refs.category.state.currentCategoryId
		const title = this.refs.title.state.value
		const content = this.refs.editor.state.value
		if (!categoryId) {
			Message.info('请选择类目')
			return
		}
		if (!title) {
			Message.info('请输入文章标题')
			ReactDOM.findDOMNode(this.refs.title).focus()
			return
		}
		if (!content) {
			Message.info('请输入文章内容')
			return
		}
		const params = {
			article: { title, categoryId, visible: false },
			detail: { content, isMarkdown: false }
		}
		createArticle(params)
			.then(() => {
				Message.success('创建成功，耐心待运营审核！')
			})
	}

	render() {
		return (
			<div className='page-article-add'>
				<Row>
					<Col span={4} va='top'>
						<Category ref='category'/>
					</Col>
					<Col span={20} va='top'>
						<div className='input-wrap'>
							<Input className='article-title-input' placeholder='文章标题' ref='title'/>
							<Button className='pull-right' type='primary' title='发布' onClick={this._onSubmitArticle}/>
						</div>
						<Editor ref='editor'/>
					</Col>
				</Row>
			</div>
		)
	}
}

export default ArticleAdd