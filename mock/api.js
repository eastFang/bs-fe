const fs = require('fs')

function fromJSONFile(filename) {
	return (req, res) => {
		const data = fs.readFileSync(`mock/data/${filename}.json`).toString()
		const json = JSON.parse(data)
		return res.json(json)
	}
}
const proxy = {
	'GET /app/address/list': fromJSONFile('address'),
	'POST /api/login': (req, res) => {
		const { username, password } = req.body
		if (username === 'admin' && password === '123456') {
			return res.send({ message: '登陆成功', status: 'ok' })
		} else {
			return res.send({ message: '用户名或密码错误', status: 'error' })
		}
	}
}

module.exports = proxy
