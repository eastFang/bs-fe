import { connect } from 'react-redux'
import Index from './'

const mapStateToProps = (state) => {
	return {
		userInfo: state.userReducer.userInfo
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)