import React from 'react'
import { 
	EgButton,
	EgPagination,
	EgInput,
	EgCeiling,
	EgDatePicker,
	EgModal,
	EgMessage,
	EgUpload,
	EgEditor,
	EgTable,
	EgSelect,
	EgTextarea,
	EgRadio,
} from './egs'
import './index.scss'

export default class extends React.Component {

	render() {
		return (
			<div className='ui-container'>
				<EgCeiling />
				<div id='button'><EgButton /></div>
				<div id='pagination'><EgPagination /></div>
				<div id='input'><EgInput /></div>
				<div id='datepicker'><EgDatePicker /></div>
				<div id='modal'><EgModal /></div>
				<div id='message'><EgMessage /></div>
				<div id='upload'><EgUpload /></div>
				<div id='editor'><EgEditor /></div>
				<div id='table'><EgTable /></div>
				<div id='select'><EgSelect /></div>
				<div id='textarea'><EgTextarea /></div>
				<div id='radio'><EgRadio /></div>
			</div>
		)
	}
}