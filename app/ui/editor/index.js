import React from 'react'
import { Editor, Button } from 'aliasComponent'

export default class extends React.Component {
	render() {
		return (
			<React.Fragment>
				<h3>编辑器</h3>
				<Editor ref='editor'/>
				<Button title='获取富文本内容' onClick={() => alert(JSON.stringify(this.refs.editor.getContent()))}/>
			</React.Fragment>
		)
	}
}