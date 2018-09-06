import React from 'react'
import Menu from '../menu'
import Ceiling from '../ceiling'
import './index.scss'

export default class extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Ceiling />
				<div className='manage-left-menu'>
					<Menu />
				</div>
				<div className='manage-right-content'>
					{this.props.children}
				</div>
			</React.Fragment>
		)
	}
}