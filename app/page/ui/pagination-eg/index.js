import React from 'react'
import { Pagination } from 'aliasComponent'

export default class extends React.Component {
	render() {
		return (
			<React.Fragment>
				<h3>分页器</h3>
				<Pagination total={700} />
			</React.Fragment>
		)
	}
}