import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

class Passport extends React.Component {
	render() {
		const { passportBoxTitle, children } = this.props

		return (
			<div className='page-passport'>
				<div className='passport-box'>
					<header>{passportBoxTitle}</header>
					{children}
				</div>
			</div>
		)
	}
}

Passport.propTypes = {
	passportBoxTitle: PropTypes.string,
	children: PropTypes.element
}

export default Passport



