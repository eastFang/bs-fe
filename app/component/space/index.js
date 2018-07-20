import React from 'react'

export default class extends React.Component {
	render() {
		const { backgroundColor = 'transparent' } = this.props
		return (
			<div style={{ height: `${this.props.height}px`, backgroundColor }}></div>
		)
	}
}