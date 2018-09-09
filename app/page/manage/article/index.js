import React from 'react'
import { Table, Space, Spin, Message } from 'aliasComponent'
import { TableFilter } from 'aliasPageCommon'
import ManageCommonPage from '../common/page'
import { formatDate, queryStrToObj } from 'aliasUtil'
import { fetchAdminArticlePaging, editArticle, fetchArticleDetail } from 'aliasServer/article'
import filterConfig from './tableFilterConfig'
import { ArticleEnum } from '../enum'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dataSource: null,
			total: 0,
			isFetching: true,
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
		}, {
			title: '状态',
			key: 'article[status]',
			width: 40,
			render: (status) => ArticleEnum.DisplayText[status]
		}, {
			title: '操作',
			width: 60,
			render: record => this.renderOperation(record)
		}]
	}

	componentDidMount() {
		this.getArticleList(this.props.location.search)
	}

	componentWillReceiveProps(nextProps) {
		window.scrollTo({ top: 0 })
		this.getArticleList(nextProps.location.search)
	}

	toggleArticle(articleId, visible) {
		const { dataSource } = this.state
		fetchArticleDetail(articleId)
			.then((res) => {
				Object.assign(res.article, { id: articleId, visible })
				editArticle(res)
					.then(() => {
						for(let item of dataSource) {
							if (item.article.id === articleId) {
								item.article.visible = visible
								break
							}
						}
						this.setState({
							dataSource
						}, () => Message.success('操作成功'))
					})
			})
	}

	renderOperation(record) {
		const { article: { visible, id } } = record
		return (
			<React.Fragment>
				{ visible ? <a onClick={() => this.toggleArticle(id, false)}>停用</a> : <a onClick={() => this.toggleArticle(id, true)}>发布</a>}<br />
			</React.Fragment>
		)
	}

	getArticleList(search) {
		const params = { ...{ pageNo: 1, pageSize: 10 }, ...queryStrToObj(search)}
		fetchAdminArticlePaging(params).then((res) => {
			const { total, datas } = res
			this.setState({
				total,
				dataSource: datas,
				isFetching: false,
			})
		})
	}

	render() {
		const { dataSource, total, isFetching } = this.state
		return (
			<ManageCommonPage>
				<Space height={16}/>
				<TableFilter fields={filterConfig}/>
				<Spin isFetching={isFetching}>
					<Table dataSource={dataSource} total={total} columns={this.columns} />
				</Spin>
			</ManageCommonPage>
		)
	}
}