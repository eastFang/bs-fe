import React from 'react'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			src: props.src || ''
		}
	}

	setImgSrc(src) {
		this.setState({
			src
		})
	}

	render() {
		if (!this.state.src) {
			return null
		}
		return (
			<img {...this.props} src={this.state.src}/>
		)
	}
}