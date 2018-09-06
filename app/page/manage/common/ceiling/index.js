import React from 'react'
import { Link } from 'react-router-dom'
import { Img } from 'aliasComponent'
import Logo from 'aliasImage/white-logo.png'
import './index.scss'

export default class extends React.Component {
	render() {
		return (
			<div className='manage-ceiling'>
				<Link to='/'>
					<Img className='logo' src={Logo} />
				</Link>
			</div>
		)
	}
}