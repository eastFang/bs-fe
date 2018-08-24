import React from 'react'
import classnames from 'classnames'
// import Message from '../../message'
import './index.scss'

class Field extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			error: false,
			empty: false,
		}
	}

	showError(isError) {
		this.setState({
			error: isError,
		})
	}

	showEmpty(isEmpty) {
		this.setState({
			empty: isEmpty,
		})
	}

	componentWillReceiveProps(nextProps) {
		this.showEmpty(nextProps.emptyfield === nextProps.name)
		this.showError(nextProps.errorfield === nextProps.name)
	}
  
	render() {
		const className = classnames(
			'field',
			this.props.className,
			{
				empty: !!this.state.empty,
				error: !!this.state.error,
			}
		) 
		return (
			<div className={className}>
				{this.props.label && <label>{this.props.label}</label>}
				{
					React.Children.map(this.props.children, (child) => {
						return React.cloneElement(child, {
							name: this.props.name
						})
					})
				}
				<span className='note-error'>
					<i className='iconfont icon-error'></i>
					{this.props.error}
				</span>
				<span className='note-empty'>
					<i className='iconfont icon-error'></i>
					{this.props.empty || '必填，不可为空'}
				</span>
			</div>
		)
	}
}

export default Field