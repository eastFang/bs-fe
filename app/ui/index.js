import React from 'react'
import Button from './button'
import Pagination from './pagination'
import Input from './input'
import DatePicker from './datepicker'
import Ceiling from './ceiling'
import Modal from './modal'
import Message from './message'
import Upload from './upload'
import Editor from './editor'
import Table from './table'
import Select from './select'
import Textarea from './textarea'
import Radio from './radio'
import Cascader from './cascader'
import Spin from './spin'
import Row from './row'
import './index.scss'

export default class extends React.Component {

	render() {
		return (
			<div className='ui-container'>
				<Ceiling />
				<div id='button'><Button /></div>
				<div id='pagination'><Pagination /></div>
				<div id='input'><Input /></div>
				<div id='datepicker'><DatePicker /></div>
				<div id='modal'><Modal /></div>
				<div id='message'><Message /></div>
				<div id='upload'><Upload /></div>
				<div id='editor'><Editor /></div>
				<div id='table'><Table /></div>
				<div id='select'><Select /></div>
				<div id='textarea'><Textarea /></div>
				<div id='radio'><Radio /></div>
				<div id='cascader'><Cascader /></div>
				<div id='spin'><Spin /></div>
				<div id='row'><Row /></div>
			</div>
		)
	}
}