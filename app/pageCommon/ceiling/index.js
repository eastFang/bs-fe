import React from 'react'
import classnames from 'classnames'
import { Link, withRouter } from 'react-router-dom'
import { Input, Button, Img } from 'aliasComponent'
import WhiteLogo from 'aliasImage/white-logo.png'
import { flyUtil } from 'aliasUtil'
import { queryStrToObj } from 'aliasUtil'
import './index.scss'

class Ceiling extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			searchInputFocus: false,
		}
		this._onLogout = this._onLogout.bind(this)
		this._onRouteAddArticle = this._onRouteAddArticle.bind(this)
		this._onSearch = this._onSearch.bind(this)
		this._onFocusSearchInput = this._onFocusSearchInput.bind(this)
		this._onBlurSearchInput = this._onBlurSearchInput.bind(this)
	}

	_onLogout() {
		flyUtil({ url: '/api/user/logout', method: 'post' })
			.then(() => {
				location.href = '/'
			})
	}

	_onRouteAddArticle() {
		this.props.history.push('/article/add')
	}

	_onSearch() {
		this.refs.form.submit()
	}

	_onFocusSearchInput() {
		this.setState({
			searchInputFocus: true
		})
	}

	_onBlurSearchInput() {
		this.setState({
			searchInputFocus: false
		})
	}

	/**
	 * 游客 可操作入口
	 */
	renderVistorOperation() {
		return (
			<div className='vistor-operation'>
				<Link to='/login'>登录</Link>
				<Link to='/register'>注册</Link>
			</div>
		)
	}
	
	/**
	 * 系统用户 可操作入口
	 */
	renderSystemUserOperation() {
		const { avatar } = this.props.userInfo
		return (
			<div className='user-operation'>
				<a className='wrap-img'>
					<Img className='avatar' src={avatar} />
					<i className='iconfont icon-down' />
				</a>
				<ul className='entrance-ul'>
					<li><Link to='/userCenter'>个人中心</Link></li>
					{this.renderAdminOperation()}
					<li><a onClick={this._onLogout}>退出</a></li>
				</ul>
			</div>
		)
	}

	/**
	 * 运营 可操作入口
	 */
	renderAdminOperation() {
		if (this.props.userInfo.name !== 'admin') {
			return null
		}

		return (
			<React.Fragment>
				<li><Link to='/ui'>组件库</Link></li>
				<li><Link to='/manage/category'>管理中心</Link></li>
			</React.Fragment>
		)
	}

	render() {
		const { keyword } = queryStrToObj(this.props.location.search)
		return (
			<div className='ceiling-wrap'>
				<div className='logo-wrap'>
					<Link to='/'>
						<img className='logo' src={WhiteLogo} />
					</Link>
				</div>
				<div className='search-wrap'>
					<form className='search-area' action='/search' ref='form'>
						<Input className={classnames({ focus: this.state.searchInputFocus })}
							placeholder='请输入关键字'
							name='keyword'
							size='large'
							value={keyword}
							ref='input'
							onFocus={this._onFocusSearchInput}
							onBlur={this._onBlurSearchInput}/>
						<a className='iconfont icon-search' onClick={this._onSearch} onMouseDown={evt => evt.preventDefault()}></a>
					</form>
				</div>
				<div className='right-area'>
					{this.props.userInfo ? this.renderSystemUserOperation() : this.renderVistorOperation()}
					<Button title='写文章' type='primary' onClick={this._onRouteAddArticle}/>
				</div>
			</div>
		)
	}
}

export default withRouter(Ceiling)