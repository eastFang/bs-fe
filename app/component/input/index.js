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
		this.setValue(event.target.value)
		this.props.onChange && this.props.onChange(event, event.target.value)
	}

	/**
	 * 暴露给父组件使用
	 * @param {值} value 
	 */
	setValue(value) {
		this.setState({
			value
		})
	}

	componentDidMount() {
		if (this.props.name && this.context.formList) {
			this.context.formList[this.props.name] = this
		}
	}
	
	getInputClass(size) {
		return classnames(
			'bs-input',
			`bs-input-${size}`,
			this.props.className
		)
	}

	render() {
		const { size, ...others } = this.props

		return <input {...others} className={this.getInputClass(size)} value={this.state.value} onChange={this._onChange} autoComplete='off'/>
	}
}

Input.propTypes = {
	size: PropTypes.oneOf(['default', 'large', 'small'])
}

Input.defaultProps = {
	size: 'default'
}

Input.contextTypes = {
	formList: PropTypes.object
}

export default Input