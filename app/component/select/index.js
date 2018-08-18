import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import Option from './option'
import './index.scss'

const portalRoot = document.getElementById('portal')

class Select extends React.Component {
	constructor(props) {
		super(props)
		const optionalList = React.Children.map(this.props.children, (child) => child.props.children)
		const selected = optionalList ? optionalList[0] : '请选择'
		this.state = {
			isOpen: false, // optionlist 是否打开,
			selected
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
	}

	_onToggleOptionalList() {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	providerChildrenProps() {
		const onToggleOptionalList = this._onToggleOptionalList
		const currentSelectedVal = this.state.selected
		const setSelectedVal = (childVal) => {
			this.setState({ selected: childVal })
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
			<div className='bs-select-showarea' onClick={this._onToggleOptionalList} ref={this.showAreaRef}>
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
			<ul style={this.showAreaDomStyle} className='bs-select-optionallist'>
				{
					React.Children.map(this.props.children, (child) => {
						return React.cloneElement(child, this.providerChildrenProps())
					})
				}
			</ul>
		)
		return ReactDOM.createPortal(optionsList, portalRoot)
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

Select.Option = Option

export default Select