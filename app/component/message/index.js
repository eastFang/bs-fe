import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import './index.scss'

const messagePortal = document.getElementById('message')

class Message extends Component {
	constructor(props) {
		super(props)
		this.state = {
			messageList: []
		}
	}

	componentDidMount() {
		this.addMessage(this.props)
		this.reduceMessage()
	}

	componentWillReceiveProps(nextProps) {
		this.addMessage(nextProps)
		if (!this.timer) {
			this.reduceMessage()
		}
	}

	/**
	 * 消息加1
	 */
	addMessage({ type, content }) {
		const { messageList } = this.state
		messageList.push({
			type,
			content
		})
		this.setState({
			messageList
		})
	}

	/**
	 * 消息减1
	 */
	reduceMessage() {
		this.timer = setInterval(() => {
			const { messageList } = this.state
			if (messageList.length === 0) {
				clearInterval(this.timer)
				this.timer = null
			}
			messageList.shift()
			this.setState({
				messageList
			})
		}, 2000)
	}

	renderMessageItem(type, content, index, isEnter) {
		const className = classnames(
			'bs-message',
			{
				'bs-message-enter': isEnter
			}
		)
		return (
			<div className={className} key={index}>
				<i className={`iconfont icon-${type}`}></i>
				<div className='content'>{content}</div>
			</div>
		)
	}

	render() {
		const length = this.state.messageList.length
		return (
			<div className='bs-message-wrap'>
				{
					this.state.messageList.map((item, index) => {
						const isEnter = index === length - 1
						return this.renderMessageItem(item.type, item.content, index, isEnter)
					})
				}
			</div>
		)
	}
}

export default {
	success(content) {
		return ReactDOM.render(<Message content={content} type='success'/>, messagePortal)
	},
	error(content) {
		return ReactDOM.render(<Message content={content} type='error' />, messagePortal)
	},
	warning(content) {
		return ReactDOM.render(<Message content={content} type='warning' />, messagePortal)
	},
	info(content) {
		return ReactDOM.render(<Message content={content} type='info' />, messagePortal)
	}
}