import React from 'react'
import PropTypes from 'prop-types'
import RadioItem from './radioItem'
import { randomStr } from 'aliasUtil'

class Radio extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: props.value
		}
		this.onChange = this.onChange.bind(this)
	}

	componentDidMount() {
		if (this.props.name && this.context.formList) {
			this.context.formList[this.props.name] = this
		}
	}

	onChange(value) {
		this.setState({
			value,
		})
		this.props.onChange && this.props.onChange(value)
	}

	render() {
		const defaultName = randomStr(5)
		return React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child, {
				checkedValue: this.props.value,
				name: this.props.name || defaultName,
				onChange: this.onChange
			})
		})
	}
}

Radio.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	onChange: PropTypes.func,
}

Radio.contextTypes = {
	formList: PropTypes.object,
}

Radio.RadioItem = RadioItem

export default Radio