import React from 'react'
import { Spin } from 'aliasComponent'
import { Link } from 'react-router-dom'
import { fetchUserCategoryList } from 'aliasServer/category'
import './index.scss'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			categoryList: null,
			isFetching: true,
		}
	}

	componentDidMount() {
		fetchUserCategoryList()
			.then((res) => {
				this.setState({
					categoryList: res,
					isFetching: false
				})
			})
	}
  
	render() {
		const { isFetching, categoryList } = this.state
		return (
			<React.Fragment>
				<h3>分类导航</h3>
				<Spin isFetching={isFetching}>
					<ul className='category-list'>
						{
							categoryList && categoryList.map((category, index) => {
								return (
									<li key={index}>
										<Link to={`/search?categoryId=${category.id}`}>
											{category.name}
										</Link>
									</li>
								)
							})
						}
					</ul>
				</Spin>
			</React.Fragment>
		)
	}
}