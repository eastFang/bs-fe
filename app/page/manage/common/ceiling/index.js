import React from 'react'
import { Img } from 'aliasComponent'
import Logo from 'aliasImage/white-logo.png'
import './index.scss'

export default class extends React.Component {
	render() {
		return (
			<div className='manage-ceiling'>
				<Img className='logo' src={Logo} />
			</div>
		)
	}
}