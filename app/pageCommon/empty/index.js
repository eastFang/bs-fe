import React from 'react'
import { Link } from 'react-router-dom'
import { Img } from 'aliasComponent'
import searchEmpty from './search-empty.png'
import './index.scss'

export default class extends React.Component {
	render() {
		return (
			<div className='page-common-emtpy'>
				<Img src={searchEmpty} width={80} height={80}/>
				<p>
					<Link to='/'>啥也没搜到~~~，先回到首页吧</Link>
				</p>
			</div>
		)
	}
}