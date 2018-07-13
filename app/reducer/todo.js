export default function(state = 0, action) {
	switch(action.type) {
	case 'todoAdd': 
		return state + 2
	case 'todoSub':
		return state - 2
	}
	return state
}