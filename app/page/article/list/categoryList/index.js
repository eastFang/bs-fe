import React from 'react'
import { Spin } from 'aliasComponent'
import { withRouter } from 'react-router-dom'
import { fetchUserCategoryList } from 'aliasServer/category'
import { queryStrToObj, replaceQueryParamInSearch } from 'aliasUtil'
import './index.scss'

class CategoryList extends React.Component {
	constructor(props) {
		super(props)
		const { categoryId = '' } = queryStrToObj(props.location.search)
		this.state = {
			categoryList: null,
			currentCategoryId: categoryId,
			isFetching: true,
		}
	}

	componentDidMount() {
		const params = queryStrToObj(this.props.location.search)
		fetchUserCategoryList()
			.then((res) => {
				this.setState({
					categoryList: res,
					currentCategoryId: params.categoryId || '',
					isFetching: false,
				})
			})
	}

	_onSearch(categoryId) {
		this.props.history.push(`/search${replaceQueryParamInSearch(this.props.location.search, { categoryId } )}`)
	}
  
	render() {
		const { isFetching, categoryList, currentCategoryId } = this.state
		return (
			<Spin isFetching={isFetching}>
				<ul className='left-ul'>
					{
						categoryList && categoryList.map((category, index) => {
							return (
								<li key={index} className={category.id == currentCategoryId ? 'active' : ''}>
									<a onClick={() => this._onSearch(category.id)}>{category.name}</a>
								</li>
							)
						})
					}
				</ul>
			</Spin>
		)
	}
}

export default withRouter(CategoryList)