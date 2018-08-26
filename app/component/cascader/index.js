import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { flyUtil } from 'aliasUtil'
import { cloneDeep } from 'lodash'
import './index.scss'

class Cascader extends React.Component {
	constructor(props) {
		super(props)
		this.maxLevel = props.level || 3
		const initFullList = []
		for(let i = 0; i < this.maxLevel; i++) {
			initFullList.push([])
		}
		this.state = {
			isOpen: false, // optionlist是否打开
			fullList: initFullList,
			value: props.value || null,
		}
		this.tempValue = []
		this._onToggleOptionList = this._onToggleOptionList.bind(this)
	}

	componentDidMount() {
		if (this.props.name && this.context.formList) {
			this.context.formList[this.props.name] = this
		}
	}
  
	_onToggleOptionList() {
		if (!this.state.isOpen) {
			this.fetchDataByLevel()
		}
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	_onClickOptionItem(item) {
		const { id, level } = item
		const levelList = this.state.fullList[level]
		for(let i = 0; i < levelList.length; i++) {
			if (id === levelList[i].id && level === levelList[i].level) {
				this.tempValue[level] = levelList[i]
				break
			}
		}
		
		this.fetchDataByLevel(id, level)
	}

	fetchDataByLevel(pid = 0, level) {
		if (level === this.maxLevel - 1) {
			this.setState({
				value: cloneDeep(this.tempValue),
				isOpen: false,
			})
			return
		}
		return flyUtil({ url: `/api/address/${pid}/children` })
			.then((res) => {
				const { fullList } = this.state
				if (!res.length) {
					// 清空下级地址
					for(let i = 0; i < this.state.value.length - 1 - level; i++) {
						this.tempValue.pop()
						fullList[fullList.length - i - 1] = []
					}
					this.setState({
						isOpen: false,
						fullList,
						value: cloneDeep(this.tempValue),
					})
					return
				}
				fullList[res[0].level] = res
				if (level === undefined) {
					for(let i = 0; i < this.maxLevel - 1; i++) {
						fullList[fullList.length - i - 1] = []
					}
				}
				this.setState({
					fullList,
				})
			})
	}

	renderShowArea() {
		const iconClassName = classnames(
			'iconfont',
			'pull-right',
			this.state.isOpen ? 'icon-up': 'icon-down'
		)
		
		return (
			<div className='bs-cascader-showarea' onClick={this._onToggleOptionList}>
				{this.renderShowAreaText()}
				<i className={iconClassName} />
			</div>
		)
	}

	renderShowAreaText() {
		if (this.state.value && this.state.value.length) {
			return this.state.value.map(item => item.name).join(' ')
		}
		return <span className='placeholder'>请选择</span>
	}
  
	renderOptionList() {
		if (!this.state.isOpen) {
			return null
		}
		const optionItemClassName = id => classnames({ selected: this.tempValue.some(item => item.id === id) })

		return (
			<div className='bs-cascader-optionlist'>
				{
					this.state.fullList.map((list, index) => {
						return (
							<ul key={index}>
								{
									list.map((item, index) => {
										return <li className={optionItemClassName(item.id)} key={index} onClick={() => this._onClickOptionItem(item)}>{item.name}</li>
									})
								}
							</ul>
						)
					})
				}
			</div>
		)
	}

	render() {
		return (
			<div className='bs-cascader'>
				{this.renderShowArea()}
				{this.renderOptionList()}
			</div>
		)
	}
}

Cascader.contextTypes = {
	formList: PropTypes.object,
}

export default Cascader