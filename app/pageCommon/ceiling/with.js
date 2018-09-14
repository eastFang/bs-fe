import React from 'react'
import { Space } from 'aliasComponent'
import Index from './connect'

export default (wrapClass, noSpace) => Comp => class extends React.Component {
	render() {
		return (
			<div className={wrapClass}>
				<Index />
				{noSpace ? null : <Space height={90}/>}
				<Comp {...this.props}/>
			</div>
		)
	}
}