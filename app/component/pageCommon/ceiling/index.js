import React from 'react'
import { Link } from 'react-router-dom'
import { flyUtil } from 'aliasUtil'
import './index.scss'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userInfo: null,
		}
	}

	fetchUserInfo() {
		flyUtil({ url: '/api/user/profile' })
			.then((res) => {
				this.setState({
					userInfo: res
				})
			})
	}

	componentDidMount() {
		this.fetchUserInfo()
	}

	/**
	 * 游客用户 可操作入口
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
				<a>退出登录</a>
				<Link to='/ui'>组件库</Link>
			</React.Fragment>
		)
	}

	render() {
		return (
			<div className='ceiling-wrap'>
				<div className='left-area'>
					{this.state.userInfo && this.state.userInfo.nickName } 你好! 欢迎来到hardEast博客
				</div>
				<div className='right-area'>
					{this.state.userInfo ? this.renderSystemUserOperation() : this.renderVistorOperation()}
				</div>
			</div>
		)
	}
}