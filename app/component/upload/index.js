import React from 'react'
import './index.scss'
import { flyUtil } from 'aliasUtil'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			uploadedImgList: [],
		}
		this._onChange = this._onChange.bind(this)
	}

	_onChange(evt) {
		const file = evt.target.files[0]
		const formData = new FormData()
		formData.append('file', file)
		flyUtil({ url: '/api/file/upload', method: 'post', params: formData })
			.then((imgUrl) => {
				const { uploadedImgList } = this.state
				uploadedImgList.push(imgUrl)
				this.setState({
					uploadedImgList
				})
				this.props.successCallback && this.props.successCallback(imgUrl)
			})
			.catch((error) => {
				// 错误回调：不直接抛出错误提示的原因，不想upload依赖Message
				this.props.errorCallback && this.props.errorCallback(error.message)
			})
	}

	_onDeleteUploadedImg(uploadImg) {
		const index = this.state.uploadedImgList.indexOf(uploadImg)
		const { uploadedImgList } = this.state
		uploadedImgList.splice(index, 1)
		this.setState({
			uploadedImgList
		})
	}

	render() {
		return (
			<div className='bs-upload'>
				<div className='control'>
					<span className='tip-wrap'>
						<i className='iconfont icon-upload' /><br/>
						<span>上传</span>
					</span>
					<input type='file' onChange={this._onChange} value=''/>
				</div>
				{/*<ul className='list'>
					{
						this.state.uploadedImgList.map((uploadImg, index) => {
							return (
								<li key={index}>
									<img src={uploadImg} />
									<a className='icon-wrap' onClick={(uploadImg) => this._onDeleteUploadedImg(uploadImg)}>
										<i className='iconfont icon-delete'></i>
									</a>
								</li>
							)
						})
					}
				</ul>*/}
			</div>
		)
	}
}