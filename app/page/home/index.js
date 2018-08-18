import React from 'react'
import { Link } from 'react-router-dom'
import { PageCommon, Space } from 'aliasComponent'
import './index.scss'
import Avatar from './avatar.jpeg'

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
				<PageCommon.Ceiling />
				<Space height={24} />
				<img src={Avatar} />
			</React.Fragment>
		)
	}
}