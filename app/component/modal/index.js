import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Button from '../button'
import './index.scss'

const portalRoot = document.getElementById('portal')

class Modal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: props.visible,
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.visible) {
			this.show()
		}
	}

	show() {
		document.getElementsByTagName('body')[0].style.overflow = 'hidden'
		this.setState({
			visible: true
		})
	}

	close() {
		document.getElementsByTagName('body')[0].style.overflow = 'auto'
		this.setState({
			visible: false
		})
	}
  
	getClass() {
		return classnames(
			'bs-modal',
		)
	}

	renderModal() {
		return (
			<div className={this.getClass()}>
				<div className='wrap'>
					<div className='bs-modal-header'>
						<span className='title'>弹框标题</span>
						<a className='close' onClick={this.close.bind(this)}>X</a>
					</div>
					<div className='bs-modal-body'>
						{this.props.children}
					</div>
					<div className='bs-modal-footer'>
						<Button title='关闭' onClick={this.close.bind(this)}/>
					</div>
				</div>
			</div>
		)
	}

	render() {
		if (!this.state.visible) return null

		return (
			ReactDOM.createPortal(this.renderModal(), portalRoot)
		)
	}
}

Modal.propTypes = {
	visible: PropTypes.bool,
	children: PropTypes.element
}

export default Modal