// 行
// children 只接收Col
// 默认24份 col的span总和加起来24即可
import React from 'react'
import PropTypes from 'prop-types'
class Row extends React.Component {

	getStyle() {
		const { maxWidth, minWidth, center, width } = this.props
		const style = {}
		maxWidth ? style.maxWidth = `${maxWidth}px` : null
		minWidth ? style.minWidth = `${minWidth}px` : null
		width ? style.width = `${width}px` : null
		center ? style.margin = '0 auto' : null
		return style
	}
	render() {
		const childList = []
		React.Children.forEach(this.props.children, (child) => {
			if (child && child.type) {
				childList.push(child)
			}
		})
		return <div {...this.props} className='bs-row' style={this.getStyle()}>{childList}</div>
	}
}

Row.propTypes = {
	maxWidth: PropTypes.number,
	minWidth: PropTypes.number,
	width: PropTypes.number,
}

export default Row