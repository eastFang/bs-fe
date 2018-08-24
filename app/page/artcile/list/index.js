import React from 'react'
import { Link } from 'react-router-dom'
import { PageCommon, Pagination } from 'aliasComponent'
import fly from 'flyio'
import ArticleSearch from '../search'
import { fetchArticleSearch } from 'aliasServer/article'
import { fetchCategoryList } from 'aliasServer/category'
import { formatDate, queryStrToObj, replaceQueryParamInSearch } from 'aliasUtil'
import './index.scss'

export default class extends React.Component {
	constructor(props) {
		super(props)
		const { categoryId = '' } = queryStrToObj(props.location.search)
		this.state = {
			article: null,
			categoryList: null,
			currentCategoryId: categoryId
		}
	}

	componentDidMount() {
		const params = queryStrToObj(this.props.location.search)
		fly.all([fetchArticleSearch(params), fetchCategoryList()])
			.then((res) => {
				this.setState({
					article: res[0],
					categoryList: res[1],
					currentCategoryId: params.categoryId || ''
				})
			})
	}

	componentWillReceiveProps(nextProps) {
		const params = queryStrToObj(nextProps.location.search)
		fetchArticleSearch(params)
			.then((res) => {
				this.setState({
					article: res,
					currentCategoryId: params.categoryId || ''
				})
			})
	}

	_onSearch(categoryId) {
		this.props.history.push(`/squareArticle${replaceQueryParamInSearch(this.props.location.search, { categoryId } )}`)
	}

	renderLeftArea() {
		const { categoryList, currentCategoryId } = this.state
		
		return (
			<div className='left-wrap'>
				<ul className='left-ul'>
					{
						categoryList && categoryList.map((category, index) => {
							return (
								<li key={index} className={category.id == currentCategoryId ? 'active' : ''}>
									<a onClick={() => this._onSearch(category.id)}>{category.name}</a>
								</li>
							)
						})
					}
				</ul>
			</div>
		)
	}

	renderRightArea() {
		const { article } = this.state
		if (!article || !article.paging) {
			return null
		}
		return (
			<div className='right-wrap'>
				<ul className='right-ul'>
					{
						article && article.paging && article.paging.datas && article.paging.datas.map((article, index) => {
							return (
								<li key={index}>
									<Link to={`/articleDetail?id=${article.id}`}>
										<p className='title'>{article.title}</p>
										<p>{article.synopsis}</p>
										<p>{formatDate(article.publishAt)}</p>
									</Link>
								</li>
							)
						})
					}
				</ul>
				<Pagination total={article.paging.total}/>
			</div>
		)
	}

	render() {
		return (
			<React.Fragment>
				<PageCommon.Ceiling />
				<div className='page-article-list'>
					<ArticleSearch />
					<div className='page-article-list-body'>
						{this.renderLeftArea()}
						{this.renderRightArea()}
					</div>
				</div>
			</React.Fragment>
		)
	}
}