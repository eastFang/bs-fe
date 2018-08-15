import React from 'react'
import classnames from 'classnames'
import './index.scss'

class Field extends React.Component {
	constructor(props) {
		super(props)
	}

	// showError() {
	// 	// this.setState({
	// 	// 	error: true,
	// 	// })
	// 	Message.error(this.props.error)
	// }

	// showEmpty() {
	// 	// this.setState({
	// 	// 	empty: false,
	// 	// })
	// 	Message.error(this.props.empty)
	// }

	getClassName() {
		return classnames(
			'field',
		)
	}
  
	render() {
		return (
			<div className={this.getClassName()}>
				{this.props.label && <label>{this.props.label}</label>}
				{
					React.Children.map(this.props.children, (child) => {
						return React.cloneElement(child, {
							name: this.props.name
						})
					})
				}
				<span className='note-error'>{this.props.error}</span>
				<span className='note-empty'>{this.props.empty}</span>
			</div>
		)
	}
}

export default Field