import React from 'react'
import { Link } from 'react-router-dom'
import menuList from './data'
import './index.scss'

export default class extends React.Component {
	render() {
		return (
			<ul className='manage-menu-ul'>
				{
					menuList && menuList.map((menu, index) => {
						const { url, value, icon } = menu
						return (
							<li key={index} className={url === location.pathname ? 'active' : ''}>
								<Link to={url}>
									<i className={`iconfont icon-${icon}`}></i>
									<span>{value}</span>
								</Link>
							</li>
						)
					})
				}
			</ul>
		)
	}
}