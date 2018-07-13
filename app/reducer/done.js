export default function(state = 0, action) {
	switch(action.type) {
	case 'doneAdd': 
		return state + 2
	case 'doneSub':
		return state - 2
	}
	return state
}
