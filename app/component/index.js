import Button from './button'
import Pagination from './pagination'
import Input from './input'
import DatePicker from './datepicker'
import Space from './space'
import PageCommonPassport from './pageCommon/passport'
import PageCommonCeiling from './pageCommon/ceiling'
import Modal from './modal'
import Message from './message'
import Form from './form'

module.exports = {
	Button,
	Pagination,
	Input,
	DatePicker,
	Space,
	PageCommon: {
		Passport: PageCommonPassport,
		Ceiling: PageCommonCeiling,
	},
	Modal,
	Message,
	Form,
}