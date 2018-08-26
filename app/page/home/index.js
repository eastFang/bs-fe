import React from 'react'
import { Link } from 'react-router-dom'
import { PageCommon, Space } from 'aliasComponent'
import { fetchPopularArticleList }  from 'aliasServer/article'
import { fetchCategoryList } from 'aliasServer/category'
import fly from 'flyio'
import './index.scss'
import Avatar from './avatar.jpeg'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			articleList: null,
			categoryList: null,
		}
	}

	componentDidMount() {
		fly.all([fetchPopularArticleList(), fetchCategoryList()])
			.then((res) => {
				this.setState({
					articleList: res[0],
					categoryList: res[1]
				})
			})
	}

	renderLeft() {
		return (
			<div className='left-wrap'>
				<ul className='article-list'>
					{
						this.state.articleList && this.state.articleList.map((item, index) => {
							const { article, summary } = item
							return (
								<li key={index}>
									<Link to={`/articleDetail?id=${article.id}`}>
										<p className='title'>{article.title}</p>
										<p className='synopsis'>{article.synopsis}</p>
										<p className='summary'>
											<span>{article.author}</span>
											<span className='i-wrap'><i className='iconfont icon-likes'></i>{summary.like}</span>
											<span className='i-wrap'><i className='iconfont icon-comments'></i>{summary.comments}</span>
										</p>
									</Link>
								</li>
							)
						})
					}
				</ul>
				<Link className='more-articles' to='/squareArticle'>更多文章</Link>
			</div>
		)
	}

	renderRight() {
		const { categoryList } = this.state
		return (
			<div className='right-wrap'>
				<div className='category-area'>
					<p className='title'>分类导航</p>
					<ul className='category-list'>
						{
							categoryList && categoryList.map((category, index) => {
								return (
									<li key={index}>
										<Link to={`/squareArticle?categoryId=${category.id}`}>
											{category.name}
										</Link>
									</li>
								)
							})
						}
					</ul>
				</div>
				<img src={Avatar} />
			</div>
		)
	}

	render() {
		return (
			<div className='page-home'>
				<PageCommon.Ceiling />
				<Space height={24} />
				<div className='page-home-body'>
					{this.renderLeft()}
					{this.renderRight()}
				</div>
			</div>
		)
	}
}