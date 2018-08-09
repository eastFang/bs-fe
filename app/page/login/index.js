import React from 'react'
import { Input, Button, Space, PageCommon, Message } from 'aliasComponent'
import { flyUtil } from 'aliasUtil'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this._onSubmit = this._onSubmit.bind(this)
	}

	_onSubmit(evt) {
		evt.preventDefault()
		const { username: { state: { value: name }  }, password: { state: { value: password }} } = this.refs
		flyUtil({
			url: `/api/user/login?name=${name}&password=${password}`,
			params: {},
			method: 'post'
		}).then(() => {
			this.props.history.push('/')
		}).catch((error) => {
			Message.error(error.message)
		})
	}

	render() {
		return (
			<PageCommon.Passport passportBoxTitle='账号登录'>
				<form onSubmit={this._onSubmit}>
					<Space height={24}/>
					<Input name='username' ref='username' placeholder='用户名' size='large'/>
					<Space height={24}/>
					<Input name='password' ref='password' placeholder='密码' size='large' type='password'/>
					<Space height={24}/>
					<Button type='primary' title='登录' style={{ width: '100%', height: '40px', lineHeight: '40px'}}/>
				</form>
			</PageCommon.Passport>
		)
	}
}