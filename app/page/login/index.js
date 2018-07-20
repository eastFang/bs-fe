import React from 'react'
import { Input, Button, Space, PageCommon } from 'aliasComponent'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this._onSubmit = this._onSubmit.bind(this)
	}

	_onSubmit(evt) {
		evt.preventDefault()
		this.props.history.push('/ui')
	}

	render() {
		return (
			<PageCommon.Passport passportBoxTitle='账号登录'>
				<form onSubmit={this._onSubmit}>
					<Space height={24}/>
					<Input name='username' placeholder='用户名' size='large'/>
					<Space height={24}/>
					<Input name='password' placeholder='密码' size='large' type='password'/>
					<Space height={24}/>
					<Button type='primary' title='登录' style={{ width: '100%', height: '48px', lineHeight: '48px'}}/>
				</form>
			</PageCommon.Passport>
		)
	}
}