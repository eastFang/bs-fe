import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { flyUtil } from 'aliasUtil'
import WhiteLogo from 'aliasImage/white-logo.png'
import WhiteList from './whiteList'
import './index.scss'

class Ceiling extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userInfo: null,
		}
		this._onLogout = this._onLogout.bind(this)
	}

	fetchUserInfo() {
		flyUtil({ url: '/api/user/profile' })
			.then((res) => {
				this.setState({
					userInfo: res
				})
			})
			.catch(() => {
				const isGolbalPage = WhiteList.some((urlReg) => urlReg.test(this.props.location.pathname))
				if (!isGolbalPage) {
					this.props.history.push('/login')
				}
			})
	}

	componentDidMount() {
		this.fetchUserInfo()
	}

	_onLogout() {
		console.log(this.props)
		// this.props.history.pushState('/')
		// flyUtil({ url: '/api/user/logout', method: 'post' })
		// 	.then(() => {
		// 		this.props.history.pushState('/')
		// 	})
	}

	/**
	 * 游客 可操作入口
	 */
	renderVistorOperation() {
		return (
			<React.Fragment>
				<Link to='/login'>登录</Link>
				<Link to='/register'>注册</Link>
			</React.Fragment>
		)
	}
	
	/**
	 * 系统用户 可操作入口
	 */
	renderSystemUserOperation() {
		return (
			<React.Fragment>
				<Link to='/category'>管理中心</Link>
				<Link to='/userCenter'>个人中心</Link>
				<a onClick={this._onLogout}>退出</a>
				<Link to='/ui'>组件库</Link>
			</React.Fragment>
		)
	}

	render() {
		return (
			<div className='ceiling-wrap'>
				<div className='left-area'>
					<Link to='/'>
						<img className='logo' src={WhiteLogo} />
					</Link>
				</div>
				<div className='right-area'>
					{this.state.userInfo ? this.renderSystemUserOperation() : this.renderVistorOperation()}
				</div>
			</div>
		)
	}
}

export default withRouter(Ceiling)