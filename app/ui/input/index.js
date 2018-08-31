import React, {
	Component,
	Fragment,
} from 'react'
import { Input } from 'aliasComponent'

export default class extends Component {
	constructor(props) {
		super(props)
		this.state = {
			inputSize: 'default',
		}
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

	render() {
		const { inputSize } = this.state

		return (
			<Fragment>
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
			</Fragment>
		)
	}
}