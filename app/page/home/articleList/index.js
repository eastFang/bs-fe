import React from 'react'
import { Spin } from 'aliasComponent'
import { Link } from 'react-router-dom'
import { fetchPopularArticleList }  from 'aliasServer/article'

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
			<Spin isFetching={isFetching}>
				<ul className='article-list'>
					{
						articleList && articleList.map((item, index) => {
							const { article, summary } = item
							return (
								<li key={index}>
									<Link to={`/article/${article.id}`}>
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
			</Spin>
		)
	}
}