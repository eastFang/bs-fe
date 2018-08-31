import React from 'react'
import { Redirect } from 'react-router-dom'
import { fetchCurrentUserProfile } from 'aliasServer/user'
import { connect } from 'react-redux'
import WhiteList from './whiteList'

const mapDispatchToProps = (dispatch) => {
	return {
		getUserInfo(userInfo) {
			dispatch({ type: 'getUserInfo', payload: { userInfo } })
		}
	}
}

// 需要展示用户信息 || 必须登录才能访问的页面需要经过该高阶组件
export default Comp => connect(null, mapDispatchToProps)(
	class VerifyUser extends React.Component {
		constructor(props) {
			super(props)
			this.state = {
				isLogin: null,
			}
		}
	
		componentWillMount() {
			this.getCurrentUserInfo()
		}
	
		getCurrentUserInfo() {
			fetchCurrentUserProfile()
				.then((res) => {
					this.props.getUserInfo(res)
					this.setState({
						isLogin: true
					})
				})
				.catch(() => {
					this.setState({
						isLogin: false
					})
				})
		}
		
		/**
		 * 跳回登陆页的条件
		 * 1. 非登录状态
		 * 2. 当前非处于登录页
		 * 3. 非白名单路径
		 */
		render() {
			const { isLogin } = this.state
			if (isLogin === null) {
				return null
			} else if (isLogin === false // 获取用户接口返回未登陆状态
				&& location.pathname !== '/login' // 非登录页
				&& !WhiteList.some((urlReg) => urlReg.test(location.pathname)) // 非白名单之列
			) {
				return <Redirect from={location.pathname} to='/login' />
			} else {
				return <Comp {...this.props}/>
			}
		}
	}
)
