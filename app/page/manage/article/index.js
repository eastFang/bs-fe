import React from 'react'
import { PageCommon } from 'aliasComponent'
import Menu from '../menu'

export default class extends React.Component {
	render() {
		return (
			<React.Fragment>
				<PageCommon.Ceiling />
				<Menu />
			</React.Fragment>
		)
	}
}