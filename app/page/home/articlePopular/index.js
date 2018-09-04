import React from 'react'
import { Spin } from 'aliasComponent'
import { Link } from 'react-router-dom'
import { fetchPopularArticleList }  from 'aliasServer/article'
import { formatDate } from 'aliasUtil'
import './index.scss'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			articleList: null,
			isFetching: true,
		}
	}

	componentDidMount() {
		fetchPopularArticleList()
			.then((res) => {
				this.setState({
					articleList: res,
					isFetching: false
				})
			})
	}
  
	render() {
		const { isFetching, articleList } = this.state
		return (
			<React.Fragment>
				<h3>热门文章</h3>
				<Spin isFetching={isFetching}>
					<ul className='article-popular-list'>
						{
							articleList && articleList.map((item, index) => {
								const { article } = item
								return (
									<li key={index}>
										<Link to={`/article/${article.id}`}>
											<p className='title'>{article.title}</p>
											<p className='date'>{formatDate(article.publishAt)}</p>
										</Link>
									</li>
								)
							})
						}
					</ul>
				</Spin>
			</React.Fragment>
		)
	}
}