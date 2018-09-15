export const ArticleEnum = {
	STATUS: {
		private: 0,
		public: 1,
		mask: -1,
		delete: -99,
	},
	DisplayText: {
		0: '私有',
		1: '公开',
		'-1': '撤下',
		'-99': '删除'
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