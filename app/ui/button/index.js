import React from 'react'
import { Button } from 'aliasComponent'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			btnSize: 'default',
			btnStatus: 'enabled',
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
  
	render() {
		const { btnSize, btnStatus } = this.state

		return (
			<React.Fragment>
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
				<Button href='/' size={btnSize} title='跳转按钮，并跳回首页' disabled={btnStatus === 'disabled'}/>
				<br />
				<Button onClick={() => alert(1)} size={btnSize} title='点击我，有惊喜' disabled={btnStatus === 'disabled'}/>
			</React.Fragment>
		)
	}
}