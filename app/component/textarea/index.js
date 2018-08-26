import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import './index.scss'

class Textarea extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: props.value || ''
		}
		this._onChange = this._onChange.bind(this)
	}
  
	componentDidMount() {
		if (this.props.name && this.context.formList) {
			this.context.formList[this.props.name] = this
		}
	}

	_onChange(evt) {
		this.setState({
			value: evt.target.value
		})
	}

	render() {
		const className = classnames(
			'bs-textarea',
			this.props.className
		)
		return (
			<textarea {...this.props} className={className} value={this.state.value} onChange={this._onChange}></textarea>
		)
	}
}

Textarea.contextTypes = {
	formList: PropTypes.object
}

export default Textarea