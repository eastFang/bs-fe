import React from 'react'
import classnames from 'classnames'
import './index.scss'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
		}
		this._onReturnTop = this._onReturnTop.bind(this)
	}

	componentDidMount() {
		window.addEventListener('scroll', () => {
			const scrollY = window.scrollY
			if (scrollY > 50 && !this.state.visible) {
				this.setState({
					visible: true
				})
			} else if (scrollY <= 50 && this.state.visible) {
				this.setState({
					visible: false
				})
			}
		}, false)
	}

	_onReturnTop() {
		window.scrollTo({ top: 0 })
	}

	render() {
		const className = classnames(
			'bs-return-top',
			{
				visible: this.state.visible
			}
		)
		return (
			<div className={className} onClick={this._onReturnTop}>
				<i className='iconfont icon-up'></i>
			</div>
		)
	}
}