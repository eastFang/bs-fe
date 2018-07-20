import React from 'react'
import PropTypes from 'prop-types'

class Space extends React.Component {
	render() {
		const { backgroundColor } = this.props
		return (
			<div style={{ height: `${this.props.height}px`, backgroundColor }}></div>
		)
	}
}

Space.propTypes = {
	backgroundColor: PropTypes.string,
	height: PropTypes.number,
}

Space.defaultProps = {
	backgroundColor: 'transparent'
}

export default Space

