import React from 'react'
import { Link } from 'react-router-dom'
import { withCeiling } from 'aliasPageCommon'
import ArticleList from './articleList'
import CategoryList from './categoryList'
import './index.scss'

class Home extends React.Component {
	render() {
		return (
			<div className='page-home-body'>
				<div className='left-wrap'>
					<ArticleList />
					<Link className='more-articles' to='/search'>更多文章</Link>
				</div>
				<div className='right-wrap'>
					<CategoryList />
				</div>
			</div>
		)
	}
}

export default withCeiling('page-home')(Home)