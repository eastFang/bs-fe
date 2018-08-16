import React from 'react'
import { PageCommon } from 'aliasComponent'
import Menu from '../menu'
import './index.scss'

export default class extends React.Component {
	render() {
		return (
			<React.Fragment>
				<PageCommon.Ceiling />
				<Menu />
				<div className='manage-wrap'>
					{this.props.children}
				</div>
			</React.Fragment>
		)
	}
}