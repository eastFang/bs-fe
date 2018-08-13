import React from 'react'
import { Link } from 'react-router-dom'
import { PageCommon } from 'aliasComponent'
import './index.scss'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: null
		}
	}

	render() {
		return (
			<React.Fragment>
				<PageCommon.Ceiling history={this.props.history} />
			</React.Fragment>
		)
	}
}