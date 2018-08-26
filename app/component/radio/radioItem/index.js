import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

class RadioItem extends React.Component {
	constructor(props) {
		super(props)
		this._onChange = this._onChange.bind(this)
	}

	_onChange(evt) {
		const value = evt.target.value
		this.props.onChange && this.props.onChange(value)
	}

	render() {
		return (
			<label className='radio-label'><input type='radio'
				name={this.props.name}
				value={this.props.value}
				onChange={this._onChange}
				defaultChecked={this.props.checkedValue == this.props.value}
			/>{this.props.children}</label>
		)
	}
}

RadioItem.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	onChange: PropTypes.func,
}

export default RadioItem