import React from 'react'
import { Spin } from 'aliasComponent'
import { Link } from 'react-router-dom'
import { fetchArticleSearch }  from 'aliasServer/article'
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
		fetchArticleSearch()
			.then((res) => {
				this.setState({
					articleList: res.paging.datas,
					isFetching: false
				})
			})
	}
  
	render() {
		const { isFetching, articleList } = this.state
    
		return (
			<Spin isFetching={isFetching}>
				<ul className='article-search-list'>
					{
						articleList && articleList.map((article, index) => {
							const { summary } = article
							return (
								<li key={index}>
									<Link to={`/article/${article.id}`}>
										<p className='title'>{article.title}</p>
										<div className='synopsis' dangerouslySetInnerHTML={{ __html: article.synopsis }}/>
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