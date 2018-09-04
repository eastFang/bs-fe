import { connect } from 'react-redux'
import Index from './'

const mapStateToProps = (state) => {
	return {
		userInfo: state.userReducer.userInfo
	}
}

export default connect(mapStateToProps, null)(Index)
