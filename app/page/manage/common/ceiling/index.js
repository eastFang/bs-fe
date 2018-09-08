import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Img } from 'aliasComponent'
import { logout } from 'aliasServer/user'
import Logo from 'aliasImage/white-logo.png'
import './index.scss'

class Ceiling extends React.Component {
	constructor(props) {
		super(props)
		this._onLogout = this._onLogout.bind(this)
	}

	_onLogout() {
		logout()
			.then(() => location.href = '/')
	}

	render() {
		const { name, avatar } = this.props.userInfo
		return (
			<div className='manage-ceiling'>
				<Link to='/'>
					<Img className='logo' src={Logo} />
				</Link>
				<span className='user-info'>
					<Img className='avatar' src={avatar}/>
					<span className='name'>{name}</span>
					<ul className='operation-list'>
						<li>
							<Link to='/userCenter'>个人中心</Link>
						</li>
						<li>
							<a onClick={this._onLogout}>退出登录</a>
						</li>
					</ul>
				</span>
			</div>
		)
	}
}

export default connect(state => {
	return {
		userInfo: state.userReducer.userInfo
	}
}, null)(Ceiling)