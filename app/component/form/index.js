import React from 'react'
import Field from './field'

class Form extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}
		this._onSubmit = this._onSubmit.bind(this)
	}
  
	_onSubmit(evt) {
		evt.preventDefault()
	}

	render() {
		React.Children.forEach(this.props.children, (item) => {
			console.log(item)
		})
		return (
			<form onSubmit={this._onSubmit}>
				{this.props.children}
			</form>
		)
	}
}

Form.Field = Field

export default Form