import React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './index.scss'

/** 
 * 按钮
 */
class Button extends React.Component {
	getBtnClass(type, size) {
		return classnames(
			'bs-btn',
			`bs-btn-${type}`,
			`bs-btn-size-${size}`,
			this.props.className
		)
	}

	render() {
		const {
			type,
			title,
			size,
			href,
			className,
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

Button.propTypes = {
	type: PropTypes.oneOf(['default', 'primary', 'dashed', 'danger']),
	title: PropTypes.string,
	size: PropTypes.oneOf(['default', 'large', 'small']),
	href: PropTypes.string,
}

Button.defaultProps = {
	type: 'default',
	title: 'default',
	size: 'default'
}

export default Button