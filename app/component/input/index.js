import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import './index.scss'

class Input extends React.Component {

	getInputClass(size) {
		return classnames(
			'bs-input',
			`bs-input-${size}`
		)
	}

	render() {
		const { size, ...others } = this.props

		return <input className={this.getInputClass(size)} {...others} />
	}
}

Input.propTypes = {
	size: PropTypes.oneOf(['default', 'large', 'small'])
}

Input.defaultProps = {
	size: 'default'
}

export default Input