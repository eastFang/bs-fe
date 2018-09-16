export const ArticleEnum = {
	DisplayText: {
		0: '私有',
		1: '公开',
		'-1': '撤下',
		'-99': '删除'
	},
	Operation: {
		1: [
			{
				text: '撤下',
				value: '-1'
			}
		],
		'-1': [
			{
				text: '公开',
				value: '1'
			}
		]
	}
}

export const CommentEnum = {
	DisplayText: {
		0: '隐藏中',
		1: '显示中',
		'-1': '已删除'
	},
	Operation: {
		0: [
			{
				text: '查看详情',
			},
			{
				text: '删除',
				value: '-1'
			},
		],
		1: [
			{
				text: '查看详情',
			},
			{
				text: '删除',
				value: '-1'
			},
		]
	},
	className: {
		0: 'status-hide',
		1: 'status-success',
		'-1': 'status-deleted'
	}
}

export const UserEnum = {
	DisplayText: {
		1: '正常',
		'-1': '冻结'
	},
	Operation: {
		1: [
			{
				text: '查看详情'
			},
			{
				text: '冻结',
				value: '-1'
			},
		],
		'-1': [
			{
				text: '查看详情'
			},
			{
				text: '解冻',
				value: '1'
			}
		]
	}
}