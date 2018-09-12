import React from 'react'
import { Link } from 'react-router-dom'
import { Img, Textarea, Button } from 'aliasComponent'
import { connect } from 'react-redux'
import './index.scss'

class Comment extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isComment: false,
		}
		this._onFocusTextarea = this._onFocusTextarea.bind(this)
		this._onBlurTextarea = this._onBlurTextarea.bind(this)
	}
  
	_onFocusTextarea() {
		this.setState({
			isComment: true
		})
	}
  
	_onBlurTextarea(evt) {
		if (evt.target.value) {
			return
		}
		this.setState({
			isComment: false
		})
	}

	renderOperation() {
		if (!this.props.userInfo) {
			return (
				<div className='operation'>
					<p>请登录后再评论</p>
					<p>
						<Link to='/login'>
							<Button type='primary' title='登录' />
						</Link>
					</p>
				</div>
			)
		}
		return (
			<div className='operation'>
				<Img className='logo' src={this.props.userInfo.avatar} />
				<Textarea placeholder='说说你的看法' onFocus={this._onFocusTextarea} onBlur={this._onBlurTextarea} />
				{
					this.state.isComment
						? (
							<p className='comment-area'>
								<Button title='评论' type='primary' />
							</p>
						)
						: null
				}
			</div>
		)
	}

	render() {
    
		return (
			<div id='comment'>
				<h3>评论</h3>
				{this.renderOperation()}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.userReducer.userInfo
	}
}

export default connect(mapStateToProps, null)(Comment)