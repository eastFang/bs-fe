import React from 'react'
import { withCeiling } from 'aliasPageCommon'
import CategoryList from './categoryList'
import ArticleList from './articleList'
import './index.scss'

class ArticleSearch extends React.Component {
	render() {
		return (
			<div className='page-article-list-body'>
				<div className='left-wrap'>
					<CategoryList />
				</div>
				<div className='right-wrap'>
					<ArticleList />
				</div>
			</div>
		)
	}
}

export default withCeiling('page-article-list')(ArticleSearch)