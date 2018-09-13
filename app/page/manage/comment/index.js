import React from 'react'
import { Table, Space, Spin, Message } from 'aliasComponent'
import { TableFilter } from 'aliasPageCommon'
import ManageCommonPage from '../common/page'
import { formatDate, queryStrToObj } from 'aliasUtil'
import { adminCommentList, adminDelComment } from 'aliasServer/comment'
import filterConfig from './tableFilterConfig'
import { CommentEnum } from '../enum'

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
			key: 'id',
			width: 30
		}, {
			title: '文章ID',
			key: 'aimId',
			width: 60
		}, {
			title: '评价内容',
			key: 'content',
			width: 120
		}, {
			title: '评价人',
			key: 'replierName',
			width: 60,
		}, {
			title: '评价时间',
			key: 'createdAt',
			width: 80,
			render: (createdAt) => {
				return formatDate(createdAt)
			}
		}, {
			title: '状态',
			key: 'status',
			width: 40,
			render: (status) => CommentEnum.DisplayText[status]
		}, {
			title: '操作',
			width: 60,
			render: record => this.renderOperation(record)
		}]
	}

	componentDidMount() {
		this.getCommentList(this.props.location.search)
	}

	componentWillReceiveProps(nextProps) {
		window.scrollTo({ top: 0 })
		this.getCommentList(nextProps.location.search)
	}
  
	onOperationComment(id, value) {
		if (value === '-1') {
			adminDelComment(id)
				.then(() => {
					const dataSource = this.state.dataSource.filter(comment => comment.id !== id)
					this.setState({
						dataSource
					}, () => Message.success('删除成功'))
				})
		}
	}

	renderOperation(record) {
		const { id, status } = record
		const operationList = CommentEnum.Operation[status]
		return (
			<React.Fragment>
				{
					operationList && operationList.map(({ value, text }, index) => {
						return <div key={index}><a onClick={() => this.onOperationComment(id, value)}>{text}</a></div>
					})
				}
			</React.Fragment>
		)
	}

	getCommentList(search) {
		const params = { ...{ pageNo: 1, pageSize: 10 }, ...queryStrToObj(search)}
		adminCommentList(params).then((res) => {
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