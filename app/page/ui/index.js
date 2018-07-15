import React from 'react'
import { Button, Pagination } from 'aliasComponent'
import './index.scss'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			size: 'default',
			status: 'enabled',
		}
	}

	/**
	 * 控制按钮大小
	 * @param enum {'large', 'default', 'small'} size 
	 */
	_onChangeBtnSize(size) {
		this.setState({
			size
		})
	}

	/**
	 * 控制按钮状态
	 * @param enum {'enabled', 'disabled'} status 
	 */
	_onChangeBtnStatus(status) {
		this.setState({
			status
		})
	}

	renderButtons() {
		const { size, status } = this.state

		return (
			<div id="button">
				<h3>按钮</h3>
				<p className='btn-control'>
					<label htmlFor='btnSize-large'>
						大
						<input name='btnSize' id='btnSize-large' type='radio' checked={size ==='large'} onChange={() => this._onChangeBtnSize('large')}/>
					</label>
					<label htmlFor='btnSize-default'>
						默认
						<input name='btnSize' id='btnSize-default' type='radio' checked={size === 'default'} onChange={() => this._onChangeBtnSize('default')}/>
					</label>
					<label htmlFor='btnSize-small'>
						小
						<input name='btnSize' id='btnSize-small' type='radio' checked={size ==='small'} onChange={() => this._onChangeBtnSize('small')} />
					</label>
				</p>
				<p className='btn-control'>
					<label htmlFor="btn-enabled">
						有效
						<input name='enabled' id='btn-enabled' type="radio" checked={status === 'enabled'} onChange={() => this._onChangeBtnStatus('enabled')}/>
					</label>
					<label htmlFor="btn-disabled">
						失效
						<input name='btn-disabled' id='btn-disabled' type="radio" checked={status === 'disabled'} onChange={() => this._onChangeBtnStatus('disabled')}/>
					</label>
				</p>
				<Button type='primary' title='primary' size={size} disabled={status === 'disabled'}/>
				<Button size={size} disabled={status === 'disabled'}/>
				<Button type='dashed' title='dashed' size={size} disabled={status === 'disabled'}/>
				<Button type='danger' title='danger' size={size} disabled={status === 'disabled'}/>
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

	renderFloatCeilingMenu() {
		return (
			<ul className='ui-ceiling'>
				<li>
					<a href="#button" title='按钮'>Button</a>
				</li>
				<li>
					<a href='#pagination' title='分页器'>Pagination</a>
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
			</div>
		)
	}
}