import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Button from '../button'
import './index.scss'

const modalPortal = document.getElementById('modal')

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

	renderModal() {
		const {
			title,
			onOK,
		} = this.props
		return (
			<div className='bs-modal' onClick={this.close}>
				<div className='wrap' onClick={evt => evt.stopPropagation()}>
					<div className='bs-modal-header'>
						<span className='title'>{title}</span>
						<a className='close' onClick={this.close}>X</a>
					</div>
					<div className='bs-modal-body'>
						{this.props.children}
					</div>
					<div className='bs-modal-footer'>
						<Button title='关闭' onClick={this.close}/>
						{
							onOK
								? <Button title='确定' type='primary' onClick={onOK} />
								: null
						}
					</div>
				</div>
			</div>
		)
	}

	render() {
		if (!this.state.visible) return null
		return (
			ReactDOM.createPortal(this.renderModal(), modalPortal)
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

Modal.dialog = (options = {}, okFunc) => {
	const { title, content, type } = options
	const onCloseModal = () => ReactDOM.render(null, modalPortal)
	const onOkFunc = () => {
		okFunc && okFunc()
		onCloseModal()
	}
	const iconMap = {
		confirm: 'info',
		success: 'success',
		error: 'error',
	}
	const renderModal = () => (
		<div className='bs-modal' onClick={onCloseModal}>
			<div className='wrap bs-dialog-wrap' onClick={evt => evt.stopPropagation()}>
				<div className='bs-modal-dialog-body'>
					<i className={`iconfont icon-${iconMap[type]}`}></i>
					<div className='bs-modal-dialog-right'>
						<div className='title'>{title}</div>
						<div className='content'>{content}</div>
					</div>
				</div>
				<div className='bs-modal-dialog-footer'>
					<Button title='取消' onClick={onCloseModal}/>
					{
						okFunc ? <Button title='确认' type='primary' onClick={() => onOkFunc()}/> : null
					}
				</div>
			</div>
		</div>
	)
	ReactDOM.render(renderModal(), modalPortal)
}

Modal.confirm = (options, ...args) => {
	options.type = 'confirm'
	Modal.dialog(options, ...args)
}

Modal.success = (message) => {
	const options = {}
	options.title = '操作成功'
	options.content = message
	options.type = 'success'
	Modal.dialog(options)
}

Modal.error = (message) => {
	const options = {}
	options.title = '操作失败'
	options.content = message
	options.type = 'error'
	Modal.dialog(options)
}

export default Modal