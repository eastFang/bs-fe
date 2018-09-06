import React from 'react'
import ReactDOM from 'react-dom'
import { Editor, Button, Input, Message, Row, Col } from 'aliasComponent'
import { userCreateArticle, fetchArticleDetail, userEditArticle } from 'aliasServer/article'
import Category from './category'
import Article from './article'
import './index.scss'

class ArticleAdd extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			categoryId: null,
			articleDetail: {},
			successAddOrEditArticleId: null,
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
		const articleId = this.refs.article.state.currentArticleId
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
		let params = {
			article: { title, categoryId, visible: false },
			detail: { content, isMarkdown: false }
		}
		let submitFunc = userCreateArticle
		if (articleId) {
			params.article = { ...this.state.articleDetail.article, ...params.article}
			params.detail = { ...this.state.articleDetail.detail, ...params.detail }
			submitFunc = userEditArticle
		}

		submitFunc(params)
			.then((res) => {
				const successAddOrEditArticleId = Number.isInteger(res) ? res : articleId
				this.setState({
					successAddOrEditArticleId
				})
				Message.success('发布成功，耐心待运营审核！')
			})
	}

	_onChangeArticle(articleId) {
		if (!articleId) {
			this.setArticleEditAreaValue({})
			return
		}
		fetchArticleDetail(articleId)
			.then((res) => {
				this.setArticleEditAreaValue(res)
			})
	}

	setArticleEditAreaValue(articleDetail) {
		this.setState({
			articleDetail,
		})
		this.refs.title.setValue(articleDetail.article ? articleDetail.article.title : '')
		this.refs.editor.setValue(articleDetail.detail ? articleDetail.detail.content : '')
	}

	render() {
		return (
			<div className='page-article-add'>
				<Row>
					<Col span={4} va='top'>
						<Category ref='category' onChangeCategory={categoryId => this.setState({ categoryId })}/>
					</Col>
					<Col span={6} va='top'>
						<Article ref='article' categoryId={this.state.categoryId} successAddOrEditArticleId={this.state.successAddOrEditArticleId} onChangeArticle={this._onChangeArticle} />
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