import React from 'react'
import Field from './field'
import Message from '../message'
import PropTypes from 'prop-types'

class Form extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			formList: {}
		}
		this._onSubmit = this._onSubmit.bind(this)
	}
	
	getChildContext() {
		return { formList: this.state.formList }
	}
	
	_onSubmit(evt) {
		evt.preventDefault()
		const filedList = []
		React.Children.map(this.props.children, (child) => {
			const fieldName = child.props.name
			if (fieldName) {
				const { empty, error, pattern, required } = child.props
				filedList.push({ 
					value: this.state.formList[fieldName].state.value,
					empty,
					error,
					pattern: new RegExp(pattern),
					required,
					name: fieldName,
				})
			}
		})
		let index = 0
		const formData = {}
		for(let field of filedList) {
			const { required, empty, pattern, value, error, name } = field
			if (required && !value) {
				Message.error(empty)
				break
			}
			if (value && pattern && !pattern.test(value)) {
				Message.error(error)
				break
			}
			index ++
			formData[name] = value
		}
		if (index === filedList.length) {
			this.props.onSubmit && this.props.onSubmit(evt, formData)
		}
	}

	render() {
		return (
			<form onSubmit={this._onSubmit}>
				{
					this.props.children	
				}
			</form>
		)
	}
}

Form.childContextTypes = {
	formList: PropTypes.object
}

Form.Field = Field

export default Form