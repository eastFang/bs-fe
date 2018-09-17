import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Option from './option'
import './index.scss'

const selectRoot = document.getElementById('select')

class Select extends React.Component {
	constructor(props) {
		super(props)
		const valueList = []
		const optionalList = []
		const defaultValue = props.value
		React.Children.forEach(this.props.children, (child) => {
			optionalList.push(child.props.children)
			if (child.props.value) {
				valueList.push(child.props.value.toString())
			}
		})
		let selected = optionalList[0] || '请选择'
		let value = valueList[0] || null
		// 初始化
		if (defaultValue) {
			value = defaultValue
			selected = optionalList[valueList.indexOf(defaultValue)]
		}
		this.state = {
			isOpen: false, // optionlist 是否打开,
			selected,
			value,
		}
		this.showAreaRef = React.createRef()
		this._onToggleOptionalList = this._onToggleOptionalList.bind(this)
	}

	componentDidMount() {
		const rect = ReactDOM.findDOMNode(this.showAreaRef.current).getBoundingClientRect()
		const { width, top, left, height } = rect
		const { scrollTop } = document.documentElement
		this.showAreaDomStyle = {
			width: `${width}px`,
			top: `${scrollTop + top + height + 5}px`,
			left: `${left}px`,
		}
		if (this.context.formList && this.props.name) {
			this.context.formList[this.props.name] = this
		}
	}

	_onToggleOptionalList() {
		this.setState({
			isOpen: !this.state.isOpen
		}, () => {
			if (this.state.isOpen) {
				this.refs.select.focus()
			}
		})
	}

	onBlurCloseOptionList() {
		this.setState({
			isOpen: false,
		})
		return false
	}

	providerChildrenProps() {
		const onToggleOptionalList = this._onToggleOptionalList
		const currentSelectedVal = this.state.selected
		const setSelectedVal = (childVal, propVal) => {
			this.setState({ selected: childVal, value: propVal })
		}
		return { onToggleOptionalList, setSelectedVal, currentSelectedVal }
	}

	renderShowArea() {
		const { isOpen, selected } = this.state
		const iconClass = classnames(
			'iconfont',
			'pull-right',
			isOpen ? 'icon-up': 'icon-down'
		)
		return (
			<div className='bs-select-showarea' onClick={this._onToggleOptionalList} ref={this.showAreaRef} onMouseDown={evt => evt.preventDefault()}>
				{selected}
				<i className={iconClass}></i>
			</div>
		)
	}

	renderOptionalList() {
		if (!this.state.isOpen) {
			return null
		}
		
		const optionsList = (
			<ul style={this.showAreaDomStyle} className='bs-select-optionallist' ref='select' tabIndex='0' onBlur={() => this.onBlurCloseOptionList()}>
				{
					React.Children.map(this.props.children, (child) => {
						return React.cloneElement(child, this.providerChildrenProps())
					})
				}
			</ul>
		)
		return ReactDOM.createPortal(optionsList, selectRoot)
	}

	render() {
		return (
			<div className='bs-select'>
				{this.renderShowArea()}
				{this.renderOptionalList()}
			</div>
		)
	}
}

Select.contextTypes = {
	formList: PropTypes.object
}

Select.Option = Option

export default Select