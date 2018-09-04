import React from 'react'
import ReactDOM from 'react-dom'
import { Editor, Button, Input, Message, Row, Col } from 'aliasComponent'
import { createArticle, fetchArticleDetail } from 'aliasServer/article'
import Category from './category'
import Article from './article/connect'
import './index.scss'

class ArticleAdd extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			categoryId: null,
			articleDetail: {},
		}
		this._onSubmitArticle = this._onSubmitArticle.bind(this)
		this._onChangeArticle = this._onChangeArticle.bind(this)
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

	_onChangeArticle(articleId) {
		fetchArticleDetail(articleId)
			.then((res) => {
				this.setState({
					articleDetail: res,
				})
				this.refs.title.setValue(res.article.title)
				this.refs.editor.setValue(res.detail.content)
			})
	}

	render() {
		return (
			<div className='page-article-add'>
				<Row>
					<Col span={4} va='top'>
						<Category ref='category' onChangeCategory={categoryId => this.setState({ categoryId })}/>
					</Col>
					<Col span={6} va='top'>
						<Article categoryId={this.state.categoryId} onChangeArticle={this._onChangeArticle} />
					</Col>
					<Col span={14} va='top'>
						<div className='input-wrap'>
							<Input className='article-title-input' placeholder='文章标题' ref='title' />
							<Button className='pull-right' type='primary' title='发布' onClick={this._onSubmitArticle}/>
						</div>
						<Editor ref='editor' />
					</Col>
				</Row>
			</div>
		)
	}
}

export default ArticleAdd