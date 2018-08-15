import React from 'react'
import { Form, Input, Button } from 'aliasComponent'

export default class extends React.Component {
	render() {
		return (
			<Form>
				<Form.Field 
					label='label'
					error='请输入5到16位'
					empty='不得为空'
					pattern='\d{5,16}'
					name='username'
					required>
					<Input placeholder='请输入' />
				</Form.Field>
				<Button type='primary' title='提交'/>
			</Form>
		)
	}
}