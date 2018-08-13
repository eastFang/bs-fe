import React from 'react'
import './index.scss'

class Field extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
  
	render() {
		return (
			<div className='field'>
				{this.props.label ? <label>{this.props.label}</label> : null}
				{this.props.children}
				<span className='note-error'>{this.props.error}</span>
				<span className='note-empty'>{this.props.empty}</span>
			</div>
		)
	}
}

export default Field