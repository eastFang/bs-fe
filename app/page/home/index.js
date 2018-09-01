import React from 'react'
import { Link } from 'react-router-dom'
import { withCeiling } from 'aliasPageCommon'
import ArticlePopular from './articlePopular'
import CategoryList from './categoryList'
import ArticleSearch from './articleSearch'
import './index.scss'

class Home extends React.Component {
	render() {
		return (
			<div className='page-home-body'>
				<div className='left-wrap'>
					<ArticleSearch />
					<Link className='more-articles' to='/search'>更多文章</Link>
				</div>
				<div className='right-wrap'>
					<CategoryList />
					<ArticlePopular />
				</div>
			</div>
		)
	}
}

export default withCeiling('page-home')(Home)