import React from 'react'
import { Link } from 'react-router-dom'
import errorImg from './error.png'
import { Img } from 'aliasComponent'
import { queryStrToObj } from 'aliasUtil'
import './index.scss'

export default class extends React.Component {
	renderOperationList() {
		const { code } = queryStrToObj(this.props.location.search)
		if (+code === 403) {
			return (
				<div className='operation-list'>
					<h3>您暂时没有权限...</h3>
					<p>403</p>
					<Link to='/'>返回首页</Link>
				</div>
			)
		}

		return (
			<div className='operation-list'>
				<h3>这个页面不见了...</h3>
				<p>404</p>
				<Link to='/'>返回首页</Link>
			</div>
		)
	}

	render() {
		
		return (
			<div className='bs-error-page'>
				<Img className='error-img' src={errorImg} />
				{this.renderOperationList()}
			</div>
		)
	}
}