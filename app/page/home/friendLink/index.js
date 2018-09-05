import React from 'react'
import { fetchFrontFriendLinkList } from 'aliasServer/friendLink'
import { Spin } from 'aliasComponent'
import './index.scss'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			friendLinkList: null
		}
	}

	componentDidMount() {
		fetchFrontFriendLinkList()
			.then((res) => {
				this.setState({
					friendLinkList: res
				})
			})
	}

	render() {
		const { friendLinkList } = this.state
		return (
			<React.Fragment>
				<h3>友情链接</h3>
				<Spin>
					<ul className='friendlink-ul'>
						{
							friendLinkList && friendLinkList.map((friendLink, index) => {
								return <li key={index}><a href={friendLink.link} target='_blank'>{friendLink.webName}</a></li>
							})
						}
					</ul>
				</Spin>
			</React.Fragment>
		)
	}
}