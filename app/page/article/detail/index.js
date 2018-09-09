import React from 'react'
import { Spin, Message, Badge } from 'aliasComponent'
import { withCeiling } from 'aliasPageCommon'
import { fetchArticleDetail, likeArticle, cancelLikeArticle } from 'aliasServer/article'
import { formatDate } from 'aliasUtil'
import classnames from 'classnames'
import './index.scss'

class ArticleDetail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			articleFullInfo: null,
			isFetching: true,
			liked: false,
		}
		this.params = {
			articleId: this.props.match.params.id
		}
		this._onLikeOrCancelLike = this._onLikeOrCancelLike.bind(this)
	}

	componentDidMount() {
		fetchArticleDetail(this.params.articleId)
			.then((res) => {
				this.setState({
					articleFullInfo: res,
					isFetching: false,
					liked: res.hasLiked,
				})
			})
	}

	/**
	 * 点赞/取消点赞
	 */
	_onLikeOrCancelLike() {
		const liked = this.state.liked
		const articleFunc = liked ? cancelLikeArticle : likeArticle
		articleFunc({ aimId: this.params.articleId, type: 1 })
			.then(() => {
				
				this.setState({
					liked: !liked,
				}, () => {
					Message.success(liked ? '取消点赞成功' : '点赞成功')
				})
			})
			.catch((msg) => {
				Message.error(msg)
			})
	}

	render() {
		const { articleFullInfo, isFetching } = this.state
		if (!articleFullInfo) {
			return null
		}

		const { 
			article: { author, title, publishAt,  },
			detail: { content },
			summary: { like, comments, popular }
		} = articleFullInfo
		const likeClassName = classnames(
			'icon-wrap',
			{
				liked: this.state.liked
			}
		)
		return (
			<Spin isFetching={isFetching}>
				<div className='left-heat'>
					<Badge count={like}>
						<a className={likeClassName} onClick={this._onLikeOrCancelLike}>
							<i className='iconfont icon-likes'></i>
						</a>
					</Badge>
					{/**<a className='icon-wrap'>
						<i className='iconfont icon-comments'></i>
		</a>**/}
				</div>
				<div className='page-article-detail-body'>
					<p className='title'>{title}</p>
					<div className='summary'>
						<span className='date'>By {author} At {formatDate(publishAt)}</span>
						<span className='i-wrap'>浏览量 {popular}</span>
						<span className='i-wrap'>喜欢 {like}</span>
						<span className='i-wrap'>评论 {comments}</span>
					</div>
					<div dangerouslySetInnerHTML={{ __html: content }}/>
				</div>
			</Spin>
		)
	}
}

export default withCeiling('page-article-detail')(ArticleDetail)