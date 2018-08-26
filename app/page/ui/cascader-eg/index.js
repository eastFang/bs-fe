import React, {
	Component,
	Fragment,
} from 'react'
import { Cascader } from 'aliasComponent'

export default class extends Component {
  
	render() {
		return (
			<Fragment>
				<h3>级联选择器</h3>
				<Cascader />
			</Fragment>
		)
	}
}