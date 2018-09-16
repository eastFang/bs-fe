module.exports = [
	{
		searchName: 'id',
		labelName: 'ID',
	},
	{
		searchName: 'webName',
		labelName: '网站名称',
	},
	{
		searchName: 'visible',
		labelName: '状态',
		type: 'select',
		options: [
			{
				text: '请选择',
				value: ''
			},
			{
				value: 0,
				text: '不可见'
			},
			{
				value: 1,
				text: '可见'
			}
		]
	}
]