module.exports = [
	{
		searchName: 'userId',
		labelName: '作者ID',
	},
	{
		searchName: 'author',
		labelName: '作者名',
	},
	{
		searchName: 'title',
		labelName: '标题',
	},
	{
		searchName: 'articleId',
		labelName: '文章ID',
	},
	{
		searchName: 'publishAtStart',
		labelName: '开始时间',
		type: 'datepicker'
	},
	{
		searchName: 'publishAtEnd',
		labelName: '结束时间',
		type: 'datepicker',
	},
	{
		searchName: 'status',
		labelName: '状态',
		type: 'select',
		options: [
			{
				value: '',
				text: '请选择',
			},
			{
				value: 0,
				text: '私有',
			},
			{
				value: 1,
				text: '公开',
			},
			{
				value: '-1',
				text: '撤下',
			},
			{
				value: '-99',
				text: '删除'
			}
		]
	},
	{
		searchName: 'categoryId',
		labelName: '分类ID',
	}
]