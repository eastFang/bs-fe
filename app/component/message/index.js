import React from 'react'
import ReactDOM from 'react-dom'
// import classnames from 'classnames'
import './index.scss'

const portalRoot = document.getElementById('portal')

const render = (type, content) => {
	const messageUI = (type) => (
		<div className='bs-message'>
			<i className={`iconfont icon-${type}`}></i>
			<div className='content'>{content}</div>
		</div>
	)
	ReactDOM.render(messageUI(type), portalRoot)
	setTimeout(() => {
		ReactDOM.unmountComponentAtNode(document.getElementById('portal'))
	}, 2000)
}

class Message {
	static success(content) {
		render('success', content)
	}

	static error(content) {
		render('error', content)
	}

	static warning(content) {
		render('warning', content)
	}

	static info(content) {
		render('info', content)
	}
}

export default Message