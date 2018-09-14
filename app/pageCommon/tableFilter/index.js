import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import { Form, Input, Button } from 'aliasComponent'
import { queryStrToObj } from 'aliasUtil'
import './index.scss'

class TableFilter extends React.Component {
	constructor(props) {
		super(props)
		this._onReset = this._onReset.bind(this)
	}

	_onReset() {
		this.props.history.push(this.props.location.pathname)
	}

	render() {
		const query = queryStrToObj(this.props.location.search)
		const { fields = [] } = this.props
		return (
			<div className='page-common-table-filter'>
				<Form onSubmit={() => ReactDOM.findDOMNode(this.refs.form).submit()} ref='form'>
					{
						fields.map((field, index) => {
							const { searchName, labelName, placeholder = labelName } = field
							return (
								<Form.Field className='table-filter-field' label={labelName} name={searchName} key={index}>
									<Input placeholder={placeholder} value={query[searchName]}/>
								</Form.Field>
							)
						})
					}
					<Form.Field className='table-filter-button'>
						<Button title='搜索' type='primary' />
						<Button title='重置' onClick={this._onReset} />
					</Form.Field>
				</Form>
			</div>
		)
	}
}

export default withRouter(TableFilter)