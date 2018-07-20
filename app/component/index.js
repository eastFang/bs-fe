import Button from './button'
import Pagination from './pagination'
import Input from './input'
import DatePicker from './datepicker'
import Space from './space'
import PageCommonPassport from './pageCommon/passport'

module.exports = {
	Button,
	Pagination,
	Input,
	DatePicker,
	Space,
	PageCommon: {
		Passport: PageCommonPassport,
	},
}