import React from 'react'
import { Button, Table, Space } from 'aliasComponent'
import ManageCommonPage from '../common/page'
import { flyUtil, formatDate } from 'aliasUtil'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dataSource: null,
			total: 0
		}
		this.columns = [{
			title: 'id',
			key: 'article[id]'
		}, {
			title: '作者',
			key: 'author',
		}, {
			title: '类目名称',
			key: 'categoryName'
		}, {
			title: '简介',
			key: 'synopsis'
		}, {
			title: '标题',
			key: 'title'
		}, {
			title: '发布时间',
			key: 'publishAt',
			render: (publishAt) => {
				return formatDate(publishAt)
			}
		}, {
			title: '更新时间',
			key: 'updatedAt',
			render: (updatedAt) => {
				return formatDate(updatedAt)
			}
		}]
	}

	componentDidMount() {
		this.fetchArticleList()
	}

	fetchArticleList() {
		flyUtil({ url: '/api/admin/article/paging' })
			.then((res) => {
				const { total, datas } = res
				console.log(datas)
				this.setState({
					total, dataSource: datas
				})
			})
	}

	render() {
		const { dataSource, total } = this.state
		return (
			<ManageCommonPage>
				<Button type='primary' title='新建文章' onClick={() => this.props.history.push('/addArticle')}/>
				<Space height={16}/>
				<Table dataSource={dataSource} total={total} columns={this.columns} />
			</ManageCommonPage>
		)
	}
}