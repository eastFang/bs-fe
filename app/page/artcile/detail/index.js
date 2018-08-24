import React from 'react'
import { PageCommon } from 'aliasComponent'
import { fetchArticleDetail } from 'aliasServer/article'
import { queryStrToObj, formatDate } from 'aliasUtil'
import './index.scss'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			articleFullInfo: null
		}
	}

	componentDidMount() {
		const { id } = queryStrToObj(this.props.location.search)
		fetchArticleDetail(id)
			.then((res) => {
				this.setState({
					articleFullInfo: res
				})
			})
	}

	render() {
		const { articleFullInfo } = this.state
		if (!articleFullInfo) {
			return null
		}

		const { 
			article: { title, publishAt },
			detail: { content },
			summary: { like, comments }
		} = articleFullInfo
		return (
			<React.Fragment>
				<PageCommon.Ceiling />
				<div className='page-article-detail'>
					<p className='title'>{title}</p>
					<p className='data'>{formatDate(publishAt)}</p>
					<div dangerouslySetInnerHTML={{ __html: content }}/>
					<p className='summary'>
						<a className='i-wrap'><i className='iconfont icon-like'></i>{like}</a>
						<a className='i-wrap'><i className='iconfont icon-comment'></i>{comments}</a>
					</p>
				</div>
			</React.Fragment>
		)
	}
}