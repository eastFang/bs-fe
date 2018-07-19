import React, {
	Component,
	Fragment,
} from 'react'
import { DatePicker } from 'aliasComponent'

export default class extends Component {
  
	render() {
		return (
			<Fragment>
				<h3>日期选择器</h3>
				<DatePicker />
			</Fragment>
		)
	}
}