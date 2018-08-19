import React from 'react'
import classnames from 'classnames'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this._onClick = this._onClick.bind(this)
	}

	_onClick() {
		const { onToggleOptionalList, setSelectedVal, children, value } = this.props
		onToggleOptionalList()
		setSelectedVal(children, value)
	}

	render() {
		const className = classnames(
			{
				selected: this.props.currentSelectedVal === this.props.children
			}
		)
		return (
			<li className={className} onClick={this._onClick}>
				{this.props.children}
			</li>
		)
	}
}