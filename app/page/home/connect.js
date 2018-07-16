import { connect } from 'react-redux'
import Index from './'

const mapStateToProps = state => {
	return {
		todo: state.todoReducer
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		showTodo: () => dispatch({ type: 'todoAdd' }),
		...props
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)