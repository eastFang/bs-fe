import React from 'react'
import { Message, Button } from 'aliasComponent'

export default class extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<React.Fragment>
				<h3>消息</h3>
				<Button title='消息成功提示' onClick={() => Message.success('成功提示')}/>
				<Button title='消息警告提示' onClick={() => Message.warning('警告提示')}/>
				<Button title='消息错误提示' onClick={() => Message.error('错误提示')}/>
				<Button title='消息温馨提示' onClick={() => Message.info('温馨提示')}/>
			</React.Fragment>
		)
	}
}