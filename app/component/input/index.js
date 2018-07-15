import React from 'react'
import classnames from 'classnames'
import './index.scss'

export default class extends React.Component {

	getInputClass(size) {
		return classnames(
			'input',
			`input-${size}`
		)
	}

	render() {
		const { size = 'default', ...others } = this.props

		return <input className={this.getInputClass(size)} {...others}/>
	}
}