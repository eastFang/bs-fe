import React from 'react'
import { Link } from 'react-router-dom'
import errorImg from './error.png'
import { Img } from 'aliasComponent'
import './index.scss'

export default class extends React.Component {
	render() {
		return (
			<div className='bs-error-page'>
				<Img class='error-img' src={errorImg} />
				<div className='operation-list'>
					<h3>这个页面不见了...</h3>
					<p>404</p>
					<Link to='/'>返回首页</Link>
				</div>
			</div>
		)
	}
}