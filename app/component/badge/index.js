import React from 'react'
import './index.scss'

class Badge extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			count: props.count || 0
		}
	}

	render() {
		return (
			<span className='bs-badge'>
				{this.props.children}
				<em className='corner'>{this.state.count}</em>
			</span>
		)
	}
}

export default Badge