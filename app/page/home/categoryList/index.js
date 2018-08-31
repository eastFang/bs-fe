import React from 'react'
import { Spin } from 'aliasComponent'
import { Link } from 'react-router-dom'
import { fetchCategoryList } from 'aliasServer/category'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			categoryList: null,
			isFetching: true,
		}
	}

	componentDidMount() {
		fetchCategoryList()
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
			<Spin isFetching={isFetching}>
				<div className='category-area'>
					<p className='title'>分类导航</p>
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
				</div>
			</Spin>
		)
	}
}