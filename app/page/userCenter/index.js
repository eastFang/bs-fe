import React from 'react'
import { flyUtil } from 'aliasUtil'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userFullInfo: ''
		}
	}
  
	fetchUserFullInfo() {
		flyUtil({ url: '/api/user/profile' })
			.then((res) => {
				this.setState({
					userFullInfo: res
				})
			})
	}
  
	componentDidMount() {
		this.fetchUserFullInfo()
	}

	render() {
		if (!this.state.userFullInfo) {
			return null
		}
		const { nickName } = this.state.userFullInfo

		return (
			<div className='center-wrap'>
				<p>{nickName}</p>
			</div>
		)
	}
}