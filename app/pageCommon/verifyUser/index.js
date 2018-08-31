import React from 'react'
import { Redirect } from 'react-router-dom'
import { fetchCurrentUserProfile } from 'aliasServer/user'
import WhiteList from './whiteList'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLogin: null,
		}
	}

	componentWillMount() {
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

	render() {
		const { isLogin } = this.state
		if (isLogin === null) {
			return null
		} else if (isLogin === false 
			&& location.pathname !== '/login'
			&& !WhiteList.some((urlReg) => urlReg.test(location.pathname))
		) {
			return <Redirect from={location.pathname} to='/login' />
		} else {
			return null
		}
	}
}