import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './index.scss'

class Modal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
		}
	}
  
	show() {
		this.setState({
			visible: true
		})
	}
  
	getClass() {
		return classnames(
			'bs-modal',
			{
				hide: !this.state.visible
			}
		)
	}

	render() {
		return (
			<div className={this.getClass()}>
				<div className='mask'></div>
				<div className='wrap'>
				</div>
			</div>
		)
	}
}

export default Modal