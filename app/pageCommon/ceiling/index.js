import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Input, Button } from 'aliasComponent'
import WhiteLogo from 'aliasImage/white-logo.png'
import { flyUtil } from 'aliasUtil'
import { queryStrToObj } from 'aliasUtil'
import './index.scss'

class Ceiling extends React.Component {
	constructor(props) {
		super(props)
		this._onLogout = this._onLogout.bind(this)
		this._onRouteAddArticle = this._onRouteAddArticle.bind(this)
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
					<img src={avatar} />
					<i className='iconfont icon-down' />
				</a>
				<ul className='entrance-ul'>
					<li><Link to='/userCenter'>个人中心</Link></li>
					<li><a onClick={this._onLogout}>退出</a></li>
					<li><Link to='/ui'>组件库</Link></li>
					<li><Link to='/manage/category'>管理中心</Link></li>
				</ul>
			</div>
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
						<Input placeholder='请输入关键字' name='keyword' size='large' value={keyword}/>
						<a className='iconfont icon-search' type='primary' onClick={() => this.refs.form.submit()}></a>
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