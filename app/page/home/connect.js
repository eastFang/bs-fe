import { connect } from 'react-redux'
import Index from './'

const mapStateToProps = state => {
	return {
		todo: state.todoReducer
	}
}

const mapDispatchToProps = dispatch => {
	return {
		showTodo: () => dispatch({ type: 'todoAdd' })
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)