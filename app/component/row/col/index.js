// 列
import React from 'react'
import classnames from 'classnames'
import './index.scss'

class Col extends React.Component {
	getStyle() {
		const { pr, pl, va } = this.props
		const style = {}
		pr ? style.paddingRight = `${pr}px` : null
		pl ? style.paddingLeft = `${pl}px` : null
		va ? style.verticalAlign = va : null
		return style
	}
	render() {
		const className = classnames(
			`bs-col-${this.props.span}`,
			this.props.className
		)
		return (
			<div {...this.props} className={className} style={this.getStyle()}>{this.props.children}</div>
		)
	}
}

export default Col