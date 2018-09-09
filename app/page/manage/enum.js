const STATUS = {
	private: 0,
	public: 1,
	mask: -1,
	delete: -99,
}

const DisplayText = {
	0: '私有',
	1: '公开',
	'-1': '撤下',
	'-99': '删除'
}

export const ArticleEnum = {
	STATUS,
	DisplayText
}