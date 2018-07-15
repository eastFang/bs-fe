import React from 'react'
import { Button, Pagination, Input } from 'aliasComponent'
import './index.scss'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			btnSize: 'default',
			btnStatus: 'enabled',
			inputSize: 'default',
		}
	}

	/**
	 * 控制按钮大小
	 * @param enum {'large', 'default', 'small'} size 
	 */
	_onChangeBtnSize(size) {
		this.setState({
			btnSize: size
		})
	}

	/**
	 * 控制按钮状态
	 * @param enum {'enabled', 'disabled'} status 
	 */
	_onChangeBtnStatus(status) {
		this.setState({
			btnStatus: status
		})
	}

	/**
	 * 控制输入框大小
	 * @param {'large', 'default', 'small'} size 
	 */
	_onchangeInputSize(size) {
		this.setState({
			inputSize: size
		})
	}

	renderButtons() {
		const { btnSize, btnStatus } = this.state

		return (
			<div id="button">
				<h3>按钮</h3>
				<p className='comp-control'>
					<label htmlFor='btnSize-large'>
						大
						<input name='btnSize' id='btnSize-large' type='radio' checked={btnSize ==='large'} onChange={() => this._onChangeBtnSize('large')}/>
					</label>
					<label htmlFor='btnSize-default'>
						默认
						<input name='btnSize' id='btnSize-default' type='radio' checked={btnSize === 'default'} onChange={() => this._onChangeBtnSize('default')}/>
					</label>
					<label htmlFor='btnSize-small'>
						小
						<input name='btnSize' id='btnSize-small' type='radio' checked={btnSize ==='small'} onChange={() => this._onChangeBtnSize('small')} />
					</label>
				</p>
				<p className='comp-control'>
					<label htmlFor="btn-enabled">
						有效
						<input name='enabled' id='btn-enabled' type="radio" checked={btnStatus === 'enabled'} onChange={() => this._onChangeBtnStatus('enabled')}/>
					</label>
					<label htmlFor="btn-disabled">
						失效
						<input name='btn-disabled' id='btn-disabled' type="radio" checked={btnStatus === 'disabled'} onChange={() => this._onChangeBtnStatus('disabled')}/>
					</label>
				</p>
				<Button type='primary' title='primary' size={btnSize} disabled={btnStatus === 'disabled'}/>
				<Button size={btnSize} disabled={btnStatus === 'disabled'}/>
				<Button type='dashed' title='dashed' size={btnSize} disabled={btnStatus === 'disabled'}/>
				<Button type='danger' title='danger' size={btnSize} disabled={btnStatus === 'disabled'}/>
				<br />
				<Button href='/' title='跳转按钮，并跳回首页' />
				<br />
				<Button onClick={() => alert(1)} title='点击我，有惊喜'/>
			</div>
		)
	}

	renderPagination() {
		return (
			<div id='pagination'>
				<h3>分页器</h3>
				<Pagination total={62} />
			</div>
		)
	}

	renderInput() {
		const { inputSize } = this.state

		return (
			<div id='input'>
				<h3>输入框</h3>
				<p className='comp-control'>
					<label htmlFor='inputSize-large'>
						大
						<input name='inputSize' id='inputSize-large' type='radio' checked={inputSize ==='large'} onChange={() => this._onchangeInputSize('large')}/>
					</label>
					<label htmlFor='inputSize-default'>
						默认
						<input name='inputSize' id='inputSize-default' type='radio' checked={inputSize === 'default'} onChange={() => this._onchangeInputSize('default')}/>
					</label>
					<label htmlFor='inputSize-small'>
						小
						<input name='inputSize' id='inputSize-small' type='radio' checked={inputSize ==='small'} onChange={() => this._onchangeInputSize('small')} />
					</label>
				</p>
				<Input size={inputSize} placeholder='默认值'/>
			</div>
		)
	}

	renderFloatCeilingMenu() {
		return (
			<ul className='ui-ceiling'>
				<li>
					<a href="#button" title='按钮'>Button</a>
				</li>
				<li>
					<a href='#pagination' title='分页器'>Pagination</a>
				</li>
				<li>
					<a href='#input' title='输入框'>Input</a>
				</li>
			</ul>
		)
	}

	render() {
		return (
			<div className='ui-container'>
				{this.renderFloatCeilingMenu()}
				{this.renderButtons()}
				{this.renderPagination()}
				{this.renderInput()}
			</div>
		)
	}
}