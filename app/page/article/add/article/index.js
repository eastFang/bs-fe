import React from 'react'
import { Spin } from 'aliasComponent'
import { reject, last } from 'lodash'
import { userArticlePaging, userDeleteArticle } from 'aliasServer/article'
import { formatDate } from 'aliasUtil'
import './index.scss'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			articleList: null,
			currentArticleId: null,
		}
	}

	componentWillReceiveProps(nextProps) {
		const { categoryId: nextCategoryId, successAddOrEditArticleId: nextSuccessAddOrEditArticleId } = nextProps
		const { categoryId, successAddOrEditArticleId } = this.props
		if (
			(categoryId !== nextCategoryId && nextCategoryId)
		|| (successAddOrEditArticleId !== nextSuccessAddOrEditArticleId && nextSuccessAddOrEditArticleId)) {
			this.fetching()
			userArticlePaging({ categoryId: nextCategoryId })
				.then((res) => {
					// 加载完类目下的所有文章后，默认第一篇文章或者添加成功后的文章
					this.onChangeArticle(nextSuccessAddOrEditArticleId || (res && res.datas.length && res.datas[0].article.id))
					this.setState({
						articleList: res.datas,
						isFetching: false,
					})
				})
		}
	}

	fetching() {
		this.setState({
			isFetching: true
		})
	}
  
	onChangeArticle(articleId = null) {
		this.setState({
			currentArticleId: articleId,
		})
		this.props.onChangeArticle && this.props.onChangeArticle(articleId)
	}

	_onDeleteArticle(evt, articleId) {
		evt.stopPropagation()
		userDeleteArticle(articleId)
			.then(() => {
				let { articleList } = this.state
				articleList = reject(articleList, article => article.article.id === articleId)
				this.setState({
					articleList,
				})
				this.props.onChangeArticle(last(articleId) && last(articleList).article.id)
			})
	}

	render() {
		const { articleList } = this.state

		return (
			<div className='article-add-child-article'>
				<Spin isFetching={this.state.isFetching}>
					<ul className='article-ul'>
						<li onClick={() => this.onChangeArticle()}> <strong>+</strong> 新建文章</li>
						{
							articleList && articleList.map(({ article }, index) => {
								return (
									<li key={index} className={this.state.currentArticleId === article.id ? 'active' : ''} onClick={() => this.onChangeArticle(article.id)}>
										<p>{formatDate(article.publishAt)}</p>
										<span>{article.title}</span>
										<span className='i-wrap' onClick={(evt) => this._onDeleteArticle(evt, article.id)}>
											<i className='iconfont icon-trash'></i>
										</span>
									</li>
								)
							})
						}
					</ul>
				</Spin>
			</div>
		)
	}
}