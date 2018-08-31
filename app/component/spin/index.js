import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

class Spin extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			spin: !!props.spin,
		}
	}
  
	componentWillReceiveProps(nextProps) {
		if (this.props.spin !== nextProps.spin) {
			this.setState({
				spin: nextProps.spin
			})
		}
	}

	render() {
		if (!this.state.spin) {
			return this.props.children
		}

		return (
			<div className='bs-spin'>
				{this.props.children}
				<div className='bs-spin-body'>
					<span className='i-wrap'>
						<i></i>
						<i></i>
						<i></i>
						<i></i>
					</span>
				</div>
			</div>
		)
	}
}

Spin.propTypes = {
	spin: PropTypes.bool
}

Spin.defaultProps = {
	spin: true
}

export default Spin