import React from 'react'
import { Row, Col } from 'aliasComponent'
import { withCeiling } from 'aliasPageCommon'
import ArticlePopular from './articlePopular'
import CategoryList from './categoryList'
import ArticleSearch from './articleSearch'
import MoreArticles from './moreArticles'
import './index.scss'

class Home extends React.Component {
	render() {
		return (
			<div className='page-home-body'>
				<Row width={1000} center='true'>
					<Col span={16} pr={100}>
						<ArticleSearch />
						<MoreArticles />
					</Col>
					<Col span={8} va='top'>
						<CategoryList />
						<ArticlePopular />
					</Col>
				</Row>
			</div>
		)
	}
}

export default withCeiling('page-home')(Home)