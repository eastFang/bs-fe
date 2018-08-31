import { connect } from 'react-redux'
import Index from './'

const mapStateToProps = (state) => {
	return {

	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getUserInfo(userInfo) {
			dispatch({ type: 'getUserInfo', payload: { userInfo } })
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)