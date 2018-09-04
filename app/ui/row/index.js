import React from 'react'
import { Row, Col } from 'aliasComponent'

export default class extends React.Component {
	render() {
		return (
			<React.Fragment>
				<h3>行</h3>
				<Row width={1200} center={1}>
					<Col span={1}>col-1</Col>
					<Col span={3}>col-3</Col>
					<Col span={20}>col-20</Col>
				</Row>
			</React.Fragment>
		)
	}
}