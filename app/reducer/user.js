export default function (state = {}, action) {
	switch(action.type) {
	case 'getUserInfo':
		return { ...state, ...action.payload }
	default:
		return state
	}
}