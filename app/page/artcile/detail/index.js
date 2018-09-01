import React from 'react'
import { Spin } from 'aliasComponent'
import { withCeiling } from 'aliasPageCommon'
import { fetchArticleDetail } from 'aliasServer/article'
import { formatDate } from 'aliasUtil'
import './index.scss'

class ArticleDetail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			articleFullInfo: null,
			isFetching: true,
		}
	}

	componentDidMount() {
		const { id } = this.props.match.params
		fetchArticleDetail(id)
			.then((res) => {
				this.setState({
					articleFullInfo: res,
					isFetching: false,
				})
			})
	}

	render() {
		const { articleFullInfo, isFetching } = this.state
		if (!articleFullInfo) {
			return null
		}

		const { 
			article: { title, publishAt },
			detail: { content },
			summary: { like, comments }
		} = articleFullInfo
		return (
			<Spin isFetching={isFetching}>
				<div className='page-article-detail'>
					<p className='title'>{title}</p>
					<p className='date'>{formatDate(publishAt)}</p>
					<div dangerouslySetInnerHTML={{ __html: content }}/>
					<p className='summary'>
						<a className='i-wrap'><i className='iconfont icon-like'></i>{like}</a>
						<a className='i-wrap'><i className='iconfont icon-comment'></i>{comments}</a>
					</p>
				</div>
			</Spin>
		)
	}
}

export default withCeiling()(ArticleDetail)