import React from 'react'
import Field from './field'
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
		const filedList = {}
		React.Children.forEach(this.props.children, (child) => {
			const fieldName = child.props.name
			if (fieldName) {
				const { empty, error, pattern } = child.props
				filedList[fieldName] = { 
					value: this.state.formList[fieldName].state.value,
					empty,
					error,
					pattern
				}
			}
		})
		this.props.onSubmit && this.props.onSubmit()
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