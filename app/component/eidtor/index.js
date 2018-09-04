import React from 'react'
import PropTypes from 'prop-types'
import BraftEditor, { EditorState } from 'braft-editor'
import 'braft-editor/dist/braft.css'
import './index.scss'

class Editor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: ''
		}
		this.editorInstance = null
		this._onHTMLChange = this._onHTMLChange.bind(this)
	}

	_onHTMLChange(html) {
		this.setState({
			value: html
		})
	}

	componentDidMount() {
		if (this.props.name && this.context.formList) {
			this.context.formList[this.props.name] = this
		}
	}

	meida() {
		const uploadFn = (param) => {
			const serverURL = '/api/file/upload'
			const xhr = new XMLHttpRequest()
			const fd = new FormData()
		
			const successFn = (response) => {
				// 假设服务端直接返回文件上传后的地址
				// 上传成功后调用param.success并传入上传后的文件地址
				param.success({
					url: xhr.responseText,
					meta: {
						id: 'xxx',
						title: 'xxx',
						alt: 'xxx',
						loop: true, // 指定音视频是否循环播放
						autoPlay: true, // 指定音视频是否自动播放
						controls: true, // 指定音视频是否显示控制栏
					}
				})
			}
		
			const progressFn = (event) => {
				// 上传进度发生变化时调用param.progress
				param.progress(event.loaded / event.total * 100)
			}
		
			const errorFn = (response) => {
				// 上传发生错误时调用param.error
				param.error({
					msg: 'unable to upload.'
				})
			}
		
			xhr.upload.addEventListener('progress', progressFn, false)
			xhr.addEventListener('load', successFn, false)
			xhr.addEventListener('error', errorFn, false)
			xhr.addEventListener('abort', errorFn, false)
		
			fd.append('file', param.file)
			xhr.open('POST', serverURL, true)
			xhr.send(fd)
		}

		return { uploadFn }
	}

	// getContent() {
	// 	return this.editorInstance.getHTMLContent()
	// }
	setValue(htmlContent) {
		this.editorInstance.setContent(htmlContent)
	}
 
	render() {
		return (
			<div className='editor-wrap'>
				<BraftEditor media={this.meida()} ref={instance => this.editorInstance = instance}
					onHTMLChange={this._onHTMLChange} 
					value={this.state.value}
					contentFormat={'html'}
					{...this.props}/>
			</div>
		)
	}
}

Editor.contextTypes = {
	formList: PropTypes.object
}

export default Editor