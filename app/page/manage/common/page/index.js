import React from 'react'
import { PageCommonCeiling } from 'aliasPageCommon'
import Menu from '../menu'
import './index.scss'

export default class extends React.Component {
	render() {
		return (
			<React.Fragment>
				<PageCommonCeiling />
				<Menu />
				<div className='manage-wrap'>
					{this.props.children}
				</div>
			</React.Fragment>
		)
	}
}