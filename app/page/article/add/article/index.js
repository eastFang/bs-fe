import React from 'react'
import { Spin } from 'aliasComponent'
import { fetchAdminArticlePaging } from 'aliasServer/article'
import { formatDate } from 'aliasUtil'
import './index.scss'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			articleList: null,
			isFetching: true,
			currentArticleId: null,
		}
		this._onAddArticle = this._onAddArticle.bind(this)
		this._onChangeArticle = this._onChangeArticle.bind(this)
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.categoryId !== nextProps.categoryId && nextProps.categoryId) {
			const userId = this.props.userInfo.id
			const categoryId = nextProps.categoryId
			fetchAdminArticlePaging({ userId, categoryId })
				.then((res) => {
					const currentArticleId = res && res.datas.length && res.datas[0].article.id
					const state = {
						articleList: res.datas,
						isFetching: false,
					}
					if (currentArticleId) {
						this._onChangeArticle(currentArticleId)
					}
					this.setState(state)
				})
		}
	}
  
	_onAddArticle() {

	}

	_onChangeArticle(articleId) {
		this.setState({
			currentArticleId: articleId,
		})
		this.props.onChangeArticle && this.props.onChangeArticle(articleId)
	}

	render() {
		const { articleList } = this.state

		return (
			<div className='article-add-child-article'>
				<Spin isFetching={this.state.isFetching}>
					<ul className='article-ul'>
						<li onClick={this._onAddArticle}> <strong>+</strong> 新建文章</li>
						{
							articleList && articleList.map(({ article }, index) => {
								return (
									<li key={index} className={this.state.currentArticleId === article.id ? 'active' : ''}>
										<p>{formatDate(article.publishAt)}</p>
										<span>{article.title}</span>
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