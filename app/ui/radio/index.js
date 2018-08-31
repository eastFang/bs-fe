import React from 'react'
import { Radio } from 'aliasComponent'

export default class extends React.Component {
	render() {
		return (
			<React.Fragment>
				<h3>单选框</h3>
				<Radio value={2}>
					<Radio.RadioItem value={1}>男</Radio.RadioItem>
					<Radio.RadioItem value={2}>女</Radio.RadioItem>
					<Radio.RadioItem value={3}>保密</Radio.RadioItem>
				</Radio>
			</React.Fragment>
		)
	}
}