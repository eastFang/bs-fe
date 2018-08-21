import React, {
	Component
} from 'react'
import { Link } from 'react-router-dom'
import CeilingData from './data'
import './index.scss'

export default class extends Component {
	render() {
		if (!CeilingData && CeilingData.length === 0) return null
    
		return (
			<ul className='ui-ceiling'>
				{
					CeilingData.map(({ id, title, text }, index) => {
						return (
							<li key={index}>
								<a href={`#${id}`} title={title}>{text}</a>
							</li>
						)
					})
				}
				<li>
					<Link to='/'>
						返回首页
					</Link>
				</li>
			</ul>
		)
	}
}