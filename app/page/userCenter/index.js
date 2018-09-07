import React from 'react'
import { fetchCurrentUserProfile } from 'aliasServer/user'
import { Upload, Form, Input, Space, Button, Message, Textarea, Radio, Cascader } from 'aliasComponent'
import { withCeiling } from 'aliasPageCommon'
import { updateUserProfile, userChangePassword } from 'aliasServer/user'
import Avatar from './avatar'
import './index.scss'

const moduleList = [
	'基础设置',
	'个人资料',
	'安全中心',
]

class UserCenter extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userFullInfo: '',
			activeModule: moduleList[0]
		}
		this._onEditInfo = this._onEditInfo.bind(this)
		this._onSubmitUserProfile = this._onSubmitUserProfile.bind(this)
		this._onSuccessUpload = this._onSuccessUpload.bind(this)
		this._onSubmitChangePassword = this._onSubmitChangePassword.bind(this)
	}
  
	componentDidMount() {
		fetchCurrentUserProfile()
			.then((res) => {
				this.setState({
					userFullInfo: res
				})
			})
	}

	_onEditInfo() {
		this.refs.editModal.show()
	}

	/**
	 * 提交修改用户个人信息
	 *
	 * @param { 修改的用户数据 } data
	 */
	_onSubmitUserProfile(evt, data) {
		evt.preventDefault()
		const address = {}
		const keyMap = {
			0: 'country',
			1: 'province',
			2: 'city'
		}
		if (data.address) {
			data.address.forEach(({id, name}, index) => {
				address[keyMap[index]] = name
				address[`${keyMap[index]}Id`] = id
			})
		}
		delete data.address

		updateUserProfile({ ...data, ...address })
			.then(() => {
				Message.success('更新成功')
			})
	}

	_onSubmitChangePassword(evt, data) {
		evt.preventDefault()
		userChangePassword(data)
			.then(() => {
				Message.success('修改成功')
			})
	} 

	_onToggleModule(module) {
		this.setState({
			activeModule: module
		})
	}

	_onSuccessUpload(imgUrl) {
		this.refs.avatarImg.setImgSrc(imgUrl)
		this.refs.avatarInput.setValue(imgUrl)
	}

	renderModule1() {
		const {
			avatar, nickName,
		} = this.state.userFullInfo
		return (
			<Form onSubmit={this._onSubmitUserProfile} key='基础设置'>
				<Form.Field label='&nbsp;' name='avatar'>
					<Avatar className='avatar' src={avatar} ref='avatarImg'/>
					<Input type='hidden' value={avatar} ref='avatarInput'/>
					<Upload successCallback={this._onSuccessUpload}/>
				</Form.Field>
				<Form.Field label='昵称' name='nickName' required>
					<Input placeholder='昵称' value={nickName}/>
				</Form.Field>
				<Form.Field label='&nbsp;'>
					<Button title='保存' type='primary' />
				</Form.Field>
			</Form>
		)
	}

	renderModule2() {
		const {
			name, homePage, gender,
			realName, profile,
			province, provinceId, city, cityId,
			country, countryId,
		} = this.state.userFullInfo
		const address = []
		countryId ? address.push({ id: countryId, name: country }) : null
		provinceId ? address.push({ id: provinceId, name: province }) : null
		cityId ? address.push({ id: cityId, name: city }) : null

		return (
			<Form onSubmit={this._onSubmitUserProfile} key='个人资料'>
				<Form.Field label='用户名' name='name' required>
					<Input placeholder='用户名' value={name}/>
				</Form.Field>
				<Form.Field label='真实姓名' name='realName' required>
					<Input placeholder='真实姓名' value={realName}/>
				</Form.Field>
				<Form.Field label='个人简介' name='profile' required>
					<Textarea placeholder='个人简介' value={profile} rows={5}/>
				</Form.Field>
				<Form.Field label='个人网站' name='homePage' pattern={/^http(s)?:\/\/.*\..*/} error='请输入正确的网址' required>
					<Input placeholder='个人网站' value={homePage}/>
				</Form.Field>
				<Form.Field label='性别' name='gender'>
					<Radio value={gender}>
						<Radio.RadioItem value={1}>男</Radio.RadioItem>
						<Radio.RadioItem value={2}>女</Radio.RadioItem>
						<Radio.RadioItem value={3}>保密</Radio.RadioItem>
					</Radio>
				</Form.Field>
				<Form.Field label='居住地' name='address'>
					<Cascader value={address}/>
				</Form.Field>
				<Form.Field label='&nbsp;'>
					<Button title='保存' type='primary' />
				</Form.Field>
			</Form>
		)
	}

	renderModule3() {
		return (
			<Form key='安全中心' onSubmit={this._onSubmitChangePassword}>
				<Form.Field label='老密码' name='oldPassword'  required>
					<Input placeholder='老密码' type='password' />
				</Form.Field>
				<Form.Field label='新密码' name='newPassword' required>
					<Input placeholder='新密码' type='password' />
				</Form.Field>
				<Form.Field label='&nbsp;'>
					<Button title='保存' type='primary' />
				</Form.Field>
			</Form>
		)
	}

	renderFormFields() {
		const { activeModule } = this.state
		if (activeModule === '基础设置') {
			return this.renderModule1()
		} else if (activeModule === '个人资料') {
			return this.renderModule2()
		} else if (activeModule === '安全中心') {
			return this.renderModule3()
		}
	}

	render() {
		if (!this.state.userFullInfo) {
			return null
		}
		
		return (
			<div className='center-wrap'>
				<div className='left-area'>
					<ul>
						{
							moduleList.map((module, index) => {
								return <li className={module === this.state.activeModule ? 'active' : ''} key={index} onClick={() => this._onToggleModule(module)}>{module}</li>
							})
						}
					</ul>
				</div>
				<div className='right-area'>
					{this.renderFormFields()}
				</div>
			</div>
		)
	}
}

export default withCeiling()(UserCenter)