import React from 'react'
import { Button, Table, Space } from 'aliasComponent'
import ManageCommonPage from '../common/page'
import { formatDate, queryStrToObj } from 'aliasUtil'
import { fetchArticlePaging } from 'aliasServer/manage'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dataSource: null,
			total: 0
		}
		this.columns = [{
			title: 'id',
			key: 'article[id]',
			width: 30
		}, {
			title: '作者',
			key: 'article[author]',
			width: 60
		}, {
			title: '类目名称',
			key: 'article[categoryName]',
			width: 70
		}, {
			title: '简介',
			key: 'article[synopsis]',
			width: 200,
		}, {
			title: '标题',
			key: 'article[title]',
			width: 60,
		}, {
			title: '发布时间',
			key: 'article[publishAt]',
			width: 80,
			render: (publishAt) => {
				return formatDate(publishAt)
			}
		}, {
			title: '更新时间',
			key: 'article[updatedAt]',
			width: 80,
			render: (updatedAt) => {
				return formatDate(updatedAt)
			}
		}]
	}

	componentDidMount() {
		this.getArticleList(this.props.location.search)
	}

	componentWillReceiveProps(nextProps) {
		this.getArticleList(nextProps.location.search)
	}

	getArticleList(search) {
		const { pageNo = 1, pageSize = 10 } = queryStrToObj(search)
		fetchArticlePaging({ pageNo, pageSize }).then((res) => {
			const { total, datas } = res
			this.setState({
				total,
				dataSource: datas
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