import React from 'react'
import { Space } from 'aliasComponent'
import Index from './connect'

export default wrapClass => Comp => class extends React.Component {
	render() {
		return (
			<div className={wrapClass}>
				<Index />
				<Space height={40}/>
				<Comp {...this.props}/>
			</div>
		)
	}
}