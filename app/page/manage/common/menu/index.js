import React from 'react'
import { Img } from 'aliasComponent'
import { Link } from 'react-router-dom'
import menuList from './data'
import Logo from 'aliasImage/white-logo.png'
import './index.scss'

export default class extends React.Component {
	render() {
		return (
			<ul className='manage-menu-ul'>
				{
					menuList && menuList.map((menu, index) => {
						const { url, value } = menu
						return (
							<li key={index}>
								<Link to={url}>
									<span className={url === location.pathname ? 'active' : ''}>{value}</span>
								</Link>
							</li>
						)
					})
				}
			</ul>
		)
	}
}