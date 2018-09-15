import React from 'react'
import { Spin, Space, Message } from 'aliasComponent'
import './index.scss'
import ManageCommonPage from '../../common/page'
import { adminCommentDetail, adminDelComment } from 'aliasServer/comment'
import { formatDate } from 'aliasUtil'
import { CommentEnum } from '../../enum'

const breadbrumbList = [
	{
		text: '评论管理',
		link: '/manage/comment/list'
	}, {
		text: '评论详情'
	}
]

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isFetching: true,
			commentDetail: null,
		}
		this.params = {
			commentId: props.match.params.id
		}
	}
  
	componentDidMount() {
		adminCommentDetail(this.params.commentId)
			.then((res) => {
				this.setState({
					isFetching: false,
					commentDetail: res
				})
			})
	}

	onOperationComment(id, value) {
		if (value === '-1') {
			adminDelComment(id)
				.then(() => {
					Message.success('删除成功')
					if (id == this.params.commentId) {
						this.props.history.push('/manage/comment/list')
					} else {
						this.componentDidMount()
					}
				})
		}
	}
  
	renderDetail() {
		if (!this.state.commentDetail) {
			return
		}
		const { comment, children } = this.state.commentDetail
		children.unshift(comment)
		return (
			<ul className='comment-detial-ul'>
				{
					children && children.map(({ replierName, receiverName, content, updatedAt, status, id }, index) => {
						return (
							<li className='comment-detial-li' key={index}>
								<label>{replierName}{receiverName ? `回复 ${receiverName}` : ''}:</label> 
								<span className='right-show'>
									<div className='content'>{content}</div>
									<div className='date'>{formatDate(updatedAt)}</div>
									<div className='status'>
										<span className={CommentEnum.className[status]}>{CommentEnum.DisplayText[status]}</span>
										<span className='i-wrap'>
											{
												CommentEnum.Operation[status].map((operation, index) => {
													if (operation.text === '删除') {
														return <i key={index} className='iconfont icon-trash' onClick={() => this.onOperationComment(id, operation.value)}></i>
													}
												})
											}
										</span>
									</div>
								</span>
							</li>
						)
					})
				}
			</ul>
		)
	}

	render() {
		const { isFetching } = this.state
		return (
			<ManageCommonPage breadbrumbList={breadbrumbList}>
				<Space height={16}/>
				<Spin isFetching={isFetching}>
					{this.renderDetail()}
				</Spin>
			</ManageCommonPage>
		)
	}
}