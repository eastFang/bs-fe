import React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import './index.scss'

/** 
 * 按钮
 */
export default class extends React.Component {
	getBtnClass(type, size) {
		return classnames(
			'btn',
			`btn-${type}`,
			`btn-size-${size}`
		)
	}

	render() {
		const {
			type = 'default',
			title = 'default',
			size = 'default',
			href,
			...others
		} = this.props
		const btnClass = this.getBtnClass(type, size)

		const PureBtn = <button className={btnClass} {...others}>{title}</button>
		if (!href) {
			return PureBtn
		} 
		return <Link to={href}>{PureBtn}</Link>
	}
}