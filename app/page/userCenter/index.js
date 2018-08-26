import React from 'react'
import { fetchCurrentUserProfile } from 'aliasServer/user'
import { PageCommon, Upload, Form, Input, Space, Button, Message, Textarea, Radio } from 'aliasComponent'
import { updateUserProfile } from 'aliasServer/user'
import Avatar from './avatar'
import './index.scss'

const moduleList = [
	'基础设置',
	'个人资料'
]

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userFullInfo: '',
			activeModule: moduleList[0]
		}
		this._onEditInfo = this._onEditInfo.bind(this)
		this._onSubmit = this._onSubmit.bind(this)
		this._onSuccessUpload = this._onSuccessUpload.bind(this)
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

	_onSubmit(evt, data) {
		evt.preventDefault()
		updateUserProfile(data)
			.then(() => {
				Message.success('更新成功')
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

	renderFormFields() {
		const {
			name, mobile, email,
			homePage, avatar, gender,
			realName, birth, country,
			province, city, nickName,
			profile,
		} = this.state.userFullInfo
		const { activeModule } = this.state
		if (activeModule === '基础设置') {
			return (
				<Form onSubmit={this._onSubmit} key='基础设置'>
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
		} else if (activeModule === '个人资料') {
			return (
				<Form onSubmit={this._onSubmit} key='个人资料'>
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
					<Form.Field label='&nbsp;'>
						<Button title='保存' type='primary' />
					</Form.Field>
				</Form>
			)
		}
	}

	render() {
		if (!this.state.userFullInfo) {
			return null
		}

		return (
			<React.Fragment>
				<PageCommon.Ceiling />
				<div className='center-wrap'>
					<Space height={40} />
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
			</React.Fragment>
		)
	}
}