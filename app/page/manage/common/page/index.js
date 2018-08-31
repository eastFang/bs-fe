import React from 'react'
import { Ceiling } from 'aliasPageCommon'
import Menu from '../menu'
import './index.scss'

export default class extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Ceiling />
				<Menu />
				<div className='manage-wrap'>
					{this.props.children}
				</div>
			</React.Fragment>
		)
	}
}