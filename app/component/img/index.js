import React from 'react'
import PropTypes from 'prop-types'
import defaultAvatar from './defaultAvatar.jpg'

class Img extends React.Component {
	render() {
		const { src, defaultSrc, ...others } = this.props
		const showSrc = src || defaultSrc || defaultAvatar
		return <img {...others} src={showSrc}/>
	}
}

Img.propTypes = {
	defaultSrc: PropTypes.string
}

export default Img