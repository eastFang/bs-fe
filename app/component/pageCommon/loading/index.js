import React from 'react'
import loadingImg from './loading.gif'
import './index.scss'

export default class extends React.Component {
	render() {
		return (
			<div className='loading-wrap'>
				<img src={loadingImg} />
			</div>
		)
	}
}