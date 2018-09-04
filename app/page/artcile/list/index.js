import React from 'react'
import { withCeiling } from 'aliasPageCommon'
import { Row, Col } from 'aliasComponent'
import CategoryList from './categoryList'
import ArticleList from './articleList'
import './index.scss'

class ArticleSearch extends React.Component {
	render() {
		return (
			<div className='page-article-list-body'>
				<Row width={1000} center='true'>
					<Col span={8} pr={100} va='top'>
						<CategoryList />
					</Col>
					<Col span={16}>
						<ArticleList />
					</Col>
				</Row>
			</div>
		)
	}
}

export default withCeiling('page-article-list')(ArticleSearch)