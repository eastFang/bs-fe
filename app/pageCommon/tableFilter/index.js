import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import { Form, Input, Button, DatePicker } from 'aliasComponent'
import { queryStrToObj } from 'aliasUtil'
import './index.scss'

class TableFilter extends React.Component {
	constructor(props) {
		super(props)
		this._onReset = this._onReset.bind(this)
		this._onSubmit = this._onSubmit.bind(this)
	}

	_onReset() {
		this.props.history.push(this.props.location.pathname)
	}

	_onSubmit(evt, data) {
		let search = '?'
		for(let item in data) {
			search += `${item}=${data[item]}&`
		}
		this.props.history.push(this.props.location.pathname + search)
	}

	renderSearchField(type, value, placeholder) {
		if (type === 'datepicker') {
			return <DatePicker />
		}
		return <Input placeholder={placeholder} value={value}/>
	}

	render() {
		const query = queryStrToObj(this.props.location.search)
		const { fields = [] } = this.props
		return (
			<div className='page-common-table-filter'>
				<Form onSubmit={this._onSubmit}>
					{
						fields.map((field, index) => {
							const { searchName, labelName, placeholder = labelName, type } = field
							return (
								<Form.Field className='table-filter-field' label={labelName} name={searchName} key={index}>
									{this.renderSearchField(type, query[searchName], placeholder)}
								</Form.Field>
							)
						})
					}
					<span className='table-filter-button'>
						<Button title='搜索' type='primary' />
						<Button title='重置' onClick={this._onReset} />
					</span>
				</Form>
			</div>
		)
	}
}

export default withRouter(TableFilter)