import React from 'react'
import { Spin, Pagination } from 'aliasComponent'
import { Empty } from 'aliasPageCommon'
import { Link, withRouter } from 'react-router-dom'
import { fetchArticleSearch }  from 'aliasServer/article'
import { queryStrToObj, formatDate } from 'aliasUtil'
import './index.scss'

class ArticleList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			article: null,
			isFetching: true,
		}
	}

	componentDidMount() {
		this.getArticleSearchResult(this.props.location.search)
	}

	componentWillReceiveProps(nextProps) {
		window.scrollTo({ top: 0 })
		this.getArticleSearchResult(nextProps.location.search)
	}

	getArticleSearchResult(search) {
		const params = queryStrToObj(search)
		fetchArticleSearch(params)
			.then((res) => {
				this.setState({
					article: res,
					isFetching: false
				})
			})
			.catch(() => {
				this.setState({
					article: { paging: { datas: [] }},
					isFetching: false
				})
			})
	}
  
	render() {
		const { isFetching, article } = this.state
		if (article && article.paging && article.paging.datas && article.paging.datas.length === 0) {
			return <Empty />
		}
		return (
			<Spin isFetching={isFetching}>
				<ul className='right-ul'>
					{
						article && article.paging && article.paging.datas && article.paging.datas.map((article, index) => {
							return (
								<li key={index}>
									<Link to={`/article/${article.id}`}>
										<p className='title'>{article.title}</p>
										<p>{article.synopsis}</p>
										<p>{formatDate(article.publishAt)}</p>
									</Link>
								</li>
							)
						})
					}
				</ul>
				<Pagination total={article && article.paging ? article.paging.total : 0}/>
			</Spin>
		)
	}
}

export default withRouter(ArticleList)