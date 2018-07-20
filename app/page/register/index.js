import React from 'react'
import { Input, Button, Space, PageCommon } from 'aliasComponent'

export default class extends React.Component {
	render() {
		return (
			<PageCommon.Passport passportBoxTitle='账号注册'>
				<form>
					<Space height={24}/>
					<Input size='large' placeholder='用户名'/>
					<Space height={24} />
					<Input size='large'placeholder='密码'/>
					<Space height={24} />
					<Button type='primary' title='立即注册' style={{ width: '100%', height: '48px', lineHeight: '48px'}}/>
				</form>
			</PageCommon.Passport>
		)
	}
}