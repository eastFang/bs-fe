import React from 'react'
import { Link } from 'react-router-dom'
import { Img, Textarea, Button, Message, Space } from 'aliasComponent'
import { connect } from 'react-redux'
import { articleCommentList, userComment } from 'aliasServer/comment'
import { ENUM_TYPE } from 'aliasUtil'
import Children from './children'
import './index.scss'

class Comment extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isComment: false,
			commentList: null,
		}
		this.params = {
			articleId: props.articleId
		}
		this._onFocusTextarea = this._onFocusTextarea.bind(this)
		this._onBlurTextarea = this._onBlurTextarea.bind(this)
		this._onSubmitComment = this._onSubmitComment.bind(this)
	}

	componentDidMount() {
		if (!this.params.articleId) {
			return
		}
		return articleCommentList(this.params.articleId)
			.then((res) => {
				this.setState({
					commentList: res
				})
			})
	}
  
	_onFocusTextarea() {
		this.setState({
			isComment: true
		})
	}
  
	_onBlurTextarea(evt) {
		if (evt.target.value) {
			return
		}
		this.setState({
			isComment: false
		})
	}

	_onSubmitComment() {
		userComment({
			aimId: this.params.articleId,
			content: this.refs.content.state.value,
			type: ENUM_TYPE.ARTICLE,
			replier: this.props.userInfo.id,
		}).then(() => {
			Message.success('评论成功')
			this.componentDidMount().then(() => {
				this.refs.content.setValue('')
			})
		})
	}

	/**
	 * 用户评论区域
	 */
	renderOperation() {
		if (!this.props.userInfo) {
			return (
				<div className='operation'>
					<p>请登录后再评论</p>
					<p>
						<Link to='/login'>
							<Button type='primary' title='登录' />
						</Link>
					</p>
				</div>
			)
		}
		return (
			<div className='operation'>
				<Img className='logo' src={this.props.userInfo.avatar} />
				<Textarea placeholder='说说你的看法' onFocus={this._onFocusTextarea} onBlur={this._onBlurTextarea} ref='content'/>
				{
					this.state.isComment
						? (
							<p className='comment-area'>
								<Button title='评论' type='primary' onClick={this._onSubmitComment}/>
							</p>
						)
						: null
				}
			</div>
		)
	}

	renderCommentList() {
		if (!this.state.commentList) {
			return null
		}

		return (
			<ul className='comment-ul'>
				{
					this.state.commentList.map((commentItem, index) => {
						const { 
							comment: {
								replierName,
								replierAvatar,
								content,
								id,
								createdAt
							}, children } = commentItem
						return (
							<li className='comment-li' key={index}>
								{replierAvatar ? <Img className='avatar' src={replierAvatar} /> : <span className='avatar'>{replierName.substring(0, 1)}</span>}
								<div className='detail'>
									<div className='name'>{replierName}</div>
									<div className='content'>{content}</div>
									<Children data={children}
										aimId={this.params.articleId}
										pid={id}
										type={ENUM_TYPE.ARTICLE}
										createdAt={createdAt}
										refresh={this.componentDidMount.bind(this)}
									/>
								</div>
							</li>
						)
					})
				}
			</ul>
		)
	}

	render() {
		return (
			<div id='comment'>
				<h3>评论</h3>
				{this.renderOperation()}
				<Space height={24} />
				{this.renderCommentList()}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.userReducer.userInfo
	}
}

export default connect(mapStateToProps, null)(Comment)