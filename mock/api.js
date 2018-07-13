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
}

module.exports = proxy
