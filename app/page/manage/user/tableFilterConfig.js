module.exports = [
	{
		searchName: 'name',
		labelName: '用户名',
	},
	{
		searchName: 'email',
		labelName: '邮箱',
	},
	{
		searchName: 'status',
		labelName: '状态',
		type: 'select',
		options: [
			{
				value: '',
				text: '请选择'
			},
			{
				value: 1,
				text: '正常'
			},
			{
				value: '-1',
				text: '冻结'
			}
		]
	}
]