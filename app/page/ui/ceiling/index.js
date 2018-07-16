import React, {
	Component
} from 'react'
import CeilingData from './data'

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
			</ul>
		)
	}
}