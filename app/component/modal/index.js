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
			visible: props.defaultVisible || false,
		}
		this.close = this.close.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.visible && !this.state.visible) {
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

	onOK(evt) {
		this.props.onOK && this.props.onOK(evt)
	}

	renderModal() {
		const {
			title,
			onOK,
			noFooter,
		} = this.props
		return (
			<div className={this.getClass()} onClick={this.close}>
				<div className='wrap' onClick={evt => evt.stopPropagation()}>
					<div className='bs-modal-header'>
						<span className='title'>{title}</span>
						<a className='close' onClick={this.close}>X</a>
					</div>
					<div className='bs-modal-body'>
						{this.props.children}
					</div>
					{
						noFooter
							? null
							: <div className='bs-modal-footer'>
								<Button title='关闭' onClick={this.close}/>
								{
									onOK
										? <Button title='确定' type='primary' onClick={this.onOK.bind(this)} />
										: null
								}
							</div>
					}
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
	defaultVisible: PropTypes.bool,
	title: PropTypes.string,
	onOK: PropTypes.func,
}

Modal.defaultProps = {
	title: '弹框标题',
}

export default Modal