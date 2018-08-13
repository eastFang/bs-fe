import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import './index.scss'

class Input extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: props.value || ''
		}
		this._onChange = this._onChange.bind(this)
	}

	_onChange(event) {
		this.setState({
			value: event.target.value
		})
		this.props.onChange && this.props.onChange()
	}

	getInputClass(size) {
		return classnames(
			'bs-input',
			`bs-input-${size}`
		)
	}

	render() {
		const { size, ...others } = this.props

		return <input className={this.getInputClass(size)} {...others} value={this.state.value} onChange={this._onChange}/>
	}
}

Input.propTypes = {
	size: PropTypes.oneOf(['default', 'large', 'small'])
}

Input.defaultProps = {
	size: 'default'
}

export default Input