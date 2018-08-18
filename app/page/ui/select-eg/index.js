import React from 'react'
import { Select } from 'aliasComponent'

export default class extends React.Component {
	render() {
		return (
			<React.Fragment>
				<h3>选择框</h3>
				<Select>
					<Select.Option>2</Select.Option>
					<Select.Option>3</Select.Option>
				</Select>
			</React.Fragment>
		)
	}
}