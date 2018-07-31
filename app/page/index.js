import Home from './home/connect'
import UI from './ui'
import Login from './login'
import Register from './register'
import BlogEdit from './blog/edit'

module.exports = {
	Home,
	UI,
	Login,
	Register,
	Blog: {
		Edit: BlogEdit,
	}
}