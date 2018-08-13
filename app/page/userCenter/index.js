import React from 'react'
import { flyUtil } from 'aliasUtil'
import { PageCommon, Modal } from 'aliasComponent'
import './index.scss'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userFullInfo: ''
		}
		this._onEditInfo = this._onEditInfo.bind(this)
	}
  
	fetchUserFullInfo() {
		flyUtil({ url: '/api/user/profile' })
			.then((res) => {
				this.setState({
					userFullInfo: res
				})
			})
	}
  
	componentDidMount() {
		this.fetchUserFullInfo()
	}

	_onEditInfo() {
		this.refs.editModal.show()
	}

	renderUserFullInfoDetail() {
		const {
			name, mobile, email,
			homePage, avatar, gender,
			realName, birth, country,
			province, city,
		} = this.state.userFullInfo
		return (
			<div className='detail'>
				<p>
					<span>我的信息</span>
					<a className='edit-a' onClick={this._onEditInfo}>编辑</a>
				</p>
				<ul className='ul'>
					<li><span className='label-span'>用户名: </span>{name}</li>
					<li><span className='label-span'>手机号: </span>{mobile}</li>
					<li><span className='label-span'>邮箱: </span>{email}</li>
					<li><span className='label-span'>主页: </span>{homePage}</li>
					<li><span className='label-span'>头像: </span>{avatar}</li>
					<li><span className='label-span'>性别: </span>{gender}</li>
					<li><span className='label-span'>真实姓名: </span>{realName}</li>
					<li><span className='label-span'>生日: </span>{birth}</li>
					<li><span className='label-span'>所在地: </span>{country}{province}{city}</li>
				</ul>
			</div>
		)
	}

	renderUserEditModal() {
		return (
			<Modal title='编辑信息' ref='editModal'>
			</Modal>
		)
	}

	render() {
		if (!this.state.userFullInfo) {
			return null
		}

		return (
			<div className='center-wrap'>
				<PageCommon.Ceiling />
				{this.renderUserFullInfoDetail()}
				{this.renderUserEditModal()}
			</div>
		)
	}
}