import React from 'react'
import ReactDOM from 'react-dom'
import { Input, Button, Message, Img } from 'aliasComponent'
import { fetchCurrentUserProfile } from 'aliasServer/user'
import { userComment } from 'aliasServer/comment'
import { timeAgoText } from 'aliasUtil'
import classname from 'classnames'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			placeholder: '输入评论', // 输入框placeholder 根据评论pid， receiverName不同
			pid: props.pid, // 父id
			submitBtnText: '评论', // 提交按钮： pid无法控制，因为还有输入框输入时，也会导致按钮文本变化
		}
		this.params = {
			aimId: props.aimId,
			type: props.type,
		}
		this._onInputReply = this._onInputReply.bind(this)
		this._onReply = this._onReply.bind(this)
	}

	_onInputReply(evt, value) {
		if (this.state.pid !== this.props.pid) {
			this.setState({
				submitBtnText: value ? '评论' : '取消'
			})
		} else {
			this.setState({
				submitBtnText: '评论'
			})
		}
	}

	refresh() {
		this.props.refresh().then(() => {
			const ele = ReactDOM.findDOMNode(this.refs.ul)
			ele.scrollTop = ele.scrollHeight - ele.clientHeight
			this.refs.reply.setValue('')
		})
	}

	onChangeReceiver({ receiverName, pid }) {
		this.setState({
			placeholder: `回复于: ${receiverName}`,
			submitBtnText: '取消',
			pid,
		})
	}

	_onReply() {
		if (this.state.submitBtnText === '取消') {
			this.setState({
				pid: this.props.pid,
				placeholder: '输入评论',
				submitBtnText: '评论',
			})
			this.refs.reply.setValue('')
			return
		}

		const content = this.refs.reply.state.value
		if (!content) {
			Message.info('请输入评论内容')
			return
		}

		fetchCurrentUserProfile()
			.then((res) => {
				const params = {
					...this.params,
					replier: res.id,
					content,
					pid: this.state.pid,
				}
				userComment(params)
					.then(() => {
						Message.success('评论成功')
						this.refresh()
					})
			})
			.catch(() =>{
				Message.error('请先登录')
			})
	}

	renderReplyList() {
		return (
			<ul className='reply-ul' ref='ul'>
				{
					this.props.data && this.props.data.map((child, index) => {
						const { 
							replierName,
							receiverName,
							replierAvatar,
							content,
							createdAt,
							id,
						} = child
						return (
							<li className='reply-li' key={index}>
								{replierAvatar ? <Img className='avatar' src={replierAvatar} /> : <span className='avatar'>{replierName.substring(0, 1)}</span>}
								<div className='detail'>
									<div className='name'>{replierName}</div>
									<div className='content'>回复{receiverName}: {content}</div>
									<div className='footer'>
										<span className='created'>{timeAgoText(createdAt)}</span>
										<a className='footer-a' onClick={() => this.onChangeReceiver({ receiverName, pid: id })}>回复</a>
									</div>
								</div>
							</li>
						)
					})
				}
			</ul>
		)
	}

	render() {
		const { data, createdAt } = this.props
		const { visible, placeholder, submitBtnText } = this.state
		const replyWrapClassName = classname(
			'reply-wrap',
			{ hide: !visible }
		)
		return (
			<React.Fragment>
				<div className='count'>
					<i className='iconfont icon-pinglun'></i>
					<a onClick={() => this.setState({ visible: !visible })}>{data ? data.length : 0}条评论</a>
					<span className='created'>{timeAgoText(createdAt)}</span>
				</div>
				<div className={replyWrapClassName}>
					<em className='attach'></em>
					{this.renderReplyList()}
					<p className='reply-area'>
						<Input className='input-reply' placeholder={placeholder} ref='reply' onChange={this._onInputReply}/>
						<Button title={submitBtnText} type='primary' onClick={this._onReply} />
					</p>
				</div>
			</React.Fragment>
		)
	}
}