import React from 'react'
import { 
	EgButton,
	EgPagination,
	EgInput,
	EgCeiling,
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
			</div>
		)
	}
}