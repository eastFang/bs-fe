import React from 'react'
import { withRouter } from 'react-router-dom'
import { Input, Button } from 'aliasComponent'
import { queryStrToObj } from 'aliasUtil'
import './index.scss'

class Search extends React.Component {
	render() {
		const { keyword } = queryStrToObj(this.props.location.search)
		return (
			<form className='search-area'>
				<Input placeholder='请输入关键字' name='keyword' size='large' value={keyword}/>
				<Button type='primary' title='&nbsp;&nbsp;搜索&nbsp;&nbsp;' size='large'/>
			</form>
		)
	}
}

export default withRouter(Search)